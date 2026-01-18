'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.nav-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo-container">
          <Image 
            src="/images/JobX.png" 
            alt="JobX Logo" 
            width={40} 
            height={40}
            className="logo-image"
          />
          <span className="logo-text">JobX</span>
        </Link>

        <button 
          className="menu-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
          <li><Link href="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
          <li><Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link></li>
          <li><Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}