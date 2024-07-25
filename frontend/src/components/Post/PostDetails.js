import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getPost,
    addStudentToPost,
    removeStudentFromPost,
} from "../../services/postService";
import { getUsers } from "../../services/userService";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPost(id);
                setPost(postData);
                setStudents(postData.students);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                const studentUsers = users.filter(
                    (user) => user.role === "student"
                );
                setAllStudents(studentUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchPost();
        fetchUsers();
    }, [id]);

    const handleAddStudent = async () => {
        try {
            await addStudentToPost(id, selectedStudent);
            const student = allStudents.find(
                (user) => user.id === selectedStudent
            );
            setStudents([...students, student]);
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const handleRemoveStudent = async (studentId) => {
        try {
            await removeStudentFromPost(id, studentId);
            setStudents(students.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error("Error removing student:", error);
        }
    };

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <h2>Students</h2>
                    <ul>
                        {students.map((student) => (
                            <li key={student.id}>
                                {student.name}
                                <button
                                    onClick={() =>
                                        handleRemoveStudent(student.id)
                                    }
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select a student</option>
                        {allStudents.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.first_name} {student.last_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddStudent}>Add Student</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
