import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Monthly Expenses</h1>
        <p>Tudo o que você precisa para gerenciar suas despesas está aqui!</p>

        <div>
          <a href="/login">Entrar</a>
          <a href="/signup">Cadastrar</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
