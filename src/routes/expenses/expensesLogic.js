import {useEffect, useState} from "react";
import ExpensesService from "../../services/expenses/ExpensesService";

const useExpenses = () => {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const [years, setYears] = useState([]);
  const [monthYearsSought, setMonthYearsSought] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [initialMoneyOnFocus, setInitialMoneyOnFocus] = useState(null);
  const [initialMoneyList, setInitialMoneyList] = useState([]);
  const [expensesOnFocus, setExpensesOnFocus] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState({monthName: "", monthNumber: -1, yearNumber: -1});
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    ExpensesService.getInitializationData().then(
      response => {
        const selectedMonthYear = {
          monthName: months[parseInt(response.data.selectedMonth, 10)],
          monthNumber: parseInt(response.data.selectedMonth, 10),
          yearNumber: parseInt(response.data.selectedYearNumber, 10)
        }

        setYears(response.data.years);
        setMonthYearsSought([selectedMonthYear]);
        setExpenseTypes(response.data.expenseTypes);
        setInitialMoneyOnFocus(response.data.initialMoney);
        setInitialMoneyList(response.data.initialMoney === null ? [] : [response.data.initialMoney]);
        setExpensesOnFocus(response.data.expenseInfos);
        setAllExpenses(response.data.expenseInfos);
        setSelectedMonthYear(selectedMonthYear);
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

    const actualMonthYear = {
      monthName: months[parseInt(month, 10)],
      monthNumber: parseInt(month, 10),
      yearNumber: parseInt(year, 10)
    }

    setSelectedMonthYear(actualMonthYear);

    if (checkIfMonthYearAlreadySought(actualMonthYear.yearNumber, actualMonthYear.monthNumber)) {
      setNewInitialMoneyOnFocus(actualMonthYear.monthNumber, actualMonthYear.yearNumber);
      setNewExpensesOnFocus(actualMonthYear.monthNumber, actualMonthYear.yearNumber);
    } else {
      setMonthYearsSought(list => [...list, actualMonthYear]);

      ExpensesService.getByMonthAndYear(actualMonthYear.monthNumber, actualMonthYear.yearNumber).then(
        response => {
          if (response.data.initialMoney) {
            addInitialMoneyOnListAndFocus(response.data.initialMoney);
          } else {
            setInitialMoneyOnFocus(null);
          }

          addExpensesOnListAndFocus(response.data.expenseInfos);
        },
        () => {

        }
      )
    }
  }

  const addInitialMoneyOnListAndFocus = (initialMoneyObject) => {
    setInitialMoneyOnFocus(initialMoneyObject);
    setInitialMoneyList(list => [...list, initialMoneyObject]);
  }

  const updateInitialMoneyOnListAndFocus = (initialMoneyObject) => {
    const index = initialMoneyList.findIndex(element =>
      element.initialMoneyId === initialMoneyObject.initialMoneyId
    )

    if (index >= 0) {
      setInitialMoneyOnFocus(initialMoneyObject);

      let newList = [...initialMoneyList];
      newList[index] = initialMoneyObject;
      setInitialMoneyList(newList);
    }
  }

  const addExpensesOnListAndFocus = (expenses) => {
    setExpensesOnFocus(expenses);
    setAllExpenses(list => [...list, expenses]);
  }

  const checkIfMonthYearAlreadySought = (yearNumber, monthNumber) => {
    return monthYearsSought.some(element =>
      element.yearNumber === yearNumber && element.monthNumber === monthNumber
    );
  }

  const setNewInitialMoneyOnFocus = (month, year) => {
    const initialMoneyIndex = initialMoneyList.findIndex(element =>
      element.year === year && element.month === month
    );

    setInitialMoneyOnFocus(initialMoneyIndex < 0 ? null : initialMoneyList[initialMoneyIndex]);
  }

  const setNewExpensesOnFocus = (month, year) => {
    const expensesSelected = allExpenses.filter(element =>
      (element.year === year && element.month === month)
    );

    setExpensesOnFocus(expensesSelected);
  }

  return [{
    months,
    years,
    expenseTypes,
    initialMoneyOnFocus,
    expensesOnFocus,
    selectedMonthYear,
    loadingComponent,
    loadingError
  }, handleSubmit, addInitialMoneyOnListAndFocus, updateInitialMoneyOnListAndFocus];
}

export default useExpenses;
