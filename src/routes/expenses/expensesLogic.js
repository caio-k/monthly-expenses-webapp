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
  const [handleSuccessNotification, handleErrorNotification] = useNotification();

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
      handleSuccessNotification("Dados carregados!");
    } else {
      setMonthYearsSought(list => [...list, actualMonthYear]);

      ExpensesService.getByMonthAndYear(actualMonthYear.monthNumber, actualMonthYear.yearNumber).then(
        response => {
          addInitialMoneyOnListAndFocus(response.data.initialMoney);
          addExpensesListOnListAndFocus(response.data.expenseInfos);
          handleSuccessNotification("Dados carregados!");
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

  const addExpensesListOnListAndFocus = (expenses) => {
    setExpensesOnFocus(expenses);

    let allExpensesCopy = [...allExpenses];
    expenses.forEach(element => {
      allExpensesCopy.push(element);
    });
    setAllExpenses(allExpensesCopy);
  }

  const addExpenseObjectOnListAndFocus = (expenseObject) => {
    if (expenseObject) {
      setExpensesOnFocus(list => [...list, expenseObject]);
      setAllExpenses(list => [...list, expenseObject]);
    }
  }

  const setNewExpensesOnFocus = (month, year) => {
    const expensesSelected = allExpenses.filter(element =>
      (element.year === year && element.month === month)
    );

    setExpensesOnFocus(expensesSelected);
  }

  const updateExpenseInfo = (expenseInfo) => {
    const expenseInfoIndex = allExpenses.findIndex(element => element.id === expenseInfo.id);

    if (expenseInfoIndex >= 0) {
      const expenseInfoIndexOnFocus = expensesOnFocus.findIndex(element => element.id === expenseInfo.id);
      const oldExpenseInfo = allExpenses[expenseInfoIndex];

      oldExpenseInfo.name = expenseInfo.name;
      oldExpenseInfo.paid = expenseInfo.paid;
      oldExpenseInfo.price = expenseInfo.price;
      oldExpenseInfo.expenseTypeId = expenseInfo.expenseTypeId;

      let newAllExpensesList = [...allExpenses];
      newAllExpensesList[expenseInfoIndex] = oldExpenseInfo;
      setAllExpenses(newAllExpensesList);

      let newExpensesOnFocusList = [...expensesOnFocus];
      newExpensesOnFocusList[expenseInfoIndexOnFocus] = oldExpenseInfo;
      setExpensesOnFocus(newExpensesOnFocusList);
    }
  }

  const deleteExpenseInfo = (expenseInfo) => {
    setAllExpenses(allExpenses.filter(element => element.id !== expenseInfo.id));
    setExpensesOnFocus(expensesOnFocus.filter(element => element.id !== expenseInfo.id));
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
  }, handleSubmit, addInitialMoneyOnListAndFocus, updateInitialMoneyOnListAndFocus, addExpenseObjectOnListAndFocus,
    updateExpenseInfo, deleteExpenseInfo];
}

export default useExpenses;
