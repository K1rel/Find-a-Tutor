import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacherReviews, submitReview } from "../../services/reviewService";
import StarRating from "./StarRating";
import styles from "../../css/teachers/Review.module.css";
import { useUser } from "../../Context/UserContext";
import LoadingSpinner from "../Basic/LoadingSpinner";

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

                setReviews(data.reviews);

                if (user && user.id) {
                    const userReview = data.reviews.find(
                        (review) => review.student.id === user.id
                    );
                    if (userReview) {
                        setHasReviewed(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        if (user && user.id) {
            fetchReviews();
        }
    }, [id, user]);

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
                    stars: rating,
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

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalStars = reviews.reduce(
            (acc, review) => acc + review.stars,
            0
        );
        return (totalStars / reviews.length).toFixed(1); // Round to 1 decimal place
    };

    const averageRating = calculateAverageRating(reviews);
    if (!user) {
        return <LoadingSpinner />; // Or some other loading state
    }
    if (!reviews.length > 0) {
        return <LoadingSpinner />;
    }
    return (
        <div className={styles.reviewPageContainer}>
            <button
                className={styles.goBackButton}
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
            <div className={styles.averageRating}>
                <h2>Average Rating</h2>
                <p className={styles.averageRatingValue}>
                    {averageRating} / 10
                </p>
            </div>

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
