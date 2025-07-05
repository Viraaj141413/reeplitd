import { Request, Response, NextFunction, Express } from 'express';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { db } from './db';
import { users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import session from 'express-session';
import MemoryStore from 'memorystore';

const MemoryStoreClass = MemoryStore(session);

export class ViraajAuth {
  private usersFile: string = path.join(process.cwd(), 'users.txt');
  private sessionsFile: string = path.join(process.cwd(), 'sessions.txt');
  private deviceMemoryFile: string = path.join(process.cwd(), 'device-memory.txt');
  private activityFile: string = path.join(process.cwd(), 'user-activity.txt');

  constructor() {
    this.initializeFiles();
  }

  private async initializeFiles() {
    // Create essential files if they don't exist
    const files = [this.usersFile, this.sessionsFile, this.deviceMemoryFile, this.activityFile];
    
    for (const file of files) {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, '');
      }
    }
  }

  private async logToUsersFile(message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    await fs.appendFile(this.usersFile, logEntry);
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private generateDeviceId(req: Request): string {
    const userAgent = req.get('User-Agent') || '';
    const ip = this.getClientIP(req);
    const acceptLanguage = req.get('Accept-Language') || '';
    
    const deviceString = `${userAgent}|${ip}|${acceptLanguage}`;
    return crypto.createHash('md5').update(deviceString).digest('hex');
  }

  private getClientIP(req: Request): string {
    return (req.ip || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress || 
            '127.0.0.1').replace(/^::ffff:/, '');
  }

  private async logUserActivity(userId: string, action: string, details: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] USER_ACTIVITY: ${userId}|${action}|${details}\n`;
    await fs.appendFile(this.activityFile, logEntry);
  }

  async createUser(email: string, password: string, name: string, req: Request) {
    const userId = nanoid();
    const hashedPassword = this.hashPassword(password);
    const deviceId = this.generateDeviceId(req);
    const ipAddress = this.getClientIP(req);

    // Save to database
    const userData = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      ipAddress,
      deviceId,
      loginCount: 0,
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    await db.insert(users).values(userData);

    // Log to users.txt
    await this.logToUsersFile(`USER_REGISTRATION: ${userId}|${email}|${name}|${ipAddress}|${deviceId}`);
    await this.logUserActivity(userId, 'REGISTRATION', `ip:${ipAddress}|device:${deviceId}`);

    return userData;
  }

  async getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user[0] || null;
  }

  async getUserById(id: string) {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user[0] || null;
  }

  async updateUserLogin(userId: string, ipAddress: string, deviceId: string) {
    await db.update(users)
      .set({ 
        lastLoginAt: new Date(),
        loginCount: (await this.getUserById(userId))?.loginCount || 0 + 1,
        ipAddress,
        deviceId
      })
      .where(eq(users.id, userId));
  }

  verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  setupSession(app: Express) {
    app.use(session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreClass({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
    }));
  }

  requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if ((req.session as any)?.userId) {
      next();
    } else {
      res.status(401).json({ error: 'Authentication required' });
    }
  };

  setupAuthRoutes(app: Express) {
    app.post('/api/viraaj/register', async (req: Request, res: Response) => {
      try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
          return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check if user already exists
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
        }

        const user = await this.createUser(email, password, name, req);
        
        // Create session
        (req.session as any).userId = user.id;
        (req.session as any).user = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        res.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });

      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
      }
    });

    app.post('/api/viraaj/login', async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await this.getUserByEmail(email);
        if (!user || !this.verifyPassword(password, user.password)) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const deviceId = this.generateDeviceId(req);
        const ipAddress = this.getClientIP(req);

        // Update login info
        await this.updateUserLogin(user.id, ipAddress, deviceId);

        // Create session
        (req.session as any).userId = user.id;
        (req.session as any).user = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Log activity
        await this.logUserActivity(user.id, 'LOGIN_SUCCESS', `ip:${ipAddress}|device:${deviceId}`);

        res.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
      }
    });

    app.post('/api/viraaj/logout', (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err) {
          console.error('Logout error:', err);
          res.status(500).json({ error: 'Logout failed' });
        } else {
          res.json({ success: true });
        }
      });
    });

    app.get('/api/auth/me', async (req: Request, res: Response) => {
      try {
        const userId = (req.session as any)?.userId;
        if (!userId) {
          return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await this.getUserById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });

      } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to get user' });
      }
    });
  }

  async initialize(app: Express) {
    console.log('🚀 VIRAAJ AUTH: Initializing authentication system...');
    
    this.setupSession(app);
    this.setupAuthRoutes(app);
    
    await this.logToUsersFile('SYSTEM_READY: VIRAAJ AUTH FULLY OPERATIONAL');
    
    console.log('✅ VIRAAJ AUTH: Authentication system ready');
  }
}

export const viraajAuth = new ViraajAuth();
export const requireViraajAuth = viraajAuth.requireAuth;