import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = []; // Intentionally blank as per user request (no internal redirects)

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-accent py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-tighter hover:text-neon transition-colors">
          dabuma
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-4 items-center">
            <a href="https://github.com/personalbuse" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
              <Github className="w-5 h-5 text-muted group-hover:text-neon transition-colors" />
              <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">GitHub</span>
            </a>
            <div className="h-4 w-px bg-accent mx-2"></div>
            <a href="https://linkedin.com/in/sergio-burbano" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
              <Linkedin className="w-5 h-5 text-muted group-hover:text-neon transition-colors" />
              <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">LinkedIn</span>
            </a>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center space-y-8 z-40">
          <div className="flex flex-col space-y-8 items-center pt-8">
            <a href="https://github.com/personalbuse" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
               <Github className="w-8 h-8 text-muted group-hover:text-neon transition-colors" />
               <span className="text-2xl uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/sergio-burbano" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
               <Linkedin className="w-8 h-8 text-muted group-hover:text-neon transition-colors" />
               <span className="text-2xl uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
