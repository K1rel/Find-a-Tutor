import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../../css/users/Register.module.css";

const Register = () => {
    const { register } = useUser();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
        profile_picture: null,
        rate: "", // New field for teacher rate
        availability: "", // New field for teacher availability
        willing_to_travel: "", // New field for teacher travel distance
    });
    const [showTeacherFields, setShowTeacherFields] = useState(false); // State to show/hide teacher fields
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData({ ...formData, role });
        setShowTeacherFields(role === "teacher");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
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
                onChange={handleRoleChange}
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

            {showTeacherFields && (
                <>
                    <input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        placeholder="Rate (e.g., 30)"
                        className={styles.inputField}
                    />
                    <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className={styles.selectField}
                    >
                        <option value="">Select Availability</option>
                        <option value="online">Online</option>
                        <option value="in_person">In Person</option>
                        <option value="both">Both</option>
                    </select>
                    <input
                        type="number"
                        name="willing_to_travel"
                        value={formData.willing_to_travel}
                        onChange={handleChange}
                        placeholder="Willing to Travel (in km)"
                        className={styles.inputField}
                    />
                </>
            )}

            <button type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
};

export default Register;
