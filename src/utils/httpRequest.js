import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3003",
});

export default request;
