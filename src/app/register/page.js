'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    router.push('/success');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Unlock Your potential</h1>
          <p>Register for our exclusive course</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
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

          <button type="submit" className="register-button">Register</button>
        </form>

        <div className="social-login">
          <p>Or connect with:</p>
          <div className="social-icons">
            <img src="/images/twitter.png" alt="Twitter" />
            <img src="/images/youtube.png" alt="YouTube" />
            <img src="/images/facebook.png" alt="Facebook" />
            <img src="/images/instagram.png" alt="Instagram" />
          </div>
        </div>

        <div className="contact-support">
          <p>Customer support</p>
          <p>+234 803 4444 221</p>
        </div>
      </div>
    </div>
  );
}