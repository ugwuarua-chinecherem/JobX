'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyPage() {
  const router = useRouter();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    router.push('/success');
  };

  return (
    <div className="apply-page">
      <div className="apply-container">
        <div className="apply-header">
          <h1>Join Our Team!</h1>
          <p>Complete the application form below to apply. We typically respond within 48 hours.</p>
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
              rows="6"
              placeholder="Tell us why you're a great fit for this role..."
            />
          </div>

          <button type="submit" className="submit-button">Apply</button>
        </form>
      </div>
    </div>
  );
}