Vue.component("screen-one", {
  template: "#screen1"
});

Vue.component("screen-two", {
  template: "#screen2"
});

Vue.component("screen-three", {
  template: "#screen3"
});

/*Vue.component("screen-four", {
  template: "#screen4"
});*/

Vue.component("screen-four", {
  template: "#screen4",
  props: ["board", "win"]
});


var main = new Vue({
  el: "#app",
  data: {
    playAgainEnabled: false,
    resetEnabled: true,
    singlePlayer: false,     //true,
    playerone: "Player 1",
    playertwo: "Player 2",   //"",
    tokenone: "X",           //"",
    tokentwo: "O",           //"",
    scoreone: 0,
    scoretwo: 0,
    oneIsActive: true,       //false,
    twoIsActive: false,
    showPlayers: true,       //false,
    board: ["", "", "", "", "", "", "", "", ""],
    win: [false, false, false, false, false, false, false, false, false],
    component: "screen-four",     //"screen-one"
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
        } else {
          this.twoIsActive = true;
        }

        this.playAgainEnabled = false;
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
      } else if(token === "O") {
        this.tokenone = "O";
        this.tokentwo = "X";
      }
      this.component = "screen-four";
      this.oneIsActive = true;
      this.showPlayers = true;
    },
    playNext: function(i) {
      if(this.singlePlayer) {
        this.$set(this.board, i, "X");
      } else {                            // two individual players
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


// function to check the state of the board and prepare for the next move
function checkBoardState() {
  var tempBoard = new Board(brd=main.board);
  if(tempBoard.isWin() || tempBoard.isDraw()) {
    handleWinOrDraw(tempBoard);
  } else {
    togleActivePlayer();
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

  // remove the status bar
  main.oneIsActive = main.twoIsActive = false;
  main.playAgainEnabled = true;

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
    alert("Congratulations " + currentPlayer + " you win|");
  } else if(brd.isDraw()) {
    alert("A Draw");
  }
}

// function to toggle active player status
function togleActivePlayer(nextMove) {
  main.oneIsActive = !main.oneIsActive;
  main.twoIsActive = !main.twoIsActive;
}
