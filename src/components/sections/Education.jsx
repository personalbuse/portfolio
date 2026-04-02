import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const eduRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Cards entrance - faster
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: 0.05 + i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: eduRef.current,
                start: 'top 95%',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const educationList = t('experience.educationList');

  return (
    <section id="education" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-vibrant/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-7xl font-black tracking-tighter mb-20 uppercase flex items-center gap-4"
        >
          {t('experience.education')}
          <span className="text-neon text-sm tracking-widest uppercase font-mono">05.</span>
          <div className="h-1 flex-grow bg-foreground/10 hidden md:block" />
        </h2>

        <div ref={eduRef} className="grid md:grid-cols-2 gap-8">
          {(Array.isArray(educationList) ? educationList : []).map((edu, index) => (
            <div 
              key={index} 
              ref={addToCardsRef}
              className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl opacity-20 font-black italic">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="text-[10px] md:text-xs font-mono border border-foreground/10 uppercase tracking-widest text-muted px-3 py-1">
                    {edu.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold uppercase tracking-widest text-foreground group-hover:text-neon transition-colors duration-300">
                  {edu.degree}
                </h3>
                
                <p className="text-muted text-sm uppercase tracking-widest font-medium mt-2">
                  {edu.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
