import Link from 'next/link';
import { jobs } from '../data/jobs';
import Image from 'next/image';

export default function Home() {
  const quickActions = [
    { title: 'Find Jobs', icon: <img src="/images/find-jobs.png" alt="Find Jobs" width={24} height={24} />, link: '/jobs' },
    { title: 'Get Career Tips', icon: <img src="/images/tips.png" alt="Get Career Tips" width={24} height={24} />, link: '/courses' }
  ];

  // Get the actual jobs for recommended section (Research assistant, Customer support, Operations assistant)
  const recommendedJobs = [
    jobs.find(job => job.title === 'Research Assistant'),
    jobs.find(job => job.title === 'Customer Support Agent'),
    jobs.find(job => job.title === 'Operations Assistant')
  ].filter(Boolean); // Remove any undefined values

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero hero-with-bg">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Jobs, Build Skills, Get Hired</h1>
          <ul className="hero-list">
            <li>Looking for a Job online to work from home?</li>
            <li>Work at your Part time / Full time and earn money from Jobs Online.</li>
            <li>Work from your PC, Laptop or Mobile</li>
          </ul>
          <Link href="/register" className="cta-button">Apply now</Link>
        </div>
      </section>

      {/* Quick Action */}
      <section className="quick-action">
        <h2>Quick action</h2>
        <div className="action-cards">
          {quickActions.map((action, index) => (
            <Link href={action.link} key={index} className="action-card">
              <div className="action-icon">{action.icon}</div>
              <h3>{action.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Jobs */}
      <section className="recommended">
        <h2>Recommended for you</h2>
        <div className="job-list">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span className="job-type">{job.type}</span>
                  <span className="job-hours">{job.hours}</span>
                </div>
              </div>
              <Link href={`/jobs/${job.id}`} className="apply-btn">Apply</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
{/* CTA Banner */}
<section className="cta-banner cta-banner-with-bg">
  <div className="banner-overlay"></div>
  <div className="banner-content">
    <h2>MILLIONS OF YOUTHS <pre></pre>ARE BUILDING THEIR CAREER<pre></pre> & ENJOYING REMOTE JOBS NOW.</h2>
    <Link href="/register" className="banner-button">Get Started🚀</Link>
  </div>
</section>
    </div>
  );
}