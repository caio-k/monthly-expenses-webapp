import {useEffect, useState} from "react";
import {useToasts} from "react-toast-notifications";
import YearService from "../../../services/settings/YearService";
import AuthService from "../../../services/auth/AuthService";

const useMonthYear = () => {
  const [years, setYears] = useState([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [selectedYear, setSelectedYear] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [initialLoadingErrorMessage, setInitialLoadingErrorMessage] = useState("");
  const [months] = useState(["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]);

  const {addToast} = useToasts();

  useEffect(() => {
    const getNearestMonthOfYear = (year) => {
      const actualDate = new Date();

      if (year) {
        if (year.yearNumber === actualDate.getFullYear()) {
          return months[actualDate.getMonth()];
        } else if (year.yearNumber < actualDate.getFullYear()) {
          return months[11];
        } else {
          return months[0];
        }
      } else {
        return "";
      }
    }

    YearService.getYear(AuthService.getCurrentUser().id).then(
      response => {
        const nearestYear = getNearestYearFromNow(response.data);
        const nearestMonth = getNearestMonthOfYear(nearestYear);
        setYears(response.data);
        setSelectedYear(nearestYear);
        setSelectedMonth(nearestMonth);
        setLoadingComponent(false);
      },
      error => {
        setLoadingComponent(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setInitialLoadingErrorMessage(resMessage);

        addToast(resMessage, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    )
  }, [months, addToast]);

  const handleSelectedYear = (event) => {
    setSelectedYear(event.target.value);
  }

  const handleSelectedMonth = (event) => {
    setSelectedMonth(event.target.value);
  }

  const getNearestYearFromNow = (yearList) => {
    if (yearList.length > 0) {
      const actualDate = new Date();
      const actualYear = actualDate.getFullYear();
      let difference = Math.abs(actualYear - yearList[0].yearNumber);
      let nearestYear = yearList[0];

      yearList.forEach(element => {
        if (Math.abs(actualYear - element.yearNumber) < difference) {
          nearestYear = element;
          difference = Math.abs(actualYear - element.yearNumber);
        }
      });

      return nearestYear;
    } else {
      return {};
    }
  }

  return [{years, loadingComponent, selectedYear, selectedMonth, months, initialLoadingErrorMessage},
    handleSelectedYear, handleSelectedMonth];
}

export default useMonthYear;
