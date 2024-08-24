import React from "react";
import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import styles from "../../css/users/Profile.module.css";

import { requestResetPassword } from "../../services/userService";

const Profile = () => {
    const { user, loading } = useUser();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    const handlePasswordReset = async () => {
        try {
            await requestResetPassword(user.email);
            alert("Password reset link has been sent to your email.");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("Failed to send password reset email.");
        }
    };
    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>Profile</h1>
            <img
                src={`${process.env.REACT_APP_API_BASE_URL}/storage/${user.profile_picture}`}
                alt="Profile"
                className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Email: {user.email}</p>
            </div>
            <Link to="/profile/edit" className={styles.editProfileLink}>
                Edit Profile
            </Link>
            <button
                onClick={handlePasswordReset}
                className={styles.resetPasswordButton}
            >
                Reset Password
            </button>
        </div>
    );
};

export default Profile;
