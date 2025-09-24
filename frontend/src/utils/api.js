import axios from "axios";

// Use env for backend API base URL. Create `.env.local` with NEXT_PUBLIC_API_URL
// Example: NEXT_PUBLIC_API_URL=http://localhost:5000/api
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: false,
});

// Inject JWT from localStorage for protected endpoints
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const normalized = new Error(
      error?.response?.data?.msg || error?.response?.data?.message || error?.message || "Request failed"
    );
    normalized.response = error.response;
    return Promise.reject(normalized);
  }
);

export default API;
