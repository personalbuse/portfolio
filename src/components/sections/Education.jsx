import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const eduRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(eduRef.current.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const educationList = t('experience.educationList');

  return (
    <section id="education" ref={sectionRef} className="section-padding bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">05.</span>
          {t('experience.education')}
        </h2>

        <div ref={eduRef} className="grid md:grid-cols-2 gap-8">
          {(Array.isArray(educationList) ? educationList : []).map((edu, index) => (
            <div key={index} className="p-8 border border-accent bg-background group hover:border-white transition-all duration-500">
              <h3 className="font-bold text-2xl mb-2">{edu.degree}</h3>
              <p className="text-muted text-sm mb-6 uppercase tracking-widest font-medium">{edu.institution}</p>
              <span className="text-xs px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">{edu.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
