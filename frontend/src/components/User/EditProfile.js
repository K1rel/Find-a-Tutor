import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../../css/users/Edit.module.css";

const EditProfile = () => {
    const {
        user,
        loading,
        updateUser,
        fetchUserData,
        profile,
        loggedUserProfile,
    } = useUser();
    const [formData, setFormData] = useState({
        first_name: profile?.first_name || "",
        last_name: profile?.last_name || "",
        email: profile?.email || "",
        profile_picture: profile?.profile_picture || null,
    });
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            setIsSubmitting(true);
            try {
                const updatedProfileData = { ...formData };
                if (file) {
                    updatedProfileData.profile_picture = file;
                }
                await updateUser(updatedProfileData);

                navigate("/profile");
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData, file, updateUser, navigate, isSubmitting]
    );

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                profile_picture: profile.profile_picture,
            });
        }
    }, [profile]);

    useEffect(() => {
        setFile(null);
    }, []);
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                await loggedUserProfile();
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        loadUserProfile();
    }, [loggedUserProfile]);

    if (loading && !user) {
        return <div>Loading...</div>;
    }

    if (!profile || user.id !== profile.id) {
        return navigate("/");
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile_picture") {
            setFormData({ ...formData, profile_picture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className={styles.editProfileContainer}>
            <h1 className={styles.title}>Edit Profile</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Current Profile Picture:
                    {formData.profile_picture && (
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/storage/${formData.profile_picture}`}
                            alt="Profile"
                            className={styles.profileImage}
                        />
                    )}
                </label>
                <label className={styles.label}>
                    Change Profile Picture:
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleChange}
                        className={styles.fileInput}
                    />
                </label>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
