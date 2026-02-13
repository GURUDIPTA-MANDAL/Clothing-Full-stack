import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔥 GLOBAL RESPONSE HANDLER
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Your account is blocked by admin"
    ) {
      alert("Your account has been blocked. Please login again.");
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
