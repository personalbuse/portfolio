const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-accent py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://github.com/personalbuse" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/sergio-david-burbano-mari%C3%B1o-31576a200/" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors">LinkedIn</a>
        </div>
        <p className="text-xs text-muted uppercase tracking-widest">
          &copy; {currentYear} DABUMA ( David Burbano Mariño - Portfolio )
        </p>
      </div>
    </footer>
  );
};

export default Footer;
