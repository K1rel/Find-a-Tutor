// DeletePost.js
import React from "react";
import axios from "axios";

const DeletePost = ({ postId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
                withCredentials: true,
            });
            alert("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return <button onClick={handleDelete}>Delete Post</button>;
};

export default DeletePost;
