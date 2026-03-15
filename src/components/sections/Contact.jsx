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
                trigger: infoRef.current,
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

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Large background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-vibrant/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 flex flex-col items-center gap-2">
            <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('contact.sectionNumber')}</span>
            <span className="bg-gradient-to-r from-foreground via-neon to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-xl text-muted max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div ref={infoRef} className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <div 
              ref={addToCardsRef}
              className="group p-8 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-2xl hover:border-neon/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-neon/10 flex items-center justify-center mb-6 group-hover:bg-neon/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-8 h-8 text-neon" />
                </div>
                <p className="text-xs uppercase tracking-widest text-neon font-mono mb-2">{t('contact.emailLabel')}</p>
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
              className="group p-8 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-2xl hover:border-neon/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 cursor-default"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 overflow-hidden">
                  <ColombiaFlag className="w-10 h-7" />
                </div>
                <p className="text-xs uppercase tracking-widest text-neon font-mono mb-2">{t('contact.locationLabel')}</p>
                <p className="font-bold text-lg leading-relaxed">
                  Pamplona / Sogamoso
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
