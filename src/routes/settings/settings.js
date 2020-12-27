import React from "react";
import Year from "./years/year";
import ExpenseType from "./expenseType/expenseType";
import useSettings from "./settingsLogic";
import RoundLoading from "../../components/loading/roundLoading/roundLoading";
import "../../App.css";

function Settings() {

  const [{years, expenseTypes, loadingComponent, loadingError}] = useSettings();

  return (
    <div className="page-container">

      {loadingComponent && (
        <RoundLoading/>
      )}

      {!loadingComponent && loadingError && (
        <p>Ocorreu um erro ao carregar os dados!</p>
      )}

      {!loadingComponent && !loadingError && (
        <>
          <Year years={years}/>
          <ExpenseType expenseTypes={expenseTypes}/>
        </>
      )}
    </div>
  )
}

export default Settings;
