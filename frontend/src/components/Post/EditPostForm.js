import React from "react";
import PostForm from "./PostForm";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <PostForm postId={id} onSuccess={() => navigate("/posts")} />;
};

export default EditPostForm;
