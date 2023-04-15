import requests
import json

LICHESS_URL = "https://lichess.org"

def make_game(fenString):
    reqBody = {"fen": fenString}
    res = requests.post(f"{LICHESS_URL}/api/challenge/open", reqBody)
    response = json.loads(res.text)
    print(response["challenge"]["url"])
    return response["challenge"]["url"]