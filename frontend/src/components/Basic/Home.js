import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/basic/Home.module.css";
import { getPostsQuery } from "../../services/postService";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setIsSearching(true);

        if (term.length > 2) {
            try {
                const data = await getPostsQuery(term);

                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/posts?query=${searchTerm}`);
    };

    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to Find-a-Tutor-Online</h1>
            <p>Search for your ideal tutor below.</p>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search posts..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Search
                    </button>
                </div>
                {isSearching && searchResults.length > 0 && (
                    <ul className={styles.searchResults}>
                        {searchResults.map((post) => (
                            <li
                                key={post.id}
                                className={styles.searchResultItem}
                            >
                                <a href={`/posts/${post.id}`}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default Home;
