import {useEffect, useState} from "react";
import {useToasts} from "react-toast-notifications";
import AuthService from "../../../services/auth/AuthService";
import ExpenseTypeService from "../../../services/settings/ExpenseTypeService";

const useExpenseType = () => {
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [user] = useState(AuthService.getCurrentUser());
  const [loadingComponent, setLoadingComponent] = useState(true);

  const [newExpenseType, setNewExpenseType] = useState("");
  const [expenseTypeOnFocus, setExpenseTypeOnFocus] = useState({});
  const [expenseTypeEdited, setExpenseTypeEdited] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const {addToast} = useToasts();

  useEffect(() => {
    ExpenseTypeService.getExpenseTypes(AuthService.getCurrentUser().id).then(
      response => {
        const expenseTypesBackup = sortExpenseTypes(response.data);
        setExpenseTypes(expenseTypesBackup);
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

    if (checkIfExpenseTypeNameExits(newExpenseType)) {
      handleError("Oops, o tipo de despesa \"" + newExpenseType + "\" já está cadastrado!");
    } else {
      const createYearBtn = document.getElementById('create-expense-type-btn');
      createYearBtn.classList.add('simple-sliding-form-btn-loading');

      ExpenseTypeService.createExpenseType(user.id, newExpenseType).then(
        response => {
          handleSuccess("Tipo de despesa \"" + newExpenseType + "\" cadastrado com sucesso!");

          let expenseTypesBackup = [...expenseTypes];
          expenseTypesBackup.push(response.data);
          expenseTypesBackup = sortExpenseTypes(expenseTypesBackup);
          setNewExpenseType("");
          setExpenseTypes(expenseTypesBackup);

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

    if (checkIfExpenseTypeNameExits(expenseTypeEdited)) {
      handleError("Oops, o tipo de despesa \"" + expenseTypeEdited + "\" já está cadastrado!");
    } else {
      ExpenseTypeService.updateExpenseType(user.id, expenseTypeOnFocus.id, expenseTypeEdited).then(
        response => {
          const expenseTypeIndex = getExpenseTypeIndexByExpenseTypeId(expenseTypeOnFocus.id);
          let expenseTypesBackup = [...expenseTypes];
          const expenseType = {...expenseTypes[expenseTypeIndex]};

          handleSuccess("Despesa \"" + expenseType.name + "\" atualizada para \"" + expenseTypeEdited + "\" com sucesso!");

          expenseType["name"] = response.data.name;
          expenseTypesBackup[expenseTypeIndex] = expenseType;
          expenseTypesBackup = sortExpenseTypes(expenseTypesBackup);

          setExpenseTypes(expenseTypesBackup);
          setExpenseTypeEdited("");
          closeEditModal();
        },
        error => {
          handleError(error);
        }
      )
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();

    ExpenseTypeService.deleteExpenseType(user.id, expenseTypeOnFocus.id).then(
      () => {
        setExpenseTypes(expenseTypes.filter(element => element.id !== expenseTypeOnFocus.id));
        handleSuccess("Despesa deletada com sucesso!");
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

  const checkIfExpenseTypeNameExits = (expenseTypeName) => {
    return expenseTypes.some(element => element.name === expenseTypeName);
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

  return [{
    expenseTypes,
    loadingComponent,
    newExpenseType,
    expenseTypeOnFocus,
    expenseTypeEdited,
    editModalVisible,
    deleteModalVisible
  },
    handleSubmit, handleEditSubmit, handleDelete, handleNewExpenseTypeChange, handleNewExpenseTypeEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal];
}

export default useExpenseType;
