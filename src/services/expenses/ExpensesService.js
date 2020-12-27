import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expense/";

class ExpensesService {
  getInitializationData() {
    return ServerApi.get(API_PATH + 'get');
  }
}

export default new ExpensesService();
