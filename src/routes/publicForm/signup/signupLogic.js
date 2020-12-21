import {useState} from "react";
import validator from 'validator';
import AuthService from "../../../services/auth/AuthService";

const useSignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const successStatus = "success";
  const errorStatus = "error";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (validateInputs()) {
      AuthService.register(username, email, password).then(
        response => {
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          setMessageInfo(response.data.message, successStatus);
          setLoading(false);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessageInfo(resMessage, errorStatus);
          setLoading(false);
        }
      )
    } else {
      setLoading(false);
    }
  }

  const validateInputs = () => {
    if (!(username && email && password && passwordConfirmation)) {
      setMessageInfo("Todos os campos são obrigatórios.", errorStatus);
      return false;
    } else if (username.length < 3 || username.length > 20) {
      setMessageInfo("Usuário deve ter de 3 a 20 caracteres.", errorStatus);
      return false;
    } else if (!validator.isEmail(email)) {
      setMessageInfo("Insira um email válido.", errorStatus);
      return false;
    } else if (password.length < 6 || password.length > 40) {
      setMessageInfo("Senha deve ter de 6 a 40 caracteres.", errorStatus);
      return false;
    } else if (!(password === passwordConfirmation)) {
      setMessageInfo("Senhas diferentes.", errorStatus);
      return false;
    } else {
      return true;
    }
  }

  const setMessageInfo = (message, status) => {
    setMessage(message);
    setStatusMessage(status);
  }

  return [
    {username, email, password, passwordConfirmation, loading, message, statusMessage},
    handleUsernameChange, handleEmailChange, handlePasswordChange, handlePasswordConfirmationChange, handleSubmit
  ];
}

export default useSignUpForm;
