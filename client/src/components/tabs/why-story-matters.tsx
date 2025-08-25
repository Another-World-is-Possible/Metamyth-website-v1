import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Dna, Network, Building, RotateCcw } from "lucide-react";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

const audienceTypes = [
  {
    title: "Conscious founders",
    description: "with planetary solutions, struggling to break through noise and reach aligned resources"
  },
  {
    title: "Regenerative enterprises", 
    description: "watching inferior products dominate markets through superior storytelling"
  },
  {
    title: "Purpose-driven leaders",
    description: "ready to collaborate toward planetary healing instead of competing on features"
  },
  {
    title: "Visionary organizations",
    description: "prepared to author regenerative reality instead of suffering extraction stories"
  }
];

const transformations = [
  {
    from: "Scattered messaging",
    to: "narrative authority",
    description: "positioning you in planetary collaboration"
  },
  {
    from: "Desperate outreach",
    to: "authentic magnetism",
    description: "attracting aligned resources through genuine transformation"
  },
  {
    from: "Confused priorities",
    to: "purpose clarity", 
    description: "aligning every decision with deeper mission"
  },
  {
    from: "Isolated efforts",
    to: "movement momentum",
    description: "where customers become communities"
  }
];

const thriveRequirements = [
  "align with authentic purpose",
  "create value through regeneration", 
  "build communities",
  "tell stories that serve life"
];

const scienceConcepts = [
  {
    icon: Dna,
    title: "MYTHOGENETIC PROGRAMMING",
    description: "Like genes responding to environmental signals, consciousness responds to story signals. The narratives we believe literally program which futures we create.",
    color: "crimson"
  },
  {
    icon: Network,
    title: "COLLECTIVE INTELLIGENCE",
    description: "When compatible stories federate, they generate solutions no individual narrative could produce—emergence applied to planetary healing.",
    color: "mystical-teal"
  },
  {
    icon: Building,
    title: "REALITY ARCHITECTURE", 
    description: "Every institution, system, and cultural form exists as crystallized narrative. Change the story, change the system.",
    color: "ancient-gold"
  },
  {
    icon: RotateCcw,
    title: "REGENERATIVE ECONOMICS",
    description: "Purpose-driven organizations consistently outperform profit-focused entities because story creates value, not just captures it.",
    color: "silver"
  }
];

