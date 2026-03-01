import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/common/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import SEO from './components/common/SEO';

function AppContent() {
  const { t } = useLanguage();

  return (
    <HelmetProvider>
      <SEO 
        title="dabuma" 
        description={t('seo.description')} 
      />
      <div className="relative min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
        {/* Ambient Neon Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon/10 blur-[80px] rounded-full" style={{ willChange: 'transform' }}></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon/10 blur-[80px] rounded-full" style={{ willChange: 'transform' }}></div>
        </div>

        <div className="relative z-10">
          <CustomCursor />
          <Navbar />
          
          <main id="main-content" role="main">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

