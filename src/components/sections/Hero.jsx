import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  
  const screenRef = useRef(null);
  const baseRef = useRef(null);
  const trackpadRef = useRef(null);
  const keyboardRef = useRef(null);
  
  const titleRef = useRef(null);
  const nameRef = useRef(null);

  const titleText = t('hero.title');
  const nameText = "SERGIO DAVID\nBURBANO MARIÑO";

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(laptopRef.current,
      { opacity: 0, scale: 0.8, rotateX: 30, rotateY: -30 },
      { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 2, ease: 'power4.out' }
    );

    const initObj = { titleLen: 0, nameLen: 0 };
    tl.to(initObj, {
      titleLen: titleText.length,
      duration: 1,
      ease: 'none',
      onUpdate: () => {
        if(titleRef.current) titleRef.current.innerText = titleText.substring(0, Math.round(initObj.titleLen));
      }
    })
    .to(initObj, {
      nameLen: nameText.length,
      duration: 1.5,
      ease: 'none',
      onUpdate: () => {
        if(nameRef.current) nameRef.current.innerText = nameText.substring(0, Math.round(initObj.nameLen));
      }
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    const scrollObj = { len: titleText.length + nameText.length };

    scrollTl
      .to(scrollObj, {
        len: 0,
        ease: 'none',
        onUpdate: () => {
          const totalLen = Math.round(scrollObj.len);
          const namePartLen = Math.max(0, totalLen - titleText.length);
          const titlePartLen = Math.min(titleText.length, totalLen);
          
          if(nameRef.current) nameRef.current.innerText = nameText.substring(0, namePartLen);
          if(titleRef.current) titleRef.current.innerText = titleText.substring(0, titlePartLen);
        }
      }, 0)
      .to(screenRef.current, {
        y: -300,
        z: 200,
        rotateX: -45,
        rotateY: 20,
        opacity: 0,
        ease: 'none'
      }, 0)
      .to(baseRef.current, {
        y: 300,
        z: -200,
        rotateX: 45,
        rotateY: -20,
        opacity: 0,
        ease: 'none'
      }, 0)
      .to(keyboardRef.current, {
        y: -100,
        z: 300,
        rotateX: 20,
        rotateZ: 45,
        opacity: 0,
        scale: 1.5,
        ease: 'none'
      }, 0)
      .to(trackpadRef.current, {
        y: 100,
        z: 400,
        rotateZ: -45,
        opacity: 0,
        scale: 2,
        ease: 'none'
      }, 0);

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="h-screen w-full flex items-center justify-center overflow-hidden bg-background relative perspective-1000"
    >
      <div 
        ref={laptopRef}
        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] preserve-3d"
        style={{ transform: 'rotateX(20deg) rotateY(-15deg)' }}
      >
        
        <div 
          ref={screenRef}
          className="absolute top-[10%] left-[10%] w-[80%] h-[50%] bg-black border-[8px] md:border-[16px] border-white rounded-t-xl rounded-b-sm flex items-center justify-center overflow-hidden preserve-3d shadow-[0_-20px_50px_rgba(255,255,255,0.1)] z-20 origin-bottom"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="text-center p-4 z-10 w-full">
             <h2 className="text-[8px] md:text-xs text-muted font-mono uppercase tracking-[0.3em] mb-2 md:mb-4">
               <span ref={titleRef}></span>
             </h2>
             <h1 className="text-xl md:text-5xl font-black tracking-tighter leading-none text-white whitespace-pre-line inline-block">
               <span ref={nameRef}></span><span className="animate-pulse border-r-4 border-white ml-1 inline-block h-[1em] align-middle"></span>
             </h1>
          </div>
        </div>

        <div 
          ref={baseRef}
          className="absolute top-[60%] left-[5%] w-[90%] h-[35%] bg-zinc-200 rounded-b-xl rounded-t-sm preserve-3d shadow-[0_20px_50px_rgba(255,255,255,0.1)] z-10 origin-top"
          style={{ transform: 'rotateX(75deg) translateY(-2px)' }}
        >
          <div 
            ref={keyboardRef}
            className="absolute top-[10%] left-[10%] w-[80%] h-[50%] flex flex-wrap gap-[2px] md:gap-1 p-2 bg-zinc-300 rounded pointer-events-none preserve-3d"
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="flex-grow h-[15%] bg-zinc-100 rounded-[2px] border border-zinc-400"></div>
            ))}
          </div>

          <div 
            ref={trackpadRef}
            className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[30%] h-[25%] bg-zinc-300 border border-zinc-400 rounded-sm preserve-3d"
          ></div>
        </div>

      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon/5 blur-[60px] rounded-full -z-10 pointer-events-none" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;
