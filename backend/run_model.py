import os
import roboflow

def getModelResult(img_data):
    rf = roboflow.Roboflow(api_key=os.environ["ROBOFLOW_AUTH_KEY"])
    # List all projects for your workspace
    workspace = rf.workspace()
    # List all versions of a specific project
    project.versions()
    # Decode file
    with open("UPLOAD_IMAGE.jpg", "wb") as fh:
        fh.write(img_data.decode('base64'))
    # Upload image to dataset
    project.upload("UPLOAD_IMAGE.jpg")
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

    return