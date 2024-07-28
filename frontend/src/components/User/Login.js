import React, { useEffect, useState } from "react";
import { loginUser } from "../../services/userService";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(formData);
            setUser(user);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed.");
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            window.location.reload(); // Force a reload to ensure the user state is properly set
        }
    }, [isLoggedIn]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
