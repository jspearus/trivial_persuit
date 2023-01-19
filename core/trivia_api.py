import datetime
import json
import os
import time
import requests


def get_trivia(level, catagory, amount):
    response = requests.get(
        f"https://the-trivia-api.com/api/questions?categories={catagory}&limit={amount}&difficulty={level}")
    json_data = json.loads(response.text)
    return json_data
