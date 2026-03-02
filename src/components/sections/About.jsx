import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ColombiaFlag from '../common/ColombiaFlag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo(textRef.current.children, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-accent/5">
      <div className="max-w-4xl mx-auto p-4">
        <div ref={textRef}>
          <h2 className="text-4xl font-bold tracking-tighter mb-8 flex items-center gap-4">
            <span className="text-muted text-sm tracking-widest uppercase">{t('about.sectionNumber')}</span>
            {t('about.title')}
          </h2>
          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              {t('about.p1_start')}<span className="text-foreground font-medium">{t('about.p1_highlight')}</span>{t('about.p1_end')}
            </p>
            <p>
              {t('about.p2_start')}<span className="text-foreground">{t('about.p2_highlight')}</span>{t('about.p2_end')}
            </p>
            <p>
              {t('about.p3_start')}<span className="text-foreground font-medium">{t('about.p3_highlight')}</span>{t('about.p3_end')}
            </p>
            <div className="mt-4 p-4 border border-accent/30 bg-background/50 rounded flex gap-4 items-start">
               <p className="text-xs italic text-muted/80">
                 {t('about.disclaimer')}
               </p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center text-center gap-12 py-8 border-y border-accent/20">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-2">{t('about.location')}</p>
              <div className="flex flex-col items-center gap-1">
                <ColombiaFlag className="mb-1 opacity-80" />
                <p className="font-medium text-xs leading-tight">Pamplona<br />Sogamoso</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-2">{t('about.language')}</p>
              <p className="font-medium text-xs leading-tight">{t('about.langValue1')}<br />{t('about.langValue2')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-2">{t('about.status')}</p>
              <div className="relative inline-block mt-2 mb-2">
                <p className="font-bold text-sm text-green-500 uppercase tracking-wider bg-green-500/10 px-5 py-2.5 rounded-full border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                  {t('about.statusValue')}
                </p>
                {/* Subtle animated particles */}
                <div className="status-particle" style={{ '--x': '20px', left: '15%', animationDelay: '0s' }}></div>
                <div className="status-particle" style={{ '--x': '-15px', left: '50%', animationDelay: '0.7s' }}></div>
                <div className="status-particle" style={{ '--x': '18px', left: '85%', animationDelay: '1.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
