import gridMath

gridMath.test()


top_line, left_line, avg_horz_gap, avg_vert_gap = gridMath.calcGridDimensions("img_0.png")
# 
# print(top_line,left_line,avg_horz_gap,avg_vert_gap)


pred = {
     "x": 436.5,
      "y": 370.5,
      "width": 39,
      "height": 73,
      "confidence": 0.601,
      "class": "black-knight"
    }

row, col = gridMath.calcPiecePosition(pred, top_line, left_line, avg_horz_gap, avg_vert_gap)

print(row, col)