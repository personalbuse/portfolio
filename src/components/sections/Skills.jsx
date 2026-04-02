import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const skillGroups = t('skills.skillGroups', { returnObjects: true }) || {};
  const categories = Object.keys(skillGroups);
  const softSkills = t('skills.softSkills', { returnObjects: true }) || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 95%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="min-h-screen w-full relative pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-7xl font-black tracking-tighter mb-20 uppercase flex items-center gap-4"
        >
          {t('skills.title')}
          <div className="h-1 flex-grow bg-foreground/10" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div key={category} className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl opacity-20 font-black italic">{(idx + 1).toString().padStart(2, '0')}</span>
                <h3 className="text-xl font-bold uppercase tracking-widest text-foreground group-hover:text-neon transition-colors duration-300">
                  {t(`skills.categories.${category}`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroups[category].map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 text-[10px] md:text-xs font-mono border border-foreground/10 uppercase tracking-widest text-muted hover:text-foreground hover:border-foreground transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-12 border-t border-foreground/10">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            {softSkills.map((skill, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="font-bold text-foreground">{language === 'es' ? skill.es : skill.en}</span>
                {index < softSkills.length - 1 && (
                  <span className="text-foreground/20 ml-2">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
