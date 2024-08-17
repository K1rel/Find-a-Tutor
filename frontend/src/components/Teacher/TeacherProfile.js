import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import styles from "../../css/teachers/TeacherProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, fetchUserData } = useUser();

    useEffect(() => {
        const fetchTeacherProfile = async () => {
            try {
                const response = await api.get(`/teacher-profiles/${id}`);

                const parsedLanguages = JSON.parse(
                    response.data.languages || "[]"
                );
                setTeacher({ ...response.data, languages: parsedLanguages });
            } catch (error) {
                console.error("Error fetching teacher profile:", error);
            }
        };

        fetchTeacherProfile();
    }, []);

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
                        <strong>Availability:</strong> {teacher.availability}
                    </p>
                    <p>
                        <strong>Willing to travel:</strong>{" "}
                        {teacher.willing_to_travel} km
                    </p>
                    <p>
                        <strong>Languages:</strong>{" "}
                        {teacher.languages && teacher.languages.length > 0
                            ? teacher.languages.join(", ")
                            : "Not specified"}
                    </p>

                    {user?.role === "student" && (
                        <button
                            className={styles.reviewButton}
                            onClick={handleReview}
                        >
                            Reviews
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
