import VueRouter from "vue-router";
import Map from "../components/Map";
import Home from "../components/Home";
import About from "../components/About";

export default new VueRouter({
  routes: [
    {
      path: "/map",
      component: Map,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
