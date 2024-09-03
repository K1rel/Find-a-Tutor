import api from "../axiosConfig";

export const getTeacherReviews = async (teacherId) => {
    const response = await api.get(`/teachers/${teacherId}/reviews`);
    return response.data;
};

export const submitReview = async (teacherId, reviewData) => {
    const response = await api.post(
        `/teachers/${teacherId}/reviews`,
        reviewData
    );
    return response.data;
};

export const getMyReviews = async () => {
    const response = await api.get("/my-reviews");
    return response.data;
};
export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/teachers/reviews/${reviewId}`);
    return response.data;
};
