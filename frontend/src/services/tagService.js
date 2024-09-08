import api from "../axiosConfig";

export const getTags = async () => {
    try {
        const response = await api.get("/tags");
        return response.data;
    } catch (error) {
        throw error;
    }
};
