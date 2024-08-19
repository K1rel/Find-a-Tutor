// src/components/MyReviews.js

import React, { useState, useEffect } from "react";
import { getMyReviews } from "../../services/reviewService";
import styles from "../../css/users/MyReviews.module.css";
import { useUser } from "../../Context/UserContext";
import LoadingSpinner from "../Basic/LoadingSpinner";

const MyReviews = () => {
    const { user } = useUser();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyReviews = async () => {
            try {
                const response = await getMyReviews();
                setReviews(response.reviews);
            } catch (error) {
                setError("Error fetching reviews. Please try again.");
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyReviews();
    }, [user]);

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.reviewPageContainer}>
            <h1>My Reviews</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.reviewsList}>
                {loading ? (
                    <LoadingSpinner />
                ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.studentName}>
                                    {user.role === "student"
                                        ? `Review for ${review.teacher.first_name} ${review.teacher.last_name}`
                                        : `Review by ${review.student.first_name} ${review.student.last_name}`}
                                </span>
                            </div>
                            <div className={styles.reviewContent}>
                                <p className={styles.reviewText}>
                                    {review.review}
                                </p>
                            </div>
                            <div className={styles.reviewMeta}>
                                <span className={styles.reviewRating}>
                                    {review.stars} / 10
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noReviews}>No reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default MyReviews;
