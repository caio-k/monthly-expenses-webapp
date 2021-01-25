import {useEffect, useState} from "react";
import Chart from "chart.js";

const useStatistics = (expensesOnFocus, initialMoneyOnFocus, expenseTypes) => {

  const [statisticsChart, setStatisticsChart] = useState();
  const [emptyChart, setEmptyChart] = useState(true);
  const [moneyAvailable, setMoneyAvailable] = useState(null);
  const [openExpensesPrice, setOpenExpensesPrice] = useState(null);

  useEffect(() => {
    if (statisticsChart) {
      statisticsChart.destroy();
    }

    const colors = [
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(255, 99, 132)"
    ];

    let colorCounter = -1;
    const dataset = expenseTypes.map(expenseType => {
      colorCounter++;
      return {
        typeId: expenseType.id,
        type: expenseType.name,
        amount: 0,
        backgroundColor: colors[colorCounter % colors.length]
      }
    });

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

    if (initialMoneyOnFocus) {
      const initialMoney = initialMoneyOnFocus.initialMoney;
      setMoneyAvailable((initialMoney - totalSpentAmount).toFixed(2));
    }

    setOpenExpensesPrice(totalOpenExpenses);

    if (hasValidExpenses) {
      setEmptyChart(false);

      const labels = [];
      const data = [];
      const backgroundColors = [];

      dataset.forEach(element => {
        labels.push(element.type);
        data.push(element.amount);
        backgroundColors.push(element.backgroundColor);
      })

      const statisticsChartInstance = new Chart(document.getElementById('statistics-chart').getContext('2d'), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gastos por tipo de despesa",
              data: data,
              backgroundColor: backgroundColors
            }
          ]
        }
      })

      setStatisticsChart(statisticsChartInstance);
    } else {
      setEmptyChart(true);
    }
  }, [expensesOnFocus]);

  return [emptyChart, moneyAvailable, openExpensesPrice];
}

export default useStatistics;
