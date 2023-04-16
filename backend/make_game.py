import requests
import json

LICHESS_URL = "https://lichess.org"

def make_game(fenString):
    reqBody = {"fen": fenString}
    res = requests.post(f"{LICHESS_URL}/api/challenge/open", reqBody)
    response = json.loads(res.text)
    print(response)
    res = []
    res.append(response["urlWhite"])
    res.append(response["urlBlack"])
    print(res)
    return res


#if __name__ == "__main__":
    #make_game("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")