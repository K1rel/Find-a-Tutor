// UpdatePost.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePost = ({ postId }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/posts/${postId}`,
                    {
                        withCredentials: true,
                    }
                );
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/api/posts/${postId}`,
                formData,
                {
                    withCredentials: true,
                }
            );
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />
            <input
                type="date"
                name="dateFirstClass"
                value={formData.dateFirstClass}
                onChange={handleChange}
            />
            <input
                type="number"
                name="maxCount"
                placeholder="Max Count"
                value={formData.maxCount}
                onChange={handleChange}
            />
            <input
                type="text"
                name="user_id"
                placeholder="User ID"
                value={formData.user_id}
                onChange={handleChange}
            />
            <input
                type="text"
                name="tag_id"
                placeholder="Tag ID"
                value={formData.tag_id}
                onChange={handleChange}
            />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default UpdatePost;
