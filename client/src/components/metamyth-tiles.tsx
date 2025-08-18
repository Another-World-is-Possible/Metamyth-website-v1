import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ScrollThread from "@/components/scroll-thread";

const tiles = [
  {
    id: 1,
    title: "THE CALL TO ADVENTURE",
    quote: "All the world's suffering flows from a single source—a story we forgot we wrote.",
    description: "What created this reality can recreate it. The species that invented every system destroying the world is the same species capable of inventing every system that could heal it.",
    bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "burn",
    gradient: "from-forest-green to-deep-black"
  },
  {
    id: 2,
    title: "THE QUEST",
    quote: "We wield the most ancient technology powered by modern magic: Write your life, play it like a video game, turn it into a movie to attract people into your quest.",
    description: "Reality architecture using humanity's most powerful technology to transform purpose-driven visionaries into planetary authorities.",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "thread",
    gradient: "from-deep-black to-dark-wine"
  },
  {
    id: 3,
    title: "THE VISION OF WHAT IS POSSIBLE",
    quote: "A world where work becomes adventure, purpose literally pays, and regenerative collaboration outperforms extractive competition.",
    description: "We transform work into quest, purpose into profit, customers into communities, scattered efforts into coordinated transformation—proving another world works by living it.",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "flash",
    gradient: "from-dark-wine to-forest-green"
  },
  {
    id: 4,
    title: "THE JOURNEY",
    quote: "We build the complete story system that helps purpose-driven visionaries discover their authentic narrative, sequence it into functional tools, and federate with aligned stories to solve planetary challenges.",
    description: "From individual story regeneration to organizational transformation to planetary coordination—one integrated system that scales from personal to cosmic.",
    bgImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "crash",
    gradient: "from-forest-green to-deep-black"
  },
  {
    id: 5,
    title: "THE RE-QUEST",
    quote: "Calling the next generation of storytellers ready to stop being characters in someone else's extraction story and start authoring the regenerative reality your heart knows is possible.",
    description: "The metamyth awaits your authorship. The infinite kindred quest calls you home to your cosmic work.",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "flicker",
    gradient: "from-deep-black to-forest-green"
  },
  {
    id: 6,
    title: "THE INVITATION",
    quote: "Step into the infinite kindred quest. Your story is the key to unlock the world we're here to build together.",
    description: "Join the federation of regenerative storytellers ready to transform the world through authentic narrative architecture.",
    bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "burn",
    gradient: "from-forest-green to-mystical-teal"
  }
];

const titleColors = [
  "text-ancient-gold",
  "text-mystical-teal", 
  "text-ancient-gold",
  "text-crimson",
  "text-mystical-teal",
  "text-ancient-gold"
];

export default function MetamythTiles() {
  return (
    <section className="relative">
      {tiles.map((tile, index) => (
        <div key={tile.id} className="relative">
          <TileComponent tile={tile} index={index} />
          {/* Golden thread divider at the bottom of each section (except last) */}
          {index < tiles.length - 1 && (
            <div className="absolute bottom-0 left-0 w-full h-8 pointer-events-none z-50">
              <ScrollThread sectionIndex={index + 1} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function TileComponent({ tile, index }: { tile: typeof tiles[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  const getAnimationVariants = () => {
    // Standardized fade-in animation for all tiles
    return {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    };
  };

  const variants = getAnimationVariants();

  return (
    <motion.div 
      ref={ref}
      className={`min-h-screen bg-gradient-to-br ${tile.gradient} flex items-center justify-center relative overflow-hidden`}
      initial={variants.initial}
      animate={isInView ? variants.animate : variants.initial}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${tile.bgImage})` }}
      />
      

      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tile.title}
        </motion.h2>
        
        <motion.blockquote 
          className="text-2xl md:text-3xl font-light text-silver/90 mb-8 italic"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          "{tile.quote}"
        </motion.blockquote>
        
        <motion.p 
          className="text-xl md:text-2xl text-silver leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {tile.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
