import ServerApi from "../api/ServerApi";

const API_PATH = "/api/startHeroku/";

class StartServerService {

  startServer() {
    return ServerApi.get(API_PATH + 'start');
  }
}

export default new StartServerService();
