import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/User/Register"; // Register component
import Login from "./components/User/Login"; // Login component
import Logout from "./components/User/Logout";
import PostsList from "./components/Post/PostsList";
import PostDetail from "./components/Post/PostDetails";
import CreatePostForm from "./components/Post/CreatePostForm";
import EditPostForm from "./components/Post/EditPostForm";
import Layout from "./components/Layout";
import Home from "./components/Basic/Home";
import About from "./components/Basic/About";
import Contact from "./components/Basic/Contact";

ReactDOM.render(
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/posts" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/create-post" element={<CreatePostForm />} />
                <Route path="/update-post/:id" element={<EditPostForm />} />
            </Routes>
        </Layout>
    </Router>,
    document.getElementById("root")
);