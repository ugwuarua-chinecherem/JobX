import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const socialLinks = [
    { name: 'Twitter', icon: '/images/twitter.png', url: 'https://twitter.com/' },
    { name: 'YouTube', icon: '/images/youtube.png', url: 'https://youtube.com/' },
    { name: 'Facebook', icon: '/images/facebook.png', url: 'https://facebook.com/' },
    { name: 'Instagram', icon: '/images/instagram.png', url: 'https://instagram.com/' }
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
          <p>+234 803 4444 221</p>
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
                  width={50}
                  height={50}
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