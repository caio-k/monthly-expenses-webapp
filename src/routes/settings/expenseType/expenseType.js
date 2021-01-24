import React from "react";
import SimpleSlidingForm from "../../../components/forms/simpleSlidingForm/simpleSlidingForm";
import useExpenseType from "./expenseTypeLogic";
import VerticallyResponsiveTable from "../../../components/tables/verticallyResponsiveTable/verticallyResponsiveTable";
import Modal from "../../../components/modal/modal";
import SimpleButton from "../../../components/buttons/simpleButton";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import "./expenseType.css";

function ExpenseType(props) {
  const [{expenseTypes, newExpenseType, expenseTypeOnFocus, expenseTypeEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDelete, handleNewExpenseTypeChange, handleNewExpenseTypeEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal] = useExpenseType(props.expenseTypes);

  function renderRow(expenseTypeObject) {
    return (
      <tr key={expenseTypeObject.id}>
        <td>
          <span>{expenseTypeObject.name}</span>
        </td>

        <td onClick={() => openEditModal(expenseTypeObject)}>
          <img src={editIcon} alt="Editar"/>
        </td>

        <td onClick={() => openDeleteModal(expenseTypeObject)}>
          <img src={trashIcon} alt="Remover"/>
        </td>
      </tr>
    )
  }

  return (
    <div className="expense-type-container">
      <div className="expense-type-header">
        <div>
          <h2>Tipos de despesa</h2>
        </div>
        <SimpleSlidingForm
          type={"text"}
          placeholder={"Tipo de despesa"}
          maxLength={"255"}
          label={"+"}
          inputWidth={"115px"}
          value={newExpenseType}
          onChange={handleNewExpenseTypeChange}
          handleSubmit={handleSubmit}
          buttonId={"create-expense-type-btn"}
        />
      </div>

      <div className="expense-type-content">
        {editModalVisible && (
          <Modal onClose={closeEditModal}>
            <h4>Editar o tipo de despensa "{expenseTypeOnFocus.name}" para:</h4>
            <div className="edit-modal-content">
              <input type="text" required value={expenseTypeEdited} maxLength="255" autoComplete="off"
                     onChange={handleNewExpenseTypeEditedChange} className="expense-type-input-edit"/>
              <div className="modal-btns-box-1">
                <SimpleButton onClick={closeEditModal} label={"Cancelar"} backgroundColor={"#e63946"}
                              color={"#FFFFFF"}/>
                <SimpleButton onClick={handleEditSubmit} label={"Editar!"} backgroundColor={"#0088a9"}
                              color={"#FFFFFF"}/>
              </div>
            </div>
          </Modal>
        )}

        {deleteModalVisible && (
          <Modal onClose={closeDeleteModal}>
            <h4>Deseja mesmo remover o tipo de despesa "{expenseTypeOnFocus.name}" ?</h4>
            <h5>Atenção: Todas as despesas relacionadas à este tipo de despesa também serão removidas!</h5>

            <div className="modal-btns-box-1">
              <SimpleButton onClick={closeDeleteModal} label={"Não"} backgroundColor={"#e63946"}
                            color={"#FFFFFF"}/>
              <SimpleButton onClick={handleDelete} label={"Sim!"} backgroundColor={"#0088a9"}
                            color={"#FFFFFF"}/>
            </div>
          </Modal>
        )}

        <div className="table-expense-types-container">
          {expenseTypes.length === 0 && (
            <p> Você ainda não cadastrou nenhum tipo de despesa! Clique no botão <span
              className="create-expense-type-simulation-btn">+</span> acima para cadastrar.</p>
          )}

          {expenseTypes.length > 0 && (
            <VerticallyResponsiveTable>
              <thead>
              <tr>
                <th>Tipo de despesa</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
              </thead>
              <tbody>
              {expenseTypes.map(renderRow)}
              </tbody>
            </VerticallyResponsiveTable>
          )}
        </div>

      </div>
    </div>
  )
}

export default ExpenseType;
