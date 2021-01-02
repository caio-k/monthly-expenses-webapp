import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expenseInfo/";

class ExpensesInfoService {
  createExpenseInfo(yearNumber, monthNumber, name, price, paid, expenseTypeId) {
    return ServerApi.post(API_PATH + 'post', {
      yearNumber,
      monthNumber,
      name,
      price,
      paid,
      expenseTypeId
    });
  }

  updateExpenseInfo(expenseId, name, price, paid, expenseTypeId) {
    return ServerApi.put(API_PATH + 'update', {
      name,
      price,
      paid,
      expenseTypeId
    });
  }

  deleteExpenseInfo(expenseId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        expenseId
      }
    });
  }
}

export default new ExpensesInfoService();
