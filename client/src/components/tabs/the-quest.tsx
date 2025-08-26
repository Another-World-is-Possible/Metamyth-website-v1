import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

const questHorizons = [
  {
    id: 1,
    title: "THE CALLING",
    subtitle: "Building the Foundation Community", 
    color: "ancient-gold",
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

export default function TheQuest() {
  const { isImageReady, getImageSrc } = useImageLoading();
  const [showBackground, setShowBackground] = useState(false);
  const imageReady = isImageReady('quest');
  const questBackground = getImageSrc('quest');

  useEffect(() => {
    // Always fade in when navigating to tab, even if already loaded
    setShowBackground(false);
    const timer = setTimeout(() => {
      if (imageReady) {
        setShowBackground(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [imageReady]);

  // Wait for image to be ready before showing tab
  if (!imageReady) {
    return (
      <div className="relative min-h-screen py-20 pt-32 flex items-center justify-center" style={{ backgroundColor: 'hsl(120, 80%, 2%)' }}>
        <div className="text-ancient-gold font-angle">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-20 pt-32">
      {/* Background image with filter - fade in on navigate */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
          showBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${questBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.95) contrast(1.0)'
        }}
      />
      
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-deep-black/5" />
      
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          className="typography-h1 text-gradient-gold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE QUEST
        </motion.h1>
        
        <motion.div
          className="text-center typography-body mb-16 max-w-4xl mx-auto text-cream-white text-glow-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="typography-h2 text-ancient-gold font-bold mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 0, 0, 0.5)' }}>
            We are on a journey to change the human story and transform along the way.
          </h2>
          <p className="typography-lead text-cream-white text-glow-gold leading-relaxed">
            Our quest is to shift humanity from extraction to regeneration through the power of authentic story. We've built<br />
            a full end-to-beginning story system that helps organizations discover their cosmic purpose, evolve through each chapter of transformation, and write the new world into existence.
            <br /><br />
            This is how we change the human story—one authentic narrative at a time.
          </p>
        </motion.div>

        {/* Three Horizons */}
        <div className="space-y-8">
          {questHorizons.map((horizon, index) => (
            <motion.div
              key={horizon.id}
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0.3, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 p-8 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
                <motion.div
                  initial={{ y: 20, opacity: 0.5 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 border-2 ${horizon.color === 'crimson' ? 'bg-crimson/20 border-crimson' : horizon.color === 'mystical-teal' ? 'bg-mystical-teal/20 border-mystical-teal' : horizon.color === 'ancient-gold' ? 'bg-ancient-gold/20 border-ancient-gold' : 'bg-white/20 border-white'}`}>
                      <span className={`font-bold text-xl ${horizon.color === 'crimson' ? 'text-crimson' : horizon.color === 'mystical-teal' ? 'text-mystical-teal' : horizon.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}>
                        {horizon.id}
                      </span>
                    </div>
                    <div>
                      <h3 
                        className="font-angle text-2xl md:text-3xl font-bold mb-2"
                        style={{ color: 'hsl(45, 25%, 92%)', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                      >
                        {horizon.title}
                      </h3>
                      <h4 className="font-game text-lg italic" style={{ color: 'hsl(45, 25%, 92%)', textShadow: '0 0 8px rgba(212, 175, 55, 0.6), 0 0 12px rgba(212, 175, 55, 0.3), 2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {horizon.subtitle}
                      </h4>
                    </div>
                  </div>
                  
                  <p 
                    className="font-game text-lg leading-loose mb-6"
                    style={{ color: 'hsl(45, 25%, 92%)', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {horizon.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className={`typography-body font-bold mb-4 ${horizon.color === 'crimson' ? 'text-crimson' : horizon.color === 'mystical-teal' ? 'text-mystical-teal' : horizon.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}>
                        OBJECTIVES
                      </h5>
                      <ul className="space-y-3">
                        {horizon.items.map((item, itemIndex) => (
                          <motion.li 
                            key={itemIndex} 
                            className="flex items-start font-game"
                            style={{ color: 'hsl(45, 25%, 92%)', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.3 + itemIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <span className={`text-${horizon.color} mr-3 mt-1`}>•</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className={`typography-body font-bold mb-4 ${horizon.color === 'crimson' ? 'text-crimson' : horizon.color === 'mystical-teal' ? 'text-mystical-teal' : horizon.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}>
                        STATUS
                      </h5>
                      <p 
                        className={`typography-body italic ${horizon.color === 'crimson' ? 'text-crimson' : horizon.color === 'mystical-teal' ? 'text-mystical-teal' : horizon.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}
                        style={{
                          textShadow: '0 0 2px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        {horizon.status}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

