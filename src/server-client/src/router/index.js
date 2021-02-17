import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "VideoList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VideoList.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
