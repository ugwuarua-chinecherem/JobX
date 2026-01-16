import Link from 'next/link';
import { courses } from '../../data/courses';

export default function CoursesPage() {
  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Build Your Skills</h1>
        <p>Your learning journey</p>
        <p className="subtitle">Our courses are built to stand out in the Job market, perfect for starters</p>
      </div>

      <section className="courses-section">
        <h2>Popular Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <div className="course-meta">
                <span className="duration">⏱ {course.duration}</span>
              </div>
              <Link href={`/courses/${course.id}`} className="course-button">Start course</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}