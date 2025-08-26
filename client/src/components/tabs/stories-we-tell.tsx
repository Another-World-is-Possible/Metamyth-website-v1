import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ServerCog, Network, Globe } from "lucide-react";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

import visionaryShield from "@assets/visionary_shield_optimized.jpg";
import visionaryBanner from "@assets/of_course_here_is_the_revised_prompt-_a_luminous_crystalline_banner_waving_in_the_wind_with_ornate__fln51hw0qgjq8z60o21h_1_1755928687790.png";
import visionaryGlobe from "@assets/_visionary_globe-__prompt-_a_luminous_crystalline_globe_with_ornate_art_nouveau_gold_filigree_base__aw6pnmwev2ygzjspd1bk_1_1755928679344.png";

const audienceTypes = [
  {
    title: "Visionary Changemakers",
    description: "Revolutionary thinkers who see the world that's possible but struggle to communicate transformative ideas that could reshape entire systems. These are the pattern-breakers, paradigm-shifters, and evolutionary catalysts whose visions are often dismissed as too radical or impossible.",
    bgImage: visionaryShield,
    challenges: "Brilliant breakthrough concepts trapped in academic jargon, dismissed by conventional thinking, or failing to gain traction despite their transformative potential. Often feeling isolated in their vision.",
    transformation: "Through metamyth methodology, we translate visionary concepts into compelling narrative architecture that makes the impossible feel inevitable and attracts the right allies and resources.",
    potential: "Movements that fundamentally shift how we understand reality, attract significant funding, build powerful coalitions, and create new categories of possibility that didn't exist before."
  },
  {
    title: "Purpose-Driven Entrepreneurs", 
    description: "Business leaders who know there's a better way to do commerce - one that heals rather than extracts - but find themselves caught between profit pressures and authentic purpose. They're building the regenerative economy but need story architecture to communicate their deeper mission.",
    bgImage: visionaryBanner,
    challenges: "Caught between investor expectations and authentic mission, unable to communicate purpose without sounding hollow or naive. Struggling to prove that regenerative business models can be both profitable and transformative.",
    transformation: "Metamyth work reveals the authentic organizational story that naturally integrates impact with income, purpose with profit, showing how regenerative models are actually more sustainable long-term.",
    potential: "Regenerative enterprises that prove another economy is not only possible but more profitable, creating new business models that other entrepreneurs replicate, ultimately shifting how we understand commerce itself."
  },
  {
    title: "Transforming Organizations",
    description: "Nonprofits, corporations, and institutions that have outgrown their original structures and are ready to evolve beyond extractive patterns into regenerative collaboration. These organizations sense they could be part of something much larger.",
    bgImage: visionaryGlobe,
    challenges: "Stuck in outdated organizational models, competing for limited resources, struggling with mission drift, internal dysfunction, or the sense that their impact isn't matching their potential despite good intentions.",
    transformation: "Organizational metamyth work reveals unexpected federation opportunities and authentic collaborative structures that multiply rather than divide impact, creating entirely new models of institutional cooperation.",
    potential: "Network effects that exponentially multiply impact beyond what any single organization could achieve, collaborative funding models that replace competition with coordination, and systemic transformation at the scale our challenges require."
  }
];

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Uncover your authentic narrative beneath conditioned patterns",
    color: "mystical-teal"
  },
  {
    icon: ServerCog,
    title: "Sequence", 
    description: "Transform story elements into functional tools and systems",
    color: "ancient-gold"
  },
  {
    icon: Network,
    title: "Federate",
    description: "Connect with aligned stories for coordinated transformation",
    color: "crimson"
  },
  {
    icon: Globe,
    title: "Transform",
    description: "Create measurable impact on planetary challenges",
    color: "silver"
  }
];

interface StoriesWeTellProps {
  setActiveTab?: (tab: string) => void;
}

