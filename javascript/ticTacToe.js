let TicTacToe = {};

// constructor for the board
function Board(arr) {
  if(arr === undefined) {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }else {
    this.board  = arr;
  }

}


// method returns the array of rows for the board
Board.prototype.getRows = function() {
  this.row1   = [this.board[0], this.board[1], this.board[2]];
  this.row2   = [this.board[3], this.board[4], this.board[5]];
  this.row3   = [this.board[6], this.board[7], this.board[8]];
  this.col1   = [this.board[0], this.board[3], this.board[6]];
  this.col2   = [this.board[1], this.board[4], this.board[7]];
  this.col3   = [this.board[2], this.board[5], this.board[8]];
  this.diag1  = [this.board[0], this.board[4], this.board[8]];
  this.diag2  = [this.board[2], this.board[4], this.board[6]];
  this.rows   = [this.row1, this.row2, this.row3, this.col1, this.col2,
                  this.col3, this.diag1, this.diag2];

  return this.rows;
};


// method that returns the rows for a given index - no tests
Board.prototype.getRowsForIndex = function(index) {
  this.getRows();
  switch(index) {
    case 0:
      return [this.row1, this.col1, this.diag1];
    case 1:
      return [this.row1, this.col2];
    case 2:
      return [this.row1, this.col3, this.diag2];
    case 3:
      return [this.row2, this.col1];
    case 4:
      return [this.row2, this.col2, this.diag1, this.diag2];
    case 5:
      return [this.row2, this.col3];
    case 6:
      return [this.row3, this.col1, this.diag2];
    case 7:
      return [this.row3, this.col2];
    case 8:
      return [this.row3, this.col3, this.diag1];
  }
};


// method checks if the current board position is a win. Returns true or false
Board.prototype.isWin = function() {
  this.getRows();
  for(var i = 0; i < 8; i++) {
    if(arraysEqual(this.rows[i], ["X", "X", "X"]) || arraysEqual(this.rows[i], ["O", "O", "O"])) {
      return true;
    }
  }
  return false;
};


// method returns an array of indecies for the winning row.  If there is no winning
// row -1 is returned
Board.prototype.getWinningRow = function() {
  this.getRows();
  if(this.isWin()) {
    for(var i = 0; i < 8; i++) {
      if(arraysEqual(this.rows[i], ["X", "X", "X"]) || arraysEqual(this.rows[i], ["O", "O", "O"])) {
        switch(i) {
          case 0:
            return [0, 1, 2];
          case 1:
            return [3, 4, 5];
          case 2:
            return [6, 7, 8];
          case 3:
            return [0, 3, 6];
          case 4:
            return [1, 4, 7];
          case 5:
            return [2, 5, 8];
          case 6:
            return [0, 4, 8];
          case 7:
            return [2, 4, 6];
        }
      }
    }
  } else {
    return -1;
  }
};


// method to determine if the position is a draw
Board.prototype.isDraw = function() {
  if(this.isWin() === false && this.getNextMoveNum() === -1) {
    return true;
  } else {
    return false;
  }
};


// method which returns the number of the next move
Board.prototype.getNextMoveNum = function() {
  // count number of available position
  var num = 0;
  for(var i = 0; i < 9; i++) {
    if(this.board[i] === "") {
      num += 1;
    }
  }
  if(num === 0) {
    return -1;
  } else {
    return 9 - num + 1;
  }
};


// method check if the specified board position is available and returns true or
// false.  pos takes values from 1 to 9.
Board.prototype.isAvailable = function(pos) {
  if(this.board[pos - 1] === "") {
    return true;
  } else {
    return false;
  }
};


// method returns an array indexes of positions which are currently available
Board.prototype.available = function() {
  var result = [];
  for(var i = 0; i < 9; i++) {
    if(this.board[i] === "") {
      result.push(i);
    }
  }
  return result;
};


// method which returns the next token to play assuming X always starts the game
Board.prototype.getNextTokenToPlay = function() {
  var nextMoveNum = this.getNextMoveNum();
  if(nextMoveNum % 2 === 0) {
    return "O";       // "O" plays on all even moves
  } else {
    return "X";       // "X" plays on all odd moves
  }
};


// method to return all possible boards given a board position
// this assumes that X always starts the game
Board.prototype.getAllPosBoards = function() {
  var result = [];
  var tempBoard = this.board.slice();
  var possiblePositions = this.available();
  var token             = this.getNextTokenToPlay();
  for(var i = 0; i < possiblePositions.length; i++) {
    var newBoard = tempBoard.slice();
    newBoard[possiblePositions[i]] = token;
    result.push(newBoard);
  }
  return result;
};


// method to rank the move specified by pos which takes an integer 1 - 9.
Board.prototype.rankMove = function(pos) {
  var token       = this.getNextTokenToPlay();
  var tempBoard   = this.board.slice();
  if(this.isAvailable(pos)) {
    tempBoard[pos - 1] = token;
  } else {
    console.log("position already taken");
  }
  var tempBrd = new Board(tempBoard);

  if(tempBrd.isWin()) {
    return 10;
  } else {
    brds = [tempBrd.board];
    return analyseLevels(brds, 2);
  }
};


