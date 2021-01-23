import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Select,
  Radio,
  Collapse,
  CollapseItem,
  Tag,
  Form,
  FormItem,
  Input,
  InputNumber,
  ColorPicker,
  Message,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

[
  Button,
  Select,
  Radio,
  Collapse,
  CollapseItem,
  Tag,
  Form,
  FormItem,
  Input,
  InputNumber,
  ColorPicker,
].forEach((component) => {
  Vue.use(component);
});
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: "small" };
new Vue({
  el: "#app",
  render: (h) => h(App),
});
