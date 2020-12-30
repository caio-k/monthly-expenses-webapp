import React from "react";
import useMonthYear from "./monthYearLogic";
import CustomSelectInput from "../../../components/forms/customSelectInput/customSelectInput";
import "./monthYear.css";

function MonthYear(props) {

  const [{years, selectedYear, selectedMonth}, handleSelectedYear, handleSelectedMonth]
    = useMonthYear(props.years, props.selectedMonthYear, props.months);

  function renderYearOption(yearObject) {
    return (
      <option key={yearObject.id} value={yearObject.yearNumber}>{yearObject.yearNumber}</option>
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
        <h3>Escolha de Mês e Ano</h3>
      </div>

      <div className="half-box-content">
        <form onSubmit={(e) => props.handleSubmit(e, selectedYear, props.months.indexOf(selectedMonth), selectedMonth)}>
          <div className="custom-select-content">
            <label>Selecione o ano:</label>
            <CustomSelectInput onChange={handleSelectedYear} value={selectedYear}>
              {years.map(renderYearOption)}
            </CustomSelectInput>
          </div>

          <div className="custom-select-content">
            <label>Selecione o mês:</label>
            <CustomSelectInput onChange={handleSelectedMonth} value={selectedMonth}>
              {props.months.map(renderMonthOption)}
            </CustomSelectInput>
          </div>

          <div className="button-session-month-year">
            <button type="submit">Carregar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MonthYear;
