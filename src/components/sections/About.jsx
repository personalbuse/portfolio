import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

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
            <span className="text-muted text-sm tracking-widest uppercase">01.</span>
            SOBRE MÍ
          </h2>
          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              Soy un apasionado <span className="text-foreground font-medium">Estudiante de Ingeniería de Sistemas (9no semestre)</span> con una mentalidad orientada a resultados y una capacidad insaciable de aprendizaje. Mi enfoque principal es la adaptabilidad en entornos tecnológicos cambiantes.
            </p>
            <p>
              A lo largo de mi formación en la <span className="text-foreground">Universidad de Pamplona</span>, he desarrollado una sólida base técnica en diversos lenguajes de programación y sistemas, complementada con habilidades en diseño gráfico y hardware.
            </p>
            <p>
              Busco mi primera <span className="text-foreground font-medium">práctica profesional</span> para aplicar mis conocimientos en proyectos reales, aportando valor a través de la innovación y la resolución estratégica de problemas.
            </p>
            <div className="mt-4 p-4 border border-accent/30 bg-background/50 rounded flex gap-4 items-start">
               <p className="text-sm italic text-muted">
                 Sinceridad ante todo: no desarrollo todo completamente desde cero escribiendo cada línea de código manualmente. Hago un uso extensivo e inteligente de plataformas de Inteligencia Artificial como GitHub Copilot, ChatGPT y Claude para iterar más rápido, resolver problemas complejos y elevar enormemente la calidad de mis resultados finales. Sé cómo guiar a la IA para construir soluciones robustas.
               </p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center text-center gap-8 py-8 border-y border-accent/20">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Ubicación</p>
              <p className="font-medium text-sm">Pamplona / Sogamoso, CO</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Idioma</p>
              <p className="font-medium text-sm">Inglés C1</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Estado</p>
              <p className="font-medium text-sm text-green-500">Buscando Prácticas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
