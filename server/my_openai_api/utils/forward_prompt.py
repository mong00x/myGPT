import json
import requests
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../../../.env.local')

def send_prompt_to_openai(prompt):
  """Sends a prompt to the OpenAI API."""
  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY"),
  }

  data = {
    "prompt": prompt,
    "temperature": 0.5,
  }

  response = requests.post("https://api.openai.com/v1/engines/davinci/completions", headers=headers, data=json.dumps(data))

  if response.status_code == 200:
    return response.json()["choices"][0]["text"]
  else:
    # print detailed error message
    print(response.content)
    return "Error: " + response.json()["error"]["message"]



if __name__ == "__main__":
  prompt = input("Enter a prompt: ")
  response = send_prompt_to_openai(prompt)
  print(response)