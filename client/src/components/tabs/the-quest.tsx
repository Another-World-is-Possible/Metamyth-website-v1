import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Direct image path
const horizontalLandscape = "/attached_assets/krea-edit(1)_1755989239486.png";

const questHorizons = [
  {
    id: 1,
    title: "HORIZON 1: DISCOVER",
    subtitle: "What Is Already Dying",
    description: "We identify the extractive patterns and limiting stories that no longer serve your organization's evolution.",
    color: "crimson",
    details: [
      "Map current narrative landscape",
      "Identify extraction patterns", 
      "Discover authentic purpose",
      "Clarify transformation readiness"
    ]
  },
  {
    id: 2,
    title: "HORIZON 2: TRANSFORM", 
    subtitle: "What Is Emerging",
    description: "We architect regenerative systems and stories that align with your cosmic purpose and planetary healing.",
    color: "mystical-teal",
    details: [
      "Design regenerative business model",
      "Develop authentic narrative system",
      "Build community magnetism",
      "Create transformation infrastructure"
    ]
  },
  {
    id: 3,
    title: "HORIZON 3: EMBODY",
    subtitle: "What We Are Creating",
    description: "We implement the new story as living practice, becoming the change we wish to see in the world.",
    color: "ancient-gold",
    details: [
      "Launch regenerative operations",
      "Activate community networks", 
      "Measure transformation impact",
      "Scale authentic influence"
    ]
  }
];

export default function TheQuest() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.onload = () => setBackgroundLoaded(true);
    img.src = horizontalLandscape;

    // Track scroll position
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate horizontal movement based on scroll
  const horizontalOffset = Math.min(scrollY * 0.1, 70); // Move horizontally as user scrolls

  return (
    <div className="relative min-h-screen" style={{ minHeight: '300vh' }}>
      {/* TEST: Simple color background that moves */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(90deg, #ff0000 0%, #00ff00 ${horizontalOffset}%, #0000ff 100%)`,
          transition: 'all 0.1s ease-out'
        }}
      />
      
      {/* Real landscape background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${horizontalLandscape})`,
          backgroundSize: '200% 100%',
          backgroundPosition: `${horizontalOffset}% center`,
          backgroundRepeat: 'no-repeat',
          opacity: backgroundLoaded ? 0.8 : 0,
          transition: 'opacity 500ms ease-out'
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="fixed inset-0 bg-deep-black/30 z-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 py-20 pt-32">
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-6">
                    <h3 className={`font-edensor text-2xl md:text-3xl font-bold text-${horizon.color} mb-2`}>
                      {horizon.title}
                    </h3>
                    <h4 className="font-alice text-xl text-ancient-gold italic">
                      {horizon.subtitle}
                    </h4>
                  </div>
                  
                  <p className="font-alice text-lg text-center mb-6 text-silver max-w-3xl mx-auto">
                    {horizon.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {horizon.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (detailIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-${horizon.color}`} />
                        <span className="font-alice text-silver">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-alice text-xl text-ancient-gold mb-6">
            Ready to begin your transformation?
          </p>
          <Card className="bg-deep-black/80 mystical-border max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p className="font-alice text-silver leading-relaxed">
                Every regenerative future begins with an authentic story. Let's discover yours.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}