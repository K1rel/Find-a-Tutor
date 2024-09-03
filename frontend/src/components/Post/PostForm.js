import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost, getPost } from "../../services/postService";
import { getTags } from "../../services/tagService";
import LoadingSpinner from "../Basic/LoadingSpinner";
import styles from "../../css/posts/PostForm.module.css";

const PostForm = ({ postId, onSuccess }) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        location: "",
        dateFirstClass: "",
        tag_name: "",
        education_level: "",
        maxCount: 1, // Default to 1 student
        rate: "", // New field for rate
    });
    const [tags, setTags] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                try {
                    const postData = await getPost(postId);
                    setPost({
                        title: postData.title,
                        description: postData.description,
                        location: postData.location,
                        dateFirstClass: postData.dateFirstClass,
                        tag_name: postData.tag_name,
                        education_level: postData.education_level,
                        maxCount: postData.maxCount,
                        rate: postData.rate || "",
                    });
                    setIsEditing(true);
                } catch (error) {
                    console.error("Error fetching post data:", error);
                    setErrorMessage("Failed to load post data.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPost();
        } else {
            setIsLoading(false);
        }

        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error("Error fetching tags:", error);
                setErrorMessage("Failed to load tags.");
            }
        };

        fetchTags();
    }, [postId]);

    const handleTagNameChange = (e) => {
        setPost({
            ...post,
            tag_name: e.target.value,
        });
    };

    const handleEducationLevelChange = (e) => {
        setPost({
            ...post,
            education_level: e.target.value,
        });
    };

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const today = new Date().toISOString().split("T")[0];
        if (post.dateFirstClass < today) {
            setErrorMessage("Date of the first class cannot be in the past.");
            return;
        }
        try {
            let newPost;
            if (isEditing) {
                newPost = await updatePost(postId, post);
            } else {
                newPost = await createPost(post);
            }
            onSuccess();
            navigate(`/posts/${newPost.id}`);
        } catch (error) {
            console.error("Error saving post:", error);
            setErrorMessage("Failed to save post. Please check your inputs.");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>
                {isEditing ? "Edit Post" : "Create Post"}
            </h1>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Description:
                    <textarea
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                        required
                        className={styles.textAreaField}
                    />
                </label>
                <label className={styles.label}>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={post.location}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Date of First Class:
                    <input
                        type="date"
                        name="dateFirstClass"
                        value={post.dateFirstClass}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Tag Name:
                    <select
                        name="tag_name"
                        value={post.tag_name}
                        onChange={handleTagNameChange}
                        required
                        className={styles.selectField}
                    >
                        <option value="">Select Tag Name</option>
                        {[...new Set(tags.map((tag) => tag.name))].map(
                            (name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            )
                        )}
                    </select>
                </label>
                <label className={styles.label}>
                    Education Level:
                    <select
                        name="education_level"
                        value={post.education_level}
                        onChange={handleEducationLevelChange}
                        required
                        className={styles.selectField}
                    >
                        <option value="">Select Education Level</option>
                        {[
                            ...new Set(tags.map((tag) => tag.education_level)),
                        ].map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={styles.label}>
                    Max Students:
                    <input
                        type="number"
                        name="maxCount"
                        value={post.maxCount}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.label}>
                    Rate:
                    <input
                        type="number"
                        name="rate"
                        value={post.rate}
                        onChange={handleChange}
                        placeholder="Rate (e.g., 30)"
                        className={styles.inputField}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>
                    {isEditing ? "Update Post" : "Create Post"}
                </button>

                {errorMessage && (
                    <div className={styles.errorPopup}>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostForm;
