import requests
import os
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json",
    "OpenAI-Beta": "assistants=v2"
}

response = requests.post(
    "https://api.openai.com/v1/threads",
    headers=headers
)

if response.status_code == 200:
    thread = response.json()
    print("Thread created successfully!")
    print("Thread ID:", thread["id"])
else:
    print("Failed to create thread")
    print("Status code:", response.status_code)
    print("Response:", response.text)