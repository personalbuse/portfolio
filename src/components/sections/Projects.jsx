import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import useGitHub from '../../hooks/useGitHub';
import { ExternalLink, Star, Code2, Github, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t, language } = useLanguage();
  const { repos, loading, error } = useGitHub('personalbuse');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const featuredRef = useRef(null);
  const titleRef = useRef(null);
  const repoCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance with slide and fade
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -100, skewX: 10 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Featured projects with 3D card flip
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current.children,
          { opacity: 0, rotateY: -30, x: -50, transformOrigin: 'left center' },
          { 
            opacity: 1, 
            rotateY: 0,
            x: 0,
            duration: 1, 
            stagger: 0.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!loading && !error && gridRef.current) {
      // Repository cards with staggered 3D entrance
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 80, rotateX: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          duration: 0.7, 
          stagger: {
            each: 0.08,
            from: 'start',
            grid: 'auto'
          },
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, [loading, error, currentPage]);

  const addToRepoCardsRef = (el) => {
    if (el && !repoCardsRef.current.includes(el)) {
      repoCardsRef.current.push(el);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'en' ? 'en-US' : 'es-ES';
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const featuredProjects = t('projects.featured') || [];

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-accent/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-vibrant/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 flex items-center gap-4">
              <span className="text-neon text-sm tracking-widest uppercase font-mono">{t('projects.sectionNumber')}</span>
              <span className="bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent">{t('projects.title')}</span>
            </h2>
            <p className="text-muted text-lg">{t('projects.subtitle')}</p>
          </div>
        </div>

        {featuredProjects && featuredProjects.length > 0 && (
          <div ref={featuredRef} className="grid md:grid-cols-2 gap-8 mb-20">
            {featuredProjects.map((project, index) => (
              <a 
                key={index}
                href={project.link || '#'}
                target={project.link ? '_blank' : '_self'}
                rel="noreferrer"
                className="group p-8 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-2xl hover:border-neon/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/20 to-neon/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-neon/10 rounded-lg group-hover:bg-neon/20 transition-colors">
                      <Cpu className="w-5 h-5 text-neon" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-neon font-mono">{t('projects.featuredLabel')}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1.5 text-xs uppercase tracking-wider border border-accent/40 text-muted rounded-md bg-accent/10 group-hover:border-neon/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.metrics && (
                    <p className="text-xs text-green-500 font-mono mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {project.metrics}
                    </p>
                  )}
                  
                  {project.link && (
                    <div className="flex items-center gap-2 text-sm text-muted group-hover:text-neon transition-colors">
                      <span>Ver proyecto</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-xl font-bold tracking-tight mb-8 flex items-center gap-4">
            <span className="text-muted text-sm tracking-widest uppercase">{t('projects.githubRepo')}</span>
          </h3>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-muted border-t-white rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 grayscale opacity-50">
             <Code2 className="w-12 h-12 mx-auto mb-4" />
             <p>{t('projects.errorMessage')}</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRepos.map((repo) => (
              <a 
                key={repo.id}
                ref={addToRepoCardsRef}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group p-6 bg-background/50 backdrop-blur-sm border border-accent/30 rounded-xl hover:border-neon/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-neon/10 transition-colors">
                      <Github className="w-6 h-6 text-muted group-hover:text-neon transition-colors" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted bg-accent/20 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-neon transition-colors capitalize">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  
                  <div className="text-sm text-muted mb-6 space-y-3 flex-grow">
                    <p className="line-clamp-2 leading-relaxed">
                      {repo.description || t('projects.noDescription')}
                    </p>
                    <div className="pt-3 border-t border-accent/20 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                      <span className="text-neon font-bold px-2 py-0.5 bg-neon/10 rounded">{repo.language || 'Code'}</span>
                      <span className="opacity-30">|</span>
                      <span className="text-muted/70">{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-center mt-auto">
                    <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-neon group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => paginate(idx + 1)}
                  className={`w-10 h-10 flex items-center justify-center border transition-all ${
                    currentPage === idx + 1 
                      ? 'bg-white text-black border-white font-bold' 
                      : 'border-accent text-muted hover:border-neon hover:text-neon'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
