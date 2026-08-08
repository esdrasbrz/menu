import { useEffect } from 'react';

/**
 * Freezes the page behind an open dialog.
 *
 * `overflow: hidden` on the body is enough on desktop, but mobile Safari ignores it and scrolls
 * the list behind the dialog anyway — including when the touch lands on the dialog itself and it
 * has nothing left to scroll. Taking the body out of flow is what actually stops it, so it is
 * pinned at the offset it was already at and put back, scrolled to the same place, on close.
 */
export function useScrollLock() {
  useEffect(() => {
    const { body } = document;
    const scrollY = window.scrollY;
    const { position, top, left, right, width, overflow } = body.style;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = position;
      body.style.top = top;
      body.style.left = left;
      body.style.right = right;
      body.style.width = width;
      body.style.overflow = overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);
}
