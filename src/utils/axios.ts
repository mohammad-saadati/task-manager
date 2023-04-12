import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  timeout: 1000,
  withCredentials: true,
  // headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.response.use(
  function (response) {
    // console.log("interceptor", response);
    return response;
  },
  function (error) {
    // error includes CORS erros
    console.log("interceptor", error);
    if (
      error.name === "AxiosError" &&
      !location.href.includes("disconnected")
    ) {
      window.location.href = "/disconnected";
    }
    if (error?.response?.status === 403) {
      window.location.href = "/login";
      console.log("error?.response?.status", error.response.status);
      return error.response;
    }
    return error.response;
  }
);

export default api;
