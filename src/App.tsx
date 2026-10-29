import React, { useEffect } from 'react';
import { Stage } from './components/Stage';
import { Chrome } from './components/Chrome';
import { HeroScene, HeroBack } from './scenes/Hero';
import { AboutScene, AboutBack } from './scenes/About';
import { WorkScene, WorkBack } from './scenes/Work';
import { JourneyScene, JourneyBack } from './scenes/Journey';
import { SkillsScene, SkillsBack, SkillsFront } from './scenes/Skills';
import { AwardsScene, AwardsBack } from './scenes/Awards';
import { ContactScene, ContactBack } from './scenes/Contact';
import { director, SCENES } from './engine/director';

export const App: React.FC = () => {
  // Register all sections with director's ResizeObserver
  useEffect(() => {
    SCENES.forEach((scene) => {
      const el = document.getElementById(`scene-${scene.id}`);
      if (el) {
        director.registerSectionElement(scene.id, el);
      }
    });
    director.measureSections();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-paper text-ink overflow-x-hidden">
      {/* ========================================== */}
      {/* LAYER z0: Fixed Back Layer (.layer-back) */}
      {/* ========================================== */}
      <div className="layer-back">
        <HeroBack />
        <AboutBack />
        <WorkBack />
        <JourneyBack />
        <SkillsBack />
        <AwardsBack />
        <ContactBack />
      </div>

      {/* ========================================== */}
      {/* LAYER z1: Canvas Stage */}
      {/* ========================================== */}
      <Stage />

      {/* ========================================== */}
      {/* LAYER z2: Fixed Front Layer (.layer-front) */}
      {/* ========================================== */}
      <div className="layer-front">
        <SkillsFront />
      </div>

      {/* ========================================== */}
      {/* LAYER z3: Main Sticky Sections (<main>) */}
      {/* ========================================== */}
      <main className="sections-container">
        <HeroScene />
        <AboutScene />
        <WorkScene />
        <JourneyScene />
        <SkillsScene />
        <AwardsScene />
        <ContactScene />
      </main>

      {/* ========================================== */}
      {/* LAYER z50 & z90+: HUD, Cursor & Preloader */}
      {/* ========================================== */}
      <Chrome />
    </div>
  );
};

export default App;
