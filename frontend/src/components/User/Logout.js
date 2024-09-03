import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import LoadingSpinner from "../Basic/LoadingSpinner";
const Logout = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate("/login");
        };

        performLogout();
    }, [logout, navigate]);

    return <LoadingSpinner />;
};

export default Logout;
