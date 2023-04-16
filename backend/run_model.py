import os
import roboflow
import base64
from make_game import make_game
from py.gridMath import calcGridDimensions, calcPiecePosition
from py.preprocess import performTransform

def getModelResult(img_data):
    rf = roboflow.Roboflow(api_key=os.environ["ROBOFLOW_AUTH_KEY"])
    # List all projects for your workspace
    workspace = rf.workspace()
    # List all versions of a specific project
    #project.versions()
    # Decode file
    with open("UPLOAD_IMAGE.jpg", "wb") as fh:
        img_data_bytes = img_data.encode("utf-8")
        fh.write(base64.decodebytes(img_data_bytes))

    performTransform("UPLOAD_IMAGE.jpg", [[190,50],[975,39],[1118,825],[30,800]],200,200)
    # Upload image to dataset
    project = rf.project(os.environ["ROBOFLOW_PROJECT_ID"])
    project.upload("UPLOAD_IMAGE.jpg")
    # Retrieve the model of a specific project
    model = project.version(os.environ["ROBOFLOW_PROJECT_VERSION"]).model
    # predict on a local image
    prediction = model.predict("UPLOAD_IMAGE.jpg")
    # Access JSON records for predictions
    # convert this to fem
    predictions = prediction.json()['predictions']

    top_line, left_line, avg_horz_gap, avg_vert_gap = calcGridDimensions("UPLOAD_IMAGE.jpg")

    board = [[0 for i in range(8)] for i in range(8)]
    print(board)
    for prediction in predictions:
        row, col = calcPiecePosition(prediction, top_line, left_line, avg_horz_gap, avg_vert_gap)
        board[row][col] = 1

    print(board)
    fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    res = make_game(fenString)
    return res