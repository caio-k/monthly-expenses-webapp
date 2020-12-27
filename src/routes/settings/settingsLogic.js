import {useEffect, useState} from "react";
import SettingsService from "../../services/settings/SettingsService";
import AuthService from "../../services/auth/AuthService";

const useSettings = () => {
  const [years, setYears] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    SettingsService.getInitializationData(AuthService.getCurrentUser().id).then(
      response => {
        setYears(response.data.years);
        setExpenseTypes(response.data.expenseTypes);
        setLoadingComponent(false);
        setLoadingError(false);
      },
      () => {
        setLoadingComponent(false);
        setLoadingError(true);
      }
    )
  }, [])

  return [{years, expenseTypes, loadingComponent, loadingError}];
}

export default useSettings;
