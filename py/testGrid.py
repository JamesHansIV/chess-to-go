import numpy as np
import cv2 as cv

# tlp -> top left corner; trp -> top right corner
# blp -> bottom left corner; brp -> bottom right corner
# np -> numpy library; cv -> OpenCV library
# The plus/minus 5 are to exclude the direct borders
image = cv.imread("test.jpg")
img_gray = cv.cvtColor(image, cv.COLOR_RGB2GRAY)
ret, thresh = cv.threshold(img_gray, 140, 255, 0)
contours, hierarchy = cv.findContours(thresh, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
cv.drawContours(img_gray, contours, -1, (0,255,0), 3)

cv.imshow( "Contours", img_gray )
cv.waitKey(0)
x1,y1,w1,h1 = cv.boundingRect(contours[0])
tlp = (x1,y1)
trp = (x1,y1)
blp = (x1,y1)
brp = (x1,y1)

for c in contours:
    x,y,w,h = cv.boundingRect(c)
    if x + y < tlp[0] + tlp[1]:
        tlp = (x,y)
    elif x - y < trp[0] - trp[1]:
        trp = (x,y)
    elif x - y > blp[0] - blp[1]:
        blp = (x,y)
    elif x + y > brp[0] + brp[1]:
        brp = (x,y)

rect = np.array(((tlp[0]+5, tlp[1]+5), (trp[0]-5, trp[1]+5), (brp[0]-5, brp[1]-5), (blp[0]+5, blp[1]-5)), dtype="float32")
width = 200
height = 200
dst = np.array([[0,0], [width-1,0], [width-1,height-1], [0,height-1]],dtype="float32")
M = cv.getPerspectiveTransform(rect,dst)
warped_img = cv.warpPerspective(image, M, (width, height))

cv.imshow( "Warped", warped_img )
cv.waitKey(0)
cv.destroyAllWindows()
