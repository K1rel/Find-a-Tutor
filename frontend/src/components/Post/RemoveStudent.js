// RemoveStudent.js
import React, { useState } from "react";
import axios from "axios";

const RemoveStudent = ({ postId }) => {
    const [studentId, setStudentId] = useState("");

    const handleRemoveStudent = async () => {
        try {
            await axios.delete(
                `http://localhost:8000/api/posts/${postId}/students/${studentId}`,
                {
                    withCredentials: true,
                }
            );
            alert("Student removed successfully!");
        } catch (error) {
            console.error("Error removing student:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
            />
            <button onClick={handleRemoveStudent}>Remove Student</button>
        </div>
    );
};

export default RemoveStudent;
