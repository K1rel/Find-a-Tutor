import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import styles from "../../css/teachers/TeacherProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser(); // Access the current user

    useEffect(() => {
        const fetchTeacherProfile = async () => {
            try {
                const response = await api.get(`/teacher-profiles/${id}`);
                setTeacher(response.data);
            } catch (error) {
                console.error("Error fetching teacher profile:", error);
            }
        };

        fetchTeacherProfile();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleReview = () => {
        navigate(`/write-review/${id}`); // Navigate to review page
    };

    return (
        <div className={styles.profileContainer}>
            <button className={styles.goBackButton} onClick={handleGoBack}>
                &larr; Go Back
            </button>
            {teacher ? (
                <>
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/storage/${teacher.user.profile_picture}`}
                        alt={`${teacher.user.first_name} ${teacher.user.last_name}`}
                        className={styles.profilePicture}
                    />
                    <h1>
                        {teacher.user.first_name} {teacher.user.last_name}
                    </h1>
                    <p>
                        <strong>Rate:</strong> ${teacher.rate} per hour
                    </p>
                    <p>
                        <strong>Availability:</strong> {teacher.availability}
                    </p>
                    <p>
                        <strong>Willing to travel:</strong>{" "}
                        {teacher.willing_to_travel} km
                    </p>
                    {/* Render reviews here */}
                    {user?.role === "student" && (
                        <button
                            className={styles.reviewButton}
                            onClick={handleReview}
                        >
                            Leave a Review
                        </button>
                    )}
                </>
            ) : (
                <p>Loading teacher profile...</p>
            )}
        </div>
    );
};

export default TeacherProfile;
