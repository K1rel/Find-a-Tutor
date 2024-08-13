import React from "react";
import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import styles from "../../css/users/Profile.module.css";

const Profile = () => {
    const { user, loading } = useUser();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

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
        </div>
    );
};

export default Profile;
