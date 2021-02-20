import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "VideoList",
    title: "列表",
    component: () =>
      import(/* webpackChunkName: "videoList" */ "../views/VideoList.vue"),
  },
  {
    path: "/details",
    name: "Details",
    title: "详情",
    component: () =>
      import(/* webpackChunkName: "videoList" */ "../views/Details.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
