import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    getPost,
    addStudentToPost,
    removeStudentFromPost,
} from "../../services/postService";
import { useUser } from "../../Context/UserContext";
import styles from "../../css/posts/PostDetails.module.css";
import LoadingSpinner from "../Basic/LoadingSpinner";

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
            console.error("Error removing student:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    };

    const handleEditClick = () => {
        navigate(`/update-post/${id}`);
    };

    return (
        <>
            {" "}
            <button
                className={styles.goBackButton}
                onClick={() => navigate(-1)}
            >
                &larr; Go Back
            </button>
            <div className={styles.container}>
                {post ? (
                    <>
                        <div className={styles.profileCard}>
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/storage/${post.user.profile_picture}`}
                                alt={`${post.user.first_name} ${post.user.last_name}`}
                                className={styles.profilePicture}
                            />
                            <p className={styles.profileName}>
                                {post.user.first_name} {post.user.last_name}
                            </p>
                            <Link
                                to={`/teacher-profile/${post.user.teacher_profile.id}`}
                                className={styles.profileLink}
                            >
                                View Professor's Profile
                            </Link>
                        </div>
                        <div className={styles.mainCard}>
                            <div className={styles.header}>
                                <h1>{post.title}</h1>
                            </div>
                            <p className={styles.description}>
                                {post.description}
                            </p>
                            <div className={styles.details}>
                                <p>
                                    <strong>Location:</strong> {post.location}
                                </p>
                                <p>
                                    <strong>Maximum Students:</strong>{" "}
                                    {post.maxCount}
                                </p>
                                <p>
                                    <strong>First Class Date:</strong>{" "}
                                    {new Date(
                                        post.dateFirstClass
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Rate per hour:</strong> ${post.rate}
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
                                            {student.first_name}{" "}
                                            {student.last_name}
                                            {user?.role === "teacher" &&
                                                post?.user_id === user.id && (
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveStudent(
                                                                student.id
                                                            )
                                                        }
                                                        className={
                                                            styles.removeButton
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
                                            onClick={() =>
                                                handleRemoveStudent(user.id)
                                            }
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
                                                className={
                                                    styles.selectStudentDropdown
                                                }
                                                value={selectedStudent}
                                                onChange={(e) =>
                                                    setSelectedStudent(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select a student
                                                </option>
                                                {allUsers
                                                    .filter(
                                                        (user) =>
                                                            user.role ===
                                                                "student" &&
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
                                                className={styles.addStudent}
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
                                    <div className={styles.errorMessage}>
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </>
    );
};

export default PostDetail;
