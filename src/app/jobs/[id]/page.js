'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { jobs } from '../../../data/jobs';
import { auth } from '../../../utils/auth';

export default function JobDetails() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const foundJob = jobs.find(j => j.id === parseInt(resolvedParams.id));
      setJob(foundJob);
      
      // Check if user is logged in
      const loggedIn = auth.isLoggedIn();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn && foundJob) {
        setHasApplied(auth.hasApplied(foundJob.id));
      }
    };
    
    resolveParams();
  }, [params]);

  const handleApply = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (job && !hasApplied) {
      const applied = auth.applyForJob(job.id, job.title, job.company);
      if (applied) {
        setHasApplied(true);
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    }
  };

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="not-found">
          <h1>Job not found</h1>
          <Link href="/jobs" className="back-link">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      {showSuccess && (
        <div className="success-banner">
          <div className="success-banner-content">
            <h3>✓ Application Submitted Successfully!</h3>
            <p>We've received your application for {job.title}</p>
            <Link href="/dashboard" className="view-applications-link">
              View My Applications
            </Link>
          </div>
        </div>
      )}

      <div className="job-header">
        <h1>{job.title}</h1>
        <p className="company-name">{job.company}</p>
        <div className="job-meta">
          <span className="badge">{job.type}</span>
          <span className="badge">{job.hours}</span>
          <span className="badge">{job.location}</span>
          <span className="badge">{job.experience}</span>
        </div>
      </div>

      <div className="job-content">
        <div className="job-overview">
          <div className="overview-item">
            <h3>💰 Salary</h3>
            <p>{job.salary}</p>
      </div>
      <div className="overview-item">
        <h3>📍 Location</h3>
        <p>{job.location}</p>
      </div>
      <div className="overview-item">
        <h3>📊 Experience</h3>
        <p>{job.experience}</p>
      </div>
      <div className="overview-item">
        <h3>⏰ Deadline</h3>
        <p>{new Date(job.deadline).toLocaleDateString()}</p>
      </div>
    </div>

    <section className="job-section">
      <h2>Job Description</h2>
      <p>{job.description}</p>
    </section>

    <section className="job-section">
      <h2>Requirements</h2>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </section>

    <section className="job-section">
      <h2>Responsibilities</h2>
      <ul>
        {job.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
    </section>

    <section className="job-section">
      <h2>Benefits</h2>
      <ul>
        {job.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </section>

<div className="apply-section">
  {hasApplied ? (
    <div className="already-applied">
      <p>✓ You have already applied to this job</p>
      <Link href="/dashboard" className="dashboard-link">
        View Application Status
      </Link>
    </div>
  ) : (
    <Link 
      href={isLoggedIn ? `/jobs/${job.id}/apply` : '/login'} 
      className="apply-btn-large"
    >
      {isLoggedIn ? 'Apply Now' : 'Login to Apply'}
    </Link>
  )}
</div>
  </div>
</div>
  );
}