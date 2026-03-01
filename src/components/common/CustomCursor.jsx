import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Smooth follow for cursor dot
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Subtle glow follow
      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div id="cursor-glow" ref={glowRef} />
      <div id="custom-cursor" ref={cursorRef} />
    </>
  );
};

export default CustomCursor;
