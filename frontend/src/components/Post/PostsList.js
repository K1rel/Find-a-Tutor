import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import styles from "../../css/posts/PostList.module.css";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className={styles.container}>
            {user?.role === "teacher" && (
                <Link to="/create-post" className={styles.createPostLink}>
                    Create A Post
                </Link>
            )}
            <h1 className={styles.heading}>Posts</h1>
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
                    <p className={styles.loading}>Loading...</p>
                )}
            </ul>
        </div>
    );
};

export default PostList;
