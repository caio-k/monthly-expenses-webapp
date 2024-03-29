import React from "react";
import spreadsheets from "../../assets/spreadsheet.svg";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <div>
        <div>
          <img src={spreadsheets} alt="spreadsheet"/>
        </div>
      </div>

      <div>
        <div>
          <small>Seja bem vindo(a) ao</small>
          <h1>Monthly</h1>
          <h1>Expenses</h1>
          <div>
            <a href="/login">Entrar</a>
            <a href="/signup">Cadastrar</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
