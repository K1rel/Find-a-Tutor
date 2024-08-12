import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../../css/users/Register.module.css";

const Register = () => {
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
        profile_picture: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await registerUser(formData);
            setUser(user);
            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                className={styles.inputField}
            />
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className={styles.inputField}
            />
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
            <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className={styles.inputField}
            />
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.selectField}
            >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            <input
                type="file"
                name="profile_picture"
                onChange={handleChange}
                className={styles.fileInput}
            />
            <button type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
};

export default Register;
