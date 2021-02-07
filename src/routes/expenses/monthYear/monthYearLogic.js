import {useState} from "react";

const useMonthYear = (yearsList, selectedMonthYear, months, handleSubmit) => {
  const [years] = useState(yearsList);
  const [selectedYear, setSelectedYear] = useState(selectedMonthYear.yearNumber);
  const [selectedMonth, setSelectedMonth] = useState(months[Math.max(selectedMonthYear.monthNumber, 0)]);

  const handleSelectedYear = (event) => {
    const year = event.target.value;
    handleSubmit(event, year, months.indexOf(selectedMonth));
    setSelectedYear(year);
  }

  const handleSelectedMonth = (event) => {
    const month = event.target.value;
    handleSubmit(event, selectedYear, months.indexOf(month));
    setSelectedMonth(month);
  }

  return [{years, selectedYear, selectedMonth}, handleSelectedYear, handleSelectedMonth];
}

export default useMonthYear;
