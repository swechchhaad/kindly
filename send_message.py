import requests
import os
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
THREAD_ID = os.getenv("THREAD_ID") 

headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json",
    "OpenAI-Beta": "assistants=v2"
}

message_payload = {
    "role": "user",
    "content": "Hey assistant! What's the weather like today?"
}

message_response = requests.post(
    f"https://api.openai.com/v1/threads/{THREAD_ID}/messages",
    headers=headers,
    json=message_payload
)

if message_response.status_code == 200:
    print("Message added to thread!")
else:
    print("Message failed")
    print(message_response.status_code)
    print(message_response.text)