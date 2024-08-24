import api from "../axiosConfig";

// Set up the API client

// Register a new user
export const registerUser = async (formData) => {
    const data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        if (Array.isArray(value)) {
            data.append(key, JSON.stringify(value));
        } else {
            data.append(key, value);
        }
    }
    for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
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
        await api.post("/logout");
        localStorage.removeItem("token");
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
    // Ensure this matches your token storage logic
    try {
        const response = await api.get("/current_user");
        return response.data.user;
    } catch (error) {
        console.error(
            "Error fetching current user:",
            error.response || error.message
        );
        throw error;
    }
};
export const findUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    const formData = new FormData();

    Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== undefined && profileData[key] !== null) {
            formData.append(key, profileData[key]);
        }
    });

    try {
        const response = await api.post("/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

export const requestResetPassword = async (email) => {
    try {
        const response = await api.post("/password/reset", { email });
        return response.data;
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};
export const resetPassword = async (
    email,
    token,
    newPassword,
    passwordConfirmation
) => {
    try {
        const response = await api.post("/password/resetUser", {
            email,
            token,
            password: newPassword,
            password_confirmation: passwordConfirmation,
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};
