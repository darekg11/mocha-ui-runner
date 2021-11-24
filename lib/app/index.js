import { createApp } from "vue";
import { Quasar, Loading, Notify } from "quasar";
import store from "./store";
import App from "./pages/App.vue";
import Header from "./components/header/Header.vue";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/bootstrap-icons/bootstrap-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);
app.component("AppHeader", Header);
app.use(Quasar, {
  plugins: [Loading, Notify],
});
app.use(store);
app.mount("#q-app");
