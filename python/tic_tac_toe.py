import pdb

class TicTacToe:
    """
    Class to encapsulate the data and methods relating to the game of tic tac toe.
    """

    def __init__(self, p1 = "computer", p2 = "human", id1 = "X", id2 = "O", brd = None):
        """
        initialization method for class
        """
        if brd == None:
            self.board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
        else:
            self.board = brd
        self.player1 = p1
        self.player2 = p2
        self.player1ID = id1
        self.player2ID = id2
        #self.corners = [self.board[0], self.board[2], self.board[6], self.board[8]]
        #self.sides   = [self.board[1], self.board[3], self.board[5], self.board[7]]
        #self.middle  = [self.board[4]]

    def setBoard(self, brd):
        """
        method to set the state of the board as a whole
        """
        self.board = brd[:]


    def play(self, pos, token):
        """
        method to place the token, "X" or "O" at the position pos.  Note that
        the positions are numbered 1 2 3
                                   4 5 6
                                   7 8 9
        """
        index = pos - 1
        self.board[index] = token


    def isWin(self):
        """
        method checks for a win given the present state of the board.  Returns
        True for a win and False otherwise
        """
        row1 = [self.board[0], self.board[1], self.board[2]]
        row2 = [self.board[3], self.board[4], self.board[5]]
        row3 = [self.board[6], self.board[7], self.board[8]]
        diag1 = [self.board[0], self.board[4], self.board[8]]
        diag2 = [self.board[2], self.board[4], self.board[6]]
        rows    = [row1, row2, row3, diag1, diag2]
        for row in rows:
            if row == ["X", "X", "X"] or row == ["O", "O", "O"]:
                return True
        return False


    def available(self, brd = None):
        """
        returns a list of the available empty places as indexes of an array
        starting at 0 and ending at 8
        """
        if brd == None:
            thisBoard = self.board[:]
        else:
            thisBoard = brd[:]
        #pdb.set_trace()
        result = []
        x = 0
        while x < 9:
            if thisBoard[x] == "-":
                result.append(x)
            x += 1
        #pdb.set_trace()
        return result

    def genAllPosBrds(self, token, brd = None):
        """
        returns a list of all board positions if the token is placed in the
        currently available empty spaces
        """
        if brd == None:
            tempBoard = self.board[:]
        else:
            tempBoard = brd[:]
        result = []
        possiblePositions = self.available(brd = tempBoard)
        for index in possiblePositions:
            newBoard = tempBoard[:]
            newBoard[index] = token
            result.append(newBoard)
        #pdb.set_trace()
        return result


    def incTerminalState(self, brds, token, move):
        """
        given a list of boards 'brds' this method returns true if one of the
        boards shows a win
        """
        for brd in brds:
            x = TicTacToe(brd = brd)
            if x.isWin() or x.isDraw(move):
                return True

        return False


    def isDraw(self, move):
        """
        tests for a draw. returns True for a draw and False otherwise
        """
        if move == 9 and self.isWin() == False:
            return True

        return False


    def rankMove(self, moveToken, pos, lvl = 1, brd = None):
        """
        ranks the proposed move at pos +10 for immediate win, -10 for lose on next move.
        intermediate values indicate win or loss at a lower level. draw or win on
        last move - draw given as 0. Argument pos takes values 1 - 9.
        """
        if brd == None:
            newBoard = self.board[:]
        else:
            newBoard = brd[:]

        moveNo = self.getNextMoveNo(brd = newBoard)

        currentToken = moveToken
        level = lvl
        newBoard[pos - 1] = moveToken
        temp = TicTacToe(brd = newBoard)
        if level == 1 and temp.isWin():
            return 10
        else:
            if currentToken == "X":
                nextToken = "O"
            else:
                nextToken = "X"

            if moveNo == 1:
                brds = [newBoard]
            else:
                newBoard[pos - 1] = "-"
                brds = [newBoard]
            return self._analyseLevels(brds, nextToken, moveNo + 1, level + 1)


    def _analyseLevels(self, brds, token, move, lvl):
        """
        helper method for use by rankMove(). analyses each level until a test_incTerminal
        state is detected and then returns a modified win (between 8 and 2),
        and lose (between 8 and 2) or draw 0.
        """
        #pdb.set_trace()
        # get new set of boards to analyse
        level = lvl
        newBoards = []
        for brd in brds:
            newBrds = self.genAllPosBrds(token, brd = brd)
            #pdb.set_trace()
            for each in newBrds:
                newBoards.append(each)

        if self.incTerminalState(newBoards, token, move) and self.isDraw(move) == False:
            if level % 2 == 0:
                return -(12 - level)
            else:
                return (11 - level)
        elif self.incTerminalState(newBoards, token, move) and self.isDraw(move):
            return 0
        else:
            if token == "X":
                nextToken = "O"
            else:
                nextToken = "X"
            brds = newBoards
            return self._analyseLevels(brds, nextToken, move + 1, level + 1)


    def analyseMovesFor(self, token, brd = None):
        if brd == None:
            tempBoard = self.board[:]
        else:
            tempBoard = brd[:]
        result = []
        choices = self.available(brd = tempBoard)
        for index in choices:
            rank = self.rankMove(token, index + 1, brd = tempBoard)
            result.append((index, rank))

        return result


    def getNextMoveNo(self, brd = None):
        """
        given the current board position or a named brd position return the
        move number for the next move - numbers 1 to 9 valid.  if all moves
        have been taken return None
        """
        if brd == None:
            thisBoard = self.board[:]
        else:
            thisBoard = brd[:]

        result = 0
        x = 0
        while x < 9:
            if thisBoard[x] == "-":
                result += 1
            x += 1

        if result == 0:
            return None
        else:
            return 9 - result + 1


    def __str__(self):
        """
        provides a string representation of the board when the class is printed
        """
        newStr = self.board[0] + " " + self.board[1] + " " + self.board[2] + "\n"
        newStr += self.board[3] + " " + self.board[4] + " " + self.board[5]  + "\n"
        newStr += self.board[6] + " " + self.board[7] + " " + self.board[8]
        return newStr




if __name__ == "__main__":
    x = TicTacToe()
    #result = x.analyseLevels([["O", "X", "X", "X", "-", "X", "-", "O", "O"]], "O", 8, 2)
    #x = TicTacToe()
    print(x.analyseMovesFor("O"))
    #print(x.rankMove("X"))
