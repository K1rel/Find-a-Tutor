import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getPost,
    addStudentToPost,
    removeStudentFromPost,
} from "../../services/postService";
import { getUsers, getCurrentUser } from "../../services/userService";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [user, setUser] = useState(null);

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
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchPost();
        fetchUsers();
        fetchCurrentUser();
    }, [id]);

    const handleAddStudent = async () => {
        try {
            await addStudentToPost(id, selectedStudent);

            const postData = await getPost(id);
            setPost(postData);
            setStudents(postData.students);
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
                                {student.first_name} {student.last_name}
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
                    {user?.role === "student" &&
                        !students.some((student) => student.id === user.id) && (
                            <button onClick={handleAddStudent}>Enroll</button>
                        )}

                    {user?.role === "teacher" && post?.user_id === user.id && (
                        <>
                            <select
                                value={selectedStudent}
                                onChange={(e) =>
                                    setSelectedStudent(e.target.value)
                                }
                            >
                                <option value="">Select a student</option>
                                {allStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.first_name} {student.last_name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleAddStudent}>
                                Add Student
                            </button>
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
