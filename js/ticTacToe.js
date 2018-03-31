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
  template: "#screen4"
});

Vue.component("screen-five", {
  template: "#screen5",
  props: ["board"]
});


var main = new Vue({
  el: "#app",
  data: {
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
    component: "screen-one"
  },
  methods: {
    reset: function() {
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
      this.component = "screen-one";
    },
    setPlayer: function(arg) {
      if(arg === 1) {
        this.playertwo = "Computer";
        this.component = "screen-two";
      } else if(arg === 2) {
        this.playertwo = "Player 2";
        this.component = "screen-four";
      }
    },
    playNext: function(i) {
      this.$set(this.board, i, "X");
    }
  }
});
