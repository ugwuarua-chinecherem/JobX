import Link from 'next/link';
import { jobs } from '../data/jobs';
import Image from 'next/image';

export default function Home() {
  const quickActions = [
    { title: 'Find Jobs', icon: '/images/find-jobs.png', link: '/jobs' },
    { title: 'Get Career Tips', icon: '/images/tips.png', link: '/courses' }
  ];

  const recommendedJobs = [
    jobs.find(job => job.title === 'Research Assistant'),
    jobs.find(job => job.title === 'Customer Support Agent'),
    jobs.find(job => job.title === 'Operations Assistant')
  ].filter(Boolean);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero hero-with-bg">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 style={{color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}> Find Jobs, Build Skills, Get Hired </h1>
          <ul className="hero-list">
            <li style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}> Looking for a Job online to work from home? </li>
            <li style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}> Work at your Part time / Full time and earn money from Jobs Online. </li>
            <li style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}> Work from your PC, Laptop or Mobile </li>
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
              <div className="action-icon">
                <Image src={action.icon} alt={action.title} width={40} height={40} />
              </div>
              <h3>{action.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Explainer Video Section */}
<section className="explainer-section">
  <div className="explainer-container">
    <h2>How JobX Works</h2>
    <p className="explainer-subtitle">Watch our explainer videos to get started</p>
    
    <div className="video-slider">
      <button className="slider-arrow slider-arrow-left" id="prevBtn">
        ‹
      </button>

      <div className="video-slider-container" id="videoSlider">
        {/* Video 1 */}
        <div className="slider-video active">
          <video 
            src="/videos/video-3.mp4" 
            width="100%" 
            height="500"
            controls
            controlsList="nodownload"
            title="JobX Introduction"
          ></video>
          <p className="video-caption">Introduction to JobX Platform</p>
        </div>

        {/* Video 2 */}
        <div className="slider-video">
          <video 
            src="https://res.cloudinary.com/dsv5glxli/video/upload/v1769864099/video-1_y3pklh.mp4" 
            width="100%" 
            height="500"
            controls
            controlsList="nodownload"
            title="How to Apply for Jobs"
          ></video>
          <p className="video-caption">How to Apply for Jobs</p>
        </div>

        {/* Video 3 */}
        <div className="slider-video">
          <video 
            src="https://res.cloudinary.com/dsv5glxli/video/upload/v1769872227/video-2_tsbgnk.mp4" 
            width="100%" 
            height="500"
            controls
            controlsList="nodownload"
            title="How to Take Courses"
          ></video>
          <p className="video-caption">How to Enroll in Courses</p>
        </div>
      </div>

      <button className="slider-arrow slider-arrow-right" id="nextBtn">
        ›
      </button>
    </div>

    <div className="video-dots" id="videoDots">
      <span className="dot active" data-index="0"></span>
      <span className="dot" data-index="1"></span>
      <span className="dot" data-index="2"></span>
    </div>

    <div className="explainer-features">
      <div className="feature-item">
        <span className="feature-number">1</span>
        <h3>Register</h3>
        <p>Create your free account in minutes</p>
      </div>
      <div className="feature-item">
        <span className="feature-number">2</span>
        <h3>Learn</h3>
        <p>Enroll in courses to build skills</p>
      </div>
      <div className="feature-item">
        <span className="feature-number">3</span>
        <h3>Apply</h3>
        <p>Apply to jobs that match your skills</p>
      </div>
      <div className="feature-item">
        <span className="feature-number">4</span>
        <h3>Get Hired</h3>
        <p>Start your remote career</p>
      </div>
    </div>
  </div>
</section>

<script dangerouslySetInnerHTML={{__html: `
  (function() {
    // Wait for DOM to be fully loaded
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMContentLoaded', function() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slider-video');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const videos = document.querySelectorAll('.slider-video video');

        function pauseAllVideos() {
          videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
          });
        }

        function showSlide(index) {
          // Pause all videos first
          pauseAllVideos();
          
          // Remove active class from all slides and dots
          slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
          });
          
          // Add active class to current slide and dot
          slides[index].classList.add('active');
          dots[index].classList.add('active');
          currentSlide = index;
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(newIndex);
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(newIndex);
          });
        }

        dots.forEach(function(dot) {
          dot.addEventListener('click', function() {
            showSlide(parseInt(dot.dataset.index));
          });
        });
      });
    }
  })();
`}} />

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
      <section className="cta-banner cta-banner-with-bg">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h2>MILLIONS OF YOUTHS ARE BUILDING THEIR CAREER & ENJOYING REMOTE JOBS NOW.</h2>
          <Link href="/register" className="banner-button">Get Started🚀</Link>
        </div>
      </section>
    </div>
  );
}