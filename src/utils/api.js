import axios from "axios";

const api = axios.create({
  // baseURL: `https://backend-lost-devices.onrender.com/api`, // Cambia esto a la URL de tu API
  baseURL: `http://localhost:5000/api`, // Cambia esto a la URL de tu API
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
