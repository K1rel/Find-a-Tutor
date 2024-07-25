import React from "react";
import PostForm from "./PostForm";

const CreatePostForm = () => {
    return (
        <PostForm onSuccess={() => console.log("Post saved successfully")} />
    );
};

export default CreatePostForm;
