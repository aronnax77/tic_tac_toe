import sys
sys.path.append("/home/tyrion/Computing/freecodecamp/tic_tac_toe")

import tic_tac_toe as ttt

def test_init():
    x = ttt.TicTacToe()
    assert(x.board == ["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    assert(x.player1 == "computer")
    assert(x.player2 == "human")
    assert(x.player1ID == "X")
    assert(x.player2ID == "O")
    y = ttt.TicTacToe(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(y.board[0] == "O")
    assert(y.board[1] == "-")
    assert(y.board[8] == "O")
    assert(y.board[3] == "X")
    assert(y.board[4] == "-")

def test_setboard():
    x = ttt.TicTacToe()
    x.setBoard(["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(x.board[0] == "O")
    assert(x.board[1] == "-")
    assert(x.board[8] == "O")
    assert(x.board[3] == "X")
    assert(x.board[4] == "-")

def test_play():
    x = ttt.TicTacToe()
    x.setBoard(["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    x.play(2, "X")
    assert(x.board[1] == "X")

def test_isWin():
    x = ttt.TicTacToe()
    x.setBoard(["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    x.play(5, "X")
    assert(x.isWin() == True)
    x = ttt.TicTacToe()
    x.setBoard(["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    x.play(2, "X")
    assert(x.isWin() == False)

def test_available():
    x = ttt.TicTacToe()
    x.setBoard(["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(x.available() == [1, 4, 6])

def test_genAllPosBrds():
    x = ttt.TicTacToe(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(x.genAllPosBrds("X") == [["O", "X", "X", "X", "-", "X", "-", "O", "O"],
                                    ["O", "-", "X", "X", "X", "X", "-", "O", "O"],
                                    ["O", "-", "X", "X", "-", "X", "X", "O", "O"]])
    assert(x.genAllPosBrds("X", brd = ["O", "-", "X", "X", "O", "X", "-", "O", "-"]) == [["O", "X", "X", "X", "O", "X", "-", "O", "-"], ["O", "-", "X", "X", "O", "X", "X", "O", "-"], ["O", "-", "X", "X", "O", "X", "-", "O", "X"]])

def test_incTerminalState():
    x = ttt.TicTacToe(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    brds = x.genAllPosBrds("X")
    assert(x.incTerminalState(brds, "X", 7) == True)
    brds = [["O", "X", "X", "X", "-", "X", "-", "O", "O"],
            ["O", "-", "X", "X", "-", "X", "X", "O", "O"]]
    assert(x.incTerminalState(brds, "X", 7) == False)

def test_isDraw():
    x = ttt.TicTacToe(brd = ["O", "X", "X", "X", "O", "X", "X", "O", "O"])
    assert(x.isDraw(9) == False)
    x = ttt.TicTacToe(brd = ["X", "X", "O", "O", "O", "X", "X", "O", "O"])
    assert(x.isDraw(9) == True)

def test_getNextMoveNo():
    x = ttt.TicTacToe()
    assert(x.getNextMoveNo() == 1)
    assert(x.getNextMoveNo(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"]) == 7)
    x = ttt.TicTacToe(brd = ["X", "X", "O", "O", "O", "X", "X", "O", "O"])
    assert(x.getNextMoveNo() == None)

def test_rankMove():
    x = ttt.TicTacToe(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(x.rankMove("X", 5) == 10)
    assert(x.rankMove("X", 2) == -10)
    assert(x.rankMove("X", 7) == -10)

def test_analyseMovesFor():
    x = ttt.TicTacToe(brd = ["O", "-", "X", "X", "-", "X", "-", "O", "O"])
    assert(x.analyseMovesFor("X") == [(1, -10), (4, 10), (6, -10)])
    assert(x.analyseMovesFor("O", brd = ["O", "-", "X", "X", "-", "X", "-", "-", "O"]) == [(1, -10), (4, 10), (6, -10), (7, -10)])
    x = ttt.TicTacToe(brd = ["X", "-", "X", "-", "O", "-", "-", "-", "O"])
    assert(x.analyseMovesFor("O", brd = ["X", "-", "X", "-", "O", "-", "-", "-", "O"]) == [(1, 8), (3, -10), (5, -10), (6, -10), (7, -10)])
