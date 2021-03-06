import {useState} from "react";
import AuthService from "../../../services/auth/AuthService";
import {useHistory} from "react-router-dom";
import useNotification from "../../../components/notifications/notification";

const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [handleSuccessNotification, handleErrorNotification] = useNotification();
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (username && password) {
      AuthService.login(username, password).then(
        response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          setLoading(false);
          history.push("/expenses");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          handleErrorNotification(resMessage);
        }
      );
    }
  }

  return [{username, password, loading, message}, handleUsernameChange, handlePasswordChange, handleSubmit];
}

export default useLoginForm;
