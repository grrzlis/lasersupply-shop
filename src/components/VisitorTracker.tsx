'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';

export function VisitorTracker() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getTotalCount());
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    // Generate or retrieve persistent browser session ID
    try {
      let sid = sessionStorage.getItem('ls_sid');
      if (!sid) {
        sid = 's_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        sessionStorage.setItem('ls_sid', sid);
      }
      sessionIdRef.current = sid;
    } catch {
      sessionIdRef.current = 's_' + Math.random().toString(36).slice(2, 10);
    }

    const sendPing = () => {
      if (!sessionIdRef.current) return;
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;

      const fullPath = (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : pathname) || '/';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      const payload = {
        sessionId: sessionIdRef.current,
        path: fullPath,
        referrer,
        device: isMobile ? 'mobile' : 'desktop',
        cartCount,
      };

      try {
        fetch('/api/track/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch {}
    };

    // Send immediate ping on load or path/cart change
    sendPing();

    // Pulse heartbeat every 25 seconds while tab is open
    const interval = setInterval(sendPing, 25000);

    // Listen to hash changes (when user clicks an item or scrolls to #section)
    const handleHash = () => sendPing();
    window.addEventListener('hashchange', handleHash);

    return () => {
      clearInterval(interval);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [pathname, cartCount]);

  return null;
}
