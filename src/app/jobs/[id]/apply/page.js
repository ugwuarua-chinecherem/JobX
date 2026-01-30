'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { jobs } from '../../../../data/jobs';
import { auth } from '../../../../utils/auth';

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
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

    const resolveParams = async () => {
      const resolvedParams = await params;
      const foundJob = jobs.find(j => j.id === parseInt(resolvedParams.id));
      setJob(foundJob);

      // Check if already applied
      if (foundJob && auth.hasApplied(foundJob.id)) {
        router.push(`/jobs/${foundJob.id}`);
      }
    };

    resolveParams();
  }, [params, router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!job) return;

    // Apply for the job
    const applied = auth.applyForJob(job.id, job.title, job.company);

    if (applied) {
      // For Google Sheets integration - prepare data
      const applicationData = {
        timestamp: new Date().toISOString(),
        userId: user.id,
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

      // Send to Google Sheets (we'll add this function)
      await submitToGoogleSheets(applicationData);

      // Redirect to success page
      router.push(`/jobs/${job.id}?applied=true`);
    }

    setIsSubmitting(false);
  };

  // Google Sheets submission function
  const submitToGoogleSheets = async (data) => {
    try {
      // Replace with your Google Sheets Web App URL
      const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_SHEET_WEB_APP_URL_HERE';
      
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      // Continue even if Google Sheets fails
    }
  };

  if (!job) {
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
          <h1>Apply for {job.title}</h1>
          <p className="company-tag">at {job.company}</p>
          <p>Complete the application form below. We typically respond within 48 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
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
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload CV *</label>
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
            <label>Cover Letter *</label>
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
            <Link href={`/jobs/${job.id}`} className="cancel-button">
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