import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Ensure this matches your token storage logic
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("Request headers:", config.headers); // Verify headers are set
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;
