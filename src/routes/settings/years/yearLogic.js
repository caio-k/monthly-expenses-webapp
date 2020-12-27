import {useState} from "react";
import {useToasts} from 'react-toast-notifications';
import YearService from "../../../services/settings/YearService";
import AuthService from "../../../services/auth/AuthService";

const useYear = (yearsList) => {
  const [years, setYears] = useState(yearsList);
  const [user] = useState(AuthService.getCurrentUser());

  const [newYear, setNewYear] = useState("");
  const [yearOnFocus, setYearOnFocus] = useState({});
  const [newYearEdited, setNewYearEdited] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const {addToast} = useToasts();

  const handleNewYearChange = (event) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
    setNewYear(event.target.value);
  }

  const handleNewYearEditedChange = (event) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
    setNewYearEdited(event.target.value);
  }

  const openEditModal = (yearObject) => {
    setYearOnFocus(yearObject);
    setEditModalVisible(true);
  }

  const closeEditModal = () => {
    setEditModalVisible(false);
  }

  const openDeleteModal = (yearObject) => {
    setYearOnFocus(yearObject);
    setDeleteModalVisible(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAValidYear(newYear)) {
      const createYearBtn = document.getElementById('create-year-btn');
      createYearBtn.classList.add('simple-sliding-form-btn-loading');

      YearService.createYear(user.id, newYear).then(
        response => {
          handleSuccess("Ano " + newYear + " cadastrado com sucesso!");

          let yearsBackup = [...years];
          yearsBackup.push(response.data);
          yearsBackup = sortYearsDecreasingly(yearsBackup);
          setNewYear("");
          setYears(yearsBackup);

          createYearBtn.classList.remove('simple-sliding-form-btn-loading');
        },
        error => {
          handleError(error);
          createYearBtn.classList.remove('simple-sliding-form-btn-loading');
        }
      )
    }
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (isAValidYear(newYearEdited)) {
      YearService.updateYear(user.id, yearOnFocus.id, newYearEdited).then(
        response => {
          const yearIndex = getYearIndexByYearId(yearOnFocus.id);
          let yearsBackup = [...years];
          const year = {...years[yearIndex]};

          handleSuccess("Ano " + year.yearNumber + " atualizado para " + newYearEdited + " com sucesso!");

          year["yearNumber"] = response.data.yearNumber;
          yearsBackup[yearIndex] = year;
          yearsBackup = sortYearsDecreasingly(yearsBackup);

          setYears(yearsBackup);
          setNewYearEdited("");
          closeEditModal();
        },
        error => {
          handleError(error);
        }
      )
    }
  }

  const handleDeleteYear = (event) => {
    event.preventDefault();

    YearService.deleteYear(user.id, yearOnFocus.id).then(
      () => {
        setYears(years.filter(year => year.id !== yearOnFocus.id));
        handleSuccess("Ano deletado com sucesso!");
        closeDeleteModal();
      },
      error => {
        handleError(error);
      }
    )
  }

  const handleSuccess = (message) => {
    addToast(message, {
      appearance: 'success',
      autoDismiss: true,
    })
  }

  const handleError = (error) => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    addToast(resMessage, {
      appearance: 'error',
      autoDismiss: true,
    })
  }

  const sortYearsDecreasingly = (newYearsList) => {
    newYearsList.sort(function (a, b) {
      return a.yearNumber < b.yearNumber ? 1 : -1;
    });
    return newYearsList;
  }

  const isAValidYear = (year) => {
    const yearAlreadyExists = years.some(element => element.yearNumber === parseInt(year, 10));

    if (year.length < 4 || year.length > 4) {
      handleError("Oops, o ano deve ser composto por 4 números!");
      return false;
    } else if (yearAlreadyExists) {
      handleError("Oops, o ano " + year + " já está cadastrado!");
      return false;
    } else {
      return true;
    }
  }

  const getYearIndexByYearId = (yearId) => {
    return years.findIndex(element => element.id === yearId);
  }

  return [{years, newYear, yearOnFocus, newYearEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDeleteYear, handleNewYearChange, handleNewYearEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal];
}

export default useYear;
