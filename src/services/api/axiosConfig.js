import axios from "axios";

const api = axios.create({
  baseURL: "https://react-shop-backend.liara.run",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    return { data, status };
  },
  (error) => Promise.reject(error)
);

export default api;
