import React from "react";
import useExpenses from "./expensesLogic";
import RoundLoading from "../../components/loading/roundLoading/roundLoading";
import ErrorMessageContainer from "../../components/error/errorMessageContainer";
import MonthYear from "./monthYear/monthYear";
import InitialMoney from "./initialMoney/initialMoney";
import ExpensesInfo from "./expenses/expensesInfo";
import Statistics from "./statistics/statistics";
import "../../App.css";
import "./expenses.css";

function Expenses() {
  const [{
    months, years, expenseTypes, initialMoneyOnFocus, expensesOnFocus, selectedMonthYear, loadingComponent,
    loadingError
  }, handleSubmit, addInitialMoneyOnListAndFocus, updateInitialMoneyOnListAndFocus, addExpenseObjectOnListAndFocus,
    updateExpenseInfo, deleteExpenseInfo] = useExpenses();

  return (
    <div className="page-container">
      {loadingComponent && (
        <RoundLoading/>
      )}

      {!loadingComponent && loadingError && (
        <ErrorMessageContainer message={"Ocorreu um erro ao carregar a página!"}/>
      )}

      {!loadingComponent && !loadingError && (
        <div className="expenses-box">
          {years.length === 0 && (
            <ErrorMessageContainer
              message={"Você ainda não cadastrou nenhum ano. Vá até a aba de \"Configurações\" e cadastre agora mesmo!"}/>
          )}

          {years.length > 0 && (
            <>
              <MonthYear months={months} years={years} handleSubmit={handleSubmit}
                         selectedMonthYear={selectedMonthYear}/>
              <InitialMoney initialMoneyOnFocus={initialMoneyOnFocus} selectedMonthYear={selectedMonthYear}
                            addInitialMoneyOnListAndFocus={addInitialMoneyOnListAndFocus}
                            updateInitialMoneyOnListAndFocus={updateInitialMoneyOnListAndFocus}/>
              <ExpensesInfo expenseTypes={expenseTypes} expensesOnFocus={expensesOnFocus}
                            selectedMonthYear={selectedMonthYear}
                            addExpenseObjectOnListAndFocus={addExpenseObjectOnListAndFocus}
                            updateExpenseInfo={updateExpenseInfo} deleteExpenseInfo={deleteExpenseInfo}/>
              <Statistics expensesOnFocus={expensesOnFocus} selectedMonthYear={selectedMonthYear}
                          initialMoneyOnFocus={initialMoneyOnFocus} expenseTypes={expenseTypes}/>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Expenses;
