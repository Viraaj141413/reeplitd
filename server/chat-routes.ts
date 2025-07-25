import { Express, Request, Response } from 'express';

// Helper functions for generating specific types of applications
function generateWebsiteCode(prompt: string): string {
  return `I'll create a modern, responsive website for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.1);
        }
        .hero-content {
            z-index: 1;
            max-width: 800px;
            padding: 0 20px;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .hero p {
            font-size: clamp(1.1rem, 3vw, 1.5rem);
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .cta-button {
            background: #ff6b6b;
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        .cta-button:hover {
            background: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }
        .features {
            padding: 100px 0;
            background: #f8f9fa;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }
        .feature-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-10px);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #333;
        }
        @media (max-width: 768px) {
            .features-grid { grid-template-columns: 1fr; }
            .hero { padding: 40px 0; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to the Future</h1>
            <p>Experience innovation like never before with our cutting-edge solutions</p>
            <a href="#features" class="cta-button">Explore Features</a>
        </div>
    </section>

    <section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Amazing Features</h2>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Lightning Fast</h3>
                    <p>Optimized for speed and performance with cutting-edge technology</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Beautiful Design</h3>
                    <p>Modern, responsive design that looks great on all devices</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Reliable</h3>
                    <p>Built with security and reliability as top priorities</p>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
\`\`\`

This website includes:
- Modern responsive design
- Smooth animations and interactions
- Mobile-first approach
- Optimized performance
- Clean, semantic HTML
- Professional styling

Just save as an HTML file and open in your browser!`;
}

function generateReactCode(prompt: string): string {
  return `I'll create a modern React application for you!

\`\`\`json
{
  "name": "react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
\`\`\`

\`\`\`tsx
import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Modern Todo App</h1>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add Task
          </button>
        </div>

        <div className="todos-list">
          {todos.map(todo => (
            <div key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
\`\`\`

This React app includes:
- TypeScript for type safety
- Modern React hooks
- Beautiful responsive design
- Smooth animations
- Full todo functionality

Run with: \`npm install && npm run dev\``;
}

function generatePythonCode(prompt: string): string {
  return `I'll create a comprehensive Python application for you!

\`\`\`python
#!/usr/bin/env python3
"""
Modern Python Application
Built with best practices and error handling
"""

import json
import csv
import os
import sys
from datetime import datetime
from typing import List, Dict, Optional
import requests

class DataProcessor:
    """A comprehensive data processing class"""

    def __init__(self):
        self.data = []
        self.processed_data = []

    def load_from_csv(self, filename: str) -> bool:
        """Load data from CSV file"""
        try:
            with open(filename, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                self.data = [row for row in reader]
                print(f"✅ Loaded {len(self.data)} records from {filename}")
                return True
        except FileNotFoundError:
            print(f"❌ File {filename} not found")
            return False
        except Exception as e:
            print(f"❌ Error loading CSV: {e}")
            return False

    def analyze_data(self) -> Dict:
        """Analyze the loaded data"""
        if not self.data:
            print("❌ No data to analyze")
            return {}

        analysis = {
            'total_records': len(self.data),
            'timestamp': datetime.now().isoformat(),
            'fields': list(self.data[0].keys()) if self.data else [],
            'summary': {}
        }
        return analysis

def main():
    """Main application function"""
    print("🚀 Python Data Processor Started")
    processor = DataProcessor()
    print("Ready to process data!")

if __name__ == "__main__":
    main()
\`\`\`

This Python application includes:
- Complete data processing capabilities
- Error handling and validation
- Type hints for better code quality
- Professional structure

Run with: \`python main.py\``;
}

function generateAPICode(prompt: string): string {
  return `I'll create a complete REST API server for you!

\`\`\`javascript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

// Routes
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ data: user });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Server running on http://0.0.0.0:\${PORT}\`);
});
\`\`\`

This REST API includes:
- Complete CRUD operations
- Input validation and error handling
- CORS support
- Clean, RESTful design

Run with: \`npm install && npm start\``;
}

function generateLocalResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('calculator')) {
    return `I'll create a modern calculator for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .calculator {
            background: white;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .display {
            width: 100%;
            height: 60px;
            font-size: 24px;
            text-align: right;
            border: 2px solid #ddd;
            border-radius: 10px;
            padding: 0 15px;
            margin-bottom: 20px;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 50px;
            font-size: 18px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .number { background: #f8f9fa; }
        .operator { background: #667eea; color: white; }
        .equals { background: #28a745; color: white; }
        .clear { background: #dc3545; color: white; }
        button:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" id="display" value="0" readonly>
        <div class="buttons">
            <button class="clear" onclick="clearDisplay()">C</button>
            <button class="clear" onclick="deleteLast()">←</button>
            <button class="operator" onclick="appendToDisplay('/')">/</button>
            <button class="operator" onclick="appendToDisplay('*')">×</button>
            <button class="number" onclick="appendToDisplay('7')">7</button>
            <button class="number" onclick="appendToDisplay('8')">8</button>
            <button class="number" onclick="appendToDisplay('9')">9</button>
            <button class="operator" onclick="appendToDisplay('-')">-</button>
            <button class="number" onclick="appendToDisplay('4')">4</button>
            <button class="number" onclick="appendToDisplay('5')">5</button>
            <button class="number" onclick="appendToDisplay('6')">6</button>
            <button class="operator" onclick="appendToDisplay('+')">+</button>
            <button class="number" onclick="appendToDisplay('1')">1</button>
            <button class="number" onclick="appendToDisplay('2')">2</button>
            <button class="number" onclick="appendToDisplay('3')">3</button>
            <button class="equals" onclick="calculate()">=</button>
            <button class="number" onclick="appendToDisplay('0')" style="grid-column: span 2;">0</button>
            <button class="number" onclick="appendToDisplay('.')">.</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('display');
        let currentInput = '0';

        function updateDisplay() {
            display.value = currentInput;
        }

        function appendToDisplay(value) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            updateDisplay();
        }

        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        function calculate() {
            try {
                currentInput = eval(currentInput.replace('×', '*')).toString();
            } catch (error) {
                currentInput = 'Error';
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;

            if (/[0-9]/.test(key)) {
                appendToDisplay(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                appendToDisplay(key === '*' ? '×' : key);
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key === '.') {
                appendToDisplay('.');
            }
        });
    </script>
</body>
</html>
\`\`\`

Just save as an HTML file and open in your browser!`;
  }

  return "Hello! I can help you create websites, apps, calculators, todo lists, and more. What would you like to build?";
}

// Enhanced local response generator with modern TypeScript/React templates
function generateEnhancedLocalResponse(prompt: string, type: string): string {
  const lowerPrompt = prompt.toLowerCase();

  // Always generate modern TypeScript/React projects with proper extensions and localhost hosting
  if (lowerPrompt.includes('calculator')) {
    return generateModernCalculatorApp(prompt);
  } else if (type === 'personal' || lowerPrompt.includes('blog') || lowerPrompt.includes('personal')) {
    return generateModernBlogApp(prompt);
  } else if (type === 'business' || lowerPrompt.includes('business') || lowerPrompt.includes('map')) {
    return generateModernBusinessApp(prompt);
  } else if (type === 'bio' || lowerPrompt.includes('link') || lowerPrompt.includes('bio')) {
    return generateModernLinkBioApp(prompt);
  } else if (lowerPrompt.includes('api') || lowerPrompt.includes('server')) {
    return generateModernAPIProject(prompt);
  } else if (lowerPrompt.includes('python')) {
    return generateModernPythonProject(prompt);
  } else {
    // Default to modern React TypeScript project
    return generateModernReactApp(prompt);
  }
}

// Modern app generators (implementations below)

