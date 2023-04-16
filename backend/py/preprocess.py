import numpy as np
import cv2

ALPHA = 1
BETA = 0    

# corner_points = [[top_left_X, top_left_Y], [top_right_X, top_right_Y], [bottom_right_X, bottom_right_Y], [bottom_left_X, bottom_left_Y]]
def performTransform(filename, corner_points, img_height, img_width):
    img = cv2.imread(filename)
    
    # corner_points_list = corner_points
    orig_points_list = [corner_points[0:2],corner_points[2:4],corner_points[4:6], corner_points[6:8]]
    print("unflattendd", orig_points_list)

    # convert colors and contrast
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    clahe = cv2.createCLAHE(clipLimit=4.0, tileGridSize=(8,8))
    img = clahe.apply(img)

    # transform
    orig_points = np.array(orig_points_list, dtype=np.float32)
    trans_points = np.float32([[0,0],[img_width,0],[img_width,img_height],[0,img_height]])
    M = cv2.getPerspectiveTransform(orig_points, trans_points)
    dst = cv2.warpPerspective(img, M, (img_width, img_height))


    # save
    _filename = "TEST.png"
    cv2.imwrite(filename=_filename,img=dst)

#performTransform("test_images/test0.png", [[190,50],[975,39],[1118,825],[30,800]],500,500)