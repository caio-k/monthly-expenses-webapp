import {useState} from "react";

const useMonthYear = (yearsList, firstSelectedYearId, firstSelectedMonth) => {
  const [years] = useState(yearsList);
  const [months] = useState(["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]);
  const [selectedYear, setSelectedYear] = useState(firstSelectedYearId);
  const [selectedMonth, setSelectedMonth] = useState(months[Math.max(firstSelectedMonth, 0)]);

  const handleSelectedYear = (event) => {
    setSelectedYear(event.target.value);
  }

  const handleSelectedMonth = (event) => {
    setSelectedMonth(event.target.value);
  }

  return [{years, selectedYear, selectedMonth, months}, handleSelectedYear, handleSelectedMonth];
}

export default useMonthYear;
