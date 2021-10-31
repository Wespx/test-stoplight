import Vue from "vue";
import VueRouter from "vue-router";
import Stoplight from "../components/Stoplight.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/*",
    component: Stoplight
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;