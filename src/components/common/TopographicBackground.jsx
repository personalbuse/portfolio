import { useEffect, useRef } from 'react';

const TopographicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    const dotCount = 12; // Adjusted for a cleaner look
    let animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    class Dot {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 80 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.003 + Math.random() * 0.007; // Slightly slower for more elegance
        this.range = 80 + Math.random() * 120;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * this.range;
        this.y = this.baseY + Math.sin(this.angle) * this.range;
      }

      draw() {
        ctx.fillStyle = "white"; // Only alpha channel matters for the topo filter
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.update();
        dot.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.05] z-[-1]">
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          filter: 'url(#topo-hollow-v3)' 
        }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" className="invisible">
        <defs>
          <filter id="topo-hollow-v3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            
            <feComponentTransfer in="blur" result="rings">
              <feFuncA type="discrete" tableValues="0 1 0 1 0 1 0 1 0 1" />
            </feComponentTransfer>

            <feFlood className="flood-ring" result="ringColor" />
            <feComposite in="ringColor" in2="rings" operator="in" />
          </filter>
        </defs>
      </svg>
      <style dangerouslySetInnerHTML={{ __html: `
        .flood-ring {
          flood-color: var(--foreground);
        }
      `}} />
    </div>
  );
};

export default TopographicBackground;
