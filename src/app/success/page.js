import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        <h1>Successful!</h1>
        <p>Your submission has been received successfully.</p>
        <div className="success-actions">
          <Link href="/" className="home-button">Go to Homepage</Link>
          <Link href="/jobs" className="browse-button">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
}