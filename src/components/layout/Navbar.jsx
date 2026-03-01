import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-md border-b border-accent py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
        <a href="#home" className="text-xl font-bold tracking-tighter hover:text-neon transition-colors">
          dabuma.{/*<span className="text-neon">.</span>*/}
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-4 items-center">
            <a href="https://github.com/personalbuse" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
              <Github className="w-5 h-5 text-muted group-hover:text-neon transition-colors" />
              <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">GitHub</span>
            </a>
            <div className="h-4 w-px bg-accent mx-2"></div>
            <a href="https://www.linkedin.com/in/sergio-david-burbano-mari%C3%B1o-31576a200/" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
              <Linkedin className="w-5 h-5 text-muted group-hover:text-neon transition-colors" />
              <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">LinkedIn</span>
            </a>
            <div className="h-4 w-px bg-accent mx-2"></div>
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold border border-accent px-3 py-1 hover:border-neon transition-all"
            >
              <span className={language === 'en' ? 'text-neon' : 'text-muted'}>EN</span>
              <span className="text-accent mx-0.5">/</span>
              <span className={language === 'es' ? 'text-neon' : 'text-muted'}>ES</span>
            </button>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center space-y-8 z-40 border-b border-accent/20">
          <div className="flex flex-col space-y-8 items-center pt-8">
            <a href="https://github.com/personalbuse" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group">
               <Github className="w-8 h-8 text-muted group-hover:text-neon transition-colors" />
               <span className="text-2xl uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sergio-david-burbano-mari%C3%B1o-31576a200/" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group">
               <Linkedin className="w-8 h-8 text-muted group-hover:text-neon transition-colors" />
               <span className="text-2xl uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">LinkedIn</span>
            </a>
            {/* Mobile Language Toggle */}
            <button
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              className="flex items-center gap-2 text-lg uppercase tracking-widest font-bold border border-accent px-6 py-2 hover:border-neon transition-all mt-4"
            >
              <span className={language === 'en' ? 'text-neon' : 'text-muted'}>EN</span>
              <span className="text-accent">/</span>
              <span className={language === 'es' ? 'text-neon' : 'text-muted'}>ES</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
