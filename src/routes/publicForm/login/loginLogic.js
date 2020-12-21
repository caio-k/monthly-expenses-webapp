import {useState} from "react";
import AuthService from "../../../services/auth/AuthService";
import {useHistory} from "react-router-dom";

const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
        () => {
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

          setMessage(resMessage);
          setLoading(false);
        }
      );
    }
  }

  return [{username, password, loading, message}, handleUsernameChange, handlePasswordChange, handleSubmit];
}

export default useLoginForm;
