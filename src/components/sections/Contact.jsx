import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail } from 'lucide-react';
import ColombiaFlag from '../common/ColombiaFlag';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
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
                trigger: infoRef.current,
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

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase flex items-center justify-center gap-4">
            {t('contact.title')}
            <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('contact.sectionNumber')}</span>
          </h2>
          <p className="text-xl text-muted max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div ref={infoRef} className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Card */}
            <div 
              ref={addToCardsRef}
              className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl opacity-20 font-black italic mb-4">01</span>
                <div className="p-3 bg-neon/10 rounded-lg mb-3">
                  <Mail className="w-6 h-6 text-neon" />
                </div>
                <p className="text-[10px] md:text-xs font-mono border border-foreground/10 uppercase tracking-widest text-muted mb-2 px-2 py-1">{t('contact.emailLabel')}</p>
                <a 
                  href="mailto:sergioburbanom@gmail.com" 
                  className="font-bold text-lg md:text-xl text-foreground hover:text-neon transition-colors break-all"
                >
                  sergioburbanom@gmail.com
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div 
              ref={addToCardsRef}
              className="group border border-foreground/10 p-8 hover:border-neon transition-all duration-500 bg-background relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 w-2 h-0 bg-neon group-hover:h-full transition-all duration-500" />
              
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl opacity-20 font-black italic mb-4">02</span>
                <div className="p-3 bg-accent/20 rounded-lg mb-3">
                  <ColombiaFlag className="w-8 h-6" />
                </div>
                <p className="text-[10px] md:text-xs font-mono border border-foreground/10 uppercase tracking-widest text-muted mb-2 px-2 py-1">{t('contact.locationLabel')}</p>
                <p className="font-bold text-lg leading-relaxed text-foreground">
                  Colombia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
