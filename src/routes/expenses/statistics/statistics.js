import React from "react";
import useStatistics from "./statisticsLogic";
import "./statistics.css";

function Statistics(props) {
  const [emptyChart, moneyAvailable, totalSpent, openExpensesPrice]
    = useStatistics(props.expensesOnFocus, props.initialMoneyOnFocus, props.expenseTypes);

  return (
    <div className="expenses-box-session full-box">
      <div className="expenses-box-session-header">
        <h3>Estatísticas</h3>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>

      <div className="statistics-container">
        <div className="statistics-box">
          {!props.initialMoneyOnFocus && (
            <div className="simple-statistics-message">
              <p>Cadastre o capital inicial para obter métricas!</p>
            </div>
          )}

          {props.initialMoneyOnFocus && (
            <div className="statistic-numbers-card">
              <div>
                <div style={{backgroundColor: "#a98467"}}>
                  <p>R$ {props.initialMoneyOnFocus.initialMoney.toFixed(2)}</p>
                  <p>Capital inicial</p>
                </div>

                {moneyAvailable >= 0 && (
                  <div style={{backgroundColor: "#06d6a0"}}>
                    <p>R$ {moneyAvailable}</p>
                    <p>Capital disponível</p>
                  </div>
                )}

                {moneyAvailable < 0 && (
                  <div style={{backgroundColor: "#e92f44"}}>
                    <p>R$ {moneyAvailable}</p>
                    <p>Capital excedente</p>
                  </div>
                )}
              </div>

              <div>
                <div style={{backgroundColor: "#284b63"}}>
                  <p>R$ {totalSpent}</p>
                  <p>Despesas pagas</p>
                </div>

                <div style={{backgroundColor: "#f8c867"}}>
                  <p>R$ {openExpensesPrice}</p>
                  <p>Despesas em aberto</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="statistics-box">
          {emptyChart && (
            <div className="simple-statistics-message">
              <p>Nenhuma despesa paga!</p>
            </div>
          )}

          <div className="statistics-chart-container">
            <canvas id="statistics-chart" width="400" height="300"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
