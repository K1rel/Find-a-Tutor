import React, { useEffect } from "react";

import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, profile, loading, fetchUserData } = useUser();
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

    return (
        <div>
            <h1>Profile</h1>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Email: {profile.email}</p>
            <img src={profile.profile_picture} alt="Profile" />
            <Link to="/profile/edit">Edit Profile</Link>
        </div>
    );
};

export default Profile;
