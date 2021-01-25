import React from "react";
import useYear from "./yearLogic";
import Modal from "../../../components/modal/modal";
import SimpleButton from "../../../components/buttons/simpleButton";
import SimpleSlidingForm from "../../../components/forms/simpleSlidingForm/simpleSlidingForm";
import FullyResponsiveTable from "../../../components/tables/fullyResponsiveTable/fullyResponsiveTable";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash.svg";
import infoIcon from "../../../assets/info.svg";
import "./year.css";

function Year(props) {
  const [{years, newYear, yearOnFocus, newYearEdited, editModalVisible, deleteModalVisible},
    handleSubmit, handleEditSubmit, handleDeleteYear, handleNewYearChange, handleNewYearEditedChange,
    openEditModal, closeEditModal, openDeleteModal, closeDeleteModal] = useYear(props.years);

  function renderRow(yearObject) {
    return (
      <tr key={yearObject.id}>
        <td>
          <span>{yearObject.yearNumber}</span>
        </td>

        <td className="fixed-cells-width-80" onClick={() => openEditModal(yearObject)}>
          <img src={editIcon} alt="Editar"/>
        </td>

        <td className="fixed-cells-width-80" onClick={() => openDeleteModal(yearObject)}>
          <img src={trashIcon} alt="Remover"/>
        </td>
      </tr>
    )
  }

  return (
    <div className="years-container">
      <div className="years-header">
        <h3>Anos</h3>
        <SimpleSlidingForm
          type={"number"}
          placeholder={"Digite aqui..."}
          maxLength={"4"}
          label={"+"}
          inputWidth={"115px"}
          value={newYear}
          onChange={handleNewYearChange}
          handleSubmit={handleSubmit}
          buttonId={"create-year-btn"}
        />
      </div>

      <div className="years-content">
        {editModalVisible && (
          <Modal onClose={closeEditModal}>
            <h4>Editar o ano de {yearOnFocus.yearNumber} para:</h4>
            <div className="edit-modal-content">
              <input type="number" required value={newYearEdited} maxLength="4" autoComplete="off"
                     onChange={handleNewYearEditedChange} className="new-year-edited"/>
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
            <h4>Deseja mesmo remover o ano {yearOnFocus.yearNumber}?</h4>
            <h5>Atenção: Todas as despesas relacionadas à este ano também serão removidas!</h5>
            <div className="modal-btns-box-1">
              <SimpleButton onClick={closeDeleteModal} label={"Não"} backgroundColor={"#e63946"}
                            color={"#FFFFFF"}/>
              <SimpleButton onClick={handleDeleteYear} label={"Sim!"} backgroundColor={"#0088a9"}
                            color={"#FFFFFF"}/>
            </div>
          </Modal>
        )}

        <div className="table-years-container">
          {years.length === 0 && (
            <div className="year-information-container">
              <div>
                <img src={infoIcon} alt={"Atenção:"} width={50} height={50}/>
              </div>
              <div>
                <p>Você ainda não cadastrou nenhum <strong>ano</strong>! Clique no botão <span
                  className="create-year-simulation-btn">+</span> acima para cadastrar.</p>
              </div>
            </div>
          )}

          {years.length > 0 && (
            <FullyResponsiveTable minWidth={250}>
              <thead>
              <tr>
                <th>Ano</th>
                <th className="fixed-cells-width-80">Editar</th>
                <th className="fixed-cells-width-80">Remover</th>
              </tr>
              </thead>
              <tbody style={{maxHeight: "200px"}}>
              {years.map(renderRow)}
              </tbody>
            </FullyResponsiveTable>
          )}
        </div>
      </div>
    </div>
  )
}

export default Year;
