import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../../css/users/Edit.module.css";

const EditProfile = () => {
    const { user, loading, updateUser, profile, loggedUserProfile } = useUser();
    const [formData, setFormData] = useState({
        first_name: profile?.first_name || "",
        last_name: profile?.last_name || "",
        email: profile?.email || "",
        profile_picture: profile?.profile_picture || null,
        availability: profile?.availability || "",
        willing_to_travel: profile?.willing_to_travel || "",
        languages: profile?.languages ? profile.languages.join(", ") : "", // Updated
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
                const updatedProfileData = {
                    ...formData,
                    languages: formData.languages
                        .split(",")
                        .map((lang) => lang.trim()),
                };
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
                availability: profile.teacher_profile?.availability || "",
                willing_to_travel:
                    profile.teacher_profile?.willing_to_travel || "",
                languages: profile.teacher_profile?.languages || "",
                role: profile.role,
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
        if (e.target.name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
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

                {formData.role === "teacher" && (
                    <>
                        <label className={styles.label}>
                            Availability:
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className={styles.selectField}
                            >
                                <option value="">Select Availability</option>
                                <option value="online">Online</option>
                                <option value="in_person">In Person</option>
                                <option value="both">Both</option>
                            </select>
                        </label>
                        <label className={styles.label}>
                            Willing to Travel (in km):
                            <input
                                type="number"
                                name="willing_to_travel"
                                value={formData.willing_to_travel}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Willing to Travel"
                            />
                        </label>
                        <label className={styles.label}>
                            Languages Spoken:
                            <input
                                type="text"
                                name="languages"
                                value={formData.languages}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Languages Spoken"
                            />
                        </label>
                    </>
                )}

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
