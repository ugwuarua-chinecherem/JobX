'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../../../utils/auth';
import { jobs } from '../../../../data/jobs';


export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    state: '',
    address: '',
    cv: null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
      router.push('/login');
      return;
    }

    const currentUser = auth.getUser();
    setUser(currentUser);

    // Get job ID from URL query parameter
    const jobId = searchParams.get('jobId');
    
    if (jobId) {
      const foundJob = jobs.find(j => j.id === parseInt(jobId));
      setJob(foundJob);

      // Check if already applied
      if (foundJob && auth.hasApplied(foundJob.id)) {
        router.push(`/jobs/${foundJob.id}`);
        return;
      }
    }

    // Pre-fill form with user data
    if (currentUser) {
      const nameParts = currentUser.name.split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phone || '',
        state: currentUser.state || ''
      }));
    }
  }, [router, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cv: e.target.files[0]
    }));
  };

  const submitToGoogleSheets = async (data) => {
    try {
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz_ccV-M83wv5EtDZOYBN_eW-jPeC-HdF8dlnudf_ANku1HchNsJ3xXuU76z5vQuv8f/exec';
      
      // Use no-cors mode to avoid CORS issues
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(() => {
        console.log('Application sent to Google Sheets');
      }).catch((error) => {
        console.log('Google Sheets submission attempted');
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!job) {
      alert('Job not found. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Sheets
      const applicationData = {
        timestamp: new Date().toISOString(),
        userId: user.id,
        userName: user.name,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        address: formData.address,
        coverLetter: formData.coverLetter,
        cvFileName: formData.cv ? formData.cv.name : 'No CV uploaded',
        status: 'pending'
      };

      // Send to Google Sheets
      await submitToGoogleSheets(applicationData);

      // Save to localStorage
      const applied = auth.applyForJob(job.id, job.title, job.company);

      if (!applied) {
        alert('You have already applied to this job.');
        setIsSubmitting(false);
        return;
      }

      // Success!
      router.push('/success');
    } catch (error) {
      console.error('Application error:', error);
      alert('There was an error submitting your application. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="apply-page-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <div className="apply-container">
        <div className="apply-header">
          <h1>{job ? `Apply for ${job.title}` : 'Job Application'}</h1>
          {job && <p className="company-tag">at {job.company}</p>}
          <p>Complete the application form below. We typically respond within 48 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload CV</label>
            <div className="file-upload-box">
              <input
                type="file"
                name="cv"
                id="cv-upload"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
                className="file-input"
              />
              <label htmlFor="cv-upload" className="file-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  {formData.cv ? (
                    <span className="file-selected">{formData.cv.name}</span>
                  ) : (
                    <>
                      <span className="upload-title">Click to upload or drag and drop</span>
                      <span className="upload-subtitle">PDF, DOC, DOCX (Max 5MB)</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="8"
              placeholder="Tell us why you're a great fit for this role..."
              required
            />
          </div>

          <div className="form-actions">
            <Link href={job ? `/jobs/${job.id}` : '/jobs'} className="cancel-button">
              Cancel
            </Link>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}