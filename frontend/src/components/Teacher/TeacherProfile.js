import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import styles from "../../css/teachers/TeacherProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import LoadingSpinner from "../Basic/LoadingSpinner";

// Helper function to format the availability string
const formatAvailability = (availability) => {
    if (!availability) return "Not Specified";
    if (availability === "both") return "In Person and Online";
    return availability
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchTeacherProfile = async () => {
            try {
                const response = await api.get(`/teacher-profiles/${id}`);

                const parsedLanguages = JSON.parse(
                    response.data.languages || "[]"
                );
                const createdAt = new Date(response.data.user.created_at);

                setTeacher({
                    ...response.data,
                    languages: parsedLanguages,
                    created_at: createdAt.toLocaleDateString(),
                });
            } catch (error) {
                console.error("Error fetching teacher profile:", error);
            }
        };

        fetchTeacherProfile();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleReview = () => {
        navigate(`/write-review/${id}`);
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
                        <strong>Availability:</strong>{" "}
                        {formatAvailability(teacher.availability)}
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
                    <p>
                        <strong>Members Since:</strong> {teacher.created_at}
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
                <LoadingSpinner />
            )}
        </div>
    );
};

export default TeacherProfile;
