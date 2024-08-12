import React, { useState } from "react";
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
            await api.post("/contact", formData); // Use your custom axios instance
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("Failed to send message. Please try again.");
        }
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Send</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default Contact;
