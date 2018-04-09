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


var main = new Vue({
  el: "#app",
  data: {
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
    component: "screen-one"
  },
  methods: {
    reset: function() {
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
        } else {
          this.twoIsActive = true;
          this.playAgainEnabled = false;
          setTimeout(function() { playComputer(); }, 1000);
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
        //playComputer();             // xxxx ensure this works
        setTimeout(function() { playComputer(); }, 1000);
      }
    },
    playNext: function(i) {
      if(this.singlePlayer) {
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
          //playComputer();
          setTimeout(function() { playComputer(); }, 1000);
        }
      } else if(!this.singlePlayer) {        // two individual players
        // check that square is available
        var tempBoard = new Board(brd=this.board);
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
        console.log("move = " + move);
        console.log(tempBoard.board);
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
  } else {
    toggleActivePlayer();
  }
}

// function to handle a win or draw
function handleWinOrDraw(brd) {
  console.log("in handleWinOrDraw");
  console.log(brd);
  console.log("board = " + brd.board);
  console.log("isWin = " + brd.isWin());
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
      alert("Ooops.. " + currentPlayer + " wins!!!");
    } else {
      alert("Congratulations " + currentPlayer + " you win!");
    }

  } else if(brd.isDraw()) {
    alert("A Draw");
  }

  // remove the status bar
  main.oneIsActive = true;
  main.twoIsActive = true;
  main.playAgainEnabled = true;
}

// function to toggle active player status
function toggleActivePlayer() {
  main.oneIsActive = !main.oneIsActive;
  main.twoIsActive = !main.twoIsActive;
}

// utility function
function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

//playComputer();
