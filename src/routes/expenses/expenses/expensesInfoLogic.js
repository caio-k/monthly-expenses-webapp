import {useState} from "react";
import ExpensesInfoService from "../../../services/expenses/ExpensesInfoService";
import useNotification from "../../../components/notifications/notification";

const useExpensesInfo = (expensesOnFocus, selectedMonthYear, expenseTypes, addExpenseObjectOnListAndFocus,
                         updateExpenseInfo, deleteExpenseInfo) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createExpenseInfoName, setCreateExpenseInfoName] = useState('');
  const [createExpenseInfoPrice, setCreateExpenseInfoPrice] = useState('');
  const [createExpenseInfoPaid, setCreateExpenseInfoPaid] = useState("true");
  const [createExpenseInfoExpenseTypeId, setCreateExpenseInfoExpenseTypeId] = useState(expenseTypes.length > 0 ? expenseTypes[0].id : null);

  const [expenseInfoOnFocus, setExpenseInfoOnFocus] = useState({});

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateExpenseInfoName, setUpdateExpenseInfoName] = useState('');
  const [updateExpenseInfoPrice, setUpdateExpenseInfoPrice] = useState('');
  const [updateExpenseInfoPaid, setUpdateExpenseInfoPaid] = useState("true");
  const [updateExpenseInfoExpenseTypeId, setUpdateExpenseInfoExpenseTypeId] = useState(expenseTypes.length > 0 ? expenseTypes[0].id : null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [handleSuccessNotification, handleErrorNotification] = useNotification();

  const openCreateModal = () => {
    setCreateModalVisible(true);
  }

  const closeCreateModal = () => {
    setCreateModalVisible(false);
    setCreateExpenseInfoName('');
    setCreateExpenseInfoPrice('');
    setCreateExpenseInfoPaid("true");
    setCreateExpenseInfoExpenseTypeId('');
  }

  const openUpdateModal = (expenseInfoObject) => {
    setUpdateExpenseInfoName(expenseInfoObject.name);
    setUpdateExpenseInfoPrice(expenseInfoObject.price);
    setUpdateExpenseInfoPaid(expenseInfoObject.paid);
    setUpdateExpenseInfoExpenseTypeId(expenseInfoObject.expenseTypeId);
    setExpenseInfoOnFocus(expenseInfoObject);
    setUpdateModalVisible(true);
  }

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  }

  const openDeleteModal = (expenseInfoObject) => {
    setExpenseInfoOnFocus(expenseInfoObject);
    setDeleteModalVisible(true);
  }

  const closeDeleteModal = () => {
    setExpenseInfoOnFocus({});
    setDeleteModalVisible(false);
  }

  const handleCreateExpenseInfoNameChange = (event) => {
    setCreateExpenseInfoName(event.target.value);
  }

  const handleCreateExpenseInfoPriceChange = (event) => {
    const value = event.target.value;
    const parts = value.split('.');
    if (!(parts && parts[1] && parts[1].length > 2)) {
      setCreateExpenseInfoPrice(value);
    }
  }

  const handleCreateExpenseInfoPaidChange = () => {
    setCreateExpenseInfoPaid(createExpenseInfoPaid === "true" ? "false" : "true");
  }

  const handleCreateExpenseInfoExpenseTypeIdChange = (event) => {
    setCreateExpenseInfoExpenseTypeId(event.target.value);
  }

  const handleUpdateExpenseInfoNameChange = (event) => {
    setUpdateExpenseInfoName(event.target.value);
  }

  const handleUpdateExpenseInfoPriceChange = (event) => {
    const value = event.target.value;
    const parts = value.split('.');
    if (!(parts && parts[1] && parts[1].length > 2)) {
      setUpdateExpenseInfoPrice(value);
    }
  }

  const handleUpdateExpenseInfoPaidChange = () => {
    setUpdateExpenseInfoPaid(!updateExpenseInfoPaid);
  }

  const handleUpdateExpenseInfoExpenseTypeIdChange = (event) => {
    setUpdateExpenseInfoExpenseTypeId(event.target.value);
  }

  const handleCreate = (event) => {
    event.preventDefault();

    ExpensesInfoService.createExpenseInfo(
      selectedMonthYear.yearNumber,
      selectedMonthYear.monthNumber,
      createExpenseInfoName,
      createExpenseInfoPrice,
      createExpenseInfoPaid,
      createExpenseInfoExpenseTypeId)
      .then(
        response => {
          addExpenseObjectOnListAndFocus(response.data);
          handleSuccessNotification("Despesa cadastrada com sucesso!");
          closeCreateModal();
        },
        error => {
          handleErrorNotification(error);
        }
      )
  }

  const handleCheckboxPaidChange = (event, expenseInfo) => {
    event.preventDefault();

    ExpensesInfoService.updateExpenseInfo(expenseInfo.id, expenseInfo.name, expenseInfo.price, !expenseInfo.paid, expenseInfo.expenseTypeId).then(
      response => {
        updateExpenseInfo(response.data);
      },
      error => {
        handleErrorNotification(error);
      }
    )
  }

  const handleExpenseInfoUpdate = (event) => {
    event.preventDefault();

    ExpensesInfoService.updateExpenseInfo(
      expenseInfoOnFocus.id,
      updateExpenseInfoName,
      updateExpenseInfoPrice,
      updateExpenseInfoPaid,
      updateExpenseInfoExpenseTypeId
    ).then(
      response => {
        updateExpenseInfo(response.data);
        handleSuccessNotification("Despesa alterada com sucesso!");
        closeUpdateModal();
      },
      error => {
        handleErrorNotification(error);
      }
    )
  }

  const handleExpenseInfoDelete = (event) => {
    event.preventDefault();

    ExpensesInfoService.deleteExpenseInfo(expenseInfoOnFocus.id).then(
      () => {
        deleteExpenseInfo(expenseInfoOnFocus);
        handleSuccessNotification("Despesa removida com sucesso!");
        closeDeleteModal();
      },
      error => {
        handleErrorNotification(error);
      }
    )
  }

  return [{
    createModalVisible,
    createExpenseInfoName,
    createExpenseInfoPrice,
    createExpenseInfoPaid,
    createExpenseInfoExpenseTypeId,
    expenseInfoOnFocus,
    updateModalVisible,
    updateExpenseInfoName,
    updateExpenseInfoPrice,
    updateExpenseInfoPaid,
    updateExpenseInfoExpenseTypeId,
    deleteModalVisible
  },
    openCreateModal, closeCreateModal, openUpdateModal, closeUpdateModal, openDeleteModal, closeDeleteModal,
    handleCreateExpenseInfoNameChange, handleCreateExpenseInfoPriceChange, handleCreateExpenseInfoPaidChange,
    handleCreateExpenseInfoExpenseTypeIdChange, handleUpdateExpenseInfoNameChange, handleUpdateExpenseInfoPriceChange,
    handleUpdateExpenseInfoPaidChange, handleUpdateExpenseInfoExpenseTypeIdChange, handleCreate, handleExpenseInfoUpdate,
    handleExpenseInfoDelete, handleCheckboxPaidChange];
}

export default useExpensesInfo;
