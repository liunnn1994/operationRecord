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
} from "element-plus";
import locale from "element-plus/lib/locale";
import lang from "element-plus/lib/locale/lang/zh-cn";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
].forEach((component: any) => {
  app.use(component);
});
app.mount("#app");
