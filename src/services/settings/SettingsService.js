import ServerApi from "../api/ServerApi";

const API_PATH = "/api/settings/";

class SettingsService {
  getInitializationData() {
    return ServerApi.get(API_PATH);
  }
}

export default new SettingsService();
