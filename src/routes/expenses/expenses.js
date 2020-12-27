import React from "react";
import "../../App.css";
import useExpenses from "./expensesLogic";
import RoundLoading from "../../components/loading/roundLoading/roundLoading";
import ErrorMessageContainer from "../../components/error/errorMessageContainer";
import MonthYear from "./monthYear/monthYear";
import InitialMoney from "./initialMoney/initialMoney";
import ExpensesInfo from "./expenses/expensesInfo";

function Expenses() {
  const [{years, expenseTypes, initialMoneys, expenses, loadingComponent, loadingError}] = useExpenses();

  return (
    <div className="page-container">
      {loadingComponent && (
        <RoundLoading/>
      )}

      {!loadingComponent && loadingError && (
        <ErrorMessageContainer message={"Ocorreu um erro ao carregar a página!"}/>
      )}

      {!loadingComponent && !loadingError && (
        <>
          <MonthYear years={years}/>
          <InitialMoney initialMoneys={initialMoneys}/>
          <ExpensesInfo expenseTypes={expenseTypes} expenses={expenses}/>
        </>
      )}
    </div>
  )
}

export default Expenses;
