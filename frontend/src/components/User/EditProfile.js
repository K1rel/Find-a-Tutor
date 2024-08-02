import React, { useEffect } from "react";
import { useUser } from "../../Context/UserContext";

import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user, updateUser, profile, setProfile, fetchUserData, loading } =
        useUser();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            if (user && !profile) {
                try {
                    await fetchUserData(user.id);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            }
        };

        fetchProfile();
    }, [user, profile, fetchUserData]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!profile || user.id !== profile.id) {
        return navigate("/");
    }

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.id, profile);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
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
                        value={profile.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Profile Picture :
                    <input
                        type="file"
                        name="pfp"
                        value={profile.profile_picture}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;
