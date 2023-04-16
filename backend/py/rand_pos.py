import random
import os



N_PIECES = 10 
N_BOARDS = 43
N_FILES = len(os.listdir())
FILE_NAME = "boards_" + str(N_FILES - 1) + ".txt"

# ignore 3 pawns of each color
pieces = ['black_pawn','black_pawn','black_pawn','black_pawn','black_pawn',
          'black_rook','black_knight','black_bishop','black_queen','black_king','black_bishop','black_knight','black_rook',
          'white_pawn','white_pawn','white_pawn','white_pawn','white_pawn',
          'white_rook','white_knight','white_bishop','white_queen','white_king','white_bishop','white_knight','white_rook']

# pieces = ['black_pawn','black_pawn','black_pawn','black_pawn','black_pawn','black_pawn','black_pawn','black_pawn',
#           'black_rook','black_knight','black_bishop','black_queen','black_king','black_bishop','black_knight','black_rook',
#           'white_pawn','white_pawn','white_pawn','white_pawn','white_pawn','white_pawn','white_pawn','white_pawn',
#           'white_rook','white_knight','white_bishop','white_queen','white_king','white_bishop','white_knight','white_rook']

positions = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
             'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
             'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
             'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
             'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
             'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
             'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
             'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8',]


f = open(FILE_NAME,"w")

for i in range(0, N_BOARDS):
    sampled_pieces = random.sample(pieces, N_PIECES)
    sampled_positions = random.sample(positions, N_PIECES)
    
    zipped_samples = list(zip(sampled_pieces, sampled_positions))
    

    
    print(i, *zipped_samples, sep="\t", file=f)
    
f.close()