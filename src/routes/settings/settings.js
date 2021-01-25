import React from "react";
import Year from "./years/year";
import ExpenseType from "./expenseType/expenseType";
import useSettings from "./settingsLogic";
import RoundLoading from "../../components/loading/roundLoading/roundLoading";
import ErrorMessageContainer from "../../components/error/errorMessageContainer";
import "../../App.css";
import "./settings.css";

function Settings() {

  const [{years, expenseTypes, loadingComponent, loadingError}] = useSettings();

  return (
    <div className="page-container">

      {loadingComponent && (
        <RoundLoading/>
      )}

      {!loadingComponent && loadingError && (
        <ErrorMessageContainer message={"Ocorreu um erro ao carregar a página!"}/>
      )}

      {!loadingComponent && !loadingError && (
        <div className="settings-container">
          <Year years={years}/>
          <ExpenseType expenseTypes={expenseTypes}/>
        </div>
      )}
    </div>
  )
}

export default Settings;
