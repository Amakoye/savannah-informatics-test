import axios from "axios";

const api = axios.create({
  baseURL: "http://3.88.242.108/api/", // hardcoded intentionally for deployment to github pages
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
