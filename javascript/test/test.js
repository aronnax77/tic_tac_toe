var TicTacToe = require("../ticTacToe.js");
var assert = require("assert");

describe("Unit tests for tictactoe", function() {

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

  describe("isWin", function() {
    it('brd.isWin() should be true', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "X", "X", "", "O", "O"]);
      assert.equal(true, brd.isWin());
    });
    it('brd.isWin() should be false', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(false, brd.isWin());
    });
  });

  describe("isAvailable", function() {
    it('should return true for pos 2', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(true, brd.isAvailable(2));
    });
    it('should return false for pos 6', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(false, brd.isAvailable(6));
    });
  });

  describe("available", function() {
    it('should return [1, 4, 6]', function() {
      var brd = new TicTacToe.Board(["O", "", "X", "X", "", "X", "", "O", "O"]);
      assert.equal(true, TicTacToe.arraysEqual([1, 4, 6], brd.available()));
    });
  });

  describe("getNextMoveNum", function() {
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

  describe.only("isDraw", function() {
    it('should return false', function() {
      var brd = new TicTacToe.Board(["O", "X", "X", "X", "O", "X", "X", "O", "O"]);
      assert.equal(false, brd.isDraw());
    });
    it('should return true', function() {
      var brd = new TicTacToe.Board(["X", "X", "O", "O", "O", "X", "X", "O", "O"]);
      assert.equal(true, brd.isDraw());
    });
  });

  describe("initialization", function() {
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
});
