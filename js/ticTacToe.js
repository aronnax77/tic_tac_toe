/* Author: Richard Myatt
   Date: 9 April 2018

   A game of tic tac toe being a challenge set by freecodecamp.  The main web
   application uses Vue.js and the game logic is a combination of strategy
   presented in the wikipedia article https://en.wikipedia.org/wiki/Tic-tac-toe
   and an implementation of the minimax algorithm.

*/

Vue.component("screen-one", {
  template: "#screen1"
});

Vue.component("screen-two", {
  template: "#screen2"
});

Vue.component("screen-three", {
  template: "#screen3"
});

Vue.component("screen-four", {
  template: "#screen4",
  props: ["board", "win"]
});

Vue.component('customalert', {
  props: ["msg"],
  template: '#alert-template'
});


var main = new Vue({
  el: "#app",
  data: {
    autoPlayAgain: true,
    playAgainEnabled: false,
    resetEnabled: true,
    singlePlayer: true,
    playerone: "Player 1",
    playertwo: "",
    tokenone: "",
    tokentwo: "",
    scoreone: 0,
    scoretwo: 0,
    oneIsActive: false,
    twoIsActive: false,
    showPlayers: false,
    board: ["", "", "", "", "", "", "", "", ""],
    win: [false, false, false, false, false, false, false, false, false],
    component: "screen-one",
    message: "",
    showAlert: false
  },
  methods: {
    reset: function() {
      if(this.resetEnabled === true) {
        this.playAgainEnabled = false;
        this.resetEnabled = true;
        this.singlePlayer = true;
        this.playertwo = "";
        this.tokenone = "";
        this.tokentwo = "";
        this.scoreone = 0;
        this.scoretwo = 0;
        this.oneIsActive = false;
        this.twoIsActive = false;
        this.showPlayers = false;
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.win = [false, false, false, false, false, false, false, false, false];
        this.component = "screen-one";
      }
    },
    again: function() {
      if(this.playAgainEnabled) {
        for(var i = 0; i < 9; i++) {
          this.$set(this.board, i, "");
          this.$set(this.win, i, false);
        }

        if(this.tokenone === "X") {
          this.oneIsActive = true;
          this.playAgainEnabled = false;
        } else if(this.tokenone === "O" && this.playertwo === "Computer") {
          this.twoIsActive = true;
          this.playAgainEnabled = false;
          setTimeout(function() { playComputer(); }, 1000);
        } else {
          this.twoIsActive = true;
          this.playAgainEnabled = false;
        }
      }
    },
    setPlayer: function(arg) {
      if(arg === 1) {
        this.singlePlayer = true;
        this.playertwo = "Computer";
        this.component = "screen-two";
      } else if(arg === 2) {
        this.singlePlayer = false;
        this.playertwo = "Player 2";
        this.component = "screen-three";
      }
    },
    setTokens: function(token) {
      if(token === "X") {
        this.tokenone = "X";
        this.tokentwo = "O";
        this.oneIsActive = true;
      } else if(token === "O") {
        this.tokenone = "O";
        this.tokentwo = "X";
        this.twoIsActive = true;
      }
      this.component = "screen-four";
      this.showPlayers = true;
      if(this.singlePlayer && this.twoIsActive) {
        setTimeout(function() { playComputer(); }, 1000);
      }
    },
    playNext: function(i) {
      var tempBoard = new Board(brd=this.board);
      if(this.singlePlayer && tempBoard.isAvailable(i + 1) && this.playAgainEnabled === false) {
        if(this.oneIsActive === true) {
          var token = this.tokenone;
          this.$set(this.board, i, token);
          var temp = new Board(brd = this.board);
          if(temp.isWin() || temp.isDraw()) {
            handleWinOrDraw(temp);
            toggleActivePlayer();
            return;
          }
          toggleActivePlayer();
          setTimeout(function() { playComputer(); }, 1000);
        }
      } else if(!this.singlePlayer) {        // two individual players
        // check that square is available
        //var tempBoard = new Board(brd=this.board);
        if(tempBoard.isAvailable(i + 1) && this.playAgainEnabled === false) {
          // get next move number
          var nextMoveNum = tempBoard.getNextMoveNum();
          if(nextMoveNum % 2 === 0) {
            this.$set(this.board, i, "O");
            checkBoardState();

          } else {
            this.$set(this.board, i, "X");
            checkBoardState();
          }
        }
      }
    },
    close: function() {
      this.message = "";
      this.showAlert = false;
      this.playAgainEnabled = true;
      this.resetEnabled = true;
      if(this.autoPlayAgain) {
        this.again();
      }
    }
  }
  });


