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

  useEffect(() => {
    if (!loading && !error && gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, [loading, error, currentPage]);

  useEffect(() => {
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

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
    <section id="projects" ref={sectionRef} className="section-padding bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter mb-4 flex items-center gap-4">
              <span className="text-muted text-sm tracking-widest uppercase">{t('projects.sectionNumber')}</span>
              {t('projects.title')}
            </h2>
            <p className="text-muted">{t('projects.subtitle')}</p>
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
                className="group p-8 border border-accent hover:border-neon transition-all duration-500 bg-background relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-6 h-6 text-neon" />
                    <span className="text-xs uppercase tracking-widest text-neon font-bold">{t('projects.featuredLabel')}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs uppercase tracking-wider border border-accent text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.metrics && (
                    <p className="text-xs text-green-500 font-mono mb-4">
                      {project.metrics}
                    </p>
                  )}
                  
                  {project.link && (
                    <div className="flex items-center gap-2 text-sm text-muted group-hover:text-neon transition-colors">
                      <span>Ver proyecto</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
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
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group p-8 border border-accent hover:border-neon transition-all duration-500 bg-background relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <Github className="w-8 h-8 text-muted group-hover:text-foreground transition-colors" />
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Star className="w-3 h-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  
                  <div className="text-sm text-muted mb-8 space-y-2 flex-grow">
                    <p className="line-clamp-2 leading-relaxed">
                      {repo.description || t('projects.noDescription')}
                    </p>
                    <div className="pt-4 border-t border-accent/30 flex items-center gap-2 text-[11px] uppercase tracking-wider">
                      <span className="text-neon font-bold">{repo.language || 'Code'}</span>
                      <span className="opacity-30">•</span>
                      <span>{t('projects.update')}: {formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-center mt-auto">
                    <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-neon transition-all" />
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
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
