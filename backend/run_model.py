import os
import roboflow

rf = roboflow.Roboflow(api_key=os.environ[""])

# List all projects for your workspace
workspace = rf.workspace()

# List all versions of a specific project
project.versions()

# Upload image to dataset
project.upload("UPLOAD_IMAGE.jpg")

# Retrieve the model of a specific project
model = project.version("1").model

# predict on a local image
prediction = model.predict("YOUR_IMAGE.jpg")