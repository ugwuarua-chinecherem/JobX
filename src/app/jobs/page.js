'use client';
import { useState } from 'react';
import Link from 'next/link';
import { jobs } from '../../data/jobs';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Real-time search as user types
    if (e.target.value === '') {
      setFilteredJobs(jobs);
    }
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Opportunities for you!</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search jobs or keywords"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-button" aria-label="Search">
              🔍
            </button>
          </div>
        </form>
        {searchTerm && (
          <p className="search-results-text">
            Found {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} 
            {filteredJobs.length > 0 && ` for "${searchTerm}"`}
          </p>
        )}
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card-full">
              <h3>{job.title}</h3>
              <div className="job-details">
                <span className="job-type">{job.type}</span>
                <span className="job-hours">{job.hours}</span>
              </div>
              <p className="job-salary">{job.salary}</p>
              <Link href={`/jobs/${job.id}`} className="apply-button">Apply</Link>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No jobs found</h3>
            <p>Try searching with different keywords</p>
            <button onClick={() => {
              setSearchTerm('');
              setFilteredJobs(jobs);
            }} className="reset-button">
              View All Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}