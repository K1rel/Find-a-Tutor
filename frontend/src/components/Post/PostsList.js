import React, { useEffect, useState } from "react";
import { getPosts, getPostsQuery } from "../../services/postService";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import styles from "../../css/posts/PostList.module.css";
import LoadingSpinner from "../Basic/LoadingSpinner";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || "";

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const postsData =
                    query.length > 0
                        ? await getPostsQuery(query)
                        : await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [query]);

    return (
        <div className={styles.container}>
            {user?.role === "teacher" && (
                <Link to="/create-post" className={styles.createPostLink}>
                    Create A Post
                </Link>
            )}
            <h1 className={styles.heading}>Posts</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ul className={styles.postList}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link
                                to={`/posts/${post.id}`}
                                className={styles.postLink}
                                key={post.id}
                            >
                                <li className={styles.postCard}>
                                    <img
                                        src={`${process.env.REACT_APP_API_BASE_URL}/storage/${post.user.profile_picture}`}
                                        alt={`${post.user.first_name} ${post.user.last_name}`}
                                        className={styles.profilePicture}
                                    />
                                    <div className={styles.postContent}>
                                        <h2 className={styles.postTitle}>
                                            {post.title}
                                        </h2>
                                        <p className={styles.postAuthor}>
                                            {post.user.first_name}{" "}
                                            {post.user.last_name}
                                        </p>
                                        <p className={styles.postTag}>
                                            Tag: {post.tag.name} (
                                            {post.tag.education_level})
                                        </p>
                                        <p className={styles.postLocation}>
                                            Location: {post.location}
                                        </p>
                                    </div>
                                </li>
                            </Link>
                        ))
                    ) : (
                        <p className={styles.noPostsFound}>No posts found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default PostList;
