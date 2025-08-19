import { Button } from "@/components/ui/button";
import ScrollThread from "@/components/scroll-thread";

const tiles = [
  {
    id: 1,
    title: "THE CALL TO ADVENTURE",
    quote: "We're living through the climax of the human story—all threads converging in crisis determining consciousness's fate on Earth.",
    description: "We are stuck in a broken story of extraction chasing meaningless metrics, burnt out, struggling to express why what we do matters, forgetting we write the story.",
    bgType: "flame",
    animation: "burn",
    gradient: "from-forest-green to-deep-black",
    textAlign: "right",
    zoom: 1
  },
  {
    id: 2,
    title: "THE QUEST",
    quote: "Story is the oldest technology on Earth. The original operating system that turns vision into reality.",
    description: "We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real. Your story becomes the foundation for everything that follows.",
    bgType: "earth-space",
    animation: "thread",
    gradient: "from-deep-black to-dark-wine",
    textAlign: "right",
    zoom: 1.5
  },
  {
    id: 3,
    title: "THE QUEST",
    quote: "Story is the oldest technology on Earth. The original operating system that turns vision into reality.",
    description: "We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real. Your story becomes the foundation for everything that follows.",
    bgType: "earth-center",
    animation: "thread",
    gradient: "from-deep-black to-dark-wine",
    textAlign: "center",
    zoom: 2
  },
  {
    id: 4,
    title: "THE VISION OF WHAT IS POSSIBLE",
    quote: "A world where work becomes adventure, purpose literally pays, and regenerative collaboration outperforms extractive competition.",
    description: "We transform work into quest, purpose into profit, customers into communities, scattered efforts into coordinated transformation—proving another world works by living it.",
    bgType: "mountains",
    animation: "flash",
    gradient: "from-dark-wine to-forest-green",
    textAlign: "left",
    zoom: 2.5
  },
  {
    id: 5,
    title: "THE JOURNEY",
    quote: "We build the complete story system that helps purpose-driven visionaries discover their authentic narrative, sequence it into functional tools, and federate with aligned stories to solve planetary challenges.",
    description: "From individual story regeneration to organizational transformation to planetary coordination—one integrated system that scales from personal to cosmic.",
    bgType: "forest",
    animation: "crash",
    gradient: "from-forest-green to-deep-black",
    textAlign: "center",
    zoom: 3
  },
  {
    id: 6,
    title: "THE RE-QUEST",
    quote: "Calling the next generation of storytellers ready to stop being characters in someone else's extraction story and start authoring the regenerative reality your heart knows is possible.",
    description: "The time for waiting is over. The world needs your story now. Will you answer the call?",
    bgType: "campfire",
    animation: "flicker",
    gradient: "from-deep-black to-forest-green",
    textAlign: "center",
    zoom: 4
  }
];

const titleColors = [
  "text-ancient-gold",
  "text-mystical-teal", 
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
  const getBackgroundElement = (bgType: string) => {
    switch (bgType) {
      case "flame":
        return <FlameBackground />;
      case "earth-space":
        return <EarthInSpaceBackground />;
      case "earth-center":
        return <EarthCenterBackground />;
      case "mountains":
        return <MountainBackground />;
      case "forest":
        return <ForestBackground />;
      case "campfire":
        return <CampfireBackground />;
      default:
        return null;
    }
  };

  const getTextAlignment = () => {
    switch (tile.textAlign) {
      case "left":
        return "text-left justify-start";
      case "right":
        return "text-right justify-end";
      case "center":
      default:
        return "text-center justify-center";
    }
  };

  return (
    <div className={`scroll-fade-in min-h-screen bg-gradient-to-br ${tile.gradient} flex items-center relative overflow-hidden perspective-1000`}>
      {/* Custom Background with zoom effect */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `scale(${1 + (tile.zoom - 1) * 0.2})`,
          transformOrigin: 'center center'
        }}
      >
        {getBackgroundElement(tile.bgType)}
      </div>
      
      <div className={`relative z-10 w-full px-8 flex ${getTextAlignment()}`}>
        <div className="max-w-2xl">
          <h2 className={`scroll-fade-in font-edensor text-4xl md:text-6xl font-bold ${titleColors[index]} mb-8`}>
            {tile.title}
          </h2>
          
          <blockquote className="scroll-fade-in font-alice text-2xl md:text-3xl font-light text-silver/90 mb-8 italic">
            "{tile.quote}"
          </blockquote>
          
          <p className="scroll-fade-in font-alice text-xl md:text-2xl text-silver leading-relaxed">
            {tile.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Background Components
function FlameBackground() {
  return (
    <div className="absolute inset-0 bg-deep-black">
      <div className="absolute top-1/2 left-1/4 w-16 h-24 flame-flicker opacity-80">
        <div className="w-full h-full bg-gradient-to-t from-crimson via-ancient-gold to-transparent rounded-full animate-pulse" />
        <div className="absolute inset-2 bg-gradient-to-t from-ancient-gold to-transparent rounded-full animate-bounce" />
      </div>
    </div>
  );
}

function EarthInSpaceBackground() {
  return (
    <div className="absolute inset-0 bg-deep-black bg-stars">
      <div className="absolute top-1/2 right-1/4 w-32 h-32 transform -translate-y-1/2">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-mystical-teal via-forest-green to-crimson earth-glow animate-spin-slow" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-crimson/50 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

function EarthCenterBackground() {
  return (
    <div className="absolute inset-0 bg-deep-black bg-stars">
      <div className="absolute top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-mystical-teal via-forest-green to-dark-wine earth-glow animate-spin-slow" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-t from-forest-green/30 to-transparent" />
      </div>
    </div>
  );
}

function MountainBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-deep-black to-forest-green/30">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,80 L20,60 L35,40 L50,20 L65,35 L80,15 L100,25 L100,100 L0,100 Z" 
              fill="url(#mountainGrad)" opacity="0.6" />
        <path d="M0,90 L15,70 L30,50 L45,30 L60,45 L75,25 L90,35 L100,40 L100,100 L0,100 Z" 
              fill="url(#mountainGrad2)" opacity="0.4" />
        <defs>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d2520" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3a2a" />
            <stop offset="100%" stopColor="#2a2a1a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ForestBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-deep-black to-forest-green">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-forest-green/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-8 h-32 bg-gradient-to-t from-dark-wine to-transparent rounded-t-full" />
        <div className="absolute bottom-0 left-16 w-12 h-40 bg-gradient-to-t from-dark-wine to-transparent rounded-t-full" />
        <div className="absolute bottom-0 right-20 w-10 h-36 bg-gradient-to-t from-dark-wine to-transparent rounded-t-full" />
        <div className="absolute bottom-0 right-4 w-6 h-28 bg-gradient-to-t from-dark-wine to-transparent rounded-t-full" />
      </div>
    </div>
  );
}

function CampfireBackground() {
  return (
    <div className="absolute inset-0 bg-deep-black">
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-dark-wine rounded-full" />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-16 flame-flicker">
          <div className="w-full h-full bg-gradient-to-t from-crimson via-ancient-gold to-transparent rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-2 left-1/3 w-6 h-12 flame-flicker delay-100">
          <div className="w-full h-full bg-gradient-to-t from-ancient-gold to-transparent rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-2 right-1/3 w-4 h-10 flame-flicker delay-200">
          <div className="w-full h-full bg-gradient-to-t from-crimson to-transparent rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}