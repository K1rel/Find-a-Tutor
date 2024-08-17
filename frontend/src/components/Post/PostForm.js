import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost, getPost } from "../../services/postService";
import { getTags } from "../../services/tagService";
import styles from "../../css/posts/PostForm.module.css";

const PostForm = ({ postId, onSuccess }) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        location: "",
        dateFirstClass: "",
        tag_id: "",
        maxCount: 1, // Default to 1 student
        rate: "", // New field for rate
    });
    const [tags, setTags] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
                        tag_id: postData.tag_id,
                        maxCount: postData.maxCount, // Handle maxCount field
                        rate: postData.rate || "", // Handle rate field
                    });
                    setIsEditing(true);
                } catch (error) {
                    console.error("Error fetching post data:", error);
                } finally {
                    setIsLoading(false); // Set loading to false once data is fetched
                }
            };
            fetchPost();
        } else {
            setIsLoading(false); // No postId means no post data loading required
        }

        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, [postId]);

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newPost;
            if (isEditing) {
                newPost = await updatePost(postId, post);
            } else {
                newPost = await createPost(post);
            }
            onSuccess();
            console.log(newPost);
            navigate(`/posts/${newPost.id}`);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
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
                    Tag:
                    <select
                        name="tag_id"
                        value={post.tag_id}
                        onChange={handleChange}
                        required
                        className={styles.selectField}
                    >
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name + " | " + tag.education_level}
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
            </form>
        </div>
    );
};

export default PostForm;
