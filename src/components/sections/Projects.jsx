import { useState, useEffect, useRef } from 'react';
import useGitHub from '../../hooks/useGitHub';
import { ExternalLink, Star, Code2, FolderGit2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { repos, loading, error } = useGitHub('personalbuse'); // User's GitHub username
  const [filter, setFilter] = useState('All');

  const languages = ['All', ...new Set(repos.map(repo => repo.language).filter(Boolean))];

  const filteredRepos = filter === 'All' 
    ? repos 
    : repos.filter(repo => repo.language === filter);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

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
  }, [loading, error, filter]);

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter mb-4 flex items-center gap-4">
              <span className="text-muted text-sm tracking-widest uppercase">03.</span>
              PROYECTOS
            </h2>
            <p className="text-muted">Proyectos destacados cargados dinámicamente desde GitHub.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-1 text-xs uppercase tracking-widest border transition-all ${
                  filter === lang ? 'bg-white text-black border-white' : 'border-accent text-muted hover:border-neon hover:text-neon'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-muted border-t-white rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 grayscale opacity-50">
             <Code2 className="w-12 h-12 mx-auto mb-4" />
             <p>No se pudieron cargar los repositorios. Visita mi GitHub directamente.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group p-8 border border-accent hover:border-neon transition-all duration-500 bg-background relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <FolderGit2 className="w-8 h-8 text-muted group-hover:text-foreground transition-colors" />
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Star className="w-3 h-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  
                  <p className="text-sm text-muted mb-8 line-clamp-3 leading-relaxed flex-grow">
                    {repo.description || 'Sin descripción disponible en el repositorio de GitHub.'}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
                      {repo.language || 'Markdown'}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
