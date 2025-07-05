import { GoogleGenerativeAI } from "@google/generative-ai";

interface GenerationRequest {
  prompt: string;
  projectType?: string;
  conversationHistory?: any[];
  userId?: string;
}

interface GenerationResult {
  success: boolean;
  message?: string;
  files?: Record<string, any>;
  error?: string;
  previewUrl?: string;
}

class EnhancedAIService {
  private gemini: GoogleGenerativeAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.gemini = new GoogleGenerativeAI(apiKey);
      console.log('✅ Gemini AI initialized');
    } else {
      console.log('❌ No Gemini API key found');
    }
  }

  async generateProject(request: GenerationRequest): Promise<GenerationResult> {
    try {
      const { prompt } = request;

      if (!this.gemini) {
        return {
          success: false,
          error: 'Gemini API not configured. GEMINI_API_KEY environment variable is required.'
        };
      }

      return await this.generateWithGemini(prompt);
    } catch (error) {
      console.error('AI Generation error:', error);
      return {
        success: false,
        error: `API Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      };
    }
  }

  private async generateWithGemini(prompt: string): Promise<GenerationResult> {
    try {
      const model = this.gemini!.getGenerativeModel({ model: "gemini-2.5-flash" });

      const enhancedPrompt = `
You are a helpful coding assistant. The user asked: "${prompt}"

Please provide a helpful response about building this application. If they want code, describe what you would create and the key features.

Keep your response conversational and helpful.
`;

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        message: text,
        files: {},
        previewUrl: null
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        success: false,
        error: `Gemini API Error: ${error instanceof Error ? error.message : 'Unknown Gemini API error'}`
      };
    }
  }
}

export class EnhancedAI {
  static async generateProject(request: GenerationRequest): Promise<GenerationResult> {
    const service = new EnhancedAIService();
    return service.generateProject(request);
  }
}

export const enhancedAI = new EnhancedAIService();

export async function main() {
  console.log('Enhanced AI API service initialized');
  return enhancedAI;
}