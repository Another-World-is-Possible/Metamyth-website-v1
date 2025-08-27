import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

interface HeroSectionProps {
  setActiveTab?: (tab: string) => void;
}

export default function HeroSection({ setActiveTab }: HeroSectionProps) {
  const { isImageReady, getImageSrc } = useImageLoading();
  const backgroundLoaded = isImageReady('hero');
  const heroBackground = getImageSrc('hero');

  return (
    <div className="relative">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Black background base */}
        <div className="absolute inset-0 bg-deep-black" />
        
        {/* Fade-in background */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-out ${
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: backgroundLoaded ? `url(${heroBackground})` : 'none' }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-deep-black/40 z-10" />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1 
            className="typography-h1 font-angle text-gradient-gold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: backgroundLoaded ? 1 : 0, y: backgroundLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: backgroundLoaded ? 0.5 : 0 }}
          >
            The World is Made of Stories.
          </motion.h1>
          
          <motion.h2
            className="typography-h2 font-angle text-ancient-gold mb-6 text-glow-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: backgroundLoaded ? 1 : 0, y: backgroundLoaded ? 0 : 20 }}
            transition={{ delay: backgroundLoaded ? 0.8 : 0, duration: 0.8, ease: "easeOut" }}
          >
            Take Back Your Story to Change the World.
          </motion.h2>

          <motion.p
            className="typography-lead mb-12 max-w-4xl mx-auto text-cream-white text-glow-cream font-thornelia"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: backgroundLoaded ? 1 : 0, y: backgroundLoaded ? 0 : 20 }}
            transition={{ delay: backgroundLoaded ? 1.1 : 0, duration: 0.8, ease: "easeOut" }}
          >
            We wield the most ancient technology powered by modern magic:<br />Write your reality, play it like the ultimate game, film it into cinema<br />to attract people into your quest.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: backgroundLoaded ? 1 : 0, y: backgroundLoaded ? 0 : 20 }}
            transition={{ delay: backgroundLoaded ? 1.4 : 0, duration: 0.8, ease: "easeOut" }}
          >
            <Button
              onClick={() => setActiveTab?.('questionaire')}
              className="bg-ancient-gold text-deep-black font-angle font-bold py-2 px-6 rounded-lg hover:bg-ancient-gold/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-gold"
            >
              <span className="text-glow-gold">REGENERATE YOUR STORY</span>
            </Button>
            <Button
              onClick={() => setActiveTab?.('questionaire')}
              className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-teal"
            >
              <span className="text-glow-teal">JOIN THE QUEST</span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
