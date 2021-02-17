import { createApp } from "vue";
import {
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElLink,
  ElDivider,
  ElPageHeader,
  ElIcon,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessageBox,
  ElMessage,
} from "element-plus";
import locale from "element-plus/lib/locale";
import lang from "element-plus/lib/locale/lang/zh-cn";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);

app.use(router);

[faGithub, faHome, faInfoCircle].forEach((icon) => {
  library.add(icon);
});

app.component("fa-icon", FontAwesomeIcon);
locale.use(lang);
[
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElLink,
  ElDivider,
  ElPageHeader,
  ElIcon,
  ElTable,
  ElTableColumn,
  ElPagination,
].forEach((component: any) => {
  app.component(component.name, component);
});

[ElMessageBox, ElMessage].forEach((plugin: any) => {
  app.use(plugin);
});

app.mount("#app");
