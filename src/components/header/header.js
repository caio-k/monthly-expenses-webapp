import React from "react";
import AuthService from "../../services/auth/AuthService";
import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.png";
import "./header.css";

function Header() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <header>
      <span>Monthly Expenses</span>

      <input type="checkbox" id="chk"/>
      <label htmlFor="chk" className="show-menu-btn">
        <img
          src={menuIcon}
          alt='...'
          width="30px"
          height="30px"
        />
      </label>

      <ul className="menu">
        {!currentUser && (
          <>
            <a href="/login">Entrar</a>
            <a href="/signup">Cadastrar</a>
          </>
        )}

        {currentUser && (
          <>
            <a href="/settings">Configurações</a>
            <a href="/expenses">Despesas</a>
            <a href="/login" onClick={AuthService.logout}>Sair</a>
            <a href="/" className="current-user-link">
              <button>{currentUser.username}</button>
            </a>
          </>
        )}

        <label htmlFor="chk" className="hide-menu-btn">
          <img
            src={closeIcon}
            alt='X'
            width="25px"
            height="25px"
          />
        </label>
      </ul>
    </header>
  )
}

export default Header;
