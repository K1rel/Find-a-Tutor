import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPosts, getPostsQuery } from "../../services/postService";
import { useUser } from "../../Context/UserContext";
import styles from "../../css/posts/PostList.module.css";
import LoadingSpinner from "../Basic/LoadingSpinner";
import { getTags } from "../../services/tagService";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        education_level: "",
        tag_name: "",
        location: "",
    });
    const { user } = useUser();
    const location = useLocation();

    const query = new URLSearchParams(location.search).get("query") || "";
    const educationLevel =
        new URLSearchParams(location.search).get("education_level") || "";
    const tagName = new URLSearchParams(location.search).get("tag_name") || "";
    const locationParam =
        new URLSearchParams(location.search).get("location") || "";

    useEffect(() => {
        setSearchTerm(query);
        setFilters({
            education_level: educationLevel,
            tag_name: tagName,
            location: locationParam,
        });
    }, [query, educationLevel, tagName, locationParam]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postsData =
                    searchTerm.length > 0 ||
                    Object.values(filters).some((val) => val.length > 0)
                        ? await getPostsQuery(searchTerm, filters)
                        : await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchTerm, filters]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const params = new URLSearchParams(location.search);
        params.set("query", term);
        window.history.pushState(
            {},
            "",
            `${location.pathname}?${params.toString()}`
        );
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);

        const params = new URLSearchParams(location.search);
        params.set(name, value);
        window.history.pushState(
            {},
            "",
            `${location.pathname}?${params.toString()}`
        );
    };

    return (
        <div className={styles.container}>
            {user?.role === "teacher" && (
                <Link to="/create-post" className={styles.createPostLink}>
                    Create A Post
                </Link>
            )}
            <h1 className={styles.heading}>Posts</h1>

            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search posts..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filterContainer}>
                <select
                    name="education_level"
                    value={filters.education_level}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                >
                    <option value="">All Education Levels</option>
                    {[
                        "Elementary",
                        "Middle School",
                        "High School",
                        "College",
                    ].map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>

                <select
                    name="tag_name"
                    value={filters.tag_name}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                >
                    <option value="">All Tags</option>
                    {[...new Set(tags.map((tag) => tag.name))].map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Location"
                    className={styles.filterInput}
                />
            </div>

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
