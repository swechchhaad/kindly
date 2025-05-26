import requests
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
THREAD_ID = os.getenv("THREAD_ID")

app = Flask(__name__)

headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json",
    "OpenAI-Beta": "assistants=v2"
}

def build_prompt(name, mood, tone):
    return f"""You are writing to {name}, who is feeling {mood} today and prefers messages in a {tone} tone.

Write a short, heartfelt message (2–3 sentences) that feels personal, warm, and supportive. Use their mood and preferred tone to guide the message. Speak directly to them, using their name in a gentle, natural way. Do not start with "Hey" or use greetings. Simply begin as if you already know them and are speaking from care.

Avoid:
- Psychological or therapeutic language (do not diagnose, interpret, or use clinical terms)
- Formal intros, summaries, or AI-sounding phrases
- Words like “therapy,” “healing,” “mental health,” or “safe space”
- Clichés such as “you’ll be okay,” “I’m here with you,” or overly polished affirmations
- Em dashes

Use short, comma-based sentence flow or natural pauses. The message should feel like something a thoughtful friend, sibling, or mentor would say. It should make the person feel seen, not analyzed.

Only return the message. Do not explain anything.
"""

@app.route("/send-message", methods=["POST"])
def send_message():
    data = request.get_json()
    name = data.get("name")
    mood = data.get("mood")
    tone = data.get("tone")

    if not all([name, mood, tone]):
        return jsonify({"error": "Missing name, mood, or tone"}), 400

    message_content = build_prompt(name, mood, tone)

    message_payload = {
        "role": "user",
        "content": message_content
    }

    response = requests.post(
        f"https://api.openai.com/v1/threads/{THREAD_ID}/messages",
        headers=headers,
        json=message_payload
    )

    if response.status_code == 200:
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({
            "status": "error",
            "details": response.text
        }), 500

if __name__ == "__main__":
    app.run(debug=True)