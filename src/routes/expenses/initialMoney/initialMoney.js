import React from "react";
import useInitialMoney from "./initialMoneyLogic";
import Modal from "../../../components/modal/modal";
import CustomSelectInput from "../../../components/forms/customSelectInput/customSelectInput";
import infoIcon from "../../../assets/info.svg";
import checkMark from "../../../assets/checkmark.svg";
import "./initialMoney.css";

const InitialMoney = (props) => {

  const [{newInitialMoneyValue, editModalVisible, initialMoneyValueChange, operation, initialMoneyValueEdited},
    handleNewInitialMoneyValueChange, handleCreate, handleUpdate, openEditModal, closeEditModal,
    handleInitialMoneyValueChangeChange, handleOperationChange]
    = useInitialMoney(props.initialMoneyOnFocus, props.selectedMonthYear, props.addInitialMoneyOnListAndFocus, props.updateInitialMoneyOnListAndFocus);

  return (
    <div className="expenses-box-session half-box">

      {editModalVisible && (
        <Modal onClose={closeEditModal}>
          <div className="initial-money-modal">
            <h3>Editar Capital Inicial</h3>
            <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber} - <strong>R${props.initialMoneyOnFocus.initialMoney.toFixed(2)}</strong>
            </h4>

            <form onSubmit={handleUpdate}>
              <div>
                <span>Operação:</span>
                <div>
                  <CustomSelectInput value={operation} onChange={handleOperationChange} width={180}>
                    <option value={1}>Adicionar</option>
                    <option value={-1}>Remover</option>
                  </CustomSelectInput>
                </div>
              </div>

              <div>
                <span>Valor:</span>
                <div className="initial-money-update-field">
                  <label>R$</label>
                  <input
                    placeholder={0}
                    type="number"
                    required
                    autoComplete="off"
                    value={initialMoneyValueChange}
                    onChange={handleInitialMoneyValueChangeChange}
                  />
                </div>
              </div>
              <div className="button-session-initial-money-modal">
                {(isNaN(initialMoneyValueEdited) || initialMoneyValueChange.length < 1) && (
                  <p>Digite um valor válido!</p>
                )}

                {(!isNaN(initialMoneyValueEdited) && initialMoneyValueChange.length > 0) && (
                  <>
                    <span>O capital inicial será atualizado para <strong>R${initialMoneyValueEdited}</strong></span>
                    <div className={"button-session-initial-money"} style={{marginLeft: "10px"}}>
                      <button type="submit" style={{marginTop: "0"}}>Atualizar</button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </Modal>
      )}

      <div className="expenses-box-session-header">
        <h3>Capital Inicial</h3>
        <h4>{props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}</h4>
      </div>

      <div className="expenses-box-session-content">

        {!props.initialMoneyOnFocus && (
          <div className="initial-money-register">
            <div>
              <img src={infoIcon} alt={"Atenção"} width={50} height={50}/>
              <p>
                Nenhum capital inicial foi cadastrado para o mês
                de {props.selectedMonthYear.monthName}/{props.selectedMonthYear.yearNumber}.
                <strong> Cadastre agora mesmo:</strong>
              </p>
            </div>

            <form onSubmit={handleCreate}>
              <div>
                <label><strong>$</strong></label>
                <input
                  placeholder={"Digite aqui o capital inicial"}
                  type="number"
                  required
                  value={newInitialMoneyValue}
                  onChange={handleNewInitialMoneyValueChange}
                />
              </div>

              <div className="button-session-initial-money">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        )}

        {props.initialMoneyOnFocus && (
          <div className="initial-money-value-session">
            <img src={checkMark} alt={"Ok"} width={40} height={40}/>
            <div>
              <p>O capital inicial é de <strong>R${props.initialMoneyOnFocus.initialMoney.toFixed(2)}</strong>.</p>
              <p>Para alterar, <span onClick={openEditModal}>clique aqui</span>.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default InitialMoney;
