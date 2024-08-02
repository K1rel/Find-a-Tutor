import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

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
        <div>
            {user?.role === "teacher" && (
                <Link to="/create-post">Create A Post</Link>
            )}
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
