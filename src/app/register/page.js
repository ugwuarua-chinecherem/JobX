'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../../utils/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    state: '',
    password: ''
  });
  const [error, setError] = useState('');

  const socialLinks = [
    { name: 'Twitter', icon: '/images/LinkedIN.png', url: 'https://www.linkedin.com/company/learnexity/ LinkedIn' },
    { name: 'YouTube', icon: '/images/youtube.png', url: 'https://youtube.com/@learnexity?si=Ig-Fv1u4R4gBpGBi YouTube' },
    { name: 'Facebook', icon: '/images/facebook.png', url: 'https://www.facebook.com/Learnexity facebook' },
    { name: 'Instagram', icon: '/images/instagram.png', url: 'https://www.instagram.com/learnexity?igsh=YW1mbWNqaTh3Zzdw Instagram' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Basic validation
  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  // Register user with password
  const userData = {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phoneNumber,
    state: formData.state,
    password: formData.password // Pass password here
  };

  auth.register(userData);
  
  // Redirect to dashboard
  router.push('/dashboard');
};


  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Unlock Your Potential</h1>
          <p>Register to access exclusive jobs and courses</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

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

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="At least 6 characters"
            />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link href="/login">Login here</Link></p>
        </div>

        <div className="social-login">
          <p>Connect with us:</p>
          <div className="social-icons">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={social.name}
              >
                <Image 
                  src={social.icon} 
                  alt={social.name}
                  width={45}
                  height={45}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-support">
          <p>Customer support</p>
          <a href="tel:+1 (276) 252-8415">+1 (276) 252-8415</a>
        </div>
      </div>
    </div>
  );
}