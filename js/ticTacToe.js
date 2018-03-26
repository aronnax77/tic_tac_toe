Vue.component("screen-one", {
  template: "#screen1"
});

Vue.component("screen-two", {
  template: "#screen2"
});

Vue.component("screen-three", {
  template: "#screen3"
});


var main = new Vue({
  el: "#app",
  data: {
    comp: "screen-three"
  }
});
