import axios from "../config/axios";

const API_URL = process.env.REACT_APP_API_URL;
export async function loginHandler(formData) {
  try {
    const response = await axios.post(`${API_URL}/api/auth`, formData);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error:", error.response.data);
    throw new Error(error.response.data.message);
  }
}

export async function signupHandler(formData) {
  try {
    const response = await axios.post(`${API_URL}/api/users`, formData);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data);
    throw new Error(error.response.data.message);
  }
}

export async function logoutHandler() {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error:", error.response.data);
    throw new Error(error.response.data.message);
  }
}