// Constellation Navigation Component
function ConstellationNav({ activeSection }: { activeSection: number }) {
  const sections = ['opening', 'stakes', 'heroes', 'transformation', 'science', 'choice'];
  
  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <ol className="flex flex-col gap-6">
        {sections.map((section, index) => (
          <li key={section} className="relative">
            <div 
              className={`w-3 h-3 rounded-full border border-ancient-gold/50 transition-all duration-800 cursor-pointer ${
                index <= activeSection 
                  ? 'bg-gradient-to-br from-ancient-gold to-mystical-teal shadow-lg shadow-ancient-gold/60 scale-120' 
                  : 'bg-ancient-gold/30'
              }`}
              onClick={() => {
                const element = document.querySelector(`[data-section="${section}"]`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <span className="sr-only">{section}</span>
            </div>
            {index <= activeSection && index < sections.length - 1 && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-ancient-gold via-ancient-gold/50 to-transparent opacity-100 transition-opacity duration-800"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface WhyStoryMattersProps {
  setActiveTab?: (tab: string) => void;
}

export default function WhyStoryMatters({ setActiveTab }: WhyStoryMattersProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { isImageReady, getImageSrc } = useImageLoading();
  const [showBackground, setShowBackground] = useState(false);
  const imageReady = isImageReady('whyStory');
  const cosmicDragon = getImageSrc('whyStory');
  
  const sectionRefs = [
    useRef(null),
    useRef(null), 
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    // Always fade in when navigating to tab, even if already loaded
    setShowBackground(false);
    const timer = setTimeout(() => {
      if (imageReady) {
        setShowBackground(true);
      }
    }, 100);

    const cleanup = () => clearTimeout(timer);

    const observers = sectionRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px' }
      );
      
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => {
      cleanup();
      observers.forEach(observer => observer.disconnect());
    };
  }, [imageReady]);

  // Wait for image to be ready before showing tab
  if (!imageReady) {
    return (
      <div className="relative flex items-center justify-center" style={{ minHeight: '100vh', backgroundColor: 'hsl(120, 80%, 2%)' }}>
        <div className="text-ancient-gold font-angle text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ minHeight: '500vh' }}>
      {/* Black background base */}
      <div className="absolute inset-0 bg-deep-black z-0" />
      
      {/* Fade-in background image - fade in on navigate */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-1000 ease-out ${
          showBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${cosmicDragon})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7) contrast(1.0)'
        }}
      />
      {/* Much lighter overlay to see the cosmic dragon clearly */}
      <div className="absolute inset-0 bg-deep-black/25 z-0" />
      <ConstellationNav activeSection={activeSection} />
      
      {/* Opening Transmission */}
      <section 
        ref={sectionRefs[0]}
        data-section="opening" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="font-angle text-4xl md:text-6xl font-bold mb-6"
            style={{
              color: '#000000',
              textShadow: '0 0 8px rgba(212, 175, 55, 0.9), 0 0 16px rgba(212, 175, 55, 0.7), 0 0 24px rgba(212, 175, 55, 0.5)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            WHY TELL STORIES ON A BURNING PLANET?
          </motion.h1>
          
          <motion.p 
            className="font-game text-xl md:text-2xl mb-4"
            style={{ 
              color: '#f0f0f0', 
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' 
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          >
            While the world burns...
          </motion.p>
          
          <motion.p 
            className="font-game text-lg md:text-xl mb-6"
            style={{ 
              color: '#f0f0f0', 
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' 
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
          >
            ...most organizations waste their voice on meaningless metrics instead of meaningful transformation.
          </motion.p>
          
          <motion.p 
            className="font-angle text-xl md:text-3xl font-bold text-ancient-gold"
            style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          >
            If we aren't writing our own story,<br/>someone else is writing for us.
          </motion.p>
        </div>
      </section>

      {/* The Stakes Illuminate */}
      <section 
        ref={sectionRefs[1]}
        data-section="stakes"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <p className="font-game text-2xl md:text-3xl mb-8 leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            The same consciousness that authored every system destroying our planet can author every system that could heal it.
          </p>
          
          <div className="border-l-3 border-ancient-gold pl-6 mb-8">
            <p className="font-game text-xl md:text-2xl mb-4" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
              Story built civilization. Story can rebuild it.
            </p>
          </div>
          
          <p className="font-angle text-2xl md:text-3xl font-bold text-ancient-gold" style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            Whoever tells the best story wins.
          </p>
        </motion.div>
      </section>

      {/* The Heroes Step Forward */}
      <section 
        ref={sectionRefs[2]}
        data-section="heroes"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-4xl mx-auto relative z-20">
          <motion.p 
            className="font-khaft text-xl md:text-2xl text-center mb-8"
            style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            You feel the urgency but lack the story technology<br/>to create the response you need.
          </motion.p>
          
          {/* Opaque frame for bulleted section */}
          <div className="max-w-4xl mx-auto bg-deep-black/40 backdrop-blur-sm border-2 border-[#81ecec]/60 rounded-lg p-6 shadow-lg shadow-[#81ecec]/30 ring-1 ring-[#81ecec]/20 bg-gradient-to-br from-deep-black/50 via-deep-black/40 to-[#81ecec]/5">
            <div className="grid gap-6 max-w-3xl mx-auto">
            {audienceTypes.map((audience, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
              >
                <div className="w-2 h-2 bg-ancient-gold rounded-full mt-3 flex-shrink-0"></div>
                <div className="relative">
                  <span className="font-bold text-ancient-gold text-xl">{audience.title}</span>
                  <br />
                  <span className="text-silver/90 text-lg leading-relaxed">{audience.description}</span>
                  <div className="absolute -right-12 top-1/2 w-8 h-px bg-gradient-to-r from-ancient-gold/50 to-transparent"></div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
          
          {/* Metamyth Divider */}
          <motion.div 
            className="flex justify-center my-8 relative z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-4xl" style={{ textShadow: '0 0 12px rgba(129, 236, 236, 0.8)' }}>🐉</div>
          </motion.div>
        </div>
      </section>

      {/* Transition Section - "If you believe" */}
      <section className="flex items-center justify-center px-4 py-20 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h2 
            className="font-angle text-4xl md:text-6xl font-bold text-ancient-gold leading-tight"
            style={{ 
              textShadow: '0 0 12px rgba(212, 175, 55, 0.9), 0 0 24px rgba(212, 175, 55, 0.6), 2px 2px 6px rgba(0,0,0,0.9)' 
            }}
          >
            If you believe another world is possible but struggle to make others see it—<br/>
            <span className="text-mystical-teal">this work makes the impossible inevitable.</span>
          </h2>
        </motion.div>
      </section>

      {/* Metamyth Divider */}
      <section className="flex justify-center py-16 relative z-20">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>🌀</div>
        </motion.div>
      </section>

      {/* The Transformation Reveals */}
      <section 
        ref={sectionRefs[3]}
        data-section="transformation"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-5xl mx-auto relative z-20">
          {/* Opaque frame for transformation section */}
          <div className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 rounded-lg p-8 shadow-lg shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10">
            <motion.h2 
              className="font-angle text-4xl md:text-5xl font-bold text-ancient-gold text-center mb-12"
              style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              When story serves life, everything changes:
            </motion.h2>
            
            <div className="space-y-8">
            {transformations.map((transform, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              >
                <span className="text-silver text-xl flex-shrink-0 min-w-0" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {transform.from}
                </span>
                
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.3 + 0.5, ease: "easeOut" }}
                >
                  <div className="w-8 h-px bg-gradient-to-r from-ancient-gold to-mystical-teal"></div>
                  <span className="text-ancient-gold">→</span>
                  <div className="w-8 h-px bg-gradient-to-r from-mystical-teal to-ancient-gold"></div>
                </motion.div>
                
                <div className="flex-shrink-0 min-w-0">
                  <span className="font-bold text-ancient-gold text-xl" style={{ textShadow: '0 0 8px currentColor, 2px 2px 4px rgba(0,0,0,0.8)' }}>{transform.to}</span>
                  <br />
                  <span className="text-silver text-base" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{transform.description}</span>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metamyth Divider */}
      <section className="flex justify-center py-16 relative z-20">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>⚡</div>
        </motion.div>
      </section>

      {/* The Science Unveils Itself */}
      <section 
        ref={sectionRefs[4]}
        data-section="science"
        className="min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="max-w-4xl mx-auto relative z-20">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-angle text-2xl md:text-3xl font-bold text-ancient-gold mb-3" style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
              The Science Behind Story as Evolutionary Technology
            </h2>
            <p className="font-khaft text-base" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
              How consciousness actually works:
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {scienceConcepts.map((concept, index) => {
              const IconComponent = concept.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 h-full hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
                    <CardContent className="p-3 text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${concept.color}/20 flex items-center justify-center border border-${concept.color}/30`}>
                        <IconComponent className={`w-6 h-6 text-${concept.color}`} />
                      </div>
                      <h3 className={`font-edensor text-sm font-bold text-${concept.color} mb-2 tracking-wider`} style={{ textShadow: '0 0 8px currentColor, 2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {concept.title}
                      </h3>
                      <p className="text-silver text-sm leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        {concept.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metamyth Divider */}
      <section className="flex justify-center py-16 relative z-20">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>🌟</div>
        </motion.div>
      </section>

      {/* The Moment of Choice */}
      <section 
        ref={sectionRefs[5]}
        data-section="choice"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.0 }}
        >
          <p className="font-game text-2xl md:text-3xl mb-8 leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            Every thread of human experience is converging now—this generation writes the story that determines Earth's future.
          </p>
          
          <div 
            className="text-xl md:text-2xl font-bold mb-8"
            style={{ 
              background: 'linear-gradient(45deg, #d4af37, #e6f3ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Organizations that thrive {thriveRequirements.map((req, index) => (
              <span key={index}>
                {req}{index < thriveRequirements.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
          
          <p 
            className="font-angle text-2xl md:text-3xl font-bold text-ancient-gold"
            style={{ 
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            The choice is simple: Author the world your heart knows is possible.
          </p>
        </motion.div>
      </section>

      {/* Metamyth Divider */}
      <section className="flex justify-center py-16 relative z-20">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>🏆</div>
        </motion.div>
      </section>

      {/* The Call to Adventure */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <h2 
            className="font-angle text-3xl md:text-4xl font-bold text-ancient-gold mb-4"
            style={{ 
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Ready to transform scattered narrative into coherent planetary force?
          </h2>
          
          <p className="font-game text-xl mb-12 font-bold" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            Using humanity's oldest technology to serve humanity's greatest need.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Button 
              onClick={() => setActiveTab?.('questionaire')}
              className="bg-gradient-to-r from-ancient-gold to-mystical-teal text-deep-black hover:from-ancient-gold/80 hover:to-mystical-teal/80 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1 cursor-pointer"
              style={{ 
                border: '2px solid transparent',
                backgroundClip: 'padding-box'
              }}
            >
              DISCOVER YOUR METAMYTH
            </Button>
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 0 rgba(212, 175, 55, 0.4)',
                  '0 0 20px rgba(212, 175, 55, 0.6)',
                  '0 0 0 rgba(212, 175, 55, 0.4)'
                ]
              }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            >
              <Button 
                onClick={() => setActiveTab?.('questionaire')}
                className="bg-mystical-teal text-deep-black hover:bg-mystical-teal/80 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1 cursor-pointer"
              >
                JOIN THE QUEST
              </Button>
            </motion.div>
          </div>
          
          <p className="font-game italic mt-8 text-sm" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
            Limited availability for organizations ready to serve the story.
          </p>
        </motion.div>
      </section>
    </div>
  );
}