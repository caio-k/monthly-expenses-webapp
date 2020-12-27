import ServerApi from "../api/ServerApi";
import AuthService from "../auth/AuthService";

const API_PATH = "/api/settings/";

class SettingsService {
  getInitializationData() {
    return ServerApi.get(API_PATH + 'get', {
      params: {
        userId: AuthService.getCurrentUser().id
      }
    });
  }
}

export default new SettingsService();
