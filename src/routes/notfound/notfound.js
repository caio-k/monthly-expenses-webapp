import React from "react";
import "./notfound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <h2>Oops! Página não encontrada</h2>
      <h1>404</h1>
      <p>Nós não conseguimos encontrar a página que você está procurando.</p>
      <a href="/">Volte para a tela inicial</a>
    </div>
  )
}

export default NotFound;
