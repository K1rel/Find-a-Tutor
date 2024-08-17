import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacherReviews, submitReview } from "../../services/reviewService";
import StarRating from "./StarRating";
import styles from "../../css/teachers/Review.module.css";
import { useUser } from "../../Context/UserContext";

const ReviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getTeacherReviews(id);
                console.log(data);
                setReviews(data.reviews);

                // Check if the current user has already reviewed this teacher
                const userReview = data.reviews.find(
                    (review) => review.student.id === user.id
                );
                if (userReview) {
                    setHasReviewed(true);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [id, user.id]);

    const handleRatingChange = (rating) => {
        setRating(rating);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await submitReview(id, { rating, review: reviewText });
            setReviews([
                ...reviews,
                {
                    rating,
                    review: reviewText,
                    student: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                    },
                },
            ]);
            setRating(0);
            setReviewText("");
            setHasReviewed(true);
        } catch (error) {
            setError("Error submitting review. Please try again.");
            console.error("Error submitting review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.reviewPageContainer}>
            <button
                className={styles.goBackButton}
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
            {/* Display average rating here */}
            {!hasReviewed && (
                <div className={styles.reviewForm}>
                    <h2>Leave a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <StarRating
                            maxRating={10}
                            onSetRating={handleRatingChange}
                        />
                        <textarea
                            className={styles.reviewTextArea}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            required
                        />
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            Submit Review
                        </button>
                        {error && <p className={styles.error}>{error}</p>}
                    </form>
                </div>
            )}
            <div className={styles.reviewsList}>
                <h2>Existing Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.studentName}>
                                    {review.student.first_name}{" "}
                                    {review.student.last_name}
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
                    <p className={styles.noReviews}>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewPage;
