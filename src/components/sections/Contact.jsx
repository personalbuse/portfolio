import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    if (infoRef.current) {
      tl.fromTo(infoRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);
  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-gradient-to-b from-accent/5 to-background border-t border-vibrant/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">05.</span>
          CONTACTO
        </h2>

        <div className="max-w-2xl mx-auto">
          <div ref={infoRef} className="flex flex-col items-center text-center">
            <p className="text-xl text-muted mb-12 max-w-lg">
              Si algo te llamó la atención puedes contactarme por correo o por medio telefónico, estaré encantado de ayudarte.
            </p>

            <div className="space-y-10 w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 group">
                <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center group-hover:border-neon group-hover:text-neon transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-1">Email Directo</p>
                  <a href="mailto:sergioburbanom@gmail.com" className="font-black text-xl md:text-2xl text-foreground hover:text-neon transition-all">sergioburbanom@gmail.com</a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 group">
                <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center group-hover:border-neon group-hover:text-neon transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-1">Llamada Directa</p>
                  <a href="tel:+573138314584" className="font-black text-xl md:text-2xl text-foreground hover:text-neon transition-all">+57 313 831 4584</a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 group">
                <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center group-hover:border-neon group-hover:text-neon transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted mb-1">Ubicación</p>
                  <p className="font-medium text-lg">Pamplona | Sogamoso, Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
