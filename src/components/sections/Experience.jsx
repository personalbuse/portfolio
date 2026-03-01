import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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
  const experiences = [
    {
      role: 'Desarrollo Web Service para citas',
      company: 'Cupido',
      companyUrl: 'https://cupidocol.com',
      period: 'Actual',
      desc: 'Desarrollo Full Stack enfocado en escalabilidad y experiencia de usuario.',
    },
    {
      role: 'Sistema Contable',
      company: 'Mocca',
      period: '2023',
      desc: 'Implementación de lógica de negocio y gestión de bases de datos.',
    },
    {
      role: 'Asesor Comercial y Coordinador',
      company: 'Claro',
      period: '2021 - 2022',
      desc: 'Liderazgo de equipos y optimización de procesos de venta.',
    },
    {
      role: 'Técnico Independiente',
      company: 'Freelance',
      period: '2020 - Presente',
      desc: 'Reparación y mantenimiento avanzado de hardware y sistemas.',
    },
  ];

  const education = [
    {
      degree: 'Ingeniería de Sistemas',
      institution: 'Universidad de Pamplona',
      status: '9no semestre',
    },
    {
      degree: 'Técnico en Sistemas',
      institution: 'SENA',
      status: 'Completado',
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16 flex items-center gap-4">
          <span className="text-muted text-sm tracking-widest uppercase">04.</span>
          EXPERIENCIA
        </h2>

        <div className="grid lg:grid-cols-3 gap-16">
          <div ref={expRef} className="lg:col-span-2 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l border-accent group">
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-accent rounded-full group-hover:bg-white transition-colors"></div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted">{exp.period}</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1">{exp.role}</h3>
                  {exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-muted font-medium mb-4 italic hover:text-foreground hover:underline block">{exp.company}</a>
                  ) : (
                    <p className="text-muted font-medium mb-4 italic">{exp.company}</p>
                  )}
                  <p className="text-sm text-muted leading-relaxed max-w-xl">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={eduRef} className="space-y-12">
            <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-muted mb-8 italic">Educación</h3>
            {education.map((edu, index) => (
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
