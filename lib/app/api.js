import axios from "axios";

class API {
  async getAppInfo() {
    try {
      const result = await axios.get("/info");
      return result.data;
    } catch (error) {
      console.error("[web-app][api][getAppInfo][error] Error occured: %s", error);
      throw error;
    }
  }
}

export default API;
