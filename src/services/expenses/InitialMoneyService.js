import ServerApi from "../api/ServerApi";

const API_PATH = "/api/initialMoney/";

class InitialMoneyService {
  createInitialMoney(yearNumber, month, initialMoney) {
    return ServerApi.post(API_PATH + 'create', {
      yearNumber,
      month,
      initialMoney
    });
  }

  updateYear(initialMoneyId, initialMoney) {
    return ServerApi.put(API_PATH + 'update', {
      initialMoneyId,
      initialMoney
    });
  }
}

export default new InitialMoneyService();
