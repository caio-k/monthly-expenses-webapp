import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expense-type/";

class ExpenseTypeService {

  createExpenseType(expenseTypeName) {
    return ServerApi.post(API_PATH, {
      expenseTypeName
    });
  }

  updateExpenseType(id, expenseTypeName) {
    return ServerApi.put(API_PATH, {
      id,
      expenseTypeName
    });
  }

  deleteExpenseType(expenseTypeId) {
    return ServerApi.delete(API_PATH, {
      params: {
        expenseTypeId
      }
    });
  }
}

export default new ExpenseTypeService();
