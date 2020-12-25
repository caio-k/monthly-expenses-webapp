import React from "react";
import Year from "./years/year";
import ExpenseType from "./expenseType/expenseType";
import "./settings.css";

function Settings() {

  return (
    <div className="settings-container">
      <Year/>
      <ExpenseType/>
    </div>
  )
}

export default Settings;
