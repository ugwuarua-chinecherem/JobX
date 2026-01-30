import Link from 'next/link';
import Image from 'next/image';
import { courses } from '../../data/courses';

export default function CoursesPage() {
  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Build Your Skills</h1>
        <p>Your learning journey</p>
        <p className="subtitle">Our courses are built to stand out in the job market, perfect for starters</p>
      </div>

      <section className="courses-section">
        <h2>Popular Courses ({courses.length} Available)</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail">
                <Image 
                  src={course.thumbnail} 
                  alt={course.title}
                  width={300}
                  height={180}
                  className="course-image"
                />
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description.substring(0, 100)}...</p>
                <div className="course-meta">
                  <span className="duration">⏱ {course.duration}</span>
                  <span className="level">{course.prerequisites === 'None' ? '📚 Beginner' : '📚 Intermediate'}</span>
                </div>
                <Link href={`/courses/${course.id}`} className="course-button">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}