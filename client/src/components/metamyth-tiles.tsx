import { Button } from "@/components/ui/button";
import ScrollThread from "@/components/scroll-thread";

// Import the background images
import callToAdventureImg from "@assets/_cosmic_call_to_adventure-__prompt-_earth_in_deep_space_glowing_red_and_orange_like_a_dying_star_wi_h5e90ujrtt6e75cwup2u_0_1755889868628.png";
import questImg from "@assets/json__earth_precious-__prompt-_earth_floating_in_the_center_of_the_frame_rich_green_continents_and__k8hbrb45onp8xjogrgvn_1_1755889893638.png";
import visionImg from "@assets/json__cosmic_city_vision-__prompt-_an_impossibly_vast_and_epic_landscape_like_the_sierra_nevada_de__h8rnlsruu7ca00t0jh44_1_1755889977562.png";
import journeyImg from "@assets/new_prompt-_a_dense_forest_with_a_winding_path_through_it_enchanted_feeling_but_a_journey_that_is_p_068nz5cvgoo7q3dazjwb_1_1755889999792.png";
import requestImg from "@assets/enhanced_a1dc6029-a02e-49fc-920e-7998718e89ba_1755890220116.png";



const tiles = [
  {
    id: 1,
    title: "THE CALL TO ADVENTURE",
    quote: "We're living through the climax of the human story—all threads converging in crisis determining consciousness's fate on Earth.",
    description: "We are stuck in a broken story of extraction chasing meaningless metrics, burnt out, struggling to express why what we do matters, forgetting we write the story.",
    bgImage: callToAdventureImg,
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
    bgImage: questImg,
    animation: "thread",
    gradient: "from-deep-black to-dark-wine",
    textAlign: "center",
    zoom: 2
  },
  {
    id: 3,
    title: "THE VISION OF WHAT IS POSSIBLE",
    quote: "A world where work becomes adventure, purpose literally pays, and regenerative collaboration outperforms extractive competition.",
    description: "We transform work into quest, purpose into profit, customers into communities, scattered efforts into coordinated transformation—proving another world works by living it.",
    bgImage: visionImg,
    animation: "flash",
    gradient: "from-dark-wine to-forest-green",
    textAlign: "left",
    zoom: 2.5
  },
  {
    id: 4,
    title: "THE JOURNEY",
    quote: "We build the complete story system that helps purpose-driven visionaries discover their authentic narrative, sequence it into functional tools, and federate with aligned stories to solve planetary challenges.",
    description: "From individual story regeneration to organizational transformation to planetary coordination—one integrated system that scales from personal to cosmic.",
    bgImage: journeyImg,
    animation: "crash",
    gradient: "from-forest-green to-deep-black",
    textAlign: "right",
    zoom: 3
  },
  {
    id: 5,
    title: "THE RE-QUEST",
    quote: "Calling the next generation of storytellers ready to stop being characters in someone else's extraction story and start authoring the regenerative reality your heart knows is possible.",
    description: "The time for waiting is over. The world needs your story now. Will you answer the call?",
    bgImage: requestImg,
    animation: "flicker",
    gradient: "from-deep-black to-forest-green",
    textAlign: "center",
    zoom: 4
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
    <section className="relative image-gallery">
      {tiles.map((tile, index) => (
        <div key={tile.id} className={`image-container ${index === 0 ? 'first-image' : ''} ${index === tiles.length - 1 ? 'last-image' : ''}`}>
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
    <div className={`story-image scroll-fade-in min-h-screen flex items-center relative overflow-hidden perspective-1000`}>
      {/* Background Image with zoom effect */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `scale(${1 + (tile.zoom - 1) * 0.2})`,
          transformOrigin: 'center center'
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tile.bgImage})` }}
        />
        {/* Dramatic fade-to-black silhouette around all edges */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Left and right edge shadows */}
          <div 
            className="absolute inset-y-0 left-0 w-32 md:w-48"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)'
            }}
          />
          <div 
            className="absolute inset-y-0 right-0 w-32 md:w-48"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)'
            }}
          />
          
          {/* Top and bottom edge shadows */}
          <div 
            className="absolute inset-x-0 top-0 h-24 md:h-32"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)'
            }}
          />
          <div 
            className="absolute inset-x-0 bottom-0 h-24 md:h-32"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)'
            }}
          />
          
          {/* Corner vignettes for extra depth */}
          <div 
            className="absolute top-0 left-0 w-48 h-48"
            style={{
              background: 'radial-gradient(ellipse at top left, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent 70%)'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-48 h-48"
            style={{
              background: 'radial-gradient(ellipse at top right, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-48 h-48"
            style={{
              background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-48 h-48"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent 70%)'
            }}
          />
        </div>
        
        {/* Subtle overlay to ensure text readability */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-25`} />
      </div>
      
      <div className={`relative z-30 w-full px-8 flex ${getTextAlignment()}`}>
        <div className="max-w-2xl">
          <h2 className={`scroll-fade-in font-angle text-4xl md:text-6xl font-bold ${titleColors[index]} mb-8`}>
            {tile.title}
          </h2>
          
          <blockquote className="scroll-fade-in font-game text-2xl md:text-3xl font-light text-silver/90 mb-8 italic">
            "{tile.quote}"
          </blockquote>
          
          <p className="scroll-fade-in font-game text-xl md:text-2xl text-silver leading-relaxed">
            {tile.description}
          </p>
        </div>
      </div>
    </div>
  );
}

