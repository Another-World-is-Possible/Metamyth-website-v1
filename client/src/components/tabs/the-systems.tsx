import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Users, Film, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

const phases = [
  {
    id: 1,
    icon: Compass,
    title: "Phase 1: The Metamyth Journey",
    subtitle: "The Foundational Story Regeneration",
    duration: "90-minute intensive session",
    color: "mystical-teal",
    movements: [
      "The Calling: The crisis that called the organization into existence",
      "The Quest: Their deepest purpose and unique role in planetary transformation",
      "The Vision: The world they're creating when they follow purpose fully",
      "The Mission: Their practical mission plan and pathway forward",
      "The Request: How others discover their role in this larger story"
    ],
    outcome: "Complete organizational metamyth with five foundational statements, comprehensive Story Living Guide, and systematic framework that transforms scattered purpose into unified direction across all operations"
  },
  {
    id: 2,
    icon: Users,
    title: "Phase 2: The Story Living Intensive",
    subtitle: "Complete Organizational Alignment",
    duration: "Multi-day deep dive",
    color: "ancient-gold",
    movements: [
      "22 living artifacts that become practical tools for decision-making",
      "Organizational story alignment across messaging and operations",
      "Custom mythology and visual identity",
      "Brand strategy, marketing, and regenerative development",
      "Team training to embody and share the story naturally"
    ],
    outcome: "Full organizational transformation with 22 living artifacts, unified brand ecosystem, aligned team culture, and regenerative business operations that naturally attract ideal stakeholders and eliminate internal friction"
  },
  {
    id: 3,
    icon: Film,
    title: "Phase 3: Story Cinema",
    subtitle: "Bringing Stories to Life Through Media",
    duration: "Comprehensive media ecosystem",
    color: "crimson",
    movements: [
      "Cinematic narrative production using regenerated stories",
      "Fundraising support through authentic storytelling",
      "Community building across platforms",
      "Complete media implementation strategy",
      "Movie magic that makes transformation feel inevitable"
    ],
    outcome: "A complete media ecology attracting people into your story across social media, with cinematic content, community magnetism, and storytelling systems that make joining your mission feel inevitable"
  }
];

const transformationResults = [
  {
    title: "Strategic Clarity",
    description: "The story becomes their foundation, guiding all decisions and eliminating scattered energy"
  },
  {
    title: "Natural Marketing", 
    description: "Communication becomes authentic expression rather than promotional manipulation"
  },
  {
    title: "Organic Culture",
    description: "Team culture develops around shared narrative and purpose"
  },
  {
    title: "Regenerative Operations",
    description: "Systems flow from collaborative principles rather than extractive business models"
  },
  {
    title: "Aligned Resources",
    description: "They attract investors, partners, and team members who share their vision"
  },
  {
    title: "Futureproof Your Company",
    description: "Stay ahead of changing culture, AI advancement, and climate challenges by charting the future we want to create"
  }
];

