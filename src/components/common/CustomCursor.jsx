import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices — skip cursor entirely on mobile
    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          gsap.set(cursor, { x: mouseX, y: mouseY });
          gsap.to(glow, {
            x: mouseX,
            y: mouseY,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: true,
          });
          rafId = null;
        });
      }
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div id="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div id="custom-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
