import React from "react";
import useExpensesInfo from "./expensesInfoLogic";
import ErrorMessageContainer from "../../../components/error/errorMessageContainer";
import Modal from "../../../components/modal/modal";
import CustomSelectInput from "../../../components/forms/customSelectInput/customSelectInput";
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
    handleCreateExpenseInfoExpenseTypeIdChange, handleCreate]
    = useExpensesInfo(props.expensesOnFocus, props.selectedMonthYear, props.expenseTypes, props.addExpenseObjectOnListAndFocus);

  function renderExpenseTypeOption(expenseType) {
    return (
      <option key={expenseType.id} value={expenseType.id}>{expenseType.name}</option>
    )
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
      </div>
    </div>
  )
}

export default ExpensesInfo;
