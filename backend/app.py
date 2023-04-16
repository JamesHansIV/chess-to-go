from flask import Flask, request
from sendGameReq import sendGameReq
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

@app.route("/sendImage")
def coordinates():
    if request.method == "POST":
        return

@app.route("/sendGame", methods=["POST", "GET"])
def sendGame():
    if request.method == "POST":
        sendGameReq(request.form["number"], request.form["url"])

if __name__ == "__main__":
    app.run(port = 5000, host = '10.104.241.69')