import {useState} from "react";
import ExpensesInfoService from "../../../services/expenses/ExpensesInfoService";
import useNotification from "../../../components/notifications/notification";

const useExpensesInfo = (expensesOnFocus, selectedMonthYear, expenseTypes, addExpenseObjectOnListAndFocus) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [createExpenseInfoName, setCreateExpenseInfoName] = useState('');
  const [createExpenseInfoPrice, setCreateExpenseInfoPrice] = useState('');
  const [createExpenseInfoPaid, setCreateExpenseInfoPaid] = useState("true");
  const [createExpenseInfoExpenseTypeId, setCreateExpenseInfoExpenseTypeId] = useState(expenseTypes.length > 0 ? expenseTypes[0].id : null);
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

  const handleCreateExpenseInfoPaidChange = (event) => {
    setCreateExpenseInfoPaid(event.target.value);
  }

  const handleCreateExpenseInfoExpenseTypeIdChange = (event) => {
    setCreateExpenseInfoExpenseTypeId(event.target.value);
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

  return [{
    createModalVisible,
    createExpenseInfoName,
    createExpenseInfoPrice,
    createExpenseInfoPaid,
    createExpenseInfoExpenseTypeId
  },
    openCreateModal, closeCreateModal, handleCreateExpenseInfoNameChange, handleCreateExpenseInfoPriceChange, handleCreateExpenseInfoPaidChange,
    handleCreateExpenseInfoExpenseTypeIdChange, handleCreate];
}

export default useExpensesInfo;
