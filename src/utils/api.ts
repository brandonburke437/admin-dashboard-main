// src/utils/api.ts
import axios from "axios";
console.log("API baseURL:", import.meta.env.VITE_API_URL);


// Create a reusable axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // set true if using cookies/session auth
});


export default API;


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
