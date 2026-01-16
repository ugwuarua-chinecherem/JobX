import Link from 'next/link';
import { jobs } from '../../../data/jobs';

export default async function JobDetails({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const job = jobs.find(j => j.id === parseInt(resolvedParams.id));

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
      <div className="job-header">
        <h1>{job.title}</h1>
        <div className="job-meta">
          <span className="badge">{job.type}</span>
          <span className="badge">{job.hours}</span>
        </div>
      </div>

      <div className="job-content">
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

        <div className="apply-section">
          <Link href="/apply" className="apply-btn-large">Apply Now</Link>
        </div>
      </div>
    </div>
  );
}