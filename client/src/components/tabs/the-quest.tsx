import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import horizontalLandscape from "@assets/krea-edit(1)_1755989239486.png";

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
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fast image preloading
    const fallbackTimer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 300);
    
    const img = new Image();
    img.onload = () => {
      clearTimeout(fallbackTimer);
      setBackgroundLoaded(true);
    };
    img.onerror = () => {
      clearTimeout(fallbackTimer);
      setBackgroundLoaded(true);
    };
    img.src = horizontalLandscape;

    // Scroll tracking for horizontal movement
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const startScroll = containerTop - windowHeight;
      const endScroll = containerTop + containerHeight;
      const scrollDistance = endScroll - startScroll;
      
      if (scrollTop >= startScroll && scrollTop <= endScroll) {
        const progress = Math.max(0, Math.min(1, (scrollTop - startScroll) / scrollDistance));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate horizontal background position (left to right as user scrolls down)
  const horizontalOffset = scrollProgress * 100; // 0% to 100% horizontal movement

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-deep-black via-forest-green/30 to-deep-black min-h-screen py-20 pt-32" style={{ minHeight: '400vh' }}>
      {/* Horizontal scrolling landscape background */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-out z-0 ${
          backgroundLoaded ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${horizontalLandscape})`,
          backgroundSize: 'auto 100%', // Make sure height fills viewport, width scales accordingly
          backgroundPosition: `${horizontalOffset}% center`, // Move horizontally based on scroll
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 bg-deep-black/40 z-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE QUEST
        </motion.h2>
        
        <motion.div
          className="text-center text-xl mb-16 max-w-4xl mx-auto"
          style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-alice text-2xl italic text-ancient-gold mb-6">
            "We are on a journey to change the human story and transform along the way."
          </p>
          <p className="font-alice text-lg leading-loose">
            The quest is to shift humanity from extraction to regeneration through the power of authentic story. We've built a full end-to-beginning story system that helps organizations discover their cosmic purpose, evolve through each chapter of transformation, and write the new world into existence. This is how we change the human story—one authentic narrative at a time.
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
              <div className="bg-deep-black/70 mystical-border p-8 backdrop-blur-sm">
                <motion.div
                  initial={{ y: 20, opacity: 0.5 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${horizon.color}/20 border-2 border-${horizon.color} flex items-center justify-center mr-6`}>
                      <span className={`text-${horizon.color} font-bold text-xl`}>
                        {horizon.id}
                      </span>
                    </div>
                    <div>
                      <h3 
                        className="font-edensor text-2xl md:text-3xl font-bold mb-2"
                        style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                      >
                        {horizon.title}
                      </h3>
                      <h4 className="font-alice text-lg italic" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.6), 0 0 12px rgba(212, 175, 55, 0.3), 2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {horizon.subtitle}
                      </h4>
                    </div>
                  </div>
                  
                  <p 
                    className="font-alice text-lg leading-loose mb-6"
                    style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {horizon.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className={`font-edensor text-lg font-bold text-${horizon.color} mb-4`}>
                        OBJECTIVES
                      </h5>
                      <ul className="space-y-3">
                        {horizon.items.map((item, itemIndex) => (
                          <motion.li 
                            key={itemIndex} 
                            className="flex items-start font-alice"
                            style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
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
                      <h5 className={`font-edensor text-lg font-bold text-${horizon.color} mb-4`}>
                        STATUS
                      </h5>
                      <p 
                        className={`font-alice text-${horizon.color} italic`}
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
  );
}

