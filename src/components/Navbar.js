'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter }  from 'next/navigation';
import { auth } from '@/utils/auth';
export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);
const pathname = usePathname();
const router = useRouter();
useEffect(() => {
// Check login status
const loggedIn = auth.isLoggedIn();
setIsLoggedIn(loggedIn);
if (loggedIn) {
  setUser(auth.getUser());
}
}, [pathname]);
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
const handleLogout = () => {
auth.logout();
setIsLoggedIn(false);
setUser(null);
router.push('/');
setMenuOpen(false);
};
return (
<nav className="navbar">
<div className="nav-container">
<Link href="/" className="logo-container">
<Image 
         src="/images/JobX.png" 
         alt="JobX Logo" 
         width={60} 
         height={60}
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
      
      {isLoggedIn ? (
        <>
          <li><Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          <li>
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </li>
          {user && (
            <li className="nav-user-name">Hi, {user.name.split(' ')[0]}</li>
          )}
        </>
      ) : (
        <>
          <li><Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
        </>
      )}
    </ul>
  </div>
</nav>
);
}