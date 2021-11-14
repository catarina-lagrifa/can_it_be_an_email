import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/share-some-details",
    name: "share",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ShareSomeDetails.vue"),
  },
  {
    path: "/email",
    name: "Email",
    component: () =>
      import(/* webpackChunkName: "email" */ "../views/Email.vue"),
  },
  {
    path: "/meeting",
    name: "Meeting",
    component: () =>
      import(/* webpackChunkName: "meeting" */ "../views/Meeting.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
