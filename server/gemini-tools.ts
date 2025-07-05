// Gemini File Tool Definitions - Battle-tested pattern for AI-powered IDE
export const geminiFileTools = [
  {
    name: "create_file",
    description: "Create a new text file (overwrites if exists)",
    parameters: {
      type: "object",
      properties: {
        path: { 
          type: "string", 
          description: "Relative Unix path like 'src/App.tsx' or 'package.json'" 
        },
        content: { 
          type: "string", 
          description: "UTF-8 source code or file content" 
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "update_file",
    description: "Update an existing file with new content or apply a patch",
    parameters: {
      type: "object",
      properties: {
        path: { 
          type: "string",
          description: "Relative path to the file to update"
        },
        content: { 
          type: "string", 
          description: "Complete new file content (replaces entire file)" 
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "read_file",
    description: "Read file contents to provide context for further edits",
    parameters: {
      type: "object",
      properties: {
        path: { 
          type: "string",
          description: "Relative path to the file to read"
        },
        max_bytes: { 
          type: "integer", 
          default: 8000,
          description: "Maximum bytes to read from file"
        },
      },
      required: ["path"],
    },
  },
  {
    name: "list_directory",
    description: "List files and folders in a directory",
    parameters: {
      type: "object",
      properties: { 
        path: { 
          type: "string",
          description: "Directory path to list (use '.' for root)",
          default: "."
        }
      },
      required: ["path"],
    },
  },
  {
    name: "create_folder",
    description: "Create a new directory/folder",
    parameters: {
      type: "object",
      properties: {
        path: { 
          type: "string", 
          description: "Directory path to create like 'src/components'" 
        },
      },
      required: ["path"],
    },
  }
] as const;

export type GeminiFileToolName = typeof geminiFileTools[number]['name'];

export interface FileToolResult {
  status: 'success' | 'error';
  message: string;
  data?: any;
}