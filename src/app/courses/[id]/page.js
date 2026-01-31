'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { courses } from '../../../data/courses';
import { auth } from '../../../utils/auth';

export default function CourseDetails() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundCourse = courses.find(c => c.id === parseInt(params.id));
      setCourse(foundCourse);
      
      // Check if user is logged in
      const loggedIn = auth.isLoggedIn();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn && foundCourse) {
        setIsEnrolled(auth.isEnrolled(foundCourse.id));
      }
    }
  }, [params.id]);

  const handleEnroll = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (course) {
      const enrolled = auth.enrollInCourse(course.id, course.title, course.description);
      if (enrolled) {
        router.push(`/courses/${course.id}/learn`);
      } else {
        // Already enrolled
        router.push(`/courses/${course.id}/learn`);
      }
    }
  };

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="not-found">
          <h1>Course not found</h1>
          <Link href="/courses" className="back-link">Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <div className="course-hero">
        <div className="course-hero-content">
          <h1>{course.title}</h1>
          <p className="duration">Duration: {course.duration}</p>
          <p className="prerequisites">Prerequisites: {course.prerequisites}</p>
        </div>
      </div>

      <div className="course-content">
        <div className="course-main">
          <section className="course-section">
            <h2>About This Course</h2>
            <p>{course.description}</p>
          </section>

          <section className="course-section">
            <h2>What You'll Learn</h2>
            <ul className="modules-list">
              {course.modules.map((module, index) => (
                <li key={index}>
                  <span className="module-number">{index + 1}</span>
                  {module}
                </li>
              ))}
            </ul>
          </section>

          <section className="course-section">
            <h2>Skills You'll Gain</h2>
            <div className="skills-tags">
              {course.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="course-sidebar">
          <div className="enrollment-card">
            <h3>Ready to Start?</h3>
            <p className="enrollment-info">
              {isEnrolled 
                ? "You're enrolled in this course!" 
                : "Enroll now to start learning"}
            </p>
            <button onClick={handleEnroll} className="enroll-button">
              {isEnrolled ? 'Continue Learning' : 'Enroll Now - Free'}
            </button>
            {!isLoggedIn && (
              <p className="login-note">You need to login to enroll</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}