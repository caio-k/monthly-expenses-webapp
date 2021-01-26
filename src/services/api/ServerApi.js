import axios from "axios";
import authHeader from "./AuthHeader";

export default axios.create({
  baseURL: "https://monthly-expenses-server.herokuapp.com",
  responseType: "json",
  headers: authHeader(),
});
