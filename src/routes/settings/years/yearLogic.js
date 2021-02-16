import {useState} from "react";
import YearService from "../../../services/settings/YearService";
import useNotification from "../../../components/notifications/notification";

const useYear = (yearsList) => {
  const [years, setYears] = useState(yearsList);
  const [newYear, setNewYear] = useState("");
  const [yearOnFocus, setYearOnFocus] = useState({});
  const [newYearEdited, setNewYearEdited] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [handleSuccessNotification, handleErrorNotification] = useNotification();

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

      YearService.createYear(newYear).then(
        response => {
          handleSuccessNotification("Ano " + newYear + " cadastrado com sucesso!");

          let yearsBackup = [...years];
          yearsBackup.push(response.data);
          yearsBackup = sortYearsDecreasingly(yearsBackup);
          setNewYear("");
          setYears(yearsBackup);

          createYearBtn.classList.remove('simple-sliding-form-btn-loading');
        },
        error => {
          handleErrorNotification(error);
          createYearBtn.classList.remove('simple-sliding-form-btn-loading');
        }
      )
    }
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (isAValidYear(newYearEdited)) {
      setLoadingEdit(true);

      YearService.updateYear(yearOnFocus.id, newYearEdited).then(
        response => {
          const yearIndex = getYearIndexByYearId(yearOnFocus.id);
          let yearsBackup = [...years];
          const year = {...years[yearIndex]};

          handleSuccessNotification("Ano " + year.yearNumber + " atualizado para " + newYearEdited + " com sucesso!");

          year["yearNumber"] = response.data.yearNumber;
          yearsBackup[yearIndex] = year;
          yearsBackup = sortYearsDecreasingly(yearsBackup);

          setYears(yearsBackup);
          setLoadingEdit(false);
          setNewYearEdited("");
          closeEditModal();
        },
        error => {
          setLoadingEdit(false);
          handleErrorNotification(error);
        }
      )
    }
  }

  const handleDeleteYear = (event) => {
    event.preventDefault();
    setLoadingDelete(true);

    YearService.deleteYear(yearOnFocus.id).then(
      () => {
        setYears(years.filter(year => year.id !== yearOnFocus.id));
        handleSuccessNotification("Ano deletado com sucesso!");
        setLoadingDelete(false);
        closeDeleteModal();
      },
      error => {
        setLoadingDelete(false);
        handleErrorNotification(error);
      }
    )
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
      handleErrorNotification("O ano deve ser composto por 4 números!");
      return false;
    } else if (yearAlreadyExists) {
      handleErrorNotification("O ano " + year + " já está cadastrado!");
      return false;
    } else {
      return true;
    }
  }

  const getYearIndexByYearId = (yearId) => {
    return years.findIndex(element => element.id === yearId);
  }

  return [{
    years,
    newYear,
    yearOnFocus,
    newYearEdited,
    editModalVisible,
    deleteModalVisible,
    loadingEdit,
    loadingDelete
  },
    handleSubmit, handleEditSubmit, handleDeleteYear, handleNewYearChange, handleNewYearEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal];
}

export default useYear;