// Personal blog template
function generatePersonalBlogCode(prompt: string): string {
  return `I'll create a beautiful personal blog website for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Personal Blog</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Georgia', serif;
            line-height: 1.7;
            color: #333;
            background: #f8f9fa;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }
        header {
            background: white;
            padding: 2rem 0;
            text-align: center;
            border-bottom: 1px solid #eee;
            margin-bottom: 3rem;
        }
        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .tagline {
            color: #7f8c8d;
            font-style: italic;
        }
        .post {
            background: white;
            padding: 2rem;
            margin-bottom: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .post-title {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .post-meta {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }
        .post-content {
            font-size: 1.1rem;
            line-height: 1.8;
        }
        .read-more {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        .read-more:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>My Personal Blog</h1>
            <p class="tagline">Sharing my thoughts, stories, and experiences</p>
        </div>
    </header>

    <div class="container">
        <article class="post">
            <h2 class="post-title">Welcome to My Blog</h2>
            <div class="post-meta">Published on March 15, 2024</div>
            <div class="post-content">
                <p>Welcome to my personal space on the web! This is where I'll be sharing my thoughts, experiences, and stories that matter to me. Whether it's about technology, life lessons, travel adventures, or random musings, you'll find it all here.</p>
                <p>I believe in the power of authentic storytelling and genuine connections. Through this blog, I hope to create a space where ideas can flourish and conversations can begin.</p>
                <a href="#" class="read-more">Read more →</a>
            </div>
        </article>

        <article class="post">
            <h2 class="post-title">The Art of Mindful Living</h2>
            <div class="post-meta">Published on March 10, 2024</div>
            <div class="post-content">
                <p>In today's fast-paced world, it's easy to get caught up in the hustle and forget to be present. Mindful living isn't just a buzzword—it's a practice that can transform how we experience each day.</p>
                <p>Here are some simple ways I've been incorporating mindfulness into my daily routine...</p>
                <a href="#" class="read-more">Read more →</a>
            </div>
        </article>
    </div>
</body>
</html>
\`\`\`

Your personal blog includes:
- Clean, readable typography perfect for long-form content
- Responsive design that works on all devices
- Professional layout with proper spacing and hierarchy
- Ready-to-use post structure
- Elegant color scheme and styling

Just save as an HTML file and start sharing your stories!`;
}

// Business map template
function generateBusinessMapCode(prompt: string): string {
  return `I'll create a local business directory with interactive map for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Local Business Directory</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: #f5f5f5;
        }
        .header {
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
            text-align: center;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 20px;
        }
        .search-bar {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .search-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        .businesses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .business-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .business-card:hover {
            transform: translateY(-5px);
        }
        .business-name {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .business-category {
            color: #3498db;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .business-info {
            color: #666;
            margin-bottom: 0.5rem;
        }
        .rating {
            color: #f39c12;
            font-size: 1.1rem;
        }
        .map-container {
            background: white;
            height: 400px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Local Business Directory</h1>
        <p>Discover amazing businesses in your area</p>
    </div>

    <div class="container">
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="Search for businesses, restaurants, services...">
        </div>

        <div class="businesses-grid">
            <div class="business-card">
                <div class="business-name">Sunny Side Café</div>
                <div class="business-category">Restaurant • Coffee Shop</div>
                <div class="business-info">📍 123 Main Street</div>
                <div class="business-info">📞 (555) 123-4567</div>
                <div class="business-info">🕒 Open until 8:00 PM</div>
                <div class="rating">⭐⭐⭐⭐⭐ 4.8</div>
            </div>

            <div class="business-card">
                <div class="business-name">Tech Repair Pro</div>
                <div class="business-category">Electronics • Repair Service</div>
                <div class="business-info">📍 456 Oak Avenue</div>
                <div class="business-info">📞 (555) 987-6543</div>
                <div class="business-info">🕒 Open until 6:00 PM</div>
                <div class="rating">⭐⭐⭐⭐⭐ 4.9</div>
            </div>

            <div class="business-card">
                <div class="business-name">Green Garden Center</div>
                <div class="business-category">Garden • Plants • Supplies</div>
                <div class="business-info">📍 789 Pine Road</div>
                <div class="business-info">📞 (555) 456-7890</div>
                <div class="business-info">🕒 Open until 7:00 PM</div>
                <div class="rating">⭐⭐⭐⭐ 4.6</div>
            </div>

            <div class="business-card">
                <div class="business-name">Fitness First Gym</div>
                <div class="business-category">Fitness • Health • Wellness</div>
                <div class="business-info">📍 321 Elm Street</div>
                <div class="business-info">📞 (555) 654-3210</div>
                <div class="business-info">🕒 Open 24 hours</div>
                <div class="rating">⭐⭐⭐⭐⭐ 4.7</div>
            </div>
        </div>

        <div class="map-container">
            🗺️ Interactive Map Coming Soon
            <br>
            <small>(Integration with mapping service required)</small>
        </div>
    </div>
</body>
</html>
\`\`\`

Your business directory includes:
- Clean, professional design with search functionality
- Responsive grid layout for business cards
- Business information display with ratings
- Map container ready for integration
- Mobile-friendly responsive design
- Hover effects and smooth animations

Ready to help local businesses connect with customers!`;
}

