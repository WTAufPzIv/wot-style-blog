import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers/index";
import "@/styles/reset.scss";
import "@/styles/common.scss";
import "@/assets/fonts/font.scss";
import naive from "naive-ui";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";

createApp(App).use(router).use(naive).mount("#app");
