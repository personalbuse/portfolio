import { HelmetProvider } from 'react-helmet-async';
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

function App() {
  return (
    <HelmetProvider>
      <SEO 
        title="dabuma" 
        description="Portafolio profesional de Sergio David Burbano Mariño. Estudiante de 9no semestre de Ingeniería de Sistemas enfocado en resolución de problemas y adaptabilidad." 
      />
      <div className="relative min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
        {/* Ambient Neon Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          <CustomCursor />
          <Navbar />
          
          <main>
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

export default App;
