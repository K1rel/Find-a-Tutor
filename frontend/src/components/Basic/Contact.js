import React, { useState } from "react";
import styles from "../../css/basic/Contact.module.css";
import api from "../../axiosConfig";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/contact", formData);
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("Failed to send message. Please try again.");
        }
    };

    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.contactTitle}>Contact Us</h1>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                    Name:
                    <input
                        className={styles.inputField}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className={styles.formLabel}>
                    Email:
                    <input
                        className={styles.inputField}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className={styles.formLabel}>
                    Message:
                    <textarea
                        className={styles.textareaField}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className={styles.submitButton} type="submit">
                    Send
                </button>
            </form>
            {status && <p className={styles.statusMessage}>{status}</p>}
        </div>
    );
};

export default Contact;
