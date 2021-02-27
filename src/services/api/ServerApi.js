import axios from "axios";
import authHeader from "./AuthHeader";

const getBaseURL = () => {
  return window.location.hostname === "https://monthly-expenses-app.herokuapp.com" ?
    "https://monthly-expenses-server.herokuapp.com" :
    "http://localhost:8080"
}

export default axios.create({
  baseURL: getBaseURL(),
  responseType: "json",
  headers: authHeader(),
});
