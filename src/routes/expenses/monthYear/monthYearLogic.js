import {useState} from "react";

const useMonthYear = (yearsList, selectedMonthYear, months) => {
  const [years] = useState(yearsList);
  const [selectedYear, setSelectedYear] = useState(selectedMonthYear.yearNumber);
  const [selectedMonth, setSelectedMonth] = useState(months[Math.max(selectedMonthYear.monthNumber, 0)]);

  const handleSelectedYear = (event) => {
    setSelectedYear(event.target.value);
  }

  const handleSelectedMonth = (event) => {
    setSelectedMonth(event.target.value);
  }

  return [{years, selectedYear, selectedMonth}, handleSelectedYear, handleSelectedMonth];
}

export default useMonthYear;
