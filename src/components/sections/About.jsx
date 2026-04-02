import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ColombiaFlag from '../common/ColombiaFlag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal - faster
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          }
        }
      );

      // Paragraphs stagger - faster
      paragraphsRef.current.forEach((p, i) => {
        if (p) {
          gsap.fromTo(p,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: 0.05 + i * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 95%',
              }
            }
          );
        }
      });

      // Stats cards entrance - faster
      if (statsRef.current) {
        const cards = statsRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 95%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToParagraphRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-neon/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-vibrant/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <div ref={textRef}>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-20 uppercase flex items-center gap-4"
          >
            {t('about.title')}
            <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('about.sectionNumber')}</span>
            <div className="h-1 flex-grow bg-foreground/10 hidden md:block" />
          </h2>
          <div className="space-y-6 text-muted leading-relaxed text-lg">
            <p ref={addToParagraphRefs} className="relative pl-4 border-l-2 border-foreground/10 hover:border-neon transition-colors duration-300">
              <span className="text-foreground font-medium">{t('about.p1_highlight')}</span>{t('about.p1_end')}
            </p>
            <p ref={addToParagraphRefs} className="relative pl-4 border-l-2 border-foreground/10 hover:border-neon transition-colors duration-300">
              {t('about.p2_start')}<span className="text-foreground font-medium">{t('about.p2_highlight')}</span>{t('about.p2_end')}
            </p>
            <p ref={addToParagraphRefs} className="relative pl-4 border-l-2 border-foreground/10 hover:border-neon transition-colors duration-300">
              {t('about.p3_start')}<span className="text-foreground font-medium">{t('about.p3_highlight')}</span>{t('about.p3_end')}
            </p>
          </div>
          
            <div ref={statsRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden cursor-default text-center">
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              <p className="text-[10px] uppercase tracking-widest text-muted mb-3 font-mono">{t('about.location')}</p>
              <div className="flex flex-col items-center gap-2">
                <ColombiaFlag className="opacity-80 w-8 h-6 drop-shadow-lg" />
                <p className="font-bold text-lg leading-tight text-foreground">{t('about.locationValue')}</p>
                <p className="text-xs text-muted">{t('about.relocation')}</p>
              </div>
            </div>
            <div className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden cursor-default text-center">
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              <p className="text-[10px] uppercase tracking-widest text-muted mb-3 font-mono">{t('about.language')}</p>
              <p className="font-bold text-lg leading-tight text-foreground">{t('about.langValue1')}</p>
              <p className="font-medium text-base text-muted mt-1">
                {t('about.langValue2').split('(')[0]}(<a href="https://cert.efset.org/hBScQc" target="_blank" rel="noopener noreferrer" className="text-neon hover:text-neon/80 transition-colors">{t('about.langValue2').match(/\((.*)\)/)?.[1] || 'Certificado EF'}</a>)
              </p>
            </div>
            <div className="group border border-foreground/10 p-8 hover:border-green-500 transition-all duration-500 bg-background relative overflow-hidden cursor-default text-center">
              <div className="absolute top-0 left-0 w-2 h-0 bg-green-500 group-hover:h-full transition-all duration-500" />
              <p className="text-[10px] uppercase tracking-widest text-muted mb-3 font-mono">{t('about.status')}</p>
              <div className="relative">
                <div className="flex items-center justify-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p className="font-bold text-lg text-green-500 uppercase tracking-wider">
                    {t('about.statusValue')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
