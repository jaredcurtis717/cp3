import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import mock from './mock-data.js';
import team from './emptyTeam.js';

Vue.config.productionTip = false;

let data = {
  pieces: mock,
  team: team,
};

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount("#app");
