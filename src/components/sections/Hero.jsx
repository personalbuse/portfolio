import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const monitorRef = useRef(null);
  const screenRef = useRef(null);
  const standRef = useRef(null);
  const baseStandRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const glowRef = useRef(null);
  const scanlineRef = useRef(null);
  
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);

  const titleText = t('hero.title');
  const nameText = "SERGIO DAVID\nBURBANO MARIÑO";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for monitor entrance
      const tl = gsap.timeline();
      
      // Floating glow animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Scanline effect
      gsap.to(scanlineRef.current, {
        y: '100%',
        duration: 4,
        ease: 'none',
        repeat: -1
      });

      // Monitor entrance with bounce - faster
      tl.fromTo(monitorRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8, 
          ease: 'power3.out' 
        }
      );

      // Screen flicker on effect
      tl.fromTo(screenRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.05,
          ease: 'steps(2)',
          repeat: 2
        },
        '-=0.4'
      );

      // Floating elements staggered entrance - faster
      tl.fromTo(floatingElementsRef.current,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.5)'
        },
        '-=0.3'
      );

      // Set text immediately after screen appears
      tl.add(() => {
        if(titleRef.current) titleRef.current.innerText = titleText;
        if(nameRef.current) nameRef.current.innerText = nameText;
      })
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );

      // Continuous floating animation for decorative elements
      floatingElementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: `${(i % 2 === 0 ? -1 : 1) * 10}`,
            duration: 2 + i * 0.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Scroll-triggered explode view animation (reversible)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        }
      });

      scrollTl
        // Screen explodes upward
        .to(screenRef.current, {
          y: -180,
          rotateX: -25,
          scale: 1.1,
          ease: 'none'
        }, 0)
        // Stand goes down
        .to(standRef.current, {
          y: 150,
          rotateX: 45,
          ease: 'none'
        }, 0)
        // Base explodes down and rotates
        .to(baseStandRef.current, {
          y: 280,
          scale: 1.3,
          rotateZ: 25,
          ease: 'none'
        }, 0)
        // Floating elements scatter
        .to(floatingElementsRef.current, {
          y: (i) => (i % 2 === 0 ? -180 : 180),
          x: (i) => (i % 2 === 0 ? -120 : 120),
          scale: 0.5,
          rotation: (i) => (i % 2 === 0 ? 90 : -90),
          ease: 'none'
        }, 0)
        // Subtitle fades
        .to(subtitleRef.current, {
          y: 60,
          opacity: 0,
          ease: 'none'
        }, 0)
        // Glow expands
        .to(glowRef.current, {
          scale: 2,
          opacity: 0.3,
          ease: 'none'
        }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, [titleText, nameText]);

  const addToFloatingRefs = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-background relative perspective-1000 py-20"
    >
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Main monitor container */}
      <div 
        ref={monitorRef}
        className="relative preserve-3d"
      >
        {/* Floating decorative elements */}
        <div 
          ref={addToFloatingRefs}
          className="absolute -top-16 -left-24 w-16 h-16 border-2 border-neon/30 rounded-lg bg-neon/5 backdrop-blur-sm hidden md:flex items-center justify-center"
        >
          <span className="text-neon text-2xl font-mono">{'<>'}</span>
        </div>
        
        <div 
          ref={addToFloatingRefs}
          className="absolute -top-8 -right-20 w-12 h-12 border-2 border-vibrant/30 rounded-full bg-vibrant/5 backdrop-blur-sm hidden md:flex items-center justify-center"
        >
          <span className="text-vibrant text-lg">*</span>
        </div>
        
        <div 
          ref={addToFloatingRefs}
          className="absolute top-1/2 -left-28 w-20 h-8 border border-accent/50 rounded bg-accent/10 backdrop-blur-sm hidden md:flex items-center justify-center"
        >
          <span className="text-xs text-muted font-mono">React</span>
        </div>
        
        <div 
          ref={addToFloatingRefs}
          className="absolute top-1/3 -right-24 w-8 h-8 border border-neon/40 bg-neon/10 rounded hidden md:flex items-center justify-center"
        >
          <span className="text-neon text-sm font-bold">//</span>
        </div>

        <div 
          ref={addToFloatingRefs}
          className="absolute -bottom-4 -left-16 w-14 h-14 border border-accent/30 rounded-lg bg-background/50 backdrop-blur-sm hidden md:flex items-center justify-center rotate-12"
        >
          <span className="text-foreground/60 text-xl font-mono">{'{ }'}</span>
        </div>

        <div 
          ref={addToFloatingRefs}
          className="absolute bottom-20 -right-20 w-10 h-10 border border-vibrant/30 rounded bg-vibrant/5 hidden md:flex items-center justify-center"
        >
          <span className="text-vibrant text-lg font-bold">+</span>
        </div>

        {/* Monitor Screen */}
        <div 
          ref={screenRef}
          className="relative w-[320px] h-[200px] md:w-[600px] md:h-[380px] bg-zinc-900 rounded-2xl border-[6px] md:border-[10px] border-zinc-700 dark:border-zinc-600 shadow-[0_0_60px_rgba(139,92,246,0.15),inset_0_0_30px_rgba(0,0,0,0.5)] overflow-hidden preserve-3d"
        >
          {/* Screen bezel reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none z-10" />
          
          {/* Scanline effect */}
          <div 
            ref={scanlineRef}
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20"
          />

          {/* Screen inner glow */}
          <div className="absolute inset-2 rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-4 md:p-8">
            {/* Terminal-like header */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>

            {/* Main content */}
            <div className="text-center z-10 mt-4">
              <h2 className="text-[10px] md:text-sm text-neon/80 font-mono uppercase tracking-[0.4em] mb-3 md:mb-6">
                <span ref={titleRef}></span>
                <span className="animate-pulse">_</span>
              </h2>
              <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-none text-white whitespace-pre-line drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <span ref={nameRef}></span>
                <span className="animate-pulse border-r-[3px] border-white ml-1 inline-block h-[0.9em] align-middle"></span>
              </h1>
            </div>

            {/* Code decoration at bottom */}
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[8px] md:text-[10px] font-mono text-zinc-600">
              <span>{'// portfolio.tsx'}</span>
              <span className="text-neon/50">v2.0</span>
            </div>
          </div>

          {/* Webcam dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700 border border-zinc-600">
            <div className="absolute inset-0.5 rounded-full bg-zinc-900" />
          </div>
        </div>

        {/* Monitor Stand Neck */}
        <div 
          ref={standRef}
          className="relative mx-auto w-12 md:w-16 h-16 md:h-24 bg-gradient-to-b from-zinc-600 to-zinc-700 dark:from-zinc-500 dark:to-zinc-600 preserve-3d"
          style={{ 
            clipPath: 'polygon(20% 0%, 80% 0%, 90% 100%, 10% 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20" />
        </div>

        {/* Monitor Stand Base */}
        <div 
          ref={baseStandRef}
          className="relative mx-auto w-48 md:w-72 h-4 md:h-6 bg-gradient-to-b from-zinc-600 to-zinc-700 dark:from-zinc-500 dark:to-zinc-600 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] preserve-3d"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 rounded-full" />
          <div className="absolute inset-x-8 top-1/2 h-px bg-zinc-500/50" />
        </div>

        {/* Subtitle below monitor */}
        <p 
          ref={subtitleRef}
          className="text-center mt-8 text-sm md:text-base text-muted font-mono tracking-wider opacity-0"
        >
          Backend Developer
        </p>
      </div>

      {/* Ambient glow effects */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-neon/5 blur-[100px] rounded-full -z-10 pointer-events-none" 
        aria-hidden="true"
      />
      <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-vibrant/5 blur-[80px] rounded-full -z-10 pointer-events-none" aria-hidden="true" />
    </section>
  );
};

export default Hero;
