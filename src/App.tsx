import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#080c0e] text-[#edf1f4] selection:bg-[#d8b46a] selection:text-zinc-950">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
