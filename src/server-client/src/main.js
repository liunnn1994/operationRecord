import { createApp } from "vue";
import { ElButton } from "element-plus";
import App from "./App.vue";

const app = createApp(App);
app.use(ElButton);
app.mount("#app");
