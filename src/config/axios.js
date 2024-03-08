import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosInstance;
