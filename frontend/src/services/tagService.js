import api from "../axiosConfig";

// Get all tags
export const getTags = async () => {
    try {
        const response = await api.get("/tags");
        return response.data;
    } catch (error) {
        throw error;
    }
};
