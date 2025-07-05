import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiFileTools, GeminiFileToolName, FileToolResult } from "./gemini-tools";
import { FileService, createProjectFileService } from "./file-service";
import { nanoid } from "nanoid";

export interface ChatMessage {
  role: 'user' | 'assistant' | 'tool';
  content?: string;
  name?: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: GeminiFileToolName;
    arguments: string;
  };
}

export interface ChatRequest {
  message: string;
  projectId?: string;
  conversationHistory?: ChatMessage[];
  userId?: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  toolResults?: FileToolResult[];
  error?: string;
  projectId?: string;
}

export class GeminiChatService {
  private genAI: GoogleGenerativeAI | null = null;
  private isConfigured = false;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.isConfigured = true;
      console.log("✅ Gemini API configured successfully");
    } else {
      console.log("❌ GEMINI_API_KEY not found - Gemini features disabled");
    }
  }

  // Check if Gemini is properly configured
  isReady(): boolean {
    return this.isConfigured && this.genAI !== null;
  }

  // Generate chat response with file tool support
  async generateResponse(request: ChatRequest): Promise<ChatResponse> {
    if (!this.isReady()) {
      return {
        success: false,
        error: "Gemini API not configured. Please provide GEMINI_API_KEY."
      };
    }

    try {
      const projectId = request.projectId || nanoid();
      const fileService = createProjectFileService(projectId);

      // Get current project manifest for context
      const projectManifest = await fileService.getProjectManifest();

      // Build system prompt with file context
      const systemPrompt = this.buildSystemPrompt(projectManifest);

      // Initialize chat with tools
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-2.5-flash",
        tools: [{
          functionDeclarations: geminiFileTools
        }],
        systemInstruction: systemPrompt
      });

      // Build conversation history
      const chatHistory = this.buildChatHistory(request.conversationHistory || []);

      // Start chat session
      const chat = model.startChat({
        history: chatHistory
      });

      // Send user message
      const result = await chat.sendMessage(request.message);
      const response = result.response;

      // Check if Gemini wants to call tools
      const functionCalls = response.functionCalls();

      if (functionCalls && functionCalls.length > 0) {
        // Handle tool calls
        const toolResults: FileToolResult[] = [];

        for (const call of functionCalls) {
          console.log(`🔧 Gemini calling tool: ${call.name}`);

          const toolResult = await this.executeToolCall(
            call.name as GeminiFileToolName,
            call.args || {},
            fileService
          );

          toolResults.push(toolResult);

          // Send tool result back to Gemini
          await chat.sendMessage([{
            functionResponse: {
              name: call.name,
              response: {
                status: toolResult.status,
                message: toolResult.message,
                data: toolResult.data
              }
            }
          }]);
        }

        // Get Gemini's response after tool execution
        const finalResult = await chat.sendMessage("Continue with the conversation based on the tool results.");
        const finalResponse = finalResult.response;

        return {
          success: true,
          message: finalResponse.text(),
          toolResults,
          projectId
        };
      } else {
        // Regular chat response without tools
        return {
          success: true,
          message: response.text(),
          projectId
        };
      }

    } catch (error) {
      console.error("Gemini chat error:", error);
      return {
        success: false,
        error: `Gemini API error: ${error}`
      };
    }
  }

  // Execute a tool call from Gemini
  private async executeToolCall(
    toolName: GeminiFileToolName,
    args: any,
    fileService: FileService
  ): Promise<FileToolResult> {
    try {
      switch (toolName) {
        case 'create_file':
          return await fileService.createFile(args.path, args.content);

        case 'update_file':
          return await fileService.updateFile(args.path, args.content);

        case 'read_file':
          return await fileService.readFile(args.path, args.max_bytes);

        case 'list_directory':
          return await fileService.listDirectory(args.path);

        case 'create_folder':
          return await fileService.createFolder(args.path);

        default:
          return {
            status: 'error',
            message: `Unknown tool: ${toolName}`
          };
      }
    } catch (error) {
      return {
        status: 'error',
        message: `Tool execution failed: ${error}`
      };
    }
  }

  // Build system prompt with project context
  private buildSystemPrompt(projectManifest: Record<string, any>): string {
    const fileList = Object.keys(projectManifest);
    const hasFiles = fileList.length > 0;

    return `You are an expert AI coding assistant that creates and edits files to build complete applications.

CRITICAL INSTRUCTIONS:
1. When the user asks you to create or build something, USE THE FILE TOOLS to actually create the files
2. Do NOT just show code blocks - call create_file() to actually make the files
3. Always provide progress updates like "Creating src/App.tsx..." when using tools
4. If you need to see existing code, use read_file() first
5. Create complete, working applications with proper file structure
6. Use modern best practices and clean, well-commented code

CURRENT PROJECT STATUS:
${hasFiles ? `
Existing files in project:
${fileList.map(f => `- ${f}`).join('\n')}

This project already has files. Use read_file() to examine existing code before making changes.
Use update_file() to modify existing files or create_file() for new files.
` : `
This is a new project with no files yet. Start by creating the necessary files and folder structure.
`}

WORKFLOW:
1. Understand what the user wants to build
2. Plan the file structure needed
3. Use create_folder() to make directories if needed
4. Use create_file() to create all necessary files
5. Provide helpful progress updates during file creation
6. Offer to make additional improvements or answer questions

Remember: Your job is to write actual files, not just discuss code. Use the tools!`;
  }

  // Convert chat history to Gemini format
  private buildChatHistory(history: ChatMessage[]): any[] {
    const geminiHistory: any[] = [];

    for (const msg of history) {
      if (msg.role === 'user') {
        geminiHistory.push({
          role: 'user',
          parts: [{ text: msg.content || '' }]
        });
      } else if (msg.role === 'assistant' && msg.content) {
        geminiHistory.push({
          role: 'model',
          parts: [{ text: msg.content }]
        });
      }
      // Skip tool messages for now - Gemini handles those internally
    }

    return geminiHistory;
  }

  // Stream response with tool execution (for real-time updates)
  async streamResponse(
    request: ChatRequest,
    onProgress: (update: string) => void
  ): Promise<ChatResponse> {
    if (!this.isReady()) {
      return {
        success: false,
        error: "Gemini API not configured. Please provide GEMINI_API_KEY."
      };
    }

    try {
      const projectId = request.projectId || nanoid();
      const fileService = createProjectFileService(projectId);

      onProgress("🤖 Initializing Gemini AI...");

      // Get current project manifest for context
      const projectManifest = await fileService.getProjectManifest();

      // Build system prompt with file context
      const systemPrompt = this.buildSystemPrompt(projectManifest);

      onProgress("📋 Analyzing project context...");

      // Initialize chat with tools
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-2.5-flash",
        tools: [{
          functionDeclarations: geminiFileTools
        }],
        systemInstruction: systemPrompt
      });

      // Build conversation history
      const chatHistory = this.buildChatHistory(request.conversationHistory || []);

      // Start chat session
      const chat = model.startChat({
        history: chatHistory
      });

      onProgress("💭 Gemini is thinking...");

      // Send user message
      const result = await chat.sendMessage(request.message);
      const response = result.response;

      // Check if Gemini wants to call tools
      const functionCalls = response.functionCalls();

      if (functionCalls && functionCalls.length > 0) {
        // Handle tool calls with progress updates
        const toolResults: FileToolResult[] = [];

        for (const call of functionCalls) {
          const toolName = call.name as GeminiFileToolName;
          const args = call.args || {};

          // Provide specific progress update based on tool
          if (toolName === 'create_file') {
            onProgress(`📄 Creating ${args.path}...`);
          } else if (toolName === 'update_file') {
            onProgress(`📝 Updating ${args.path}...`);
          } else if (toolName === 'create_folder') {
            onProgress(`📁 Creating folder ${args.path}...`);
          } else if (toolName === 'read_file') {
            onProgress(`👀 Reading ${args.path}...`);
          } else if (toolName === 'list_directory') {
            onProgress(`📋 Listing directory ${args.path || '.'}...`);
          }

          const toolResult = await this.executeToolCall(toolName, args, fileService);
          toolResults.push(toolResult);

          // Provide result feedback
          if (toolResult.status === 'success') {
            onProgress(`✅ ${toolResult.message}`);
          } else {
            onProgress(`❌ ${toolResult.message}`);
          }

          // Send tool result back to Gemini
          await chat.sendMessage([{
            functionResponse: {
              name: call.name,
              response: {
                status: toolResult.status,
                message: toolResult.message,
                data: toolResult.data
              }
            }
          }]);
        }

        onProgress("🎯 Finalizing response...");

        // Get Gemini's response after tool execution
        const finalResult = await chat.sendMessage("Provide a helpful summary of what was accomplished.");
        const finalResponse = finalResult.response;

        return {
          success: true,
          message: finalResponse.text(),
          toolResults,
          projectId
        };
      } else {
        // Regular chat response without tools
        return {
          success: true,
          message: response.text(),
          projectId
        };
      }

    } catch (error) {
      console.error("Gemini streaming error:", error);
      onProgress(`❌ Error: ${error}`);
      return {
        success: false,
        error: `Gemini API error: ${error}`
      };
    }
  }
}

// Create singleton instance
export const geminiChat = new GeminiChatService();