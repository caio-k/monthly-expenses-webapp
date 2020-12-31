import React from "react";
import "./expensesInfo.css";

function ExpensesInfo(props) {
  return (
    <div className="expenses-box-session full-box">
      <div className="expenses-box-session-header">
        <h3>Despesas</h3>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>
    </div>
  )
}

export default ExpensesInfo;
