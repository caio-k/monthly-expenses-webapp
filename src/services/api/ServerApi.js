import axios from "axios";
import authHeader from "./AuthHeader";

export default axios.create({
  baseURL: "http://localhost:8080",
  responseType: "json",
  headers: authHeader(),
});
