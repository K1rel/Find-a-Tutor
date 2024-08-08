import React, { useEffect } from "react";

import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, profile, loading, fetchUserData } = useUser();

    useEffect(() => {
        if (user && !profile) {
            fetchUserData(user.id);
        }
    }, [user, profile, fetchUserData]);

    if (loading || !profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Email: {profile.email}</p>
            <img
                src={`${process.env.REACT_APP_API_BASE_URL}/storage/${profile.profile_picture}`}
                alt="Profile"
            />
            <Link to="/profile/edit">Edit Profile</Link>
        </div>
    );
};

export default Profile;
