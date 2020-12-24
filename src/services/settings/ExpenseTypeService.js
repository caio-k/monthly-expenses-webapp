import ServerApi from "../api/ServerApi";

const API_PATH = "/api/expenseType/";

class ExpenseTypeService {
  getExpenseTypes(userId) {
    return ServerApi.get(API_PATH + 'get', {
      params: {
        userId
      }
    });
  }

  createExpenseType(userId, expenseTypeName) {
    return ServerApi.post(API_PATH + 'create', {
      userId,
      expenseTypeName
    });
  }

  updateExpenseType(userId, id, expenseTypeName) {
    return ServerApi.put(API_PATH + 'update', {
      userId,
      id,
      expenseTypeName
    });
  }

  deleteExpenseType(userId, expenseTypeId) {
    return ServerApi.delete(API_PATH + 'delete', {
      params: {
        userId,
        expenseTypeId
      }
    });
  }
}

export default new ExpenseTypeService();
