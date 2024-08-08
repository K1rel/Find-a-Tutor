import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";

import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user, loading, updateUser, fetchUserData, profile } = useUser();
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
            if (isSubmitting) return; // Prevent multiple submissions
            setIsSubmitting(true);
            try {
                const updatedProfileData = { ...formData };
                if (file) {
                    updatedProfileData.profile_picture = file;
                }
                await updateUser(updatedProfileData);
                await fetchUserData(user.id);
                await fetch;
                navigate("/profile");
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [
            formData,
            file,
            updateUser,
            fetchUserData,
            user.id,
            navigate,
            isSubmitting,
        ]
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
        setFile(null); // Clear file input when profile data is loaded
    }, []);
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
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Current Profile Picture:
                    {formData.profile_picture && (
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/storage/${formData.profile_picture}`}
                            alt="Profile"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    )}
                </label>
                <label>
                    Change Profile Picture:
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;
