import React from "react";
import useSignUpForm from "./signupLogic";
import "../publicForm.css";

function SignUp() {

  const [
    {username, email, password, passwordConfirmation, loading, message, statusMessage},
    handleUsernameChange, handleEmailChange, handlePasswordChange, handlePasswordConfirmationChange, handleSubmit
  ] = useSignUpForm();

  return (
    <div className="publicForm-container">
      <h1>Cadastrar</h1>

      <form onSubmit={handleSubmit}>
        <div className="txt-field">
          <input type="text" required value={username}
                 autoComplete="off" onChange={handleUsernameChange}/>
          <span/>
          <label>Usuário</label>
        </div>

        <div className="txt-field">
          <input type="text" required value={email}
                 autoComplete="off" onChange={handleEmailChange}/>
          <span/>
          <label>Email</label>
        </div>

        <div className="txt-field">
          <input type="password" required value={password}
                 autoComplete="off" onChange={handlePasswordChange}/>
          <span/>
          <label>Senha</label>
        </div>

        <div className="txt-field">
          <input type="password" required value={passwordConfirmation}
                 autoComplete="off" onChange={handlePasswordConfirmationChange}/>
          <span/>
          <label>Confirmar senha</label>
        </div>

        <button type="submit" className="publicForm-btn">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {message.length > 0 && (
          <div className="message-error" style={{color: statusMessage === "success" ? "green" : "red"}}>
            <p>* {message}</p>
          </div>
        )}

        <div className="btn-link">
          Já é um membro? <a href="/login">Entre</a>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
