import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import { useUser } from "../../Context/UserContext";
const Logout = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await logoutUser();
                setUser(null);
                navigate("/login"); // Redirect to login page
            } catch (error) {
                console.error(
                    "Logout error:",
                    error.response?.data || error.message
                );
            }
        };

        logout();
    }, [navigate, setUser]);

    return <div>Logging out...</div>;
};

export default Logout;
