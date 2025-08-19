import { Button } from "@/components/ui/button";
import ScrollThread from "@/components/scroll-thread";

const tiles = [
  {
    id: 1,
    title: "THE CALL TO ADVENTURE",
    quote: "We're living through the climax of the human story—all threads converging in crisis determining consciousness's fate on Earth.",
    description: "We are stuck in a broken story of extraction chasing meaningless metrics, burnt out, struggling to express why what we do matters, forgetting we write the story.",
    bgImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "burn",
    gradient: "from-forest-green to-deep-black"
  },
  {
    id: 2,
    title: "THE QUEST",
    quote: "Story is the oldest technology on Earth. The original operating system that turns vision into reality.",
    description: "We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real. Your story becomes the foundation for everything that follows.",
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
    description: "The time for waiting is over. The world needs your story now. Will you answer the call?",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    animation: "flicker",
    gradient: "from-deep-black to-forest-green"
  }
];

const titleColors = [
  "text-ancient-gold",
  "text-mystical-teal", 
  "text-ancient-gold",
  "text-crimson",
  "text-mystical-teal"
];

export default function MetamythTiles() {
  return (
    <section className="relative">
      {tiles.map((tile, index) => (
        <div key={tile.id} className="relative">
          <TileComponent tile={tile} index={index} />
          {/* Golden thread divider at the bottom of each section (except last) */}
          {index < tiles.length - 1 && (
            <div className="absolute bottom-0 left-0 w-full h-px pointer-events-none z-50">
              <ScrollThread sectionIndex={index + 1} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function TileComponent({ tile, index }: { tile: typeof tiles[0], index: number }) {
  return (
    <div className={`scroll-fade-in min-h-screen bg-gradient-to-br ${tile.gradient} flex items-center justify-center relative overflow-hidden`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${tile.bgImage})` }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h2 className={`scroll-fade-in font-edensor text-4xl md:text-6xl font-bold ${titleColors[index]} mb-8`}>
          {tile.title}
        </h2>
        
        <blockquote className="scroll-fade-in text-2xl md:text-3xl font-light text-silver/90 mb-8 italic">
          "{tile.quote}"
        </blockquote>
        
        <p className="scroll-fade-in text-xl md:text-2xl text-silver leading-relaxed">
          {tile.description}
        </p>
      </div>
    </div>
  );
}