// function to handle computers moves
function playComputer() {
  if(main.twoIsActive === true) {
    var tempBoard = new Board(brd=main.board);
    var nextMove  = tempBoard.getNextMoveNum();

    switch(nextMove) {
      case 1:
        main.$set(main.board, 4, "X");
        break;
      case 2:
        if(tempBoard.isAvailable(5)) {
          main.$set(main.board, 4, "O");
        } else {
          main.$set(main.board, randCornerIndex(), "O");
        }
        break;
      case 3:
        var result = cornerContains(tempBoard.board, "O");
        if(nextMove === 3 && result !== -1) {
          switch(result) {
            case 0:
              main.$set(main.board, 8, "X");
              break;
              case 2:
                main.$set(main.board, 6, "X");
                break;
              case 6:
                main.$set(main.board, 2, "X");
                break;
              case 8:
                main.$set(main.board, 0, "X");
                break;
          }
          break;
        } else if (nextMove === 3 && result === -1) {
          main.$set(main.board, randCornerIndex(), "X");
          break;
        }
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        var move = tempBoard.selectBestMove();
        main.$set(main.board, move, main.tokentwo);
        if(tempBoard.isWin() || tempBoard.isDraw()) {
          handleWinOrDraw(tempBoard);
        } else {
        }
        break;
      }
  }
  toggleActivePlayer();
}


// helper method to return a random corner index
function randCornerIndex() {
  var corner = [0, 2, 6, 8];
  var choice = Math.floor(Math.random() * 4);
  return corner[choice];
}


// helper function to determine if the corner of the board is occupied
function cornerContains(brd, token) {
  var corner = [0, 2, 6, 8];
  for(var i = 0; i < corner.length; i++) {
    if(token === brd[corner[i]]) {
      return corner[i];
    }
  }
  return -1;
}


// function to check the state of the board and prepare for the next move
function checkBoardState() {
  var tempBoard = new Board(brd=main.board);
  if(tempBoard.isWin() || tempBoard.isDraw()) {
    handleWinOrDraw(tempBoard);
    toggleActivePlayer();
  } else {
    toggleActivePlayer();
  }
}

// function to handle a win or draw
function handleWinOrDraw(brd) {
  // identify current player
  var currentPlayer;
  if(main.oneIsActive === true) {
    currentPlayer = main.playerone;
  } else {
    currentPlayer = main.playertwo;
  }

  // check for win or draw
  if(brd.isWin()) {
    var row = brd.getWinningRow();
    for(var i = 0; i < row.length; i++) {
      main.$set(main.win, row[i], true);
    }
    // increment score
    if(currentPlayer === main.playerone) {
      main.scoreone += 1;
    } else {
      main.scoretwo += 1;
    }
    if(currentPlayer === "Computer") {
      var str = "Ooops.. " + currentPlayer + " wins!!!";
      main.message = str;
      callCustomAlert();
    } else {
      var str = "Congratulations " + currentPlayer + " you win!";
      main.message = str;
      callCustomAlert();
    }

  } else if(brd.isDraw()) {
    var str = "A Draw";
    main.message = str;
    callCustomAlert();
  }

  // remove the status bar
    main.oneIsActive = true;
    main.twoIsActive = true;
}

// function to introduce a delay into the calling of the final custom alert
function callCustomAlert() {
  setTimeout(function() {
    main.showAlert = true;
    main.resetEnabled = false;
  }, 1300);
}

// function to toggle active player status
function toggleActivePlayer() {
  main.oneIsActive = !main.oneIsActive;
  main.twoIsActive = !main.twoIsActive;
}
