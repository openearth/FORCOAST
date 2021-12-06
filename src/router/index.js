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
    path: "/:category_id",
    name: "Category",
    component: () => import(/* webpackChunkName: "Services" */ "../views/Services.vue"),
  },
  {
    path: "/:category_id/:area_id",
    name: "Area",
    component: () => import(/* webpackChunkName: "Services" */ "../views/Services.vue"),
  },
  {
    //path: "/:service_id",
    path: "/:category_id/:area_id/:service_id",
    name: "Service",
    component: () => import(/* webpackChunkName: "Services" */ "../views/Services.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
