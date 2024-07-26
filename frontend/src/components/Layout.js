import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file for styling

const Layout = ({ children }) => {
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
