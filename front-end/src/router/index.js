import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Play from "../views/Play.vue";
import View from "../views/View.vue";
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit
  },
  {
    path: "/play",
    name: "Play",
    component: Play
  },
  {
    path: "/view",
    name: "View",
    component: View
  },
  {
    path: "/create",
    name: "Create",
    component: Create
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