// method which returns an analysis of the Moves available at the current board
// position.  Returns an array of arrays providing the index and the rank of the
// move
Board.prototype.analyseMovesFor = function() {
  var result = [];          // holds the result
  var tempBoard = this.board.slice(); // copy present board
  //var newBoard  = tempBoard;
  var choices   = this.available();   // get a list of available indecies
  for(var i = 0; i < choices.length; i++) {
    var tempBoardObj = new Board(tempBoard);
    var index = choices[i];
    var rank = tempBoardObj.rankMove(index + 1);
    //newBoard = tempBoard;
    result.push([index, rank]);
  }
  return result;
};


// method to select the best move based on analyseMovesFor()
// returns the best move in the form [index, rank]
Board.prototype.selectBestMove = function() {
  var token = this.getNextTokenToPlay();
  var selection = this.selectTopRankedMovesFor();
  // check for posibility of a fork
  for(var i = 0; i < selection.length; i++) {
    if(this.isFork(selection[i][0])) {
      // play at this position
      return selection[i];
    }
  }
  // no fork return first top ranked move then check for possibility of play at
  // a corner
  for(var k = 0; k < selection.length; k++) {
    if(this.isCorner(index)) {
      return selection[i];
    }
  }
  // if neither a fork or a corner is available to play then return the first
  // top ranked move
  return selection[0];
};


// helper function to return value of largest rank as an integer given an array
// containing the analysed moves for this position
function getFirstLargestSelection(moves) {
  var selection = moves[0];
  var largest = moves[0][1];
  for(var i = 0; i < moves.length; i++) {
    if(largest < moves[i][1]) {
      largest = moves[i][1];
      selection = moves[i];
    }
  }
  return selection;
}


// method returns an array  of top ranked moves
Board.prototype.selectTopRankedMovesFor = function() {
  var result = [];
  var movesFromAnalysis = this.analyseMovesFor();
  var selection = getFirstLargestSelection(movesFromAnalysis);
  var topRank   = selection[1];
  for(var i = 0; i < movesFromAnalysis.length; i++) {
    if(movesFromAnalysis[i][1] === topRank) {
      result.push(movesFromAnalysis[i]);
    }
  }
  return result;
};


// method that determines if a selected play produces a fork.  Returns true if
// a fork can be created from that position, otherwise false
Board.prototype.isFork = function(index) {
  var token = this.getNextTokenToPlay();
  var rows = this.getRowsForIndex(index);
  var prospect = 0;       // a prospect contains one token and two spaces
  for(var i = 0; i < rows.length; i++) {

    if(rows[i].indexOf(token) !== -1) {   // row contains at least one tokenn
      // count spaces
      var spaces = 0;
      for(var k = 0; k < 3; k++) {
        if(rows[i][k] === "") {
          spaces += 1;
        }
      }
      if(spaces > 1) {
        prospect += 1;
      }
    }
  }
  if(prospect >= 2) {
    return true;
  } else {
    return false;
  }
};



// method that determines if a selected play produces a corner move.  Returns
// true or false
Board.prototype.isCorner = function(index) {
  var cornerIndexes = [0, 2, 6, 8];
  if(cornerIndexes.indexOf(index) !== -1) {
    return true;
  } else {
    return false;
  }
};


// helper function for rankMove to analyse each level given an array of boards
// and the level
function analyseLevels(brds, lvl) {
  // get an array of boards for this level
  var newBoards = [];         // holds all posible boards for this level
  for(var i = 0; i < brds.length; i++) {
    var tempBoard = new Board(brds[i]);
    var collection = tempBoard.getAllPosBoards();
    for(var j = 0; j < collection.length; j++) {
      newBoards.push(collection[j]);
    }
  }
  for(var k = 0; k < newBoards.length; k++) {
    var firstBoard = new Board(newBoards[0]);
    if(newBoards.length === 1 && firstBoard.isWin()) {
      return 0;
    } else {
      if(incTerminalState(newBoards)) {
        if(lvl % 2 === 0) {
          return -(12 - lvl);
        } else {
          return (11 - lvl);
        }
      } else {
        return analyseLevels(newBoards, lvl + 1);
      }
    }
  }
}


// helper method to check the equality of arrays arr1, and arr2.  Returns
// true or false
function arraysEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length != arr2.length) return false;

  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}


// helper method to check the equality of nested arrays arr1, and arr2.  Returns
// true or false.  Deals with two dimensional arrays only
function nestedArraysEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length != arr2.length) return false;

  for (var i = 0; i < arr1.length; ++i) {
    if (!arraysEqual(arr1[i], arr2[i])) return false;
  }
  return true;
}


// function which takes an array of boards and checks to determine if a terminal
// state is present in the array, either a win or a draw
function incTerminalState(boards) {
  for(var i = 0; i < boards.length; i++) {
    var tempBoard = new Board(boards[i]);
    //console.log(tempBoard);
    if(tempBoard.isWin() || tempBoard.isDraw()) {
      return true;
    }
  }
  return false;
}



TicTacToe.Board = Board;
TicTacToe.arraysEqual = arraysEqual;
TicTacToe.nestedArraysEqual = nestedArraysEqual;
TicTacToe.incTerminalState = incTerminalState;
TicTacToe.getFirstLargestSelection = getFirstLargestSelection;
module.exports = TicTacToe;


var brd = new Board(["", "O", "X", "", "X", "", "O", "", ""]);
var result = brd.isFork(5);
console.log(result);
