import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/assets";

import { registStore } from "@/store/store";

const app = createApp(App);
app.use(router);

registStore(app);

app.mount("#app");
