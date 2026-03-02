import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const skills = [
    { name: 'Java', level: 75, category: 'Lenguajes' },
    { name: 'Python', level: 70, category: 'Lenguajes' },
    { name: 'React', level: 65, category: 'Web' },
    { name: 'PostgreSQL/MySQL', level: 75, category: 'DB' },
    { name: 'Linux', level: 80, category: 'OS' },
    { name: 'DevOps', level: 35, category: 'Design' },
  ];

  useEffect(() => {
    const bars = sectionRef.current.querySelectorAll('.skill-bar');
    
    bars.forEach((bar) => {
      const level = bar.getAttribute('data-level');
      gsap.fromTo(bar, 
        { width: '0%' },
        { 
          width: `${level}%`, 
          duration: 1.5, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  const others = t('skills.others');

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">{t('skills.sectionNumber')}</span>
          {t('skills.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted block mb-1">{t(`skills.categories.${skill.category}`)}</span>
                  <span className="text-xl font-bold tracking-tight">{skill.name}</span>
                </div>
                <span className="text-xs font-mono text-muted">{skill.level}%</span>
              </div>
              <div className="h-[1px] w-full bg-accent relative">
                <div 
                  className="skill-bar absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  data-level={skill.level}
                ></div>
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
