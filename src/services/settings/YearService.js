import ServerApi from "../api/ServerApi";
import AuthService from "../auth/AuthService";

const API_PATH = "/api/year/";

class YearService {

  createYear(yearNumber) {
    return ServerApi.post(API_PATH + 'create', {
      userId: AuthService.getCurrentUser().id,
      yearNumber
    });
  }

  updateYear(yearId, yearNumber) {
    return ServerApi.put(API_PATH + 'update', {
      userId: AuthService.getCurrentUser().id,
      yearId,
      yearNumber
    });
  }

  deleteYear(yearId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        userId: AuthService.getCurrentUser().id,
        yearId
      }
    });
  }
}

export default new YearService();
