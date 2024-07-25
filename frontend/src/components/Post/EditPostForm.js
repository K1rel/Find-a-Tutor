import React from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";

const EditPostForm = () => {
    const { id } = useParams();
    return (
        <PostForm
            postId={id}
            onSuccess={() => console.log("Post saved successfully")}
        />
    );
};

export default EditPostForm;
