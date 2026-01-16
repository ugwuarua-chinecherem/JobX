import Link from 'next/link';
import { jobs } from '../../data/jobs';

export default function JobsPage() {
  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Opportunities for you!</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search jobs or keywords" />
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card-full">
            <h3>{job.title}</h3>
            <div className="job-details">
              <span className="job-type">{job.type}</span>
              <span className="job-hours">{job.hours}</span>
            </div>
            <Link href={`/jobs/${job.id}`} className="apply-button">Apply</Link>
          </div>
        ))}
      </div>
    </div>
  );
}