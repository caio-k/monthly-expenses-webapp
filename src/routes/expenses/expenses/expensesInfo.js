import React from "react";
import useExpensesInfo from "./expensesInfoLogic";
import ErrorMessageContainer from "../../../components/error/errorMessageContainer";
import Modal from "../../../components/modal/modal";
import CustomSelectInput from "../../../components/forms/customSelectInput/customSelectInput";
import FullyResponsiveTable from "../../../components/tables/fullyResponsiveTable/fullyResponsiveTable";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import "./expensesInfo.css";

function ExpensesInfo(props) {

  const [{
    createModalVisible,
    createExpenseInfoName,
    createExpenseInfoPrice,
    createExpenseInfoPaid,
    createExpenseInfoExpenseTypeId
  },
    openCreateModal, closeCreateModal, handleCreateExpenseInfoNameChange, handleCreateExpenseInfoPriceChange, handleCreateExpenseInfoPaidChange,
    handleCreateExpenseInfoExpenseTypeIdChange, handleCreate, handleCheckboxPaidChange]
    = useExpensesInfo(props.expensesOnFocus, props.selectedMonthYear, props.expenseTypes, props.addExpenseObjectOnListAndFocus, props.updateExpenseInfo);

  function renderExpenseTypeOption(expenseType) {
    return (
      <option key={expenseType.id} value={expenseType.id}>{expenseType.name}</option>
    )
  }

  function renderExpenseInfoRow(expenseInfo) {
    return (
      <tr key={expenseInfo.id}>
        <td className="fixed-cells-width-80">
          <input type="checkbox" checked={expenseInfo.paid} onChange={e => handleCheckboxPaidChange(e, expenseInfo)}/>
        </td>
        <td>
          <span>{expenseInfo.name}</span>
        </td>
        <td>
          <span>{findExpenseTypeById(expenseInfo.expenseTypeId)}</span>
        </td>
        <td className="fixed-cells-width-150">
          <span>{expenseInfo.price}</span>
        </td>
        <td className="fixed-cells-width-80">
          <img src={editIcon} alt="Editar"/>
        </td>
        <td className="fixed-cells-width-80">
          <img src={trashIcon} alt="Editar"/>
        </td>
      </tr>
    )
  }

  function findExpenseTypeById(id) {
    const expenseType = props.expenseTypes.find(element => element.id === id);
    return expenseType ? expenseType.name : "";
  }

  return (
    <div className="expenses-box-session full-box">
      <div className="expenses-box-session-header">
        <div className="expenses-info-title-header">
          <h3>Despesas</h3>
          <span onClick={openCreateModal} className="open-modal-button">+</span>
        </div>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>

      <div>
        {props.expenseTypes.length > 0 && (
          <>
            {createModalVisible && (
              <Modal onClose={closeCreateModal}>
                <div className="expenses-info-create-modal">
                  <h3>Cadastrar Despesa</h3>
                  <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>

                  <form onSubmit={handleCreate}>
                    <div>
                      <label>Nome:</label>
                      <input required maxLength={255} placeholder="Nome da despesa" autoComplete="off"
                             type="text" value={createExpenseInfoName} onChange={handleCreateExpenseInfoNameChange}/>
                    </div>

                    <div>
                      <label>Preço:</label>
                      <input required placeholder="Preço da despesa" autoComplete="off" type="number"
                             value={createExpenseInfoPrice} onChange={handleCreateExpenseInfoPriceChange}
                      />
                    </div>

                    <div>
                      <label>Pago:</label>
                      <div className="expenses-info-paid-field">
                        <label>
                          <input type="radio" value={"true"} checked={createExpenseInfoPaid === "true"}
                                 onChange={handleCreateExpenseInfoPaidChange}/>
                          <span>Sim</span>
                        </label>
                        <label>
                          <input type="radio" value={"false"} checked={createExpenseInfoPaid === "false"}
                                 onChange={handleCreateExpenseInfoPaidChange}/>
                          <span>Não</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label>Tipo:</label>
                      <div className="expenses-info-expense-type-field">
                        <CustomSelectInput value={createExpenseInfoExpenseTypeId}
                                           onChange={handleCreateExpenseInfoExpenseTypeIdChange}>
                          {props.expenseTypes.map(renderExpenseTypeOption)}
                        </CustomSelectInput>
                      </div>
                    </div>

                    <div>
                      <button type="submit">Cadastrar</button>
                    </div>
                  </form>
                </div>
              </Modal>
            )}
          </>
        )}

        {props.expenseTypes.length === 0 && (
          <ErrorMessageContainer
            message={"Você ainda não cadastrou nenhum tipo de despesa. Vá até a aba de \"Configurações\" e cadastre agora mesmo!"}/>
        )}

        {props.expenseTypes.length > 0 && props.expensesOnFocus.length === 0 && (
          <ErrorMessageContainer
            message={"Você ainda não cadastrou nenhuma despesa. Clique no botão + acima e cadastre agora mesmo!"}/>
        )}

        {props.expenseTypes.length > 0 && props.expensesOnFocus.length > 0 && (
          <FullyResponsiveTable>
            <thead>
            <tr>
              <th className="fixed-cells-width-80">Pago</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th className="fixed-cells-width-150">Preço (R$)</th>
              <th className="fixed-cells-width-80">Editar</th>
              <th className="fixed-cells-width-80">Remover</th>
            </tr>
            </thead>
            <tbody>
            {props.expensesOnFocus.map(renderExpenseInfoRow)}
            </tbody>
          </FullyResponsiveTable>
        )}
      </div>
    </div>
  )
}

export default ExpensesInfo;
