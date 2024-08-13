import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Logout = () => {
    const { logout } = useUser(); // Get the logout function from context
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout(); // Call the logout function
            navigate("/login"); // Redirect to login page
        };

        performLogout();
    }, [logout, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
