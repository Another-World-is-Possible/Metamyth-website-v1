import { motion } from "framer-motion";
import { useState } from "react";

const questPhases = [
  {
    id: 1,
    title: "THE CALLING",
    subtitle: "Discovering Your Authentic Story",
    color: "ancient-gold",
    position: { x: 20, y: 75 },
    description: "We help you discover the authentic story already alive within your organization and reveal your cosmic purpose."
  },
  {
    id: 2,
    title: "THE JOURNEY", 
    subtitle: "Transforming Vision into Mission",
    color: "mystical-teal",
    position: { x: 50, y: 45 },
    description: "Through our Metamyth System, we expand your vision and create the practical mission that makes it real."
  },
  {
    id: 3,
    title: "THE VISION",
    subtitle: "Story as Planetary Technology",
    color: "crimson",
    position: { x: 80, y: 25 },
    description: "Your story becomes the foundation for regenerative transformation and planetary healing."
  }
];

// Simple Mountain Arc Component
function MountainArc() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      {/* Three mountain horizons - layered from back to front */}
      <path
        d="M0,50 L70,25 L85,20 L95,30 L100,40 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.15)"
      />
      <path
        d="M0,65 L40,45 L55,40 L65,50 L100,65 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.25)"
      />
      <path
        d="M0,80 L18,75 L25,70 L30,75 L100,85 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.35)"
      />
      
      {/* Simple golden arc connecting the three phases */}
      <path
        d="M20,75 Q35,60 50,45 Q65,35 80,25"
        stroke="#d4af37"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      
      {/* Subtle phase markers on the arc */}
      <circle cx="20" cy="75" r="2" fill="#d4af37" opacity="0.7" />
      <circle cx="50" cy="45" r="2" fill="#4fd1c7" opacity="0.7" />
      <circle cx="80" cy="25" r="2" fill="#dc143c" opacity="0.7" />
    </svg>
  );
}

export default function TheQuest() {
  const [activePhase, setActivePhase] = useState(0);

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
  };

  const nextPhase = () => {
    setActivePhase(prev => Math.min(prev + 1, questPhases.length - 1));
  };

  const prevPhase = () => {
    setActivePhase(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-gradient-to-b from-deep-black via-forest-green/30 to-deep-black min-h-screen py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE QUEST
        </motion.h2>
        
        <motion.div
          className="text-center text-silver/80 text-xl mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-alice text-2xl italic text-ancient-gold mb-6">
            "Story is the oldest technology on Earth. The original operating system that turns vision into reality."
          </p>
          <p className="font-alice text-lg">
            We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real.
          </p>
        </motion.div>

        {/* Simple Mountain Arc with Glowing Sphere */}
        <motion.div
          className="relative h-80 w-full mb-16 overflow-hidden rounded-lg bg-gradient-to-b from-transparent to-deep-black/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MountainArc />
          
          {/* Moving glowing sphere */}
          <motion.div
            className="absolute w-6 h-6 rounded-full bg-ancient-gold"
            style={{
              left: `${questPhases[activePhase].position.x}%`,
              top: `${questPhases[activePhase].position.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px #d4af37, 0 0 40px #d4af37/50'
            }}
            animate={{
              left: `${questPhases[activePhase].position.x}%`,
              top: `${questPhases[activePhase].position.y}%`,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          
          {/* Phase labels */}
          {questPhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="absolute cursor-pointer"
              style={{
                left: `${phase.position.x}%`,
                top: `${phase.position.y - 15}%`,
                transform: 'translate(-50%, 0)'
              }}
              onClick={() => handlePhaseClick(index)}
              whileHover={{ scale: 1.1 }}
            >
              <div className={`text-${phase.color} font-edensor font-bold text-sm text-center px-2 py-1 rounded ${
                activePhase === index ? 'bg-black/50' : 'bg-transparent'
              }`}>
                {phase.title}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Phase Details */}
        <motion.div
          key={activePhase}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`bg-${questPhases[activePhase].color}/10 backdrop-blur-sm rounded-lg border border-${questPhases[activePhase].color}/30 p-8`}>
            <h3 className={`font-edensor text-3xl font-bold text-${questPhases[activePhase].color} mb-4 text-center`}>
              {questPhases[activePhase].title}
            </h3>
            <p className="text-silver/90 text-lg mb-6 text-center italic font-alice">
              {questPhases[activePhase].subtitle}
            </p>
            
            <div className="text-center">
              <p className="text-silver font-alice text-lg leading-relaxed max-w-3xl mx-auto">
                {questPhases[activePhase].description}
              </p>
              
              <div className="flex justify-center gap-4 mt-8">
                {activePhase > 0 && (
                  <motion.button
                    onClick={prevPhase}
                    className={`px-6 py-3 bg-silver/20 hover:bg-silver/30 border border-silver rounded-lg text-silver font-bold transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Previous
                  </motion.button>
                )}
                
                {activePhase < questPhases.length - 1 && (
                  <motion.button
                    onClick={nextPhase}
                    className={`px-6 py-3 bg-${questPhases[activePhase].color}/20 hover:bg-${questPhases[activePhase].color}/30 border border-${questPhases[activePhase].color} rounded-lg text-${questPhases[activePhase].color} font-bold transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next →
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Simple progress dots */}
        <motion.div
          className="mt-12 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {questPhases.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePhaseClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activePhase === index
                  ? 'bg-ancient-gold shadow-lg shadow-ancient-gold/50'
                  : 'bg-silver/30 hover:bg-silver/50'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}