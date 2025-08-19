import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollThread from "@/components/scroll-thread";

export default function HeroSection() {
  return (
    <div className="relative">
      <section className="min-h-screen bg-mystical-gradient flex items-center justify-center relative overflow-hidden pt-16">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1 
            className="font-edensor text-5xl md:text-7xl font-bold text-gradient-gold mb-8"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
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
      
      {/* Golden thread divider after hero section */}
      <div className="absolute bottom-0 left-0 w-full h-px pointer-events-none z-50">
        <ScrollThread sectionIndex={0} />
      </div>
    </div>
  );
}
