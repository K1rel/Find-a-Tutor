import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../css/users/Login.module.css";

const Login = () => {
    const { login } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={styles.inputField}
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className={styles.inputField}
            />
            <button type="submit" className={styles.button}>
                Login
            </button>
            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
            </Link>
        </form>
    );
};

export default Login;
