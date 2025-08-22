import { motion } from "framer-motion";
import { useState } from "react";

const questPhases = [
  {
    id: 1,
    title: "THE CALLING",
    subtitle: "Building the Foundation Community", 
    color: "ancient-gold",
    position: { x: 20, y: 75 },
    items: [
      "Guiding organizations through the Metamyth methodology",
      "Developing MythOS operating system and MetaMyth AI architecture", 
      "Building core community of visionary leaders and regenerative enterprises",
      "Establishing story transformation infrastructure and complete metamyth process"
    ],
    status: "Current Mission: Growing the community of the future through authentic story work",
    description: "We guide organizations through the Metamyth methodology, transforming their authentic stories into powerful foundations for regenerative change. Growing a community of visionaries ready to create the future."
  },
  {
    id: 2,
    title: "THE JOURNEY", 
    subtitle: "Scaling the Story Revolution",
    color: "mystical-teal",
    position: { x: 50, y: 45 },
    items: [
      "Expanding methodology globally through community network",
      "Each guided organization becomes beacon inspiring others",
      "Creating synergistic regenerative economic system through authentic stories", 
      "Establishing virtuous cycle of story-based transformation spreading organically"
    ],
    status: "Victory: Demonstrating that authentic story work creates unstoppable regenerative momentum",
    description: "As our community grows, we scale the methodology globally. Each organization we guide becomes a beacon, inspiring others to discover their authentic purpose and join the movement toward planetary healing."
  },
  {
    id: 3,
    title: "THE VISION",
    subtitle: "Global Network of Authentic Purpose",
    color: "crimson",
    position: { x: 80, y: 25 },
    items: [
      "Thriving global network of purpose-driven organizations connected through story",
      "Metamyth methodology becomes recognized planetary healing technology",
      "AI and MythOS emerge naturally to support community-led transformation",
      "Species-wide collaboration emerging from authentic story-based federation"
    ],
    status: "Ultimate Vision: Planetary transformation through authentic story becoming the new operating system",
    description: "A thriving global network of purpose-driven organizations, all connected through authentic story and regenerative mission. AI and MythOS emerge naturally to support this community-led transformation."
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
      {/* Simple mountain silhouettes */}
      <path
        d="M0,85 L20,75 L35,80 L100,90 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.2)"
      />
      <path
        d="M0,70 L45,45 L60,50 L100,75 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.15)"
      />
      <path
        d="M0,55 L75,25 L90,30 L100,60 L100,100 L0,100 Z"
        fill="rgba(45, 37, 32, 0.1)"
      />
      
      {/* Clean golden arc */}
      <path
        d="M20,75 Q50,50 80,25"
        stroke="#d4af37"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />
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
                      <span className="font-alice">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className={`font-bold text-${questPhases[activePhase].color} mb-4 text-lg`}>Vision:</h4>
                <div className={`p-4 bg-${questPhases[activePhase].color}/5 rounded border-l-4 border-${questPhases[activePhase].color}`}>
                  <p className="text-silver italic font-alice">
                    {questPhases[activePhase].status}
                  </p>
                </div>
                
                <div className="flex justify-center gap-4 mt-6">
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
                      Next Horizon →
                    </motion.button>
                  )}
                </div>
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