import React, { useState, useEffect } from "react";
import { createPost, updatePost, getPost } from "../../services/postService";
import { getTags } from "../../services/tagService";

const PostForm = ({ postId, onSuccess }) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        location: "",
        dateFirstClass: "",
        tag_id: "",
        maxCount: 1,
    });
    const [tags, setTags] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

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
                        maxCount: postData.maxCount,
                    });
                    setIsEditing(true);
                } catch (error) {
                    console.error("Error fetching post data:", error);
                }
            };
            fetchPost();
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
            if (isEditing) {
                await updatePost(postId, post);
            } else {
                await createPost(post);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={post.location}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Date of First Class:
                <input
                    type="date"
                    name="dateFirstClass"
                    value={post.dateFirstClass}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Tag:
                <select
                    name="tag_id"
                    value={post.id}
                    onChange={handleChange}
                    required
                >
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name + " | " + tag.education_level}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Max Count:
                <input
                    type="number"
                    name="maxCount"
                    value={post.maxCount}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">
                {isEditing ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
};

export default PostForm;
