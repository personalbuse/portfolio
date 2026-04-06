import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CV_URL = 'https://drive.google.com/file/d/1yVwMv601SSXr1ciZsx6jSw9o6rFo_zj6/view';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-md border-b border-accent py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
        <a href="#home" className="flex items-center overflow-hidden hover:text-neon transition-colors">
          <span className={`text-xl font-bold tracking-tighter transition-all duration-300 ease-out translate-y-0 ${scrolled ? 'opacity-0 -translate-y-full absolute' : 'opacity-100'}`}>
            dabuma.<span className={`inline-block w-[2px] h-5 ml-0.5 align-middle ${darkMode ? 'bg-white' : 'bg-black'} animate-blink`}></span>
          </span>
          <span className={`text-xl font-bold tracking-tighter transition-all duration-300 ease-out ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full absolute'}`}>
            dbm
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 items-center" aria-label="Main navigation">
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
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-8 h-8 border border-accent hover:border-neon transition-all"
            >
              {darkMode ? <Moon className="w-4 h-4 text-foreground" /> : <Sun className="w-4 h-4 text-foreground" />}
            </button>
            <div className="h-4 w-px bg-accent mx-2"></div>
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
              className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold border border-accent px-3 py-1 hover:border-neon transition-all"
            >
              <span className={language === 'en' ? 'text-neon' : 'text-muted'}>EN</span>
              <span className="text-accent mx-0.5">/</span>
              <span className={language === 'es' ? 'text-neon' : 'text-muted'}>ES</span>
            </button>
            <div className="h-4 w-px bg-accent mx-2"></div>
            {/* CV Download Button */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-neon px-4 py-2 hover:bg-neon hover:text-black transition-all"
            >
              <Download className="w-4 h-4" />
              <span>CV</span>
            </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
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
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center gap-2 text-lg uppercase tracking-widest font-bold border border-accent px-6 py-2 hover:border-neon transition-all mt-4"
            >
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="text-muted">{darkMode ? 'Dark' : 'Light'}</span>
            </button>
            {/* Mobile Language Toggle */}
            <button
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
              className="flex items-center gap-2 text-lg uppercase tracking-widest font-bold border border-accent px-6 py-2 hover:border-neon transition-all mt-4"
            >
              <span className={language === 'en' ? 'text-neon' : 'text-muted'}>EN</span>
              <span className="text-accent">/</span>
              <span className={language === 'es' ? 'text-neon' : 'text-muted'}>ES</span>
            </button>
            {/* Mobile CV Download Button */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-lg uppercase tracking-widest font-bold border border-neon px-6 py-2 hover:bg-neon hover:text-black transition-all mt-4"
            >
              <Download className="w-5 h-5" />
              <span>Descargar CV</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
