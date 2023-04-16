import os
import roboflow
import base64
from make_game import make_game

def convertToFen(predictions):
    return

def getModelResult(img_data):
    rf = roboflow.Roboflow(api_key=os.environ["ROBOFLOW_AUTH_KEY"])
    # List all projects for your workspace
    workspace = rf.workspace()
    # List all versions of a specific project
    #project.versions()
    # Decode file

    with open("UPLOAD_IMAGE.jpeg", "wb") as fh:
        img_data_bytes = img_data.encode("utf-8")
        fh.write(base64.decodebytes(img_data_bytes))


    fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    res = make_game(fenString)
    return res
    '''
    # Upload image to dataset
    project.upload("UPLOAD_IMAGE.jepg")
    # Retrieve the model of a specific project
    model = project.version("1").model
    # predict on a local image
    prediction = model.predict("YOUR_IMAGE.jpg")
    # Retrieve the model of a specific project
    model = project.version("1").model
    # predict on a local image
    prediction = model.predict("YOUR_IMAGE.jpg")
    # Access JSON records for predictions
    # convert this to fem
    prediction.json()['predictions']

    return convertToFen(prediction.json()['predictions'])'''