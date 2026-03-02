import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const expRef = useRef(null);
  const eduRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    if (expRef.current && eduRef.current) {
      tl.fromTo(expRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      )
      .fromTo(eduRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      );
    }
  }, []);

  const experiences = t('experience.experiences');
  const educationList = t('experience.educationList');

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">{t('experience.sectionNumber')}</span>
          {t('experience.title')}
        </h2>

        <div className="grid lg:grid-cols-1 gap-16">
          <div ref={expRef} className="space-y-12">
            {(Array.isArray(experiences) ? experiences : []).map((exp, index) => {
              const isCupido = exp.company === 'Cupido';
              return (
              <div key={index} className={`relative pl-8 border-l group ${isCupido ? 'border-white bg-white/5 p-8 rounded-lg shadow-[inset_4px_0_0_0_#ffffff,0_20px_40px_rgba(255,255,255,0.08)] ring-1 ring-white/20' : 'border-accent'}`}>
                <div className={`absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full ${isCupido ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)]' : 'bg-accent group-hover:bg-white'} transition-colors`}></div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-muted">{exp.period}</span>
                    {isCupido && <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white bg-white/20 px-3 py-1 rounded-full border border-white/40">{t('experience.featured')}</span>}
                  </div>
                  <h3 className={`font-bold tracking-tight mt-2 ${isCupido ? 'text-4xl text-white mb-2' : 'text-2xl mb-1'}`}>{exp.role}</h3>
                  {exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noreferrer" className={`font-medium mb-6 italic inline-flex items-center gap-2 group/link ${isCupido ? 'text-white hover:underline decoration-white/50 underline-offset-4' : 'text-muted hover:text-foreground hover:underline'}`}>
                      {exp.company}
                      {isCupido && <span className="text-[10px] not-italic opacity-0 group-hover/link:opacity-100 transition-opacity translate-y-px">↗</span>}
                    </a>
                  ) : (
                    <p className="text-muted font-medium mb-6 italic">{exp.company}</p>
                  )}
                  <p className={`text-muted leading-relaxed max-w-2xl ${isCupido ? 'text-base opacity-90' : 'text-sm'}`}>{exp.desc}</p>
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
