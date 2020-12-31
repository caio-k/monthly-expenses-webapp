import {useEffect, useState} from "react";
import InitialMoneyService from "../../../services/expenses/InitialMoneyService";
import useNotification from "../../../components/notifications/notification";

const useInitialMoney = (initialMoneyOnFocus, selectedMonthYear, addInitialMoneyOnListAndFocus, updateInitialMoneyOnListAndFocus) => {

  const [newInitialMoneyValue, setNewInitialMoneyValue] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [initialMoneyValueChange, setInitialMoneyValueChange] = useState('');
  const [operation, setOperation] = useState(1);
  const [initialMoneyValueEdited, setInitialMoneyValueEdited] = useState(initialMoneyOnFocus ? initialMoneyOnFocus.initialMoney : '');
  const [handleSuccessNotification, handleErrorNotification] = useNotification();

  useEffect(() => {
    setInitialMoneyValueEdited(initialMoneyOnFocus ? initialMoneyOnFocus.initialMoney : '')
  }, [initialMoneyOnFocus])

  const handleNewInitialMoneyValueChange = (event) => {
    const value = event.target.value;
    const parts = value.split('.');
    if (!(parts && parts[1] && parts[1].length > 2)) {
      setNewInitialMoneyValue(value);
    }
  }

  const handleInitialMoneyValueChangeChange = (event) => {
    const value = event.target.value;
    const parts = value.split('.');
    if (!(parts && parts[1] && parts[1].length > 2)) {
      setInitialMoneyValueChange(value);
      handleInitialMoneyValueEdited(operation, value)
    }
  }

  const handleOperationChange = (event) => {
    const selectedOperation = event.target.value;
    setOperation(selectedOperation);
    handleInitialMoneyValueEdited(selectedOperation, initialMoneyValueChange);
  }

  const handleInitialMoneyValueEdited = (selectedOperation, initialValueChange) => {
    setInitialMoneyValueEdited(
      round(parseFloat(initialMoneyOnFocus.initialMoney) + (parseInt(selectedOperation, 10) * parseFloat(initialValueChange)), 2)
    );
  }

  const openEditModal = () => {
    setEditModalVisible(true);
  }

  const closeEditModal = () => {
    setEditModalVisible(false);
    setInitialMoneyValueChange('');
    setOperation(1);
    setInitialMoneyValueEdited(initialMoneyOnFocus.initialMoney);
  }

  const handleCreate = (event) => {
    event.preventDefault();

    InitialMoneyService.createInitialMoney(selectedMonthYear.yearNumber, selectedMonthYear.monthNumber, newInitialMoneyValue)
      .then(
        response => {
          addInitialMoneyOnListAndFocus(response.data);
          setNewInitialMoneyValue('');
          handleSuccessNotification('Valor inicial cadastrado com sucesso!');
        },
        error => {
          handleErrorNotification(error);
        }
      )
  }

  const handleUpdate = (event) => {
    event.preventDefault();

    InitialMoneyService.updateYear(initialMoneyOnFocus.initialMoneyId, initialMoneyValueEdited).then(
      response => {
        updateInitialMoneyOnListAndFocus(response.data);
        setInitialMoneyValueChange('');
        closeEditModal();
        handleSuccessNotification('Valor inicial atualizado com sucesso!');
      },
      error => {
        handleErrorNotification(error);
      }
    )
  }

  const round = (num, places) => {
    return num.toFixed(places);
  }

  return [{newInitialMoneyValue, editModalVisible, initialMoneyValueChange, operation, initialMoneyValueEdited},
    handleNewInitialMoneyValueChange, handleCreate, handleUpdate, openEditModal, closeEditModal,
    handleInitialMoneyValueChangeChange, handleOperationChange];
}

export default useInitialMoney;