export default function TheSystems() {
  const { isImageReady, getImageSrc } = useImageLoading();
  const [showBackground, setShowBackground] = useState(false);
  const imageReady = isImageReady('systems');
  const systemsBackground = getImageSrc('systems');

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
          backgroundImage: `url(${systemsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.15) contrast(0.8)'
        }}
      />
      
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-deep-black/80" />
      
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold mb-6">
            THE METAMYTH SYSTEM
          </h2>
          <p className="text-2xl text-mystical-teal font-bold mb-4">
            Organizational Story Transformation
          </p>
          <p className="text-xl text-silver max-w-4xl mx-auto leading-relaxed">
            The radical process of reality authorship. We give people back control of their stories, 
            transforming scattered narratives into coherent forces of planetary transformation.
          </p>
        </motion.div>

        {/* System Overview */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-edensor text-2xl font-bold text-ancient-gold mb-4 text-center">
                THE RADICAL PROCESS OF REALITY AUTHORSHIP
              </h3>
              <p className="text-silver leading-relaxed text-center max-w-4xl mx-auto">
                Most organizations operate from scattered narratives written by market forces, investor expectations, 
                and cultural programming rather than their authentic purpose. We connect their deepest mission to a 
                larger planetary story, raising the stakes of what they're doing and connecting people to their 
                highest self while helping them navigate the distance between here and there.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Three Phases */}
        <div className="mb-16">
          <h3 className="font-edensor text-3xl font-bold text-center text-mystical-teal mb-12">
            HOW THE SYSTEM WORKS
          </h3>
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-lg bg-ancient-gold/20 border-2 border-ancient-gold/60 shadow-lg shadow-ancient-gold/30">
                        <phase.icon className="text-ancient-gold text-3xl" style={{ textShadow: '0 0 8px currentColor' }} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={`font-edensor text-2xl font-bold text-${phase.color} mb-2`}>
                          {phase.title}
                        </h4>
                        <p className="text-xl text-silver/80 mb-2 italic">
                          {phase.subtitle}
                        </p>
                        <p className="text-ancient-gold font-bold mb-4">
                          {phase.duration}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="text-ancient-gold font-bold mb-2">Key Elements:</h5>
                            <ul className="space-y-1">
                              {phase.movements.map((movement, idx) => (
                                <li key={idx} className="text-silver/90 text-sm flex items-start gap-2">
                                  <CheckCircle className="text-ancient-gold text-xs mt-1 flex-shrink-0" size={16} />
                                  {movement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-deep-black/60 border-2 border-ancient-gold/60 rounded-lg p-4 shadow-lg shadow-ancient-gold/30">
                            <h5 className="text-ancient-gold font-bold mb-3 text-lg" style={{ textShadow: '0 0 8px currentColor' }}>Outcome:</h5>
                            <p className="text-silver text-base font-medium leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                              {phase.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-edensor text-2xl font-bold text-mystical-teal mb-4 text-center">
                WHO WE SERVE
              </h3>
              <p className="text-silver leading-relaxed text-center max-w-4xl mx-auto">
                Purpose-driven organizations ready to stop playing by someone else's rules and start authoring 
                their own reality. These include conscious entrepreneurs, B-Corp founders, nonprofit leaders, 
                and mission-driven companies who know their work matters but struggle to communicate why in 
                ways that create the response they need.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transformation Results */}
        <div className="mb-16">
          <h3 className="font-edensor text-3xl font-bold text-center text-ancient-gold mb-12">
            THE TRANSFORMATION
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformationResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-deep-black/90 border-2 border-ancient-gold/60 shadow-lg shadow-ancient-gold/40 ring-2 ring-ancient-gold/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-ancient-gold/10 hover:border-ancient-gold/80 hover:shadow-ancient-gold/60 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-ancient-gold mb-3" style={{ textShadow: '0 0 8px currentColor, 2px 2px 4px rgba(0,0,0,0.8)' }}>
                      {result.title}
                    </h4>
                    <p className="text-silver text-sm" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      {result.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Larger Vision */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Globe className="text-crimson text-4xl mr-4" />
                <h3 
                  className="font-edensor text-3xl font-bold text-crimson"
                  style={{ textShadow: '0 0 8px rgba(129, 236, 236, 0.8), 0 0 16px rgba(129, 236, 236, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  THE LARGER VISION
                </h3>
              </div>
              
              <h4 className="text-2xl font-bold text-ancient-gold mb-4">
                Building the New Operating System: MythOS
              </h4>
              
              <p className="text-silver leading-relaxed mb-6 max-w-4xl mx-auto">
                We're creating a world that works for all, where work is an adventure, through a new operating 
                system—MythOS—that makes the process of doing meaningful work into the adventure it deserves. 
                This AI-first platform brings stories to life, guides people along their authentic paths, and 
                enables interconnection with compatible stories.
              </p>
              
              <div className="border-t border-ancient-gold/30 pt-6">
                <p className="text-xl font-bold text-mystical-teal mb-2">
                  The Metamyth System isn't just organizational consulting—
                </p>
                <p className="text-2xl font-bold text-ancient-gold">
                  it's civilizational transformation, one story at a time.
                </p>
              </div>
              
              <div className="mt-8">
                <Button className="bg-crimson hover:bg-crimson/80 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg">
                  BEGIN YOUR METAMYTH JOURNEY <ArrowRight className="ml-2" />
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