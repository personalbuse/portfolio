import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const othersRef = useRef(null);

  const skillGroups = t('skills.skillGroups') || {};
  const categories = Object.keys(skillGroups);

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

      // Skill groups cascade entrance - faster
      const groups = sectionRef.current.querySelectorAll('.skill-group');
      gsap.fromTo(groups,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      // Others section - faster
      if (othersRef.current) {
        const otherItems = othersRef.current.children;
        gsap.fromTo(otherItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: othersRef.current,
              start: 'top 90%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const others = t('skills.others') || [];

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-vibrant/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 flex items-center gap-4"
        >
          <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('skills.sectionNumber')}</span>
          <span className="bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent">{t('skills.title')}</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIndex) => (
            <div 
              key={category} 
              className="skill-group p-6 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-xl hover:border-neon/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 group"
            >
              <span className="text-xs uppercase tracking-widest text-neon block mb-4 font-mono group-hover:tracking-[0.2em] transition-all duration-300">
                {t(`skills.categories.${category}`)}
              </span>
              <div className="flex flex-wrap gap-2">
                {skillGroups[category].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium bg-accent/20 text-foreground rounded-md border border-accent/30 hover:bg-neon/20 hover:border-neon/50 hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div ref={othersRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           {others.map((other, index) => (
             <div 
               key={other} 
               className="relative border border-accent/30 p-6 text-center group hover:border-foreground rounded-lg bg-background/30 backdrop-blur-sm overflow-hidden transition-all duration-500"
             >
               <div className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/10 to-neon/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
               <p className="text-xs uppercase tracking-widest font-medium relative z-10 group-hover:text-neon transition-colors duration-300">{other}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
