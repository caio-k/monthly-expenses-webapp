import {useEffect, useState} from "react";
import {useToasts} from 'react-toast-notifications';
import YearService from "../../../services/settings/YearService";
import AuthService from "../../../services/auth/AuthService";

const useYear = () => {
  const [years, setYears] = useState([]);
  const [user] = useState(AuthService.getCurrentUser());
  const [loadingComponent, setLoadingComponent] = useState(true);

  const [newYear, setNewYear] = useState("");
  const [yearOnFocus, setYearOnFocus] = useState({});
  const [newYearEdited, setNewYearEdited] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const {addToast} = useToasts();

  useEffect(() => {
    YearService.getYear(AuthService.getCurrentUser().id).then(
      response => {
        setYears(response.data);
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

        addToast(resMessage, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    )
  }, [addToast]);

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

    if (checkIfNotExitsAYear(newYear)) {
      const createYearBtn = document.getElementById('create-year-btn');
      createYearBtn.classList.add('create-year-btn-loading');

      YearService.createYear(user.id, newYear).then(
        response => {
          handleSuccess("Ano " + newYear + " cadastrado com sucesso!");
          setNewYear("");
          setYears(years => [...years, response.data]);
          createYearBtn.classList.remove('create-year-btn-loading');
        },
        error => {
          handleError(error);
          createYearBtn.classList.remove('create-year-btn-loading');
        }
      )
    } else {
      handleError("Oops, o ano " + newYear + " já está cadastrado!");
    }
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (newYearEdited.length < 4 || newYearEdited.length > 4) {
      handleError("Oops, o ano deve ser composto por 4 números!");
    } else if (!checkIfNotExitsAYear(newYearEdited)) {
      handleError("Oops, o ano " + newYearEdited + " já está cadastrado!");
    } else {
      YearService.updateYear(user.id, yearOnFocus.id, newYearEdited).then(
        response => {
          const yearIndex = getYearIndexByYearId(yearOnFocus.id);
          const yearsBackup = [...years];
          const year = {...years[yearIndex]};

          handleSuccess("Ano " + year.yearNumber + " atualizado para " + newYearEdited + " com sucesso!");

          year["yearNumber"] = response.data.yearNumber;
          yearsBackup[yearIndex] = year;

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

  const checkIfNotExitsAYear = (year) => {
    return !years.some(element => element.yearNumber === parseInt(year, 10));
  }

  const getYearIndexByYearId = (yearId) => {
    return years.findIndex(element => element.id === yearId);
  }

  return [{years, loadingComponent, newYear, yearOnFocus, newYearEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDeleteYear, handleNewYearChange, handleNewYearEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal];
}

export default useYear;
