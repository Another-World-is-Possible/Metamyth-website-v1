import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroBackground from "@assets/_f20qmpu9dartjp9dbfcm_0_1755891749225.png";

export default function HeroSection() {

  return (
    <div className="relative">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Cosmic nebula background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-deep-black/40 z-10" />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1 
            className="font-angle text-5xl md:text-7xl font-bold text-gradient-gold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The World is Made of Stories.
          </motion.h1>
          
          <motion.h2 
            className="font-angle text-3xl md:text-4xl text-ancient-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Take Back Your Story to Change the World.
          </motion.h2>
          
          <motion.p 
            className="font-game text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto"
            style={{
              color: '#f0f0f0',
              textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            We wield the most ancient technology powered by modern magic: Write your reality, play it like the ultimate game, film it into cinema to attract people into your quest.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          >
            <Button 
              className="bg-ancient-gold text-deep-black hover:bg-ancient-gold/80 font-angle font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1 shadow-lg hover:shadow-ancient-gold/50 border-2 border-ancient-gold hover:shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.7), 0 0 60px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2), 0 0 10px rgba(212, 175, 55, 0.9)'
              }}
            >
              <span className="title-glow">REGENERATE YOUR STORY</span>
            </Button>
            <Button 
              className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg transform hover:-translate-y-1 shadow-lg hover:shadow-mystical-teal/50 border-2 border-mystical-teal hover:shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(20, 184, 166, 0.7), 0 0 60px rgba(20, 184, 166, 0.4), inset 0 0 20px rgba(20, 184, 166, 0.2), 0 0 10px rgba(20, 184, 166, 0.9)'
              }}
            >
              <span className="title-glow">JOIN THE QUEST</span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
