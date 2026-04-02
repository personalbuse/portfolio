import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const expRef = useRef(null);
  const timelineRef = useRef(null);
  const expItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - faster
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

      // Timeline line drawing animation - faster
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: expRef.current,
              start: 'top 95%',
            }
          }
        );
      }

      // Experience items - faster
      expItemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: 0.05 + i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: expRef.current,
                start: 'top 95%',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToExpItemsRef = (el) => {
    if (el && !expItemsRef.current.includes(el)) {
      expItemsRef.current.push(el);
    }
  };

  const experiences = t('experience.experiences');
  const educationList = t('experience.educationList');

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-vibrant/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-7xl font-black tracking-tighter mb-20 uppercase flex items-center gap-4"
        >
          {t('experience.title')}
          <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('experience.sectionNumber')}</span>
          <div className="h-1 flex-grow bg-foreground/10 hidden md:block" />
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div 
            ref={timelineRef}
            className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-foreground/10 hidden md:block"
          />
          
          <div ref={expRef} className="space-y-8 md:space-y-12">
            {(Array.isArray(experiences) ? experiences : []).map((exp, index) => {
              const isCupido = exp.company === 'Cupido';
              return (
                <div 
                  key={index} 
                  ref={addToExpItemsRef}
                  className="relative pl-8 md:pl-12 group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background"
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-0 top-8 w-6 h-6 rounded-full flex items-center justify-center bg-background border-2 border-foreground/20 group-hover:border-neon transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-foreground group-hover:bg-neon transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] md:text-xs font-mono border border-foreground/10 uppercase tracking-widest text-muted px-3 py-1">{exp.period}</span>
                      {isCupido && (
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-neon bg-neon/10 px-3 py-1 rounded-full border border-neon/20">
                          {t('experience.featured')}
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`font-bold tracking-tight ${isCupido ? 'text-3xl md:text-4xl text-[var(--highlight-text)]' : 'text-xl md:text-2xl group-hover:text-neon transition-colors'}`}>
                      {exp.role}
                    </h3>
                    
                    {exp.companyUrl ? (
                      <a 
                        href={exp.companyUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`font-medium italic inline-flex items-center gap-2 group/link ${
                          isCupido 
                            ? 'text-[var(--highlight-text)] hover:underline decoration-[var(--highlight-border)]/50 underline-offset-4' 
                            : 'text-muted hover:text-neon'
                        } transition-colors`}
                      >
                        {exp.company}
                        <span className="text-xs not-italic opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                      </a>
                    ) : (
                      <p className="text-muted font-medium italic">{exp.company}</p>
                    )}
                    
                    <p className={`text-muted leading-relaxed max-w-2xl ${isCupido ? 'text-base' : 'text-sm'}`}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
