import React from "react";
import useYear from "./yearLogic";
import RoundLoading from "../../../components/loading/roundLoading/roundLoading";
import Modal from "../../../components/modal/modal";
import SimpleButton from "../../../components/buttons/simpleButton";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import "./year.css";
import VerticallyResponsiveTable from "../../../components/tables/verticallyResponsiveTable/verticallyResponsiveTable";

function Year() {
  const [{years, loadingComponent, newYear, yearOnFocus, newYearEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDeleteYear, handleNewYearChange, handleNewYearEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal] = useYear();

  function renderRow(yearObject) {
    return (
      <tr key={yearObject.id}>
        <td>
          <span>{yearObject.yearNumber}</span>
        </td>

        <td onClick={() => openEditModal(yearObject)}>
          <img src={editIcon} alt="Editar"/>
        </td>

        <td onClick={() => openDeleteModal(yearObject)}>
          <img src={trashIcon} alt="Remover"/>
        </td>
      </tr>
    )
  }

  return (
    <div className="years-container">
      <div className="years-header">
        <h2>Anos</h2>
        <form className="new-year-form" onSubmit={handleSubmit}>
          <input type="number" required placeholder="Crie um novo ano" value={newYear} maxLength="4"
                 autoComplete="off" onChange={handleNewYearChange}/>
          <button id="create-year-btn" type="submit">
            <span className="button-text">+</span>
          </button>
        </form>
      </div>

      <div className="years-content">
        {loadingComponent && (
          <RoundLoading/>
        )}

        {!loadingComponent && (
          <>
            {editModalVisible && (
              <Modal onClose={closeEditModal}>
                <h4>Editar o ano de {yearOnFocus.yearNumber} para:</h4>
                <div className="edit-modal-content">
                  <input type="number" required value={newYearEdited} maxLength="4" autoComplete="off"
                         onChange={handleNewYearEditedChange} className="new-year-edited"/>
                  <div className="edit-modal-btns">
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
                <h4>Deseja mesmo remover o ano {yearOnFocus.yearNumber}?</h4>
                <h5>Atenção: Todas as despesas relacionadas à este ano também serão removidas!</h5>
                <div className="edit-modal-btns">
                  <SimpleButton onClick={closeDeleteModal} label={"Não"} backgroundColor={"#e63946"}
                                color={"#FFFFFF"}/>
                  <SimpleButton onClick={handleDeleteYear} label={"Sim!"} backgroundColor={"#0088a9"}
                                color={"#FFFFFF"}/>
                </div>
              </Modal>
            )}

            <div className="table-years-container">
              {years.length === 0 && (
                <p>Você ainda não cadastrou nenhum ano! Clique no botão <span
                  className="create-year-simulation-btn">+</span> acima para cadastrar.</p>
              )}

              {years.length > 0 && (
                <VerticallyResponsiveTable>
                  <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Editar</th>
                    <th>Remover</th>
                  </tr>
                  </thead>
                  <tbody>
                  {years.map(renderRow)}
                  </tbody>
                </VerticallyResponsiveTable>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Year;
