import axios from "axios";

// Set up the API client
const api = axios.create({
    baseURL: "http://localhost:8000/api", // Update with your API base URL
});

// Register a new user
export const registerUser = async (formData) => {
    const data = new FormData();

    // Append form fields to FormData object
    for (const [key, value] of Object.entries(formData)) {
        if (value) {
            data.append(key, value);
        }
    }

    try {
        const response = await api.post("/register", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

// Login a user
export const loginUser = async (loginData) => {
    try {
        const response = await api.post("/login", loginData);
        const { user, token } = response.data;
        localStorage.setItem("token", token); // Store token in localStorage
        return { user, token };
    } catch (error) {
        throw error;
    }
};

// Logout the user
export const logoutUser = async () => {
    try {
        const token = localStorage.getItem("token");
        await api.post(
            "/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        localStorage.removeItem("token"); // Remove token from localStorage
    } catch (error) {
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token"); // Ensure this matches your token storage logic

    try {
        const response = await api.get("/current_user", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.user;
    } catch (error) {
        console.error(
            "Error fetching current user:",
            error.response || error.message
        );
        throw error;
    }
};
