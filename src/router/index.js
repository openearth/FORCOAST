import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduction",
    component: () => import(/* webpackChunkName: "Introduction" */ "../views/Introduction.vue"),
  },
  {
    path: "/sector=:category&service=:service&area=:area",
    name: "Services",
    component: () => import(/* webpackChunkName: "Services" */ "../views/Services.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
