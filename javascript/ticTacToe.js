let TicTacToe = {};

// constructor for the board
function Board(arr) {
  if(arr === undefined) {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }else {
    this.board  = arr;
  }

}


// method checks if the current board position is a win. Returns true or false
Board.prototype.isWin = function() {
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
  for(var i = 0; i < 8; i++) {
    if(arraysEqual(this.rows[i], ["X", "X", "X"]) || arraysEqual(this.rows[i], ["O", "O", "O"])) {
      return true;
    }
  }
  return false;
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
// true or false
function nestedArraysEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length != arr2.length) return false;

  for (var i = 0; i < arr1.length; ++i) {
    if (!arraysEqual(arr1[i], arr2[i])) return false;
  }
  return true;
}



TicTacToe.Board = Board;
TicTacToe.arraysEqual = arraysEqual;
TicTacToe.nestedArraysEqual = nestedArraysEqual;
module.exports = TicTacToe;

var brd = new Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
var res = [ [ 'O', 'X', 'X', 'X', '', 'X', '', 'O', 'O' ],
          [ 'O', '', 'X', 'X', 'X', 'X', '', 'O', 'O' ],
          [ 'O', '', 'X', 'X', '', 'X', 'X', 'O', 'O' ] ];
console.log(brd.getAllPosBoards());
console.log(arraysEqual(res, brd.getAllPosBoards()));
