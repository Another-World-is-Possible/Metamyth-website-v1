import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Users, Film, Globe, CheckCircle, ArrowRight } from "lucide-react";

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
    outcome: "Complete Metamyth distilled into five core statements, plus comprehensive Story Living Guide"
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
    outcome: "Complete coherence between who they are and how they operate"
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
    outcome: "Compelling visual media that attracts people into the organization's quest"
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
  return (
    <div className="relative bg-forest-green py-20 pt-32 overflow-hidden">
      {/* Constellation Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Constellation nodes */}
          <circle cx="150" cy="150" r="3" fill="#3EEECB" className="animate-pulse" />
          <circle cx="300" cy="100" r="2" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '0.5s'}} />
          <circle cx="500" cy="200" r="4" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '1s'}} />
          <circle cx="700" cy="120" r="3" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '1.5s'}} />
          <circle cx="900" cy="180" r="2" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '2s'}} />
          <circle cx="1050" cy="140" r="3" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '0.3s'}} />
          
          <circle cx="200" cy="350" r="3" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '0.8s'}} />
          <circle cx="400" cy="400" r="4" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '1.3s'}} />
          <circle cx="600" cy="350" r="2" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '1.8s'}} />
          <circle cx="800" cy="420" r="3" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '2.3s'}} />
          <circle cx="1000" cy="380" r="3" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '0.6s'}} />
          
          <circle cx="100" cy="600" r="2" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '1.1s'}} />
          <circle cx="350" cy="650" r="3" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '1.6s'}} />
          <circle cx="550" cy="600" r="4" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '2.1s'}} />
          <circle cx="750" cy="680" r="2" fill="#D4AF37" className="animate-pulse" style={{animationDelay: '0.4s'}} />
          <circle cx="950" cy="620" r="3" fill="#3EEECB" className="animate-pulse" style={{animationDelay: '0.9s'}} />
          
          {/* Energy flow lines */}
          <path d="M150 150 Q225 125 300 100" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.2s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M300 100 Q400 150 500 200" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.7s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="10s" repeatCount="indefinite" />
          </path>
          <path d="M500 200 Q600 160 700 120" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1.2s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="12s" repeatCount="indefinite" />
          </path>
          <path d="M700 120 Q800 150 900 180" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1.7s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="9s" repeatCount="indefinite" />
          </path>
          
          {/* Vertical connections */}
          <path d="M200 350 Q300 275 400 200" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.5" className="animate-pulse" style={{animationDelay: '0.9s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="11s" repeatCount="indefinite" />
          </path>
          <path d="M600 350 Q650 275 700 200" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" className="animate-pulse" style={{animationDelay: '1.4s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="13s" repeatCount="indefinite" />
          </path>
          <path d="M400 400 Q475 500 550 600" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.5" className="animate-pulse" style={{animationDelay: '1.9s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="14s" repeatCount="indefinite" />
          </path>
          
          {/* Cross connections */}
          <path d="M150 150 Q175 250 200 350" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.4" className="animate-pulse" style={{animationDelay: '2.4s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="15s" repeatCount="indefinite" />
          </path>
          <path d="M800 420 Q875 520 950 620" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.4" className="animate-pulse" style={{animationDelay: '0.1s'}}>
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="16s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      
      {/* Energy connections through content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 1000" fill="none">
          {/* Flowing energy through main content areas */}
          <path d="M600 200 Q650 350 600 500 Q550 650 600 800" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="12s" repeatCount="indefinite" />
          </path>
          <path d="M100 300 Q300 320 500 300 Q700 280 900 300 Q1100 320 1200 300" stroke="#3EEECB" strokeWidth="1.5" fill="none" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="15s" repeatCount="indefinite" />
          </path>
          <path d="M200 600 Q400 580 600 600 Q800 620 1000 600" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="18s" repeatCount="indefinite" />
          </path>
          
          {/* Radial energy emanating from center */}
          <circle cx="600" cy="400" r="150" stroke="#3EEECB" strokeWidth="1" fill="none" opacity="0.3">
            <animate attributeName="r" values="150;180;150" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="400" r="250" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.2">
            <animate attributeName="r" values="250;280;250" dur="10s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.05;0.2" dur="10s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 z-10">
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
          <Card className="relative bg-deep-black/80 rounded-lg border-2 border-ancient-gold/70 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(29,66,65,0.3) 50%, rgba(0,0,0,0.9) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), inset 0 -1px 0 rgba(212,175,55,0.1), 0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(62,238,203,0.1)',
            borderImage: 'linear-gradient(45deg, #D4AF37, #3EEECB, #D4AF37) 1'
          }}>
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
                <Card className="relative bg-deep-black/80 rounded-lg border-2 border-ancient-gold/70 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm" style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(29,66,65,0.3) 50%, rgba(0,0,0,0.9) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), inset 0 -1px 0 rgba(212,175,55,0.1), 0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(62,238,203,0.1)',
                  borderImage: 'linear-gradient(45deg, #D4AF37, #3EEECB, #D4AF37) 1'
                }}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-lg border-2 border-ancient-gold/60 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm" style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(62,238,203,0.1) 50%, rgba(212,175,55,0.2) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), 0 0 15px rgba(212,175,55,0.2)'
                      }}>
                        <phase.icon className="text-mystical-teal text-3xl" style={{ textShadow: '0 0 8px currentColor' }} />
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
                            <h5 className="text-mystical-teal font-bold mb-2">Key Elements:</h5>
                            <ul className="space-y-1">
                              {phase.movements.map((movement, idx) => (
                                <li key={idx} className="text-silver/90 text-sm flex items-start gap-2">
                                  <CheckCircle className="text-ancient-gold text-xs mt-1 flex-shrink-0" size={16} />
                                  {movement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="rounded-lg border-2 border-ancient-gold/60 p-4 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm" style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(29,66,65,0.4) 50%, rgba(0,0,0,0.8) 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), inset 0 -1px 0 rgba(212,175,55,0.1), 0 0 15px rgba(212,175,55,0.2)'
                          }}>
                            <h5 className="text-mystical-teal font-bold mb-3 text-lg" style={{ textShadow: '0 0 8px currentColor' }}>Outcome:</h5>
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
          <Card className="relative bg-deep-black/80 rounded-lg border-2 border-ancient-gold/70 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(29,66,65,0.3) 50%, rgba(0,0,0,0.9) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), inset 0 -1px 0 rgba(212,175,55,0.1), 0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(62,238,203,0.1)',
            borderImage: 'linear-gradient(45deg, #D4AF37, #3EEECB, #D4AF37) 1'
          }}>
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
                <Card className="relative bg-deep-black/80 rounded-lg border-2 border-ancient-gold/70 shadow-lg shadow-ancient-gold/30 backdrop-blur-sm h-full hover:shadow-ancient-gold/50 hover:border-ancient-gold/90 transition-all duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(29,66,65,0.3) 50%, rgba(0,0,0,0.9) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.3), inset 0 -1px 0 rgba(212,175,55,0.1), 0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(62,238,203,0.1)',
                  borderImage: 'linear-gradient(45deg, #D4AF37, #3EEECB, #D4AF37) 1'
                }}>
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
          <Card className="bg-deep-black/50 mystical-border enhanced-glow">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Globe className="text-crimson text-4xl mr-4" />
                <h3 className="font-edensor text-3xl font-bold text-crimson">
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
              
              <div className="border-t border-mystical-teal/30 pt-6">
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
  );
}