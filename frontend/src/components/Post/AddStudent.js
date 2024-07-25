// AddStudent.js
import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ postId }) => {
    const [studentId, setStudentId] = useState("");

    const handleAddStudent = async () => {
        try {
            await axios.post(
                `http://localhost:8000/api/posts/${postId}/students`,
                { student_id: studentId },
                {
                    withCredentials: true,
                }
            );
            alert("Student added successfully!");
        } catch (error) {
            console.error("Error adding student:", error);
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
            <button onClick={handleAddStudent}>Add Student</button>
        </div>
    );
};

export default AddStudent;
