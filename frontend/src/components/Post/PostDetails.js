import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPost,
    addStudentToPost,
    removeStudentFromPost,
} from "../../services/postService";
import { useUser } from "../../Context/UserContext";
import styles from "../../css/posts/PostDetails.module.css";

const PostDetail = () => {
    const { id } = useParams();
    const { user, allUsers } = useUser();
    const [post, setPost] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

        fetchPost();
    }, [id]);

    const handleAddStudent = async () => {
        try {
            await addStudentToPost(id, selectedStudent);
            const postData = await getPost(id);
            setPost(postData);
            setStudents(postData.students);
        } catch (error) {
            console.error("Error adding student:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    };

    const handleRemoveStudent = async (studentId) => {
        try {
            await removeStudentFromPost(id, studentId);
            const postData = await getPost(id);
            setPost(postData);
            setStudents(postData.students);
        } catch (error) {
            console.error("Error adding student:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    };

    const handleEditClick = () => {
        navigate(`/update-post/${id}`);
    };

    return (
        <div className={styles.container}>
            {post ? (
                <>
                    <div className={styles.header}>
                        <h1>{post.title}</h1>
                    </div>
                    <p className={styles.description}>{post.description}</p>
                    <div className={styles.details}>
                        <p>
                            <strong>Location:</strong> {post.location}
                        </p>
                        <p>
                            <strong>Maximum Students:</strong> {post.maxCount}
                        </p>
                        <p>
                            <strong>First Class Date:</strong>{" "}
                            {new Date(post.dateFirstClass).toLocaleDateString()}
                        </p>
                    </div>
                    <div className={styles.studentsList}>
                        <h2>Students</h2>
                        <ul>
                            {students.map((student) => (
                                <li
                                    key={student.id}
                                    className={styles.studentItem}
                                >
                                    {student.first_name} {student.last_name}
                                    {user?.role === "teacher" &&
                                        post?.user_id === user.id && (
                                            <button
                                                onClick={() =>
                                                    handleRemoveStudent(
                                                        student.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        )}
                                </li>
                            ))}
                        </ul>
                        {user &&
                            students.some(
                                (student) => student.id === user.id
                            ) && (
                                <button
                                    className={styles.selectStudent}
                                    onClick={() => handleRemoveStudent(user.id)}
                                >
                                    Leave Class
                                </button>
                            )}
                        {user?.role === "student" &&
                            !students.some(
                                (student) => student.id === user.id
                            ) && (
                                <button
                                    className={styles.selectStudent}
                                    onClick={handleAddStudent}
                                >
                                    Enroll
                                </button>
                            )}
                        {user?.role === "teacher" &&
                            post?.user_id === user.id && (
                                <div className={styles.selectStudent}>
                                    <select
                                        value={selectedStudent}
                                        onChange={(e) =>
                                            setSelectedStudent(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select a student
                                        </option>
                                        {allUsers
                                            .filter(
                                                (user) =>
                                                    user.role === "student" &&
                                                    !students.some(
                                                        (student) =>
                                                            student.id ===
                                                            user.id
                                                    )
                                            )
                                            .map((student) => (
                                                <option
                                                    key={student.id}
                                                    value={student.id}
                                                >
                                                    {student.first_name}{" "}
                                                    {student.last_name}
                                                </option>
                                            ))}
                                    </select>
                                    <button
                                        className={styles.selectStudent}
                                        onClick={handleAddStudent}
                                    >
                                        Add Student
                                    </button>
                                </div>
                            )}
                        {user?.role === "teacher" &&
                            post?.user_id === user.id && (
                                <button
                                    className={styles.editButton}
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </button>
                            )}
                        {error && (
                            <div className={styles.errorMessage}>{error}</div>
                        )}
                    </div>
                </>
            ) : (
                <p className={styles.loading}>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
