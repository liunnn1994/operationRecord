import Vue from "vue";
import App from "./App.vue";
import { Button, Select, Radio } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

[Button, Select, Radio].forEach((component) => {
  Vue.use(component);
});
Vue.prototype.$ELEMENT = { size: "small" };
new Vue({
  el: "#app",
  render: (h) => h(App),
});
