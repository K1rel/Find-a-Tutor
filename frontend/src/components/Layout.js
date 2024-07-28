import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useUser } from "../Context/UserContext";

const Layout = ({ children }) => {
    const { user, loading } = useUser();

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {user && (
                        <li>
                            {user.role === "teacher" && (
                                <Link to="/posts">Be a Tutor</Link>
                            )}

                            {user.role === "student" && (
                                <Link to="/posts">Find a Tutor</Link>
                            )}
                        </li>
                    )}
                    {user ? (
                        <>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="container">{children}</div>
            <footer>
                <p>
                    &copy; {new Date().getFullYear()} Find-A-Tutor-Online. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
