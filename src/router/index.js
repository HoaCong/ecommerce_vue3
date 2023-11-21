import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import { loginStore } from "../stores/login";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!["login", "register"].includes(to.name) && !loginStore().user.username) {
    next({ name: "login" });
  } else if (to.name === "login" && loginStore().user.username) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
