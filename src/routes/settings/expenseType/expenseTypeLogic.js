import {useState} from "react";
import ExpenseTypeService from "../../../services/settings/ExpenseTypeService";
import useNotification from "../../../components/notifications/notification";

const useExpenseType = (expenseTypeList) => {
  const [expenseTypes, setExpenseTypes] = useState(expenseTypeList);
  const [newExpenseType, setNewExpenseType] = useState("");
  const [expenseTypeOnFocus, setExpenseTypeOnFocus] = useState({});
  const [expenseTypeEdited, setExpenseTypeEdited] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [handleSuccessNotification, handleErrorNotification] = useNotification();

  const handleNewExpenseTypeChange = (event) => {
    setNewExpenseType(event.target.value);
  }

  const handleNewExpenseTypeEditedChange = (event) => {
    setExpenseTypeEdited(event.target.value);
  }

  const openEditModal = (expenseTypeObject) => {
    setExpenseTypeOnFocus(expenseTypeObject);
    setEditModalVisible(true);
  }

  const closeEditModal = () => {
    setEditModalVisible(false);
  }

  const openDeleteModal = (expenseTypeObject) => {
    setExpenseTypeOnFocus(expenseTypeObject);
    setDeleteModalVisible(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAValidExpenseTypeName(newExpenseType)) {
      const createYearBtn = document.getElementById('create-expense-type-btn');
      createYearBtn.classList.add('simple-sliding-form-btn-loading');

      ExpenseTypeService.createExpenseType(newExpenseType).then(
        response => {
          handleSuccessNotification("Tipo de despesa \"" + newExpenseType + "\" cadastrado com sucesso!");

          let expenseTypesBackup = [...expenseTypes];
          expenseTypesBackup.push(response.data);
          expenseTypesBackup = sortExpenseTypes(expenseTypesBackup);
          setNewExpenseType("");
          setExpenseTypes(expenseTypesBackup);

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

    if (isAValidExpenseTypeName(expenseTypeEdited)) {
      ExpenseTypeService.updateExpenseType(expenseTypeOnFocus.id, expenseTypeEdited).then(
        response => {
          const expenseTypeIndex = getExpenseTypeIndexByExpenseTypeId(expenseTypeOnFocus.id);
          let expenseTypesBackup = [...expenseTypes];
          const expenseType = {...expenseTypes[expenseTypeIndex]};

          handleSuccessNotification("Despesa \"" + expenseType.name + "\" atualizada para \"" + expenseTypeEdited + "\" com sucesso!");

          expenseType["name"] = response.data.name;
          expenseTypesBackup[expenseTypeIndex] = expenseType;
          expenseTypesBackup = sortExpenseTypes(expenseTypesBackup);

          setExpenseTypes(expenseTypesBackup);
          setExpenseTypeEdited("");
          closeEditModal();
        },
        error => {
          handleErrorNotification(error);
        }
      )
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();

    ExpenseTypeService.deleteExpenseType(expenseTypeOnFocus.id).then(
      () => {
        setExpenseTypes(expenseTypes.filter(element => element.id !== expenseTypeOnFocus.id));
        handleSuccessNotification("Despesa deletada com sucesso!");
        closeDeleteModal();
      },
      error => {
        handleErrorNotification(error);
      }
    )
  }

  const isAValidExpenseTypeName = (expenseTypeName) => {
    const alreadyExitsExpenseTypeName = expenseTypes.some(element => element.name === expenseTypeName);

    if (alreadyExitsExpenseTypeName) {
      handleErrorNotification("Oops, o grupo de despesa \"" + expenseTypeName + "\" já está cadastrado!");
      return false;
    } else {
      return true;
    }
  }

  const sortExpenseTypes = (expenseTypeList) => {
    expenseTypeList.sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });
    return expenseTypeList;
  }

  const getExpenseTypeIndexByExpenseTypeId = (id) => {
    return expenseTypes.findIndex(element => element.id === id);
  }

  return [{expenseTypes, newExpenseType, expenseTypeOnFocus, expenseTypeEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDelete, handleNewExpenseTypeChange, handleNewExpenseTypeEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal];
}

export default useExpenseType;
