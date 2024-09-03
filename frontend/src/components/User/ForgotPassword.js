import React, { useState } from "react";
import { requestResetPassword } from "../../services/userService";
import styles from "../../css/users/ForgotPassword.module.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            await requestResetPassword(email);
            setMessage("Password reset link has been sent to your email.");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setError("Failed to find your email.");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={styles.inputField}
                />
                <button type="submit" className={styles.button}>
                    Send Reset Link
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
