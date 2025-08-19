import { motion } from "framer-motion";
import { useState } from "react";

const questPhases = [
  {
    id: 1,
    title: "FOUNDATION",
    subtitle: "Building the Story Technologies",
    color: "ancient-gold",
    position: { x: 15, y: 80 }, // Start low left
    items: [
      "Developing MythOS operating system",
      "Creating MetaMyth AI architecture", 
      "Establishing core story infrastructure",
      "Testing complete metamyth process"
    ],
    status: "Current Trial: Launching the story technologies"
  },
  {
    id: 2,
    title: "THE ADVENTURE SPREADS",
    subtitle: "Creating the Platform of Stories",
    color: "mystical-teal",
    position: { x: 50, y: 40 }, // Middle peak
    items: [
      "Building platform showcasing the world's best stories",
      "Weaving them together into cooperative federation",
      "Creating synergistic regenerative economic system", 
      "Establishing virtuous cycle of story-based economics"
    ],
    status: "Victory: Demonstrating regenerative economics at scale"
  },
  {
    id: 3,
    title: "PLANETARY HORIZON",
    subtitle: "The New Story Becomes Undeniable",
    color: "crimson",
    position: { x: 85, y: 20 }, // High right peak
    items: [
      "Stories we showcase become obvious superior option",
      "MetaMyth system interactive and playable worldwide",
      "People find their quests and federate together",
      "Global movements emerging from story-based collaboration"
    ],
    status: "Ultimate Vision: Species connected through story-based collaboration"
  }
];

// Mountain SVG Component
function MountainPath() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      {/* Mountain silhouette */}
      <path
        d="M0,90 L15,80 L25,70 L35,60 L45,45 L55,35 L65,45 L75,30 L85,20 L95,25 L100,30 L100,100 L0,100 Z"
        fill="url(#mountainGradient)"
        opacity="0.3"
      />
      
      {/* Golden quest arc */}
      <path
        d="M15,80 Q30,65 50,40 Q70,25 85,20"
        stroke="url(#arcGradient)"
        strokeWidth="0.5"
        fill="none"
        className="drop-shadow-lg"
      />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d2520" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4fd1c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dc143c" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Glowing quest marker component
function QuestMarker({ phase, isActive, isRevealed, onClick }: { 
  phase: typeof questPhases[0], 
  isActive: boolean, 
  isRevealed: boolean,
  onClick: () => void 
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: `${phase.position.x}%`, 
        top: `${phase.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isRevealed ? 1 : 0.3, 
        opacity: isRevealed ? 1 : 0.3 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={onClick}
    >
      <motion.div
        className={`relative w-8 h-8 rounded-full border-2 ${
          isActive 
            ? `border-${phase.color} bg-${phase.color}/30` 
            : `border-${phase.color}/60 bg-${phase.color}/10`
        }`}
        animate={{
          boxShadow: isActive 
            ? [`0 0 10px var(--${phase.color})`, `0 0 20px var(--${phase.color})`, `0 0 10px var(--${phase.color})`]
            : `0 0 5px var(--${phase.color})`
        }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      >
        <div className={`absolute inset-1 rounded-full bg-${phase.color} opacity-70`} />
      </motion.div>
      
      {/* Phase label */}
      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center min-w-max"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`text-${phase.color} font-edensor font-bold text-sm`}>
          {phase.title}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TheQuest() {
  const [activePhase, setActivePhase] = useState(0);
  const [revealedPhases, setRevealedPhases] = useState([0]); // Start with first phase revealed

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
    // Reveal this phase and all previous phases
    setRevealedPhases(prev => {
      const newRevealed = Array.from(new Set([...prev, index])).sort();
      return newRevealed;
    });
  };

  const advanceQuest = () => {
    const nextPhase = Math.min(activePhase + 1, questPhases.length - 1);
    if (nextPhase !== activePhase) {
      setActivePhase(nextPhase);
      setRevealedPhases(prev => [...prev, nextPhase]);
    }
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
            We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real. Your story becomes the foundation for everything that follows.
          </p>
        </motion.div>

        {/* Interactive Mountain Quest Timeline */}
        <motion.div
          className="relative h-96 w-full mb-16 overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MountainPath />
          
          {/* Quest markers */}
          {questPhases.map((phase, index) => (
            <QuestMarker
              key={phase.id}
              phase={phase}
              isActive={activePhase === index}
              isRevealed={revealedPhases.includes(index)}
              onClick={() => handlePhaseClick(index)}
            />
          ))}
          
          {/* Glowing traveler */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-ancient-gold shadow-lg"
            style={{
              left: `${questPhases[activePhase].position.x}%`,
              top: `${questPhases[activePhase].position.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px #d4af37'
            }}
            animate={{
              left: `${questPhases[activePhase].position.x}%`,
              top: `${questPhases[activePhase].position.y}%`,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
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
            <p className="text-silver/90 text-lg mb-6 text-center italic">
              {questPhases[activePhase].subtitle}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`font-bold text-${questPhases[activePhase].color} mb-4 text-lg`}>Quest Objectives:</h4>
                <ul className="space-y-3">
                  {questPhases[activePhase].items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex} 
                      className="flex items-start text-silver"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                    >
                      <span className={`text-${questPhases[activePhase].color} mr-3 text-lg`}>⟐</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className={`font-bold text-${questPhases[activePhase].color} mb-4 text-lg`}>Vision:</h4>
                <div className={`p-4 bg-${questPhases[activePhase].color}/5 rounded border-l-4 border-${questPhases[activePhase].color}`}>
                  <p className="text-silver italic">
                    {questPhases[activePhase].status}
                  </p>
                </div>
                
                {activePhase < questPhases.length - 1 && (
                  <motion.button
                    onClick={advanceQuest}
                    className={`mt-6 px-6 py-3 bg-${questPhases[activePhase].color}/20 hover:bg-${questPhases[activePhase].color}/30 border border-${questPhases[activePhase].color} rounded-lg text-${questPhases[activePhase].color} font-bold transition-all duration-300 hover-glow`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Advance to Next Horizon →
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex space-x-2">
            {questPhases.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  revealedPhases.includes(index)
                    ? 'bg-ancient-gold shadow-lg shadow-ancient-gold/50'
                    : 'bg-silver/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}