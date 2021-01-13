import { createApp } from "vue";
import initElement from "./plugins/element";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);
initElement(app);

app.mount("#app");
