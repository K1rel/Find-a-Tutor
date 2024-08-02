import React, { useEffect, useState } from "react";

import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, profile, loading, setLoading, fetchUserData } = useUser();
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user && !profile) {
                setLocalLoading(true);

                try {
                    await fetchUserData(user.id);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                } finally {
                    setLocalLoading(false);
                }
            }
        };
        console.log("Fetching profile...");
        fetchProfile();
    }, [user, profile, fetchUserData]);

    if (localLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Email: {profile.email}</p>
            <img src={profile.pfp} alt="Profile" />
            <Link to="/profile/edit">Edit Profile</Link>
        </div>
    );
};

export default Profile;
