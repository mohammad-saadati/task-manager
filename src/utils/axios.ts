import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});


export default api