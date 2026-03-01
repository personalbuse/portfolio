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

        <div className="grid lg:grid-cols-3 gap-16">
          <div ref={expRef} className="lg:col-span-2 space-y-12">
            {(Array.isArray(experiences) ? experiences : []).map((exp, index) => {
              const isCupido = exp.company === 'Cupido';
              return (
              <div key={index} className={`relative pl-8 border-l group ${isCupido ? 'border-white bg-white/5 p-6 rounded-r-lg shadow-[inset_3px_0_0_0_#ffffff,0_8px_30px_rgba(255,255,255,0.06)]' : 'border-accent'}`}>
                <div className={`absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full ${isCupido ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-accent group-hover:bg-white'} transition-colors`}></div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-muted">{exp.period}</span>
                    {isCupido && <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/20">{t('experience.featured')}</span>}
                  </div>
                  <h3 className={`font-bold tracking-tight mt-1 ${isCupido ? 'text-3xl text-white' : 'text-2xl'}`}>{exp.role}</h3>
                  {exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noreferrer" className={`font-medium mb-4 italic block ${isCupido ? 'text-white/80 hover:text-white hover:underline' : 'text-muted hover:text-foreground hover:underline'}`}>{exp.company}</a>
                  ) : (
                    <p className="text-muted font-medium mb-4 italic">{exp.company}</p>
                  )}
                  <p className="text-sm text-muted leading-relaxed max-w-xl">{exp.desc}</p>
                </div>
              </div>
              );
            })}
          </div>

          <div ref={eduRef} className="space-y-12">
            <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-muted mb-8 italic">{t('experience.education')}</h3>
            {(Array.isArray(educationList) ? educationList : []).map((edu, index) => (
              <div key={index} className="p-6 border border-accent bg-accent/5 group hover:border-muted transition-colors">
                <h4 className="font-bold text-lg mb-1">{edu.degree}</h4>
                <p className="text-muted text-xs mb-4 uppercase tracking-widest">{edu.institution}</p>
                <span className="text-xs px-2 py-1 bg-accent/20 text-muted rounded-sm">{edu.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
