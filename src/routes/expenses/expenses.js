import React from "react";
import useExpenses from "./expensesLogic";
import RoundLoading from "../../components/loading/roundLoading/roundLoading";
import ErrorMessageContainer from "../../components/error/errorMessageContainer";
import MonthYear from "./monthYear/monthYear";
import InitialMoney from "./initialMoney/initialMoney";
import ExpensesInfo from "./expenses/expensesInfo";
import "../../App.css";
import "./expenses.css";

function Expenses() {
  const [{years, expenseTypes, initialMoneys, expenses, selectedYearId, selectedMonth, loadingComponent, loadingError},
    handleSubmit] = useExpenses();

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
          <MonthYear years={years} handleSubmit={handleSubmit} selectedYearId={selectedYearId}
                     selectedMonth={selectedMonth}/>
          <InitialMoney initialMoneys={initialMoneys}/>
          <ExpensesInfo expenseTypes={expenseTypes} expenses={expenses}/>
        </>
      )}
    </div>
  )
}

export default Expenses;