export default function StoriesWeTell({ setActiveTab }: StoriesWeTellProps) {
  const { isImageReady, getImageSrc } = useImageLoading();
  const [showBackground, setShowBackground] = useState(false);
  const imageReady = isImageReady('stories');
  const storiesBackground = getImageSrc('stories');

  useEffect(() => {
    // Always fade in when navigating to tab, even if already loaded
    setShowBackground(false);
    const timer = setTimeout(() => {
      if (imageReady) {
        setShowBackground(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [imageReady]);

  // Wait for image to be ready before showing tab
  if (!imageReady) {
    return (
      <div className="relative min-h-screen py-20 pt-32 flex items-center justify-center" style={{ backgroundColor: 'hsl(120, 80%, 2%)' }}>
        <div className="text-ancient-gold font-angle text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-20 pt-32">
      {/* Background image with filter - fade in on navigate */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
          showBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${storiesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.7) contrast(1.0)'
        }}
      />
      
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-deep-black/25" />
      
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="typography-h1 text-mystical-teal text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STORIES WE TELL
        </motion.h2>
        
        
        {/* Who We Serve */}
        <div className="mb-16">
          {/* First two cards in a row */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {audienceTypes.slice(0, 2).map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 overflow-hidden hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                  <div 
                    className="h-56 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${audience.bgImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-deep-black/10 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="typography-h3 font-bold text-ancient-gold mb-4">
                      {audience.title}
                    </h3>
                    <p className="typography-body mb-6 leading-relaxed text-cream-white font-kardige" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                      {audience.description}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-crimson mb-3 flex items-center font-kardige">
                          <span className="w-3 h-3 bg-crimson rounded-full mr-3"></span>
                          Common Challenges
                        </h4>
                        <p className="text-lg leading-relaxed text-cream-white font-kardige" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audience.challenges}</p>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-mystical-teal mb-3 flex items-center font-kardige">
                          <span className="w-3 h-3 bg-mystical-teal rounded-full mr-3"></span>
                          Our Approach
                        </h4>
                        <p className="text-lg leading-relaxed text-cream-white font-kardige" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audience.transformation}</p>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-ancient-gold mb-3 flex items-center font-kardige">
                          <span className="w-3 h-3 bg-ancient-gold rounded-full mr-3"></span>
                          Potential Unlocked
                        </h4>
                        <p className="text-lg leading-relaxed text-cream-white font-kardige" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audience.potential}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Third card centered */}
          <div className="flex justify-center">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 overflow-hidden hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <div 
                  className="h-56 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${audienceTypes[2].bgImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-deep-black/10 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="typography-h2 text-ancient-gold mb-4">
                    {audienceTypes[2].title}
                  </h3>
                  <p className="typography-body mb-6 leading-relaxed text-cream-white" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    {audienceTypes[2].description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="typography-h3 font-bold text-crimson mb-3 flex items-center">
                        <span className="w-3 h-3 bg-crimson rounded-full mr-3"></span>
                        Common Challenges
                      </h4>
                      <p className="typography-technical leading-relaxed text-cream-white" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audienceTypes[2].challenges}</p>
                    </div>
                    <div>
                      <h4 className="typography-h3 font-bold text-mystical-teal mb-3 flex items-center">
                        <span className="w-3 h-3 bg-mystical-teal rounded-full mr-3"></span>
                        Our Approach
                      </h4>
                      <p className="typography-technical leading-relaxed text-cream-white" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audienceTypes[2].transformation}</p>
                    </div>
                    <div>
                      <h4 className="typography-h3 font-bold text-ancient-gold mb-3 flex items-center">
                        <span className="w-3 h-3 bg-ancient-gold rounded-full mr-3"></span>
                        Potential Unlocked
                      </h4>
                      <p className="typography-technical leading-relaxed text-cream-white" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{audienceTypes[2].potential}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>


        {/* Process Demonstration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-angle text-4xl font-bold text-ancient-gold text-center mb-8">
                Our Process: From Story to System
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 mystical-glow ${step.color === 'crimson' ? 'bg-crimson/20' : step.color === 'mystical-teal' ? 'bg-mystical-teal/20' : step.color === 'ancient-gold' ? 'bg-ancient-gold/20' : 'bg-cream-white/20'}`}>
                        <IconComponent className={`w-8 h-8 ${step.color === 'crimson' ? 'text-crimson' : step.color === 'mystical-teal' ? 'text-mystical-teal' : step.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-cream-white'}`} />
                      </div>
                      <h4 className={`typography-h3 font-bold mb-2 ${step.color === 'crimson' ? 'text-crimson' : step.color === 'mystical-teal' ? 'text-mystical-teal' : step.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-cream-white'}`}>
                        {step.title}
                      </h4>
                      <p className="font-kardige text-lg" style={{ color: 'hsl(45, 35%, 83%)', textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <p className="font-kardige mb-6 max-w-2xl mx-auto text-xl" style={{ color: 'hsl(45, 35%, 83%)', textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                  Whether you're an individual visionary, purpose-driven entrepreneur, or transforming organization, 
                  we meet you where you are and help architect the story that unlocks your authentic power.
                </p>
                <Button 
                  onClick={() => setActiveTab?.('questionaire')}
                  className="bg-mystical-teal text-deep-black font-bold py-3 px-8 rounded-lg hover:bg-mystical-teal/80 transition-colors duration-300 cursor-pointer"
                >
                  Discover Your Story Architecture
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
      </div>
    </div>
  );
}
