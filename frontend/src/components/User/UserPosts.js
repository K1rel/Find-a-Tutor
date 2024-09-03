import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import {
    getUserPosts,
    removeStudentFromPost,
    deletePost,
} from "../../services/postService";
import styles from "../../css/users/UserPosts.module.css";
import LoadingSpinner from "../Basic/LoadingSpinner";
import { Link } from "react-router-dom";

const UserPosts = () => {
    const { user } = useUser();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getUserPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLeaveClass = async (postId) => {
        try {
            await removeStudentFromPost(postId, user.id);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error leaving class:", error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.postsContainer}>
            <div className={styles.postsHeader}>
                <h2>
                    {user.role === "teacher" ? "My Posts" : "My Enrolled Posts"}
                </h2>
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : posts.length > 0 ? (
                <ul className={styles.postsList}>
                    {posts.map((post) => (
                        <li key={post.id} className={styles.postItem}>
                            <Link
                                to={`/posts/${post.id}`}
                                className={styles.postLink}
                            >
                                <h3>{post.title}</h3>
                                <p>Location: {post.location}</p>
                                <p className={styles.rate}>
                                    Rate:{" "}
                                    {post.rate
                                        ? `${post.rate} per hour`
                                        : "Not specified"}
                                </p>
                                <p className={styles.date}>
                                    Date of First Class: {post.dateFirstClass}
                                </p>
                            </Link>
                            {user.role === "student" && (
                                <button
                                    onClick={() => handleLeaveClass(post.id)}
                                    className={styles.leaveButton}
                                >
                                    Leave Class
                                </button>
                            )}
                            {user.role === "teacher" && (
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className={styles.leaveButton}
                                >
                                    Delete Post
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default UserPosts;
