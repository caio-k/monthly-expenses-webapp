import React from "react";
import useLoginForm from "./loginLogic";
import "../publicForm.css";

function Login() {
  const [{username, password, loading, message}, handleUsernameChange, handlePasswordChange, handleSubmit] = useLoginForm();

  return (
    <div className="publicForm-container">
      <h1>Entrar</h1>

      <form onSubmit={handleSubmit}>
        <div className="txt-field">
          <input type="text" required value={username}
                 autoComplete="off" onChange={handleUsernameChange}/>
          <span/>
          <label>Usuário</label>
        </div>

        <div className="txt-field">
          <input type="password" required value={password}
                 autoComplete="off" onChange={handlePasswordChange}/>
          <span/>
          <label>Senha</label>
        </div>

        <button type="submit" className="publicForm-btn">
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {message.length > 0 && (
          <div className="message-error">
            <p>* {message}</p>
          </div>
        )}

        <div className="btn-link">
          Não é um membro? <a href="/signup">Registre-se</a>
        </div>
      </form>
    </div>
  )
}

export default Login;
