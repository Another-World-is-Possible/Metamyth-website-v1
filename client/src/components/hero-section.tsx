import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/animated-logo";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-mystical-gradient flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <AnimatedLogo />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.h1 
          className="font-edensor text-5xl md:text-7xl font-bold text-gradient-gold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The World is Made of Stories.
        </motion.h1>
        
        <motion.h2 
          className="font-edensor text-3xl md:text-4xl text-ancient-gold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Take Back Your Story to Change the World.
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-silver/90 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          We wield the most ancient technology powered by modern magic: Write your reality, play it like the ultimate game, film it into existence to attract people into your quest.
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Button className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg">
            JOIN THE STORYTELLERS
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-ancient-gold text-ancient-gold hover:bg-ancient-gold hover:text-deep-black font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg"
          >
            REGENERATE YOUR STORY
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
