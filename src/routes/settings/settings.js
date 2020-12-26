import React from "react";
import Year from "./years/year";
import ExpenseType from "./expenseType/expenseType";
import "../../App.css";

function Settings() {

  return (
    <div className="page-container">
      <Year/>
      <ExpenseType/>
    </div>
  )
}

export default Settings;
