import ServerApi from "../api/ServerApi";

const API_PATH = "/api/settings/";

class SettingsService {
  getInitializationData(userId) {
    return ServerApi.get(API_PATH + 'get', {
      params: {
        userId
      }
    });
  }
}

export default new SettingsService();
