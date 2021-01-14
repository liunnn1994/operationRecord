import { createApp } from "vue";
import { ElButton } from "element-plus";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(ElButton);
app
  .use(store)
  .use(router)
  .mount("#app");
