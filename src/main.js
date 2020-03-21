import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

Vue.filter("Upcase", function(value) {
  return value.toUpperCase();
});
Vue.filter("Capitaliced", function(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  el: "#app",
  render: h => h(App)
});
