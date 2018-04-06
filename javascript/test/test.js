var TicTacToe = require("../ticTacToe.js");
var assert = require("assert");

describe("Unit tests for tictactoe", function() {

  describe("Tests for initialization", function() {
    it('O should equal brd.board[0]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("O", brd.board[0]);
    });
    it('- should equal brd.board[1]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("", brd.board[1]);
    });
    it('X should equal brd.board[2]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("X", brd.board[2]);
    });
    it('X should equal brd.board[3]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("X", brd.board[3]);
    });
    it('- should equal brd.board[4]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("", brd.board[4]);
    });
    it('X should equal brd.board[5]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("X", brd.board[5]);
    });
    it('- should equal brd.board[6]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("", brd.board[6]);
    });
    it('O should equal brd.board[7]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("O", brd.board[7]);
    });
    it('O should equal brd.board[8]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("O", brd.board[8]);
    });
    it('test for brd.board should return true from arraysEqual test 1', function() {
      var arr = ["O", "-", "X", "X", "-", "X", "-", "O", "O"];
      var brd = new TicTacToe.Board(["O", "-", "X", "X", "-", "X", "-", "O", "O"]);
      assert.equal(true, TicTacToe.arraysEqual(arr, brd.board));
    });
    it('test for brd.board should return true from arraysEqual test 2', function() {
      var arr = ["", "", "", "", "", "", "", "", ""];
      var brd = new TicTacToe.Board();
      assert.equal(true, TicTacToe.arraysEqual(arr, brd.board));
    });
  });

  describe("Tests for arraysEqual", function() {
    it('should return true from arraysEqual(arr1, arr2)', function() {
      array1 = [1, 2, 3];
      array2 = [1, 2, 3];
      assert.equal(true, TicTacToe.arraysEqual(array1, array2));
    });
    it('should return false from arraysEqual(arr1, arr2)', function() {
      array1 = [1, 2, 3];
      array2 = [1, 2];
      assert.equal(false, TicTacToe.arraysEqual(array1, array2));
    });
    it('should return false from arraysEqual(arr1, arr2)', function() {
      array1 = [1, 2, 3];
      array2 = null;
      assert.equal(false, TicTacToe.arraysEqual(array1, array2));
    });
  });

  describe("Tests for nestedArraysEqual", function() {
    it('should return true', function() {
      var array1 = [ [ 'O', 'X', 'X', 'X', '', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', 'X', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', '', 'X', 'X', 'O', 'O' ] ];
      var array2 = [ [ 'O', 'X', 'X', 'X', '', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', 'X', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', '', 'X', 'X', 'O', 'O' ] ];
      assert.equal(true, TicTacToe.nestedArraysEqual(array1, array2));
    });
    it('should return false', function() {
      var array1 = [ [ 'O', 'X', 'X', 'X', '', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', 'X', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', '', 'X', 'X', 'O', 'O' ] ];
      var array2 = [ [ 'O', 'O', 'X', 'X', '', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', 'X', 'X', '', 'O', 'O' ],
                [ 'O', '', 'X', 'X', '', 'X', 'X', 'O', 'O' ] ];
      assert.equal(false, TicTacToe.nestedArraysEqual(array1, array2));
    });
  });

  describe("Tests for isWin", function() {
    it('brd.isWin() should be true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "X", "X", "", "O", "O"]);
      assert.equal(true, brd.isWin());
    });
    it('brd.isWin() should be false', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(false, brd.isWin());
    });
  });

  describe("Tests for getWinningRow", function() {
    it('brd.getWinningRow() should return [3, 4, 5]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "X", "X", "", "O", "O"]);
      assert.equal(true, TicTacToe.arraysEqual([3, 4, 5], brd.getWinningRow()));
    });
    it('brd.getWinningRow() should return -1', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(-1, brd.getWinningRow());
    });
  });

  describe("Tests for isAvailable", function() {
    it('should return true for pos 2', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(true, brd.isAvailable(2));
    });
    it('should return false for pos 6', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(false, brd.isAvailable(6));
    });
  });

  describe("Tests for available", function() {
    it('should return [1, 4, 6]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(true, TicTacToe.arraysEqual([1, 4, 6], brd.available()));
    });
  });

  describe("Tests for getNextMoveNum", function() {
    it('should return 7', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(7, brd.getNextMoveNum());
    });
    it('should return 7', function() {
      var brd = new TicTacToe.Board(["O", "O", "X", "X", "", "X", "X", "O", "O"]);
      assert.equal(9, brd.getNextMoveNum());
    });
    it('should return -1', function() {
      var brd = new TicTacToe.Board(["O", "O", "X", "X", "O", "X", "X", "O", "O"]);
      assert.equal(-1, brd.getNextMoveNum());
    });
  });

  describe("Tests for isDraw", function() {
    it('should return false', function() {
      var brd = new TicTacToe.Board(["O", "X", "X", "X", "O", "X", "X", "O", "O"]);
      assert.equal(false, brd.isDraw());
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["X", "X", "O", "O", "O", "X", "X", "O", "O"]);
      assert.equal(true, brd.isDraw());
    });
  });

  describe("Tests for getNextTokenToPlay", function() {
    it('should return X', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal("X", brd.getNextTokenToPlay());
    });
    it('should return O', function() {
      var brd = new TicTacToe.Board(["X", "X", "", "O", "O", "X", "X", "O", ""]);
      assert.equal("O", brd.getNextTokenToPlay());
    });
  });

  describe("Tests for getAllPosBoards", function() {
    it('should return [["O", "X", "X", "X", "", "X", "", "O", "O"], ["O", "", "X", "X", "X", "X", "", "O", "O"], ["O", "", "X", "X", "", "X", "X", "O", "O"]]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      var res = [["O", "X", "X", "X", "", "X", "", "O", "O"], ["O", "", "X", "X", "X", "X", "", "O", "O"], ["O", "", "X", "X", "", "X", "X", "O", "O"]];
      assert.equal(true, TicTacToe.nestedArraysEqual(res, brd.getAllPosBoards()));
    });
    it('should return [["X", "X", "O", "O", "O", "X", "X", "O", ""], ["X", "X", "", "O", "O", "X", "X", "O", "O"]]', function() {
      var res = [["X", "X", "O", "O", "O", "X", "X", "O", ""], ["X", "X", "", "O", "O", "X", "X", "O", "O"]];
      var brd = new TicTacToe.Board(["X", "X", "", "O", "O", "X", "X", "O", ""]);
      assert.equal(true, TicTacToe.nestedArraysEqual(res, brd.getAllPosBoards()));
    });
  });

  describe("Tests for incTerminalState", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      var brds = brd.getAllPosBoards();
      assert.equal(true, TicTacToe.incTerminalState(brds));
    });
    it('should return false', function() {
      var brds = [["O", "X", "X", "X", "", "X", "", "O", "O"],
            ["O", "", "X", "X", "", "X", "X", "O", "O"]];
      assert.equal(false, TicTacToe.incTerminalState(brds));
    });
    it('should return true', function() {
      var brds = [["X", "O", "X", "X", "X", "O", "O", "X", "O"]];
      assert.equal(true, TicTacToe.incTerminalState(brds));
    });
  });

  describe.only("Tests for rankMove", function() {
    it('should return 10', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(10, brd.rankMove(5));
    });
    it('should return -10', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(-10, brd.rankMove(2));
    });
    it('should return -10', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(-10, brd.rankMove(7));
    });
    it('should return 0', function() {
      var brd = new TicTacToe.Board(["O", "X", "X", "X", "X", "O", "O", "", ""]);
      assert.equal(0, brd.rankMove(8));
    });
    it('should return -10', function() {
      var brd = new TicTacToe.Board(["O", "X", "X", "X", "X", "O", "O", "", ""]);
      assert.equal(-10, brd.rankMove(9));
    });
  });


  describe("Tests for analyseMovesFor", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      var result = [[1, -10], [4, 10], [6, -10]];
      assert.equal(true, TicTacToe.nestedArraysEqual(result, brd.analyseMovesFor()));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "", "O"]);
      var result = [[1, -10], [4, 10], [6, -10], [7, -10]];
      assert.equal(true, TicTacToe.nestedArraysEqual(result, brd.analyseMovesFor()));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["X", "", "X", "", "O", "", "", "", "O"]);
      var result = [[1, 10], [3, 8], [5, 8], [6, 8], [7, 8]];
      assert.equal(true, TicTacToe.nestedArraysEqual(result, brd.analyseMovesFor()));
    });
  });

  describe("Test for selectBestMove", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(true, TicTacToe.arraysEqual([4, 10], brd.selectBestMove()));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "", "O"]);
      assert.equal(true, TicTacToe.arraysEqual([4, 10], brd.selectBestMove()));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["X", "", "X", "", "O", "", "", "", "O"]);
      assert.equal(true, TicTacToe.nestedArraysEqual([1, 10], brd.selectBestMove()));
    });
  });

  describe("Tests for selectTopRankedMovesFor", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      var expected = [ [ 0, 8 ], [ 3, 8 ], [ 5, 8 ], [ 8, 8 ] ];
      assert.equal(true, TicTacToe.nestedArraysEqual(expected, brd.selectTopRankedMovesFor()));
    });
  });

  describe("Test for getFirstLargestSelection", function() {
    it('should return true', function() {
      var selection = [ [ 0, 8 ], [ 3, 8 ], [ 5, 8 ], [ 7, -8 ], [ 8, 8 ] ];
      assert.equal(true, );
    });
  });

  describe("Test for isFork", function() {
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isFork(0));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isFork(3));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isFork(7));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(true, brd.isFork(8));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(true, brd.isFork(5));
    });
  });

  describe("Test for selectBestMove", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(true, TicTacToe.arraysEqual([5, 8], brd.selectBestMove()));
    });
  });

  describe("Test for isCorner", function() {
    it('should return true', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(true, brd.isCorner(0));
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(true, brd.isCorner(8));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isCorner(3));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isCorner(5));
    });
    it('should return false', function() {
      var brd = new TicTacToe.Board(["", "O", "X", "", "X", "", "O", "", ""]);
      assert.equal(false, brd.isCorner(7));
    });
  });


});
