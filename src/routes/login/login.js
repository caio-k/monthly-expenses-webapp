import React from "react";
import useLoginForm from "./loginLogic";
import "./login.css";

function Login() {
  const [{username, password, loading}, handleUsernameChange, handlePasswordChange, handleSubmit] = useLoginForm();

  return (
    <div className="login-container">
      <h1>Entrar</h1>

      <form onSubmit={handleSubmit}>
        <div className="txt-field">
          <input
            type="text"
            required={true}
            value={username}
            autoComplete="off"
            onChange={handleUsernameChange}
          />
          <span/>
          <label>Usuário</label>
        </div>

        <div className="txt-field">
          <input
            type="password"
            required={true}
            value={password}
            autoComplete="off"
            onChange={handlePasswordChange}
          />
          <span/>
          <label>Senha</label>
        </div>

        <button type="submit" className="login-btn">
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="signup-link">
          Não é um membro? <a href="/signup">Registre-se</a>
        </div>
      </form>
    </div>
  )
}

export default Login;
