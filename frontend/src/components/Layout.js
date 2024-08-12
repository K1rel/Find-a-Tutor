import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useUser } from "../Context/UserContext";

const Layout = ({ children }) => {
    const { user, loading } = useUser();

    return (
        <div className="layout">
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-link">
                            Contact
                        </Link>
                    </li>
                    {user && (
                        <>
                            {user.role === "teacher" && (
                                <li>
                                    <Link to="/posts" className="nav-link">
                                        Be a Tutor
                                    </Link>
                                </li>
                            )}

                            {user.role === "student" && (
                                <li>
                                    <Link to="/posts" className="nav-link">
                                        Find a Tutor
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                            </li>
                        </>
                    )}
                    {user ? (
                        <>
                            <li>
                                <Link to="/logout" className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="container">{children}</div>
            <footer className="footer">
                <p>
                    &copy; {new Date().getFullYear()} Find-A-Tutor-Online. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
