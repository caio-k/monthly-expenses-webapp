import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expenseType/";

class ExpenseTypeService {

  createExpenseType(expenseTypeName) {
    return ServerApi.post(API_PATH + 'create', {
      expenseTypeName
    });
  }

  updateExpenseType(id, expenseTypeName) {
    return ServerApi.put(API_PATH + 'update', {
      id,
      expenseTypeName
    });
  }

  deleteExpenseType(expenseTypeId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        expenseTypeId
      }
    });
  }
}

export default new ExpenseTypeService();
