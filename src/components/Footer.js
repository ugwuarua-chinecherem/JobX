import Link from 'next/link';

export default function Footer() {
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
            <a href="#" ><img src="/images/twitter.png" alt="Twitter" /></a>
            <a href="#" ><img src="/images/facebook.png" alt="Facebook" /></a>
            <a href="#" ><img src="/images/instagram.png" alt="Instagram" /></a>
            <a href="#" ><img src="/images/youtube.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 JobX. All rights reserved.</p>
      </div>
    </footer>
  );
}