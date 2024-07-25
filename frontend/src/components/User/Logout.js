import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await logoutUser();
                navigate("/login"); // Redirect to login page
            } catch (error) {
                console.error(
                    "Logout error:",
                    error.response?.data || error.message
                );
            }
        };

        logout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
