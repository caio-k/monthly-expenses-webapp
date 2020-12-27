import ServerApi from "../api/ServerApi";

const API_PATH = "/api/year/";

class YearService {

  createYear(yearNumber) {
    return ServerApi.post(API_PATH + 'create', {
      yearNumber
    });
  }

  updateYear(yearId, yearNumber) {
    return ServerApi.put(API_PATH + 'update', {
      yearId,
      yearNumber
    });
  }

  deleteYear(yearId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        yearId
      }
    });
  }
}

export default new YearService();
