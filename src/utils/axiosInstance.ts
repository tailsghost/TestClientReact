import axios from "axios";
import { HOST_API_KEY } from "./globalConfig";

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
});

axiosInstance.interceptors.response.use(
  (responce) => responce,
  (error) =>
    Promise.reject(
      (error.responce && error.responce) || "General Axios Error happend"
    )
);

export default axiosInstance;
