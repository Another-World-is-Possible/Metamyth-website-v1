import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface MetamythTilesProps {
  setActiveTab?: (tab: string) => void;
}

// Import the background images
import callToAdventureImg from "@assets/_cosmic_call_to_adventure-__prompt-_earth_in_deep_space_glowing_red_and_orange_like_a_dying_star_wi_h5e90ujrtt6e75cwup2u_0_1755889868628.png";
import questImg from "@assets/json__earth_precious-__prompt-_earth_floating_in_the_center_of_the_frame_rich_green_continents_and__k8hbrb45onp8xjogrgvn_1_1755889893638.png";
import visionImg from "@assets/json__cosmic_city_vision-__prompt-_an_impossibly_vast_and_epic_landscape_like_the_sierra_nevada_de__h8rnlsruu7ca00t0jh44_1_1755889977562.png";
import journeyImg from "@assets/new_prompt-_a_dense_forest_with_a_winding_path_through_it_enchanted_feeling_but_a_journey_that_is_p_068nz5cvgoo7q3dazjwb_1_1755889999792.png";
import requestImg from "@assets/request_tile_optimized.jpg";



const tiles = [
  {
    id: 1,
    title: "THE CALL TO ADVENTURE",
    quote: "We're living through the climax of the human story—all threads converging in crisis determining our future.",
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
    quote: "Story is the oldest technology on Earth.<br/>The original operating system that turns vision into reality.",
    description: "We reveal the authentic story already alive within your organization and plot your evolution on purpose. Through our Metamyth System, we rediscover your cosmic purpose, expand your vision, and create the practical mission that makes it real.<br/><br/>Your story becomes the foundation for everything that follows.",
    bgImage: questImg,
    animation: "thread",
    gradient: "from-deep-black to-dark-wine",
    textAlign: "center",
    zoom: 2
  },
  {
    id: 3,
    title: "THE VISION OF WHAT IS POSSIBLE",
    quote: "A world that works for all where work becomes adventure, where authentic authority commands cosmic resources, and where the future belongs to those who remember they're writing it.",
    description: "Everything becomes possible when we regain control of the story. We become reality architects turning breakdown into breakthrough, extraction into regeneration, pointless busyness into purpose-driven adventure.<br/><br/>The Metamyth transform background characters in a broken story into heroes in the myth of the future we're here to LIVE.",
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
    description: "The time for waiting is over. The world needs your story now.",
    callToAction: "Will you answer the call?",
    bgImage: requestImg,
    animation: "flicker",
    gradient: "from-deep-black to-forest-green",
    textAlign: "center",
    zoom: 4
  }
];

const titleColors = [
  "text-cream-white",
  "text-cream-white",
  "text-cream-white", 
  "text-cream-white",
  "text-cream-white"
];

export default function MetamythTiles({ setActiveTab }: MetamythTilesProps) {
  return (
    <section className="relative">
      {/* Content layer */}
      {tiles.map((tile, index) => (
        <div key={tile.id} className="relative">
          <TileComponent tile={tile} index={index} setActiveTab={setActiveTab} />
        </div>
      ))}
    </section>
  );
}

function TileComponent({ tile, index, setActiveTab }: { tile: typeof tiles[0] & { callToAction?: string }, index: number, setActiveTab?: (tab: string) => void }) {
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
    <div className={`metamyth-section min-h-screen flex items-center relative overflow-hidden`}>
      {/* Background Image - simple fade in, no movement */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat metamyth-bg-fade"
          style={{ backgroundImage: `url(${tile.bgImage})` }}
        />
        {/* Subtle overlay to ensure text readability */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-25`} />
      </div>
      
      <div className={`relative z-10 w-full px-8 flex ${getTextAlignment()}`}>
        <div className="max-w-2xl">
          <h2 className="typography-h2 font-angle mb-8 text-cream-white leading-tight text-glow-gold">
            {tile.title}
          </h2>

          <blockquote
            className="typography-h3 font-angle mb-8 italic text-cream-white text-glow-gold"
            dangerouslySetInnerHTML={{ __html: `"${tile.quote}"` }}
          />

          <p
            className="typography-body font-emerland leading-loose text-cream-white text-glow-gold"
            dangerouslySetInnerHTML={{ __html: tile.description }}
          ></p>

          {tile.callToAction && (
            <div className="mt-8">
              <p
                className="typography-h2 font-angle mb-6 text-cream-white text-glow-gold"
              >
                {tile.callToAction}
              </p>

              <button
                className="bg-ancient-gold text-deep-black font-angle font-bold py-4 px-8 rounded-lg hover:bg-ancient-gold/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setActiveTab?.('questionaire')}
              >
                START YOUR JOURNEY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

