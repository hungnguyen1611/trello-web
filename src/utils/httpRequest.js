import axios from "axios";
import { API_ROOT } from "./constants";

const request = axios.create({
  baseURL: API_ROOT,
});

export default request;
