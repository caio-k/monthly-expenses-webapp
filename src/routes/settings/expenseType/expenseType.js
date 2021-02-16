import React from "react";
import SimpleSlidingForm from "../../../components/forms/simpleSlidingForm/simpleSlidingForm";
import useExpenseType from "./expenseTypeLogic";
import FullyResponsiveTable from "../../../components/tables/fullyResponsiveTable/fullyResponsiveTable";
import Modal from "../../../components/modal/modal";
import SimpleLoadingButton from "../../../components/buttons/simpleLoadingButton";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import infoIcon from "../../../assets/info.svg";
import "./expenseType.css";

function ExpenseType(props) {
  const [{
    expenseTypes, newExpenseType, expenseTypeOnFocus, expenseTypeEdited, editModalVisible, deleteModalVisible,
    loadingEdit, loadingDelete
  }, handleSubmit, handleEditSubmit, handleDelete, handleNewExpenseTypeChange,
    handleNewExpenseTypeEditedChange, openEditModal, closeEditModal, openDeleteModal, closeDeleteModal] = useExpenseType(props.expenseTypes);

  function renderRow(expenseTypeObject) {
    return (
      <tr key={expenseTypeObject.id}>
        <td>
          <span>{expenseTypeObject.name}</span>
        </td>

        <td className="fixed-cells-width-80" onClick={() => openEditModal(expenseTypeObject)}>
          <img src={editIcon} alt="Editar"/>
        </td>

        <td className="fixed-cells-width-80" onClick={() => openDeleteModal(expenseTypeObject)}>
          <img src={trashIcon} alt="Remover"/>
        </td>
      </tr>
    )
  }

  return (
    <div className="expense-type-container">
      <div className="expense-type-header">
        <div>
          <h3>Grupos de despesa</h3>
        </div>
        <SimpleSlidingForm
          type={"text"}
          placeholder={"Digite aqui..."}
          maxLength={"255"}
          label={"+"}
          inputWidth={"115px"}
          value={newExpenseType}
          onChange={handleNewExpenseTypeChange}
          handleSubmit={handleSubmit}
          buttonId={"create-expense-type-btn"}
          tooltipText={"Adicionar grupo"}
        />
      </div>

      <div className="expense-type-content">
        {editModalVisible && (
          <Modal onClose={closeEditModal}>
            <h4>Editar o grupo de despensa "{expenseTypeOnFocus.name}" para:</h4>
            <div className="edit-modal-content">
              <input type="text" required value={expenseTypeEdited} maxLength="255" autoComplete="off"
                     onChange={handleNewExpenseTypeEditedChange} className="expense-type-input-edit"/>
              <div className="modal-btns-box-1">
                <SimpleLoadingButton onClick={closeEditModal} label={"Cancelar"} backgroundColor={"#e63946"}
                                     color={"#FFFFFF"}/>
                <SimpleLoadingButton onClick={handleEditSubmit} label={"Editar"} backgroundColor={"#0088a9"}
                                     color={"#FFFFFF"} loading={loadingEdit}/>
              </div>
            </div>
          </Modal>
        )}

        {deleteModalVisible && (
          <Modal onClose={closeDeleteModal}>
            <h4>Deseja mesmo remover o grupo de despesa "{expenseTypeOnFocus.name}" ?</h4>
            <h5>Atenção: Todas as despesas relacionadas à este grupo também serão removidas!</h5>

            <div className="modal-btns-box-1">
              <SimpleLoadingButton onClick={closeDeleteModal} label={"Não"} backgroundColor={"#e63946"}
                                   color={"#FFFFFF"}/>
              <SimpleLoadingButton onClick={handleDelete} label={"Sim"} backgroundColor={"#0088a9"}
                                   color={"#FFFFFF"} loading={loadingDelete}/>
            </div>
          </Modal>
        )}

        <div className="table-expense-types-container">
          {expenseTypes.length === 0 && (
            <div className="expense-type-information-container">
              <div>
                <img src={infoIcon} alt={"Atenção:"} width={50} height={50}/>
              </div>
              <div>
                <p>Nenhum <strong>grupo de despesa</strong> foi cadastrado!</p>
                <p> Clique no botão <span className="create-expense-type-simulation-btn">+</span> acima para cadastrar.
                </p>
              </div>
            </div>
          )}

          {expenseTypes.length > 0 && (
            <FullyResponsiveTable minWidth={250}>
              <thead>
              <tr>
                <th>Grupo de despesa</th>
                <th className="fixed-cells-width-80">Editar</th>
                <th className="fixed-cells-width-80">Remover</th>
              </tr>
              </thead>
              <tbody style={{maxHeight: "200px"}}>
              {expenseTypes.map(renderRow)}
              </tbody>
            </FullyResponsiveTable>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpenseType;
