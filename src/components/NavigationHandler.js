'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Replace the current history state when on homepage
    if (pathname === '/') {
      window.history.replaceState(null, '', '/');
    }
  }, [pathname]);

  useEffect(() => {
    // Prevent going back beyond the homepage
    const handlePopState = (e) => {
      if (window.location.pathname === '/') {
        window.history.pushState(null, '', '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Push initial state
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}