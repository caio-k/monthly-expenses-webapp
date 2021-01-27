import React from "react";
import useExpensesInfo from "./expensesInfoLogic";
import ErrorMessageContainer from "../../../components/error/errorMessageContainer";
import Modal from "../../../components/modal/modal";
import CustomSelectInput from "../../../components/forms/customSelectInput/customSelectInput";
import FullyResponsiveTable from "../../../components/tables/fullyResponsiveTable/fullyResponsiveTable";
import SimpleButton from "../../../components/buttons/simpleButton";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import "./expensesInfo.css";

function ExpensesInfo(props) {

  const [{
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
    handleExpenseInfoDelete, handleCheckboxPaidChange]
    = useExpensesInfo(props.expensesOnFocus, props.selectedMonthYear, props.expenseTypes, props.addExpenseObjectOnListAndFocus,
    props.updateExpenseInfo, props.deleteExpenseInfo);

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
        <td className="fixed-cells-width-100 number-column">
          <span>{expenseInfo.price.toFixed(2)}</span>
        </td>
        <td className="fixed-cells-width-80" onClick={() => openUpdateModal(expenseInfo)}>
          <img src={editIcon} alt="Editar"/>
        </td>
        <td className="fixed-cells-width-80" onClick={() => openDeleteModal(expenseInfo)}>
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
          {props.expenseTypes.length > 0 && (
            <span onClick={openCreateModal} className="open-modal-button">+</span>
          )}
        </div>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>

      <div>
        {props.expenseTypes.length === 0 && (
          <ErrorMessageContainer
            message={"Você ainda não cadastrou nenhum grupo de despesa. Vá até a aba de \"Configurações\" e cadastre agora mesmo!"}/>
        )}

        {props.expenseTypes.length > 0 && props.expensesOnFocus.length === 0 && (
          <p className="expense-information-container">Você ainda não cadastrou nenhuma despesa. Clique no
            botão <span>+</span> acima e cadastre agora mesmo!</p>
        )}

        {props.expenseTypes.length > 0 && (
          <>
            {createModalVisible && (
              <Modal onClose={closeCreateModal}>
                <div className="expenses-info-create-modal">
                  <h3>Cadastrar Despesa</h3>
                  <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>

                  <form onSubmit={handleCreate} className="expense-info-modal">
                    <div>
                      <div>
                        <label>Nome</label>
                        <div>
                          <input required maxLength={255} autoComplete="off" type="text"
                                 value={createExpenseInfoName} onChange={handleCreateExpenseInfoNameChange}/>
                        </div>
                      </div>

                      <div>
                        <label>Preço (R$)</label>
                        <div>
                          <input required autoComplete="off" type="number" value={createExpenseInfoPrice}
                                 onChange={handleCreateExpenseInfoPriceChange}/>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label>Grupo</label>
                        <div>
                          <CustomSelectInput value={createExpenseInfoExpenseTypeId}
                                             onChange={handleCreateExpenseInfoExpenseTypeIdChange}>
                            {props.expenseTypes.map(renderExpenseTypeOption)}
                          </CustomSelectInput>
                        </div>
                      </div>

                      <div>
                        <label>Pago</label>
                        <div>
                          <input type="checkbox" checked={createExpenseInfoPaid === "true"}
                                 onChange={handleCreateExpenseInfoPaidChange}/>
                        </div>
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

        {props.expensesOnFocus.length > 0 && (
          <>
            {updateModalVisible && (
              <Modal onClose={closeUpdateModal}>
                <div>
                  <h3>Alterar Despesa</h3>

                  <form onSubmit={handleExpenseInfoUpdate} className="expense-info-modal">
                    <div>
                      <div>
                        <label>Nome</label>
                        <div>
                          <input required maxLength={255} autoComplete="off" type="text"
                                 value={updateExpenseInfoName} onChange={handleUpdateExpenseInfoNameChange}/>
                        </div>
                      </div>

                      <div>
                        <label>Preço (R$)</label>
                        <div>
                          <input required autoComplete="off" type="number" value={updateExpenseInfoPrice}
                                 onChange={handleUpdateExpenseInfoPriceChange}/>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label>Grupo</label>
                        <div>
                          <CustomSelectInput value={updateExpenseInfoExpenseTypeId}
                                             onChange={handleUpdateExpenseInfoExpenseTypeIdChange}>
                            {props.expenseTypes.map(renderExpenseTypeOption)}
                          </CustomSelectInput>
                        </div>
                      </div>

                      <div>
                        <label>Pago</label>
                        <div>
                          <input type="checkbox" checked={updateExpenseInfoPaid}
                                 onChange={handleUpdateExpenseInfoPaidChange}/>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button type="submit">Alterar</button>
                    </div>
                  </form>
                </div>
              </Modal>
            )}

            {deleteModalVisible && (
              <Modal onClose={closeDeleteModal}>
                <h3>Remover Despesa</h3>
                <h4>Deseja mesmo remover a despesa "{expenseInfoOnFocus.name}"?</h4>
                <div className="modal-btns-box-1">
                  <SimpleButton onClick={closeDeleteModal} label={"Não"} backgroundColor={"#e63946"}
                                color={"#FFFFFF"}/>
                  <SimpleButton onClick={handleExpenseInfoDelete} label={"Sim!"} backgroundColor={"#0088a9"}
                                color={"#FFFFFF"}/>
                </div>
              </Modal>
            )}

            <FullyResponsiveTable minWidth={650}>
              <thead>
              <tr>
                <th className="fixed-cells-width-80">Pago</th>
                <th>Nome</th>
                <th>Grupo</th>
                <th className="fixed-cells-width-100">Preço (R$)</th>
                <th className="fixed-cells-width-80">Editar</th>
                <th className="fixed-cells-width-80">Remover</th>
              </tr>
              </thead>
              <tbody>
              {props.expensesOnFocus.map(renderExpenseInfoRow)}
              </tbody>
            </FullyResponsiveTable>
          </>
        )}
      </div>
    </div>
  )
}

export default ExpensesInfo;
