import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const socialLinks = [
    { name: 'Linkedin', icon: '/images/LinkedIN.png', url: 'https://www.linkedin.com/company/learnexity/ LinkedIn' },
    { name: 'YouTube', icon: '/images/youtube.png', url: 'https://youtube.com/@learnexity?si=Ig-Fv1u4R4gBpGBi YouTube' },
    { name: 'Facebook', icon: '/images/facebook.png', url: 'https://www.facebook.com/Learnexity facebook' },
    { name: 'Instagram', icon: '/images/instagram.png', url: 'https://www.instagram.com/learnexity?igsh=YW1mbWNqaTh3Zzdw Instagram' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>JobX</h3>
          <p>Empowering youth with skills and opportunities</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/jobs">Find Jobs</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/register">Register</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Customer support</p>
          <a href="tel:+1 (276) 252-8415" className="phone-link">
            +1 (276) 252-8415
          </a>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
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
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 JobX. All rights reserved.</p>
      </div>
    </footer>
  );
}