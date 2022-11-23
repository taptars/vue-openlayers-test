import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import ElementUI from 'element-ui';
//引入element-ui的所有样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);


new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
