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
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
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
              duration: 0.4,
              delay: 0.1 + i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: eduRef.current,
                start: 'top 90%',
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
    <section id="education" ref={sectionRef} className="section-padding bg-accent/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-vibrant/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 flex items-center gap-4"
        >
          <span className="text-neon text-sm tracking-widest uppercase font-mono">05.</span>
          <span className="bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent">{t('experience.education')}</span>
        </h2>

        <div ref={eduRef} className="grid md:grid-cols-2 gap-6">
          {(Array.isArray(educationList) ? educationList : []).map((edu, index) => (
            <div 
              key={index} 
              ref={addToCardsRef}
              className="group p-8 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-2xl hover:border-neon/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-500 relative overflow-hidden cursor-default"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon/0 via-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-neon/10 rounded-xl group-hover:bg-neon/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-neon" />
                  </div>
                  <span className="text-xs px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 font-mono">
                    {edu.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-neon transition-colors duration-300">
                  {edu.degree}
                </h3>
                
                <p className="text-muted text-sm uppercase tracking-widest font-medium">
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
