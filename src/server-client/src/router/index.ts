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
    path: "/about",
    name: "About",
    title: "关于",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
