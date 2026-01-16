'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { courses } from '../../../data/courses';

export default function CourseDetails() {
  const router = useRouter();
  const params = useParams();
  const [enrolled, setEnrolled] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (params.id) {
      const foundCourse = courses.find(c => c.id === parseInt(params.id));
      setCourse(foundCourse);
    }
  }, [params.id]);

  const handleEnroll = () => {
    setEnrolled(true);
    setTimeout(() => {
      router.push('/success');
    }, 1500);
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
        <h1>{course.title}</h1>
        <p className="duration">Duration: {course.duration}</p>
      </div>

      <div className="course-content">
        <section className="course-section">
          <h2>About This Course</h2>
          <p>{course.description}</p>
        </section>

        <section className="course-section">
          <h2>What You'll Learn</h2>
          <ul className="modules-list">
            {course.modules.map((module, index) => (
              <li key={index}>{module}</li>
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

        <div className="enroll-section">
          {!enrolled ? (
            <button onClick={handleEnroll} className="enroll-button">
              Start Course
            </button>
          ) : (
            <p className="enrolled-message">✓ Enrolled Successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
}