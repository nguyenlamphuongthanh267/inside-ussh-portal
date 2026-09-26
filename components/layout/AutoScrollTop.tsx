'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AutoScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Force scroll to top on reload or initial page load
      window.scrollTo(0, 0);
    }
  }, []);

  // When pathname changes (e.g. navigating to home), scroll to top if at home without hash
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
