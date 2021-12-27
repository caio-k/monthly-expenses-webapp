import ServerApi from "../api/ServerApi";

const API_PATH = "/api/initial-money/";

class InitialMoneyService {
  createInitialMoney(yearNumber, month, initialMoney) {
    return ServerApi.post(API_PATH, {
      yearNumber,
      month,
      initialMoney
    });
  }

  updateYear(initialMoneyId, initialMoney) {
    return ServerApi.put(API_PATH, {
      initialMoneyId,
      initialMoney
    });
  }
}

export default new InitialMoneyService();
