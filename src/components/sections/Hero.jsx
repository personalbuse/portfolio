import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const scanlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scanlineRef.current, {
        y: '100%',
        duration: 4,
        ease: 'none',
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const spans = document.querySelectorAll('.word span[class]');

    // =========================
    // ANIMACIÓN POR CLICK
    // =========================
    spans.forEach((span, idx) => {
      span.addEventListener('click', () => {
        span.classList.add('active');
      });

      span.addEventListener('animationend', () => {
        span.classList.remove('active');
      });

      // Animación inicial escalonada
      setTimeout(() => {
        span.classList.add('active');
      }, 750 * (idx + 1));
    });

    // =========================
    // EFECTO MAGNÉTICO
    // =========================
    document.addEventListener('mousemove', (e) => {
      const allSpans = document.querySelectorAll('.word span[class]');

      allSpans.forEach((el) => {
        if (el.classList.contains('active')) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 150;
        const intensity = Math.max(0, (maxDist - dist) / maxDist);

        if (intensity > 0) {
          const x = (-dx * intensity) * 0.3;
          const y = (-dy * intensity) * 0.3;
          const scale = 1 + intensity * 0.2;

          el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
          el.style.textShadow = `0 4px 15px rgba(0,0,0,0.3)`;
        } else {
          el.style.transform = '';
          el.style.textShadow = '';
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-background relative py-20"
    >
      <div className="text-center z-10 max-w-4xl px-6">
        <p className="text-neon text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-8">
          {t('hero.title')}
          <span className="animate-pulse">_</span>
        </p>
        
        <div className="word-container mb-8">
          <h1 className="word text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-tight text-foreground drop-shadow-sm">
            <span>S</span>
            <span>E</span>
            <span>R</span>
            <span>G</span>
            <span>I</span>
            <span>O</span>

            <br />

            <span className="anim1">D</span>
            <span className="anim2">A</span>
            <span>V</span>
            <span>I</span>
            <span>D</span>

            <br />

            <span className="anim5">B</span>
            <span className="anim4">U</span>
            <span>R</span>
            <span>B</span>
            <span>A</span>
            <span>N</span>
            <span>O</span>

            <br />

            <span className="anim3">M</span>
            <span className="anim4">A</span>
            <span>R</span>
            <span>I</span>
            <span>Ñ</span>
            <span>O</span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-muted text-lg md:text-xl font-mono tracking-widest uppercase">
            {t('hero.subtitle')}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
        </div>
      </div>

      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-neon/5 blur-[120px] rounded-full -z-10 pointer-events-none" 
        aria-hidden="true"
      />

      <div 
        ref={scanlineRef}
        className="absolute top-0 left-0 w-full h-[2px] bg-neon/10 pointer-events-none z-20" 
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;