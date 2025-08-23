import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Dna, Network, Building, RotateCcw } from "lucide-react";

import cosmicDragon from "@assets/_oft0al5633cuwxb5dpy6_0_1755922660417.png";

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

export default function WhyStoryMatters() {
  const [activeSection, setActiveSection] = useState(0);
  
  const sectionRefs = [
    useRef(null),
    useRef(null), 
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
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

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div 
      className="relative"
      style={{
        minHeight: '600vh', // Extra tall page for full dragon journey
        backgroundImage: `url(${cosmicDragon})`,
        backgroundSize: 'auto 100%', // Show full image height, let width scale proportionally
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
        // REMOVED backgroundAttachment: 'fixed' - now background scrolls WITH content
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-deep-black/60" />
      <ConstellationNav activeSection={activeSection} />
      
      {/* Opening Transmission */}
      <section 
        ref={sectionRefs[0]}
        data-section="opening" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="font-angle text-5xl md:text-7xl font-bold mb-8"
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
            className="font-game text-2xl md:text-3xl mb-6"
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
            className="font-game text-xl md:text-2xl mb-8"
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
            className="font-angle text-2xl md:text-4xl font-bold text-ancient-gold"
            style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1.2, ease: "easeOut" }}
          >
            If we aren't writing our own story, someone else is writing for us.
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
          className="max-w-4xl mx-auto text-center relative z-10"
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
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p 
            className="font-game text-2xl md:text-3xl text-center mb-12"
            style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            You feel the urgency but lack the story technology to create the response you need.
          </motion.p>
          
          <div className="grid gap-8 max-w-3xl mx-auto">
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
          
          <motion.p 
            className="font-game text-xl md:text-2xl font-bold text-ancient-gold text-center mt-12 leading-relaxed"
            style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            If you believe another world is possible but struggle to make others see it—this work makes the impossible inevitable.
          </motion.p>
        </div>
      </section>

      {/* The Transformation Reveals */}
      <section 
        ref={sectionRefs[3]}
        data-section="transformation"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            className="font-angle text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-12"
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
                <span className="text-silver/80 text-lg flex-shrink-0 min-w-0">
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
                  <span className="font-bold text-ancient-gold text-lg">{transform.to}</span>
                  <br />
                  <span className="text-silver/70 text-sm">{transform.description}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science Unveils Itself */}
      <section 
        ref={sectionRefs[4]}
        data-section="science"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-angle text-3xl md:text-4xl font-bold text-ancient-gold mb-4" style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
              The Science Behind Story as Evolutionary Technology
            </h2>
            <p className="font-game text-xl" style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}>
              How consciousness actually works:
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <Card className="bg-deep-black/50 border border-ancient-gold/20 backdrop-blur-sm h-full hover:border-ancient-gold/40 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${concept.color}/20 flex items-center justify-center border border-${concept.color}/30`}>
                        <IconComponent className={`w-8 h-8 text-${concept.color}`} />
                      </div>
                      <h3 className={`font-edensor text-sm font-bold text-${concept.color} mb-3 tracking-wider`}>
                        {concept.title}
                      </h3>
                      <p className="text-silver/80 text-sm leading-relaxed">
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

      {/* The Moment of Choice */}
      <section 
        ref={sectionRefs[5]}
        data-section="choice"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
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

      {/* The Call to Adventure */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
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
              className="bg-gradient-to-r from-ancient-gold to-mystical-teal text-deep-black hover:from-ancient-gold/80 hover:to-mystical-teal/80 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1"
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
              <Button className="bg-mystical-teal text-deep-black hover:bg-mystical-teal/80 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1">
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