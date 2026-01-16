'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
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
        <Link href="/" className="logo">
          Pelado
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