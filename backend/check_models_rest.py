import os
from dotenv import load_dotenv
import requests

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    response = requests.get(url)
    models = response.json()
    print("Available Models:")
    for m in models.get('models', []):
        print(f"- {m['name']}")
except Exception as e:
    print(f"Error: {e}")