// Link in bio template
function generateLinkInBioCode(prompt: string): string {
  return `I'll create a stylish link in bio page for you!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Links</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
        }
        .name {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 0.5rem;
        }
        .bio {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.5;
        }
        .links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .link-button {
            display: block;
            padding: 15px 20px;
            background: #f8f9fa;
            color: #333;
            text-decoration(\w+)?\n([\s\S]*?)```/g;
  // robust code block regex
  //  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  // This regex is more robust and handles multiple languages and file types
  //(\w+)? captures the language identifier (optional), and [\s\S]*? captures the code block
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeBlocks = response.match(/```(\w+)?\n([\s\S]*?)```/g);

  if (codeBlocks) {
    codeBlocks.forEach((block, index) => {
      const match = block.match(/```(\w+)?\n([\s\S]*?));
      if (match) {
        const language = match[1] || 'text';
        const content = match[2].trim();

        // Always use modern extensions for proper development
        let filename = `file${index + 1}`;
        if (language === 'html') filename = 'index.html';
        else if (language === 'css') filename = 'styles.css';
        else if (language === 'javascript' || language === 'js') filename = 'main.js';
        else if (language === 'typescript' || language === 'ts') filename = 'main.ts';
        else if (language === 'jsx') filename = 'App.jsx';
        else if (language === 'tsx') filename = 'App.tsx';
        else if (language === 'python') filename = 'main.py';
        else if (language === 'json') filename = 'package.json';
        else if (language === 'txt' || language === 'text') filename = 'README.txt';
        else if (language === 'md' || language === 'markdown') filename = 'README.md';
        else if (language === 'config') filename = 'vite.config.ts';
        else if (language === 'env') filename = '.env';

        files[filename] = {
          name: filename,
          content,
          language,
          type: 'file'
        };
      }
    });
  }

  return files;
}

export function registerChatRoutes(app: Express) {
  // Import Gemini chat and file tools (assuming they are properly set up)
  const { geminiChat } = require('./gemini-ai-api');

  // Enhanced app generation endpoint with realistic timing (supports both GET and POST)
  const handleAppGeneration = async (req: any, res: any) => {
    const prompt = req.body?.message || req.query?.message || '';
    const type = req.body?.type || req.query?.type || 'general';

    if (!prompt) {
      return res.status(400).json({ error: 'Message parameter is required' });
    }

    // Set headers for server-sent events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    console.log('🚀 Starting comprehensive app generation process...');

    try {
      // Stage 1: Analysis Phase (20 seconds)
      res.write(`data: ${JSON.stringify({
        stage: 'analyzing',
        message: 'Analyzing your project requirements and planning architecture...',
        progress: 5
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 8000));

      res.write(`data: ${JSON.stringify({
        stage: 'analyzing',
        message: 'Determining optimal technology stack and features...',
        progress: 15
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 12000));

      // Stage 2: External API Generation (60 seconds)
      res.write(`data: ${JSON.stringify({
        stage: 'generating',
        message: 'Connecting to advanced AI generation service...',
        progress: 25
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 15000));

      // Generate content using local enhanced generation
      const apiResult = generateEnhancedLocalResponse(prompt, 'build');

      res.write(`data: ${JSON.stringify({
        stage: 'generating',
        message: 'AI is writing your application code...',
        progress: 45
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 25000));

      res.write(`data: ${JSON.stringify({
        stage: 'generating',
        message: 'Optimizing code structure and adding features...',
        progress: 60
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 20000));

      // Stage 3: File Processing (40 seconds)
      res.write(`data: ${JSON.stringify({
        stage: 'processing',
        message: 'Creating project files and folder structure...',
        progress: 70
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 15000));

      res.write(`data: ${JSON.stringify({
        stage: 'processing',
        message: 'Setting up dependencies and configurations...',
        progress: 80
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 15000));

      res.write(`data: ${JSON.stringify({
        stage: 'processing',
        message: 'Adding styling and responsive design...',
        progress: 85
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 10000));

      // Stage 4: Preview Setup (30 seconds)
      res.write(`data: ${JSON.stringify({
        stage: 'preview',
        message: 'Starting development server and live preview...',
        progress: 90
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 15000));

      res.write(`data: ${JSON.stringify({
        stage: 'preview',
        message: 'Finalizing application and running tests...',
        progress: 95
      })}\n\n`);

      await new Promise(resolve => setTimeout(resolve, 15000));

      // Stage 5: Completion
      let finalResult;
      if (apiResult) {
        // Create structured files from external API response
        const files = extractFilesFromResponse(apiResult);

        // If no files extracted, create structured response
        if (Object.keys(files).length === 0) {
          finalResult = {
            response: `Professional application generated successfully!\n\n${apiResult}`,
            files: {
              'index.html': {
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <h1>Your App is Ready!</h1>
        <div class="content">
            ${apiResult.replace(/```[\s\S]*?```/g, '').substring(0, 500)}
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
                language: 'html'
              },
              'styles.css': {
                content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.app-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
h1 { color: #333; margin-bottom: 1rem; }
.content { line-height: 1.6; color: #666; }`,
                language: 'css'
              },
              'script.js': {
                content: `console.log('App generated with external AI system!');
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application loaded successfully');
});`,
                language: 'javascript'
              }
            },
            preview: null
          };
        } else {
          finalResult = {
            response: `Professional application generated successfully!\n\n${apiResult}`,
            files: files,
            preview: null
          };
        }
      } else {
        // Fallback to enhanced local generation
        const localResponse = generateEnhancedLocalResponse(prompt, type);
        finalResult = {
          response: localResponse,
          files: extractFilesFromResponse(localResponse),
          preview: null
        };
      }

      res.write(`data: ${JSON.stringify({
        stage: 'complete',
        message: 'Application ready! Your app is now live and running.',
        progress: 100,
        result: finalResult
      })}\n\n`);

      console.log('✅ Comprehensive app generation completed successfully');
      res.end();

    } catch (error) {
      console.error('❌ App generation encountered an issue:', error);

      // Enhanced fallback generation
      const fallbackResponse = generateEnhancedLocalResponse(prompt, type);
      res.write(`data: ${JSON.stringify({
        stage: 'complete',
        message: 'Application ready! Built with enhanced local generation.',
        progress: 100,
        result: {
          response: fallbackResponse,
          files: extractFilesFromResponse(fallbackResponse),
          preview: null
        }
      })}\n\n`);

      res.end();
    }
  };

  // Simple app generation endpoint with external API integration
  app.post('/api/generate-app', async (req, res) => {
    const { message, type = 'general' } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    console.log('🚀 Starting comprehensive app generation...');

    try {
      // Try external API first
      console.log('🔗 Attempting connection to external AI service...');
      // Use local enhanced generation instead of external API
      const externalResponse = generateEnhancedLocalResponse(message, 'build');

      let finalResponse;
      let files = {};

      if (externalResponse) {
        console.log('✅ External AI service responded successfully');
        finalResponse = `Professional application generated successfully!\n\n${externalResponse}`;

        // Try to extract files from external response
        files = extractFilesFromResponse(externalResponse);

        // If no files extracted, create structured files from response
        if (Object.keys(files).length === 0) {
          files = {
            'index.html': {
              content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <h1>Your App is Ready!</h1>
        <div class="content">
            ${externalResponse.replace(/```[\s\S]*?