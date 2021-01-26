import {useEffect, useState} from "react";
import Chart from "chart.js";

const useStatistics = (expensesOnFocus, initialMoneyOnFocus, expenseTypes) => {

  const [statisticsChart, setStatisticsChart] = useState();
  const [emptyChart, setEmptyChart] = useState(true);
  const [moneyAvailable, setMoneyAvailable] = useState(null);
  const [totalSpent, setTotalSpent] = useState(null);
  const [openExpensesPrice, setOpenExpensesPrice] = useState(null);
  const colors = [
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(255, 99, 132)"
  ];

  useEffect(() => {
    buildChart();
    // eslint-disable-next-line
  }, [expensesOnFocus]);

  function buildChart() {
    if (statisticsChart) {
      statisticsChart.destroy();
    }

    const dataset = buildDatasetStructure();
    const metrics = populateDatasetAndGenerateMetrics(dataset);

    setOpenExpensesPrice(metrics.totalOpenExpenses.toFixed(2));
    setTotalSpent(metrics.totalSpentAmount.toFixed(2));
    setEmptyChart(!metrics.hasValidExpenses);

    if (initialMoneyOnFocus) {
      const initialMoney = initialMoneyOnFocus.initialMoney;
      setMoneyAvailable((initialMoney - metrics.totalSpentAmount).toFixed(2));
    }

    adjustLayout(metrics.hasValidExpenses);

    if (metrics.hasValidExpenses) {
      const labels = [], data = [], backgroundColors = [];

      dataset.forEach(element => {
        labels.push(element.type);
        data.push(element.amount.toFixed(2));
        backgroundColors.push(element.backgroundColor);
      })

      const statisticsChartInstance = new Chart(document.getElementById('statistics-chart').getContext('2d'), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Gastos por tipo de despesa',
              data: data,
              backgroundColor: backgroundColors
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Gasto por tipo de despesa',
            position: 'top',
            fontColor: 'black',
            fontFamily: "'Work Sans', sans-serif",
            fontSize: '14'
          },
          legend: {
            position: 'bottom'
          }
        }
      });

      setStatisticsChart(statisticsChartInstance);
    }
  }

  function buildDatasetStructure() {
    let colorCounter = -1;
    return expenseTypes.map(expenseType => {
      colorCounter++;
      return {
        typeId: expenseType.id,
        type: expenseType.name,
        amount: 0,
        backgroundColor: colors[colorCounter % colors.length]
      }
    });
  }

  function populateDatasetAndGenerateMetrics(dataset) {
    let hasValidExpenses = false;
    let totalSpentAmount = 0;
    let totalOpenExpenses = 0;

    expensesOnFocus.forEach(element => {
      if (element.paid === true) {
        hasValidExpenses = true;
        const datasetIndex = dataset.findIndex(obj => obj.typeId === element.expenseTypeId);
        dataset[datasetIndex].amount += element.price;
        totalSpentAmount += element.price;
      } else {
        totalOpenExpenses += element.price;
      }
    });

    return {
      hasValidExpenses: hasValidExpenses,
      totalSpentAmount: totalSpentAmount,
      totalOpenExpenses: totalOpenExpenses
    }
  }

  function adjustLayout(hasValidExpenses) {
    const chartContainerElement = document.getElementsByClassName("statistics-chart-container");
    const chartElement = document.getElementById("statistics-chart");

    if (hasValidExpenses) {
      chartContainerElement[0].classList.remove("statistics-chart-container-empty");
      chartElement.setAttribute("width", "400px");
      chartElement.setAttribute("height", "300px");
    } else {
      chartContainerElement[0].classList.add("statistics-chart-container-empty");
      chartElement.setAttribute("width", "0px");
      chartElement.setAttribute("height", "0px");
    }
  }

  return [emptyChart, moneyAvailable, totalSpent, openExpensesPrice];
}

export default useStatistics;
