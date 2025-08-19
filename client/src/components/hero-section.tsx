import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

// Constellation Navigation Component
function MainConstellationNav({ activeSection }: { activeSection: number }) {
  const sections = ['hero', 'metamyth', 'invitation'];
  
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

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState(0);
  
  const sectionRefs = [
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
    <div className="bg-gradient-to-b from-deep-black via-deep-black to-forest-green/20 min-h-screen relative">
      <MainConstellationNav activeSection={activeSection} />
      
      {/* Hero Transmission */}
      <section 
        ref={sectionRefs[0]}
        data-section="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            className="font-edensor text-5xl md:text-7xl font-bold text-gradient-gold mb-8"
            initial={{ opacity: 0.2, scale: 0.98 }}
            animate={{ opacity: 1, scale: [0.98, 1.02, 0.98] }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 4, ease: "easeInOut", repeat: Infinity }
            }}
          >
            The World is Made of Stories.
          </motion.h1>
          
          <motion.h2 
            className="font-edensor text-3xl md:text-4xl text-ancient-gold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            Take Back Your Story to Change the World.
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-silver/90 mb-12 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          >
            We wield the most ancient technology powered by modern magic: Write your reality, play it like the ultimate game, film it into existence to attract people into your quest.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1.5 }}
          >
            <Button 
              className="bg-ancient-gold text-deep-black hover:bg-ancient-gold/80 font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg transform hover:-translate-y-1"
            >
              REGENERATE YOUR STORY
            </Button>
            <Button className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg transform hover:-translate-y-1">
              JOIN THE QUEST
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Metamyth Revelation */}
      <section 
        ref={sectionRefs[1]}
        data-section="metamyth"
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2520 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5 }}
          >
            <h2 className="font-edensor text-4xl md:text-5xl font-bold text-ancient-gold mb-6">
              The Metamyth System
            </h2>
            <p 
              className="text-2xl md:text-3xl text-mystical-teal italic"
              style={{ filter: 'brightness(1.1)' }}
            >
              Where story becomes species-level intervention
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "WRITE YOUR REALITY",
                description: "Transform scattered messaging into coherent narrative that serves planetary healing",
                delay: 0
              },
              {
                title: "PLAY THE GAME",
                description: "Turn purpose into compelling quest mechanics that magnetize aligned collaborators",
                delay: 0.3
              },
              {
                title: "FILM INTO EXISTENCE", 
                description: "Create visual stories that make the impossible feel inevitable through cinematic magic",
                delay: 0.6
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: phase.delay }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ancient-gold/20 flex items-center justify-center border border-ancient-gold/30">
                  <span className="text-ancient-gold font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-edensor text-xl font-bold text-ancient-gold mb-4 tracking-wider">
                  {phase.title}
                </h3>
                <p className="text-silver/80 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Adventure */}
      <section 
        ref={sectionRefs[2]}
        data-section="invitation"
        className="min-h-screen flex items-center justify-center px-4 relative"
      >
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, #2d2520 0%, #1a1a1a 70%)' }}
        />
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <h2 
            className="font-edensor text-4xl md:text-5xl font-bold text-ancient-gold mb-4"
            style={{ 
              filter: 'brightness(1.2)', 
              textShadow: '0 0 15px rgba(230, 243, 255, 0.4)' 
            }}
          >
            THE INVITATION
          </h2>
          
          <motion.p
            className="text-2xl md:text-3xl text-mystical-teal text-center mb-12 font-light italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            the future is one story away
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Button 
              className="bg-gradient-to-r from-ancient-gold to-mystical-teal text-deep-black hover:from-ancient-gold/80 hover:to-mystical-teal/80 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1"
            >
              REGENERATE YOUR STORY
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
        </motion.div>
      </section>
    </div>
  );
}
