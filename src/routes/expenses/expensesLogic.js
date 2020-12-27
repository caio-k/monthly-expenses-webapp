import {useEffect, useState} from "react";
import ExpensesService from "../../services/expenses/ExpensesService";

const useExpenses = () => {
  const [years, setYears] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [initialMoneys, setInitialMoneys] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    ExpensesService.getInitializationData().then(
      response => {
        setYears(response.data.years);
        setExpenseTypes(response.data.expenseTypes);
        setInitialMoneys(response.data.initialMoneys);
        setExpenses(response.data.expenseInfos);
        setSelectedYearId(response.data.selectedYearId);
        setSelectedMonth(response.data.selectedMonth);
        setLoadingComponent(false);
        setLoadingError(false);
      },
      () => {
        setLoadingComponent(false);
        setLoadingError(true);
      }
    )
  }, [])

  const handleSubmit = (e, year, month) => {
    e.preventDefault();
    console.log(year);
    console.log(month);
  }

  return [{
    years,
    expenseTypes,
    initialMoneys,
    expenses,
    selectedYearId,
    selectedMonth,
    loadingComponent,
    loadingError
  }, handleSubmit];
}

export default useExpenses;
