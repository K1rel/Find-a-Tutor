import React from "react";
import styles from "../../css/basic/About.module.css";

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.aboutTitle}>About Us</h1>
            <p className={styles.aboutText}>
                At Find-A-Tutor-Online, our mission is to bridge the gap between
                eager learners and passionate educators. Whether you're looking
                to sharpen your skills or share your knowledge, we provide the
                perfect platform to connect tutors with students across various
                fields. Join us in creating a community where education knows no
                bounds.
            </p>
            <p className={styles.aboutText}>
                We believe that everyone deserves access to quality education,
                and we're here to make that a reality. Our platform offers
                personalized tutoring experiences tailored to each student's
                unique needs. Explore our tutor profiles, find the right match,
                and start your learning journey today!
            </p>
        </div>
    );
};

export default About;
