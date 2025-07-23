import requests
import json
import os
import sys

API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "moonshotai/kimi-k2:free"


def ask_ai_for_structure(project_description):
    prompt = f"""
You are an AI app builder. Given a project description, output a JSON object with:
- 'structure': a tree of folders and files
- 'files': a mapping of file paths to their contents

Project: {project_description}
"""
    try:
        response = requests.post(
            url=API_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
            })
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error communicating with AI API: {e}")
        sys.exit(1)

def parse_ai_response(ai_response):
    try:
        content = ai_response['choices'][0]['message']['content']
        # Try to extract JSON from the response
        start = content.find('{')
        end = content.rfind('}') + 1
        json_str = content[start:end]
        result = json.loads(json_str)
        structure = result.get('structure')
        files = result.get('files')
        if not structure or not files:
            raise ValueError('Missing structure or files in AI response.')
        return structure, files
    except Exception as e:
        print(f"Error parsing AI response: {e}")
        print("Raw AI response:", ai_response)
        sys.exit(1)

def create_files_and_folders(files, base_path="."):
    for path, content in files.items():
        full_path = os.path.join(base_path, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write(content)
        print(f"Created: {full_path}")

def main():
    print("=== AI App Builder ===")
    project_description = input("Describe your app/project: ")
    print("\nAsking AI to generate your project structure...")
    ai_response = ask_ai_for_structure(project_description)
    structure, files = parse_ai_response(ai_response)
    print("\nCreating files and folders...")
    create_files_and_folders(files)
    print("\nAll done! Your project is ready.")

if __name__ == "__main__":
    main()