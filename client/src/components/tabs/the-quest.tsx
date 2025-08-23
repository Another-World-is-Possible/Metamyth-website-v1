import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import horizontalLandscape from "@assets/krea-edit(1)_1755989239486.png";

const questHorizons = [
  {
    id: 1,
    title: "HORIZON 1: THE FOUNDATION",
    subtitle: "1-3 Years: Building the Movement", 
    color: "ancient-gold",
    timeframe: "1-3 Years",
    landscape: "Wasteland to Early Restoration",
    items: [
      "Guiding organizations through the Metamyth methodology",
      "Developing MythOS operating system and MetaMyth AI architecture", 
      "Building core community of visionary leaders and regenerative enterprises",
      "Establishing story transformation infrastructure and complete metamyth process"
    ],
    status: "Current Mission: Growing the community of the future through authentic story work",
    description: "From the wasteland of extractive capitalism, we begin the restoration. We guide organizations through the Metamyth methodology, transforming their authentic stories into powerful foundations for regenerative change. Growing a community of visionaries ready to create the future."
  },
  {
    id: 2,
    title: "HORIZON 2: THE SCALING", 
    subtitle: "3-7 Years: Movement Acceleration",
    color: "mystical-teal",
    timeframe: "3-7 Years",
    landscape: "Active Restoration and Growth",
    items: [
      "Expanding methodology globally through community network",
      "Each guided organization becomes beacon inspiring others",
      "Creating synergistic regenerative economic system through authentic stories", 
      "Establishing virtuous cycle of story-based transformation spreading organically"
    ],
    status: "Victory: Demonstrating that authentic story work creates unstoppable regenerative momentum",
    description: "In the heart of the transformation landscape, we scale the methodology globally. Each organization we guide becomes a beacon, inspiring others to discover their authentic purpose and join the movement toward planetary healing."
  },
  {
    id: 3,
    title: "HORIZON 3: THE VISION",
    subtitle: "7-20 Years: Regenerative Civilization",
    color: "crimson",
    timeframe: "7-20 Years", 
    landscape: "Fully Regenerated Biophilic Future",
    items: [
      "Thriving global network of purpose-driven organizations connected through story",
      "Metamyth methodology becomes recognized planetary healing technology",
      "AI and MythOS emerge naturally to support community-led transformation",
      "Species-wide collaboration emerging from authentic story-based federation"
    ],
    status: "Ultimate Vision: Planetary transformation through authentic story becoming the new operating system",
    description: "In the gleaming towers of regenerative civilization, a thriving global network of purpose-driven organizations flourishes, all connected through authentic story and regenerative mission. AI and MythOS emerge naturally to support this community-led transformation."
  }
];

export default function TheQuest() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHorizon, setActiveHorizon] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const horizonRefs = [useRef(null), useRef(null), useRef(null)];

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

    // Intersection observers for horizon content
    const observers = horizonRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHorizon(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px' }
      );
      
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Calculate horizontal background position (left to right as user scrolls down)
  const horizontalOffset = scrollProgress * 100; // 0% to 100% horizontal movement

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '400vh' }}>
      {/* Black background base */}
      <div className="absolute inset-0 bg-deep-black z-0" />
      
      {/* Horizontal scrolling landscape background */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-out z-0 ${
          backgroundLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${horizontalLandscape})`,
          backgroundSize: 'auto 100%', // Make sure height fills viewport, width scales accordingly
          backgroundPosition: `${horizontalOffset}% center`, // Move horizontally based on scroll
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 bg-deep-black/70 z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/50 to-deep-black/80 z-10" />

      {/* Opening Section */}
      <section className="min-h-screen flex items-center justify-center relative z-20 pt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            THE QUEST
          </motion.h2>
          
          <motion.div
            className="text-center text-xl mb-8 max-w-4xl mx-auto"
            style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-alice text-2xl italic text-ancient-gold mb-6">
              "We are on a journey to change the human story and transform along the way."
            </p>
            <p className="font-alice text-lg leading-loose">
              The quest is to shift humanity from extraction to regeneration through the power of authentic story. Watch the landscape transform as we journey through three horizons of planetary healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Horizon Sections */}
      {questHorizons.map((horizon, index) => (
        <section
          key={horizon.id}
          ref={horizonRefs[index]}
          className="min-h-screen flex items-center justify-center relative z-20 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-deep-black/80 border-2 border-ancient-gold/60 shadow-lg shadow-ancient-gold/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${horizon.color}/20 border-2 border-${horizon.color} mb-4`}>
                    <span className={`text-${horizon.color} font-bold text-2xl`}>
                      {horizon.id}
                    </span>
                  </div>
                  <h3 
                    className="font-edensor text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {horizon.title}
                  </h3>
                  <h4 className="font-alice text-lg italic" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.6), 0 0 12px rgba(212, 175, 55, 0.3), 2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {horizon.subtitle}
                  </h4>
                  <p className={`font-alice text-sm text-${horizon.color} mb-4`}>
                    {horizon.timeframe} • {horizon.landscape}
                  </p>
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
              </CardContent>
            </Card>
          </motion.div>
        </section>
      ))}
    </div>
  );
}

