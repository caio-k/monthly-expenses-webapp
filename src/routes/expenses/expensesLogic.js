import {useEffect, useState} from "react";
import ExpensesService from "../../services/expenses/ExpensesService";
import useNotification from "../../components/notifications/notification";

const useExpenses = () => {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const createMonthYearObject = (yearNumber, monthNumber) => {
    if (monthNumber >= 0 && monthNumber <= 11 && yearNumber) {
      return {
        monthName: months[parseInt(monthNumber, 10)],
        monthNumber: parseInt(monthNumber, 10),
        yearNumber: parseInt(yearNumber, 10)
      }
    } else {
      return {}
    }
  }

  const [years, setYears] = useState([]);
  const [monthYearsSought, setMonthYearsSought] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [initialMoneyOnFocus, setInitialMoneyOnFocus] = useState(null);
  const [initialMoneyList, setInitialMoneyList] = useState([]);
  const [expensesOnFocus, setExpensesOnFocus] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState(createMonthYearObject());
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [handleErrorNotification] = useNotification();

  useEffect(() => {
    ExpensesService.getInitializationData().then(
      response => {
        const selectedMonthYear = createMonthYearObject(response.data.selectedYearNumber, response.data.selectedMonth);

        setYears(response.data.years);
        setMonthYearsSought([selectedMonthYear]);
        setSelectedMonthYear(selectedMonthYear);
        setExpenseTypes(response.data.expenseTypes);
        setInitialMoneyOnFocus(response.data.initialMoney);
        setInitialMoneyList(response.data.initialMoney === null ? [] : [response.data.initialMoney]);
        setExpensesOnFocus(response.data.expenseInfos);
        setAllExpenses(response.data.expenseInfos);
        setLoadingComponent(false);
        setLoadingError(false);
      },
      () => {
        setLoadingComponent(false);
        setLoadingError(true);
      }
    )
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e, year, month) => {
    e.preventDefault();

    const actualMonthYear = createMonthYearObject(year, month);
    setSelectedMonthYear(actualMonthYear);

    if (checkIfMonthYearAlreadySought(actualMonthYear.yearNumber, actualMonthYear.monthNumber)) {
      setNewInitialMoneyOnFocus(actualMonthYear.monthNumber, actualMonthYear.yearNumber);
      setNewExpensesOnFocus(actualMonthYear.monthNumber, actualMonthYear.yearNumber);
    } else {
      setMonthYearsSought(list => [...list, actualMonthYear]);

      ExpensesService.getByMonthAndYear(actualMonthYear.monthNumber, actualMonthYear.yearNumber).then(
        response => {
          addInitialMoneyOnListAndFocus(response.data.initialMoney);
          addExpensesOnListAndFocus(response.data.expenseInfos);
        },
        error => {
          handleErrorNotification(error);
        }
      )
    }
  }

  const checkIfMonthYearAlreadySought = (yearNumber, monthNumber) => {
    return monthYearsSought.some(element =>
      element.yearNumber === yearNumber && element.monthNumber === monthNumber
    );
  }

  const addInitialMoneyOnListAndFocus = (initialMoneyObject) => {
    if (initialMoneyObject) {
      setInitialMoneyOnFocus(initialMoneyObject);
      setInitialMoneyList(list => [...list, initialMoneyObject]);
    } else {
      setInitialMoneyOnFocus(null);
    }
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

  const setNewInitialMoneyOnFocus = (month, year) => {
    const initialMoneyIndex = initialMoneyList.findIndex(element =>
      element.year === year && element.month === month
    );

    setInitialMoneyOnFocus(initialMoneyIndex < 0 ? null : initialMoneyList[initialMoneyIndex]);
  }

  const addExpensesOnListAndFocus = (expenses) => {
    setExpensesOnFocus(expenses);
    setAllExpenses(list => [...list, expenses]);
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
