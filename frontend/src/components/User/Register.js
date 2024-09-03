import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "../../css/users/Register.module.css";
import { languages } from "../../data/languages";

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
        availability: "",
        willing_to_travel: "",
        languages: [],
    });

    const [showTeacherFields, setShowTeacherFields] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, options } = e.target;

        if (name === "languages") {
            const selectedLanguages = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);

            setFormData({
                ...formData,
                [name]: selectedLanguages,
            });
        } else if (name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
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
            console.log(formData);
            await register(formData);
            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response && error.response.data.errors) {
                const allErrors = Object.values(
                    error.response.data.errors
                ).flat();
                setErrorMessages(allErrors);
            } else {
                alert("Registration failed.");
            }
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
                    <select
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        multiple
                        className={styles.languages}
                    >
                        {languages.map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </>
            )}

            <button type="submit" className={styles.submitButton}>
                Register
            </button>

            {errorMessages.length > 0 && (
                <div className={styles.errorPopup}>
                    <h3>Registration Error</h3>
                    <ul>
                        {errorMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default Register;
