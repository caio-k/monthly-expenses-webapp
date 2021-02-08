import {useState} from "react";
import validator from 'validator';
import AuthService from "../../../services/auth/AuthService";
import useNotification from "../../../components/notifications/notification";

const useSignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [handleSuccessNotification, handleErrorNotification] = useNotification();

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

    const error = hasInvalidInputs();

    if (error) {
      setLoading(false);
      setMessageInfo(error, errorStatus);
      handleErrorNotification(error);
    } else {
      AuthService.register(username, email, password).then(
        () => {
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          setLoading(false);

          const successMessage = "Usuário cadastrado com sucesso!";
          setMessageInfo(successMessage, successStatus);
          handleSuccessNotification(successMessage);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessageInfo(resMessage, errorStatus);
          handleErrorNotification(error);
        }
      )
    }
  }

  const hasInvalidInputs = () => {
    if (!(username && email && password && passwordConfirmation)) {
      return "Todos os campos são obrigatórios.";
    } else if (username.length < 3 || username.length > 20) {
      return "Usuário deve ter de 3 a 20 caracteres.";
    } else if (!validator.isEmail(email)) {
      return "Insira um email válido.";
    } else if (password.length < 6 || password.length > 40) {
      return "Senha deve ter de 6 a 40 caracteres.";
    } else if (!(password === passwordConfirmation)) {
      return "Senhas diferentes.";
    } else {
      return false;
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
