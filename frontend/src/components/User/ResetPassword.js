import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/userService";
import styles from "../../css/users/ResetPassword.module.css";
const ResetPasswordPage = () => {
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const token = query.get("token");
        const email = query.get("email");

        if (token && email) {
            setToken(token);
            setEmail(email);
        }
    }, [query]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await resetPassword(email, token, password, passwordConfirmation);
            setMessage("Password has been reset successfully.");
            setError("");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError("Failed to reset password.");
            setMessage("");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Reset Your Password</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <button type="submit" className={styles.button}>
                    Reset Password
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default ResetPasswordPage;
