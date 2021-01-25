import React from "react";
import useStatistics from "./statisticsLogic";
import "./statistics.css";

function Statistics(props) {
  const [emptyChart, moneyAvailable, openExpensesPrice]
    = useStatistics(props.expensesOnFocus, props.initialMoneyOnFocus, props.expenseTypes);

  return (
    <div className="expenses-box-session full-box">
      <div className="expenses-box-session-header">
        <h3>Estatísticas</h3>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>

      <div className="statistics-container">
        <div className="statistics-box">
          <div>
            <h4>Métricas</h4>
          </div>

          {!props.initialMoneyOnFocus && (
            <div className="simple-statistics-message">
              <p>Cadastre o capital inicial para mais estatísticas!</p>
            </div>
          )}

          {props.initialMoneyOnFocus && (
            <div className="statistic-numbers-card">
              <div style={{backgroundColor: "#48cae4"}}>
                <p>R${props.initialMoneyOnFocus.initialMoney.toFixed(2)}</p>
                <p>Capital inicial</p>
              </div>

              {moneyAvailable >= 0 && (
                <div style={{backgroundColor: "#06d6a0"}}>
                  <p>R${moneyAvailable}</p>
                  <p>Capital disponível</p>
                </div>
              )}

              {moneyAvailable < 0 && (
                <div style={{backgroundColor: "#e71d36"}}>
                  <p>R${moneyAvailable}</p>
                  <p>Capital excedente</p>
                </div>
              )}

              <div style={{backgroundColor: "#ffd166"}}>
                <p>R${openExpensesPrice}</p>
                <p>Despesas em aberto</p>
              </div>
            </div>
          )}
        </div>

        <div className="statistics-box">
          <div>
            <h4>Gráfico de Gastos</h4>
          </div>

          <div style={{width: emptyChart ? "0px" : "330px", height: emptyChart ? "0px" : "330px"}}
               className="statistics-chart-container">
            <canvas id="statistics-chart" width="330" height="330"/>
          </div>

          {emptyChart && (
            <div className="simple-statistics-message">
              <p>Oops! Nenhuma despesa paga!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistics;
