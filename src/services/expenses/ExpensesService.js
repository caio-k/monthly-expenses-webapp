import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expense/";

class ExpensesService {
  getInitializationData() {
    return ServerApi.get(API_PATH + 'getInitializationData');
  }

  getByMonthAndYear(monthNumber, yearNumber) {
    return ServerApi.get(API_PATH + 'getByMonthAndYear', {
      params: {
        monthNumber,
        yearNumber
      }
    });
  }
}

export default new ExpensesService();
