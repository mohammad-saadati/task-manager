import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.response.use(
  function (response) {
    // console.log("interceptor", response);
    return response;
  },
  function (error) {
    // console.log("interceptor", error);
    if (error?.response?.status === 403) {
      window.location.replace("/login");
      return error.response;
    }
  }
);

export default api;
