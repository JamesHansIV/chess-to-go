from flask import Flask, request, Response
from sendGameReq import sendGameReq
from run_model import getModelResult
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

@app.route("/makeGame", methods=["POST"])
def makeGame():
    if request.method == "POST":
        print(request.form["corners"])
        res = getModelResult(request.form["imgData"], request.form["corners"])
        if request.form["checked"] == "first":
            user1 = res[0]
            user2 = res[1]
        else:
            user1 = res[1]
            user2 = res[0]

        return Response(f"{{\"user1\": \"{user1}\", \"user2\": \"{user2}\"}}", status=200, mimetype="application/json")

@app.route("/sendGame", methods=["POST"])
def sendGame():
    if request.method == "POST":
        sendGameReq(request.form["number"], request.form["url"])
        return Response("{'this': 'works'}", status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run(port = 5000, host = os.environ["BACKEND_IP"])