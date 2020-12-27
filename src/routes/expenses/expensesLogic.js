import {useEffect, useState} from "react";
import ExpensesService from "../../services/expenses/ExpensesService";

const useExpenses = () => {
  const [years, setYears] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [initialMoneys, setInitialMoneys] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    ExpensesService.getInitializationData().then(
      response => {
        setYears(response.data.years);
        setExpenseTypes(response.data.expenseTypes);
        setInitialMoneys(response.data.initialMoneys);
        setExpenses(response.data.expenseInfos);
        setLoadingComponent(false);
        setLoadingError(false);
      },
      () => {
        setLoadingComponent(false);
        setLoadingError(true);
      }
    )
  }, [])

  return [{years, expenseTypes, initialMoneys, expenses, loadingComponent, loadingError}];
}

export default useExpenses;
