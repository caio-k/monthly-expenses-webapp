import ServerApi from "../api/ServerApi";

const API_PATH = "/api/year/";

class YearService {

  createYear(userId, yearNumber) {
    return ServerApi.post(API_PATH + 'create', {
      userId,
      yearNumber
    });
  }

  updateYear(userId, yearId, yearNumber) {
    return ServerApi.put(API_PATH + 'update', {
      userId,
      yearId,
      yearNumber
    });
  }

  deleteYear(userId, yearId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        userId,
        yearId
      }
    });
  }
}

export default new YearService();
