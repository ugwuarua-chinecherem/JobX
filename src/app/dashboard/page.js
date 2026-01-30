'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../utils/auth';
import { courses } from '../../data/courses';
import { jobs } from '../../data/jobs';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalEnrollments: 0,
    completedCourses: 0
  });

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      router.push('/login');
      return;
    }

    loadDashboardData();
  }, [router]);

  const loadDashboardData = () => {
    const currentUser = auth.getUser();
    setUser(currentUser);

    const userEnrollments = auth.getEnrollments().filter(
      e => e.userId === currentUser.id
    );
    setEnrollments(userEnrollments);

    const userApplications = auth.getApplications().filter(
      a => a.userId === currentUser.id
    );
    setApplications(userApplications);

    setStats({
      totalApplications: userApplications.length,
      totalEnrollments: userEnrollments.length,
      completedCourses: userEnrollments.filter(e => e.completed).length
    });
  };

  const handleClearDashboard = () => {
    const currentUser = auth.getUser();
    
    // Remove user's enrollments
    const allEnrollments = auth.getEnrollments();
    const otherEnrollments = allEnrollments.filter(e => e.userId !== currentUser.id);
    localStorage.setItem('jobx_enrollments', JSON.stringify(otherEnrollments));

    // Remove user's applications
    const allApplications = auth.getApplications();
    const otherApplications = allApplications.filter(a => a.userId !== currentUser.id);
    localStorage.setItem('jobx_applications', JSON.stringify(otherApplications));

    // Reload dashboard
    loadDashboardData();
    setShowClearConfirm(false);
  };

  const handleMarkComplete = (courseId) => {
    auth.completeCourse(courseId);
    loadDashboardData();
  };

  const getCourseById = (courseId) => {
    return courses.find(c => c.id === courseId);
  };

  const getJobById = (jobId) => {
    return jobs.find(j => j.id === jobId);
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Clear Dashboard Confirmation Modal */}
        {showClearConfirm && (
          <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Clear Dashboard?</h3>
              <p>This will remove all your applications and course enrollments. This action cannot be undone.</p>
              <div className="modal-actions">
                <button onClick={() => setShowClearConfirm(false)} className="cancel-modal-btn">
                  Cancel
                </button>
                <button onClick={handleClearDashboard} className="confirm-modal-btn">
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Here's your activity overview</p>
          </div>
          <button onClick={() => setShowClearConfirm(true)} className="clear-dashboard-btn">
            🗑️ Clear Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{stats.totalApplications}</h3>
              <p>Applications Sent</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{stats.totalEnrollments}</h3>
              <p>Courses Enrolled</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completedCourses}</h3>
              <p>Courses Completed</p>
            </div>
          </div>
        </div>

        {/* Rest of dashboard sections remain the same... */}
        {/* My Applications Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Applications</h2>
            <Link href="/jobs" className="view-all-link">Browse More Jobs</Link>
          </div>

          {applications.length === 0 ? (
            <div className="empty-state">
              <p>You haven't applied to any jobs yet.</p>
              <Link href="/jobs" className="primary-button">Browse Jobs</Link>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map((application) => {
                const job = getJobById(application.jobId);
                return (
                  <div key={application.jobId} className="application-card">
                    <div className="application-info">
                      <h3>{application.jobTitle}</h3>
                      <p className="company-name">{application.company}</p>
                      <p className="application-date">
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="application-status">
                      <span className="status-badge status-pending">
                        {application.status}
                      </span>
                      {job && (
                        <Link href={`/jobs/${job.id}`} className="view-job-link">
                          View Job
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* My Courses Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <Link href="/courses" className="view-all-link">Browse More Courses</Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="empty-state">
              <p>You haven't enrolled in any courses yet.</p>
              <Link href="/courses" className="primary-button">Browse Courses</Link>
            </div>
          ) : (
            <div className="courses-grid-dashboard">
              {enrollments.map((enrollment) => {
                const course = getCourseById(enrollment.courseId);
                if (!course) return null;

                return (
                  <div key={enrollment.courseId} className="course-card-dashboard">
                    <div className="course-card-header">
                      <h3>{course.title}</h3>
                      {enrollment.completed && (
                        <span className="completed-badge">✓ Completed</span>
                      )}
                    </div>
                    <p className="enrollment-date">
                      Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                    <p className="course-duration">Duration: {course.duration}</p>
                    
                    <div className="course-actions">
                      {!enrollment.completed ? (
                        <>
                          <Link 
                            href={`/courses/${course.id}/learn`} 
                            className="continue-button"
                          >
                            Continue Learning
                          </Link>
                          <button 
                            onClick={() => handleMarkComplete(course.id)}
                            className="complete-button"
                          >
                            Mark as Completed
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            href={`/courses/${course.id}/learn`} 
                            className="review-button"
                          >
                            Review Course
                          </Link>
                          <p className="completed-date">
                            Completed on {new Date(enrollment.completedAt).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}