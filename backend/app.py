from flask import Flask, request, Response
from sendGameReq import sendGameReq
from run_model import getModelResult
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

@app.route("/getModel", methods=["POST"])
def coordinates():
    if request.method == "POST":
        femString = getModelResult(request.form["imgData"])
        return Response(f"{{'femString': {femString}}}", status=200, mimetype="application/json")

@app.route("/makeGame", methods=["POST"])
def makeGame():
    if request.method == "POST":
        url = make_game(request.form["fenString"])
        if url:
            return Response(f"{{'url': {url}}}", status=200, mimetype="application/json")

@app.route("/sendGame", methods=["POST"])
def sendGame():
    if request.method == "POST":
        sendGameReq(request.form["number"], request.form["url"])
        return Response("{'this': 'works'}", status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run()