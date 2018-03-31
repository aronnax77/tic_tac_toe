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
    playerone: "Player 1",
    playertwo: "Computer",
    tokenone: "X",
    tokentwo: "O",
    scoreone: 0,
    scoretwo: 0,
    oneIsActive: true,
    twoIsActive: false,
    showPlayers: true,
    board: ["O", "", "X", "X", "", "X", "", "O", "O"],
    component: "screen-five"
  },
  methods: {
    playNext: function(i) {
      this.$set(this.board, i, "X");
    }
  }
});
