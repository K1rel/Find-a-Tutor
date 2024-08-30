import api from "../axiosConfig";

// Get all posts
export const getPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get a single post
export const getPost = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a post
export const createPost = async (postData) => {
    try {
        const response = await api.post("/posts", postData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a post
export const updatePost = async (id, postData) => {
    try {
        const response = await api.put(`/posts/${id}`, postData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a post
export const deletePost = async (id) => {
    try {
        await api.delete(`/posts/${id}`);
    } catch (error) {
        throw error;
    }
};

// Add a student to a post
export const addStudentToPost = async (postId, studentId) => {
    try {
        const response = await api.post(`/posts/${postId}/students`, {
            student_id: studentId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Remove a student from a post
export const removeStudentFromPost = async (postId, studentId) => {
    try {
        const response = await api.delete(
            `/posts/${postId}/students/${studentId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserPosts = async () => {
    const response = await api.get("/user-posts");
    return response.data;
};

export const getPostsQuery = async (query = "", filters = {}) => {
    try {
        const response = await api.get(`/search/posts`, {
            params: {
                query: query,
                education_level: filters.education_level || "",
                tag_name: filters.tag_name || "",
                location: filters.location || "",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Network response was not ok.");
    }
};
