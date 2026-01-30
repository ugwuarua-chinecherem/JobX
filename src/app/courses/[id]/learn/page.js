'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { courses } from '../../../../data/courses';
import { auth } from '../../../../utils/auth';

export default function CourseLearnPage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
      router.push('/login');
      return;
    }

    if (params.id) {
      const foundCourse = courses.find(c => c.id === parseInt(params.id));
      setCourse(foundCourse);
      
      if (foundCourse) {
        const enrolled = auth.isEnrolled(foundCourse.id);
        setIsEnrolled(enrolled);
        
        if (!enrolled) {
          router.push(`/courses/${params.id}`);
          return;
        }

        // Check if completed
        const enrollments = auth.getEnrollments();
        const user = auth.getUser();
        const enrollment = enrollments.find(
          e => e.userId === user.id && e.courseId === foundCourse.id
        );
        if (enrollment) {
          setIsCompleted(enrollment.completed);
        }
      }
    }
  }, [params.id, router]);

  const handleMarkComplete = () => {
    if (course) {
      auth.completeCourse(course.id);
      setIsCompleted(true);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  if (!course) {
    return (
      <div className="learn-page-loading">
        <p>Loading course...</p>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="learn-page-loading">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="course-learn-page">
      {showSuccess && (
        <div className="success-toast">
          🎉 Congratulations! Course completed!
        </div>
      )}

      <div className="learn-container">
        <div className="learn-header">
          <h1>{course.title}</h1>
          <Link href="/dashboard" className="back-to-dashboard">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="video-container">
          <iframe 
            src={course.youtubeUrl}
            width="100%" 
            height="600"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={course.title}
            className="course-video"
          ></iframe>
        </div>

        <div className="course-info-section">
          <div className="course-description-box">
            <h2>About This Course</h2>
            <p>{course.description}</p>
            
            <h3>What You'll Learn:</h3>
            <ul>
              {course.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>

          <div className="course-actions-box">
            {!isCompleted ? (
              <button onClick={handleMarkComplete} className="complete-course-btn">
                ✓ Mark as Completed
              </button>
            ) : (
              <div className="completed-status">
                <span className="completed-icon">✓</span>
                <p>Course Completed!</p>
              </div>
            )}
            <Link href="/dashboard" className="dashboard-link-btn">
              View My Courses
            </Link>
          </div>
        </div>

        <div className="course-note">
          <p><strong>Note:</strong> This course is hosted on YouTube</p>
        </div>
      </div>
    </div>
  );
}