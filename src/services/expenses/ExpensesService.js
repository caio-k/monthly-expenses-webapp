import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expense/";

class ExpensesService {
  getInitializationData() {
    return ServerApi.get(API_PATH + 'initialization-data');
  }

  getByMonthAndYear(monthNumber, yearNumber) {
    return ServerApi.get(API_PATH + 'by-month-and-year', {
      params: {
        monthNumber,
        yearNumber
      }
    });
  }
}

export default new ExpensesService();
