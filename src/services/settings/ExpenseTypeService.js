import ServerApi from "../api/ServerApi";
import AuthService from "../auth/AuthService";

const API_PATH = "/api/expenseType/";

class ExpenseTypeService {

  createExpenseType(expenseTypeName) {
    return ServerApi.post(API_PATH + 'create', {
      userId: AuthService.getCurrentUser().id,
      expenseTypeName
    });
  }

  updateExpenseType(id, expenseTypeName) {
    return ServerApi.put(API_PATH + 'update', {
      userId: AuthService.getCurrentUser().id,
      id,
      expenseTypeName
    });
  }

  deleteExpenseType(expenseTypeId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        userId: AuthService.getCurrentUser().id,
        expenseTypeId
      }
    });
  }
}

export default new ExpenseTypeService();
