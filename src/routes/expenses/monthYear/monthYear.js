import React from "react";
import useMonthYear from "./monthYearLogic";
import RoundLoading from "../../../components/loading/roundLoading/roundLoading";
import "./monthYear.css";

function MonthYear() {

  const [{years, loadingComponent, selectedYear, selectedMonth, months, initialLoadingErrorMessage},
    handleSelectedYear, handleSelectedMonth] = useMonthYear();

  function renderYearOption(yearObject) {
    return (
      <option key={yearObject.id} value={yearObject.id}>{yearObject.yearNumber}</option>
    )
  }

  function renderMonthOption(monthObject) {
    return (
      <option key={monthObject} value={monthObject}>{monthObject}</option>
    )
  }

  return (
    <div className="month-year-container">
      <div className="month-year-header">
        <h3>Escolha de mês e ano</h3>
      </div>

      <div className="month-year-content">
        {loadingComponent && (
          <RoundLoading/>
        )}

        {!loadingComponent && (
          <div>
            {initialLoadingErrorMessage && (
              <h4>Oops: Ocorreu um erro ao acessar o servidor!</h4>
            )}

            {!initialLoadingErrorMessage && (
              // TODO colocar submit no form
              <form>
                <div className="custom-select-content">
                  <label>Selecione o ano:</label>
                  <div className="custom-select-input">
                    <select value={selectedYear.id} onChange={handleSelectedYear}>
                      {years.map(renderYearOption)}
                    </select>
                  </div>
                </div>

                <div className="custom-select-content">
                  <label>Selecione o mês:</label>
                  <div className="custom-select-input">
                    <select value={selectedMonth} onChange={handleSelectedMonth}>
                      {months.map(renderMonthOption)}
                    </select>
                  </div>
                </div>

                <div className="button-session-month-year">
                  <button type="submit">Carregar</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MonthYear;
