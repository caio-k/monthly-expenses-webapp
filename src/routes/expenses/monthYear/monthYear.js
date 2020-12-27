import React from "react";
import useMonthYear from "./monthYearLogic";
import "./monthYear.css";

function MonthYear(props) {

  const [{years, selectedYear, selectedMonth, months}, handleSelectedYear, handleSelectedMonth]
    = useMonthYear(props.years, props.selectedYearId, props.selectedMonth);

  function renderYearOption(yearObject) {
    return (
      <option key={yearObject.id} value={yearObject.id}>{yearObject.yearNumber}</option>
    )
  }

  function renderMonthOption(month) {
    return (
      <option key={month} value={month}>{month}</option>
    )
  }

  return (
    <div className="half-box">
      <div className="half-box-header">
        <h3>Escolha de mês e ano</h3>
      </div>

      <div className="half-box-content">
        {years.length === 0 && (
          <p>Você ainda não cadastrou nenhum ano. Vá até a aba de "Configurações" e cadastre agora mesmo!</p>
        )}

        {years.length > 0 && (
          <form onSubmit={(e) => props.handleSubmit(e, selectedYear, months.indexOf(selectedMonth))}>
            <div className="custom-select-content">
              <label>Selecione o ano:</label>
              <div className="custom-select-input">
                <select onChange={handleSelectedYear} value={selectedYear}>
                  {years.map(renderYearOption)}
                </select>
              </div>
            </div>

            <div className="custom-select-content">
              <label>Selecione o mês:</label>
              <div className="custom-select-input">
                <select onChange={handleSelectedMonth} value={selectedMonth}>
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
    </div>
  )
}

export default MonthYear;
