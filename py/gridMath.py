import numpy as np
import math
import cv2 as cv

# tlp -> top left corner; trp -> top right corner
# blp -> bottom left corner; brp -> bottom right corner
# np -> numpy library; cv -> OpenCV library
# The plus/minus 5 are to exclude the direct borders
# image = cv.imread("IMG_4990.JPG")



def test():
    print("testing")

def calcGridDimensions(filename):
    # image = cv.imread("img_0.png")
    image = cv.imread(filename)

    HEIGHT = image.shape[0]
    WIDTH = image.shape[1]

    img_gray = cv.cvtColor(image, cv.COLOR_RGB2GRAY)
    ret, thresh = cv.threshold(img_gray, 200, 255, 0)
    contours, hierarchy = cv.findContours(thresh, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)

    horz_lines = []
    vert_lines = []

    edges = cv.Canny(img_gray, 160, 400)
    lines = cv.HoughLinesP(edges, 1, np.pi/180, 150, minLineLength=100, maxLineGap=90)
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv.line(image, (x1, y1), (x2, y2), (255, 0, 0), 3)

        slope = (line[0][3] - line[0][1])/(line[0][2]-line[0][0])


        if (slope < 2 and slope > -2):
            horz_lines.append(line[0])
        elif (math.isinf(slope)):
            vert_lines.append(line[0])


        cv.imshow( "Lines", image )


    # sort lines
    horz_lines = sorted(horz_lines, key = lambda x: x[1])

    # remove duplicates
    ptr = 0
    while ptr < len(horz_lines) - 1:
        if (abs(horz_lines[ptr][1] - horz_lines[ptr+1][1])) < 30:
            horz_lines.pop(ptr+1)
        else:    
            ptr+=1


    # draw lines
    for line in horz_lines:
        x1, y1, x2, y2 = line
        cv.line(image, (x1, y1), (x2, y2), (0, 0, 255), 3)
        cv.imshow("hor", image)

    # calc average gap
    ptr = sum_gap = 0
    while ptr < len(horz_lines) - 1:
        sum_gap += horz_lines[ptr+1][1] - horz_lines[ptr][1]
        ptr+=1
    avg_horz_gap = int(sum_gap / (len(horz_lines) - 1))

    # interpolate missing lines
    ptr = len(horz_lines)-1
    while len(horz_lines) < 9:
        # start from bottom
        if HEIGHT - horz_lines[-1][1] > int(avg_horz_gap * 1.4):
            horz_lines.append([horz_lines[ptr][0], horz_lines[ptr][1] - avg_horz_gap, horz_lines[ptr][2], horz_lines[ptr][3] - avg_horz_gap])
            horz_lines = sorted(horz_lines, key = lambda x: x[1])
            ptr = len(horz_lines) - 1

        # if 2 * avg_gap, then missing one, so add next missing and sort list
        if (horz_lines[ptr][1] - horz_lines[ptr-1][1]) >= (1.8 * avg_horz_gap):
            horz_lines.append([horz_lines[ptr][0], horz_lines[ptr][1] - avg_horz_gap, horz_lines[ptr][2], horz_lines[ptr][3] - avg_horz_gap])
            horz_lines = sorted(horz_lines, key = lambda x: x[1])
            continue
        else:
            ptr -= 1


        if ptr == 0:
            # missing top ones
            ptr = len(horz_lines)-1
            horz_lines.append([horz_lines[0][0], horz_lines[0][1] - avg_horz_gap, horz_lines[0][2], horz_lines[0][3] - avg_horz_gap])
            horz_lines = sorted(horz_lines, key = lambda x: x[1])



    # left lines
    # sort lines
    vert_lines = sorted(vert_lines, key = lambda x: x[0])

    # remove duplicates
    ptr = 0
    while ptr < len(vert_lines) - 1:
        if (abs(vert_lines[ptr][0] - vert_lines[ptr+1][0])) < 30:
            vert_lines.pop(ptr+1)
        else:    
            ptr+=1

    # # calc average gap
    ptr = sum_gap = 0
    while ptr < len(vert_lines) - 1:
        sum_gap += (vert_lines[ptr+1][0]) - (vert_lines[ptr][0])
        ptr+=1
    avg_vert_gap = int(sum_gap / ((len(vert_lines)) - 1))

    # # interpolate missing lines
    added = 0
    while True:

        # start at leftmost line
        if vert_lines[0][0] > int(avg_vert_gap * 1.2):
            added += 1
            vert_lines.append([vert_lines[0][0] - avg_vert_gap , vert_lines[0][1], vert_lines[0][2] - avg_vert_gap , vert_lines[0][3]])
            vert_lines = sorted(vert_lines, key=lambda x: x[0])
        else:
            break



    top_line = (horz_lines[0][1] + horz_lines[0][3])/2
    left_line = (vert_lines[0][0] + vert_lines[0][2])/2

    print("top line", top_line)
    print("left line", left_line)

    return top_line, left_line, avg_horz_gap, avg_vert_gap


def calcPiecePosition(prediction, top_line, left_line, avg_horz_gap, avg_vert_gap):
    # x, y, width, height, confidence, piece_type = prediction

    x = prediction["x"]
    y = prediction["y"]
    height = prediction["height"]
    width = prediction["width"]
    piece_type = prediction["class"]

    print(x, y, width, height, piece_type)

    x_center = x + (width / 2)
    y_center = y + (height / 4)*3

    
    print("\ny center", y_center,"\ntop line", top_line)
    print(y_center - top_line)

    # y_center = y + (height / 3 * 1)
    row = round((((y_center - top_line) / avg_horz_gap ) * 2) / 2)
    col = round((((x_center - left_line) / avg_vert_gap) * 2) / 2)

    return row, col