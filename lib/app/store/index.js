import { createStore } from "vuex";
import loading from "./modules/loading";

export default createStore({
  modules: {
    loading,
  },
});
