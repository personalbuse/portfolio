import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const skillGroups = t('skills.skillGroups') || {};
  const categories = Object.keys(skillGroups);

  useEffect(() => {
    if (!sectionRef.current) return;
    const groups = sectionRef.current.querySelectorAll('.skill-group');
    if (groups.length === 0) return;
    
    gsap.fromTo(groups,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const others = t('skills.others') || [];

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">{t('skills.sectionNumber')}</span>
          {t('skills.title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="skill-group p-6 border border-accent hover:border-neon transition-colors duration-300">
              <span className="text-[10px] uppercase tracking-widest text-neon block mb-4">
                {t(`skills.categories.${category}`)}
              </span>
              <div className="flex flex-wrap gap-2">
                {skillGroups[category].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium bg-accent/30 text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
           {others.map(other => (
             <div key={other} className="border border-accent p-6 text-center group hover:bg-white hover:text-black transition-colors duration-300">
                <p className="text-xs uppercase tracking-widest font-medium">{other}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
