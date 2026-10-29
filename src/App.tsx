import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { SkillsEducation } from './components/SkillsEducation';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#211827] text-[#F1EAE1]">
      {/* Accessible skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Landmark with Deliberate Alternating Sections */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Section 1: Hero (Deep Aubergine #211827) */}
        <Hero />

        {/* Section 2: About (Warm Ivory #F1EAE1) */}
        <About />

        {/* Section 3: Featured Projects (Plum Graphite #29212F + Elevated Plum #403347) */}
        <Projects />

        {/* Section 4: Skills and Education (Warm Ivory #F1EAE1) */}
        <SkillsEducation />

        {/* Section 5: Achievements (Restrained Dark Panels with Warm Accents) */}
        <Achievements />

        {/* Section 6: Contact (Deep Aubergine #211827) */}
        <Contact />
      </main>

      {/* Footer (Deep Aubergine #211827) */}
      <Footer />
    </div>
  );
};

export default App;
