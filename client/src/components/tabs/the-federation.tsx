import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Compass, Share2, Star, GraduationCap, Film, Crown, Map } from "lucide-react";

const communityStats = [
  {
    icon: Users,
    title: "Current Storytellers",
    value: "147 active federation members",
    color: "mystical-teal",
    action: "View Profiles"
  },
  {
    icon: Compass,
    title: "Active Quests",
    value: "23 collaborative projects seeking participants", 
    color: "ancient-gold",
    action: "Join Quest"
  },
  {
    icon: Share2,
    title: "Resource Sharing",
    value: "$2.4M in resources flowing through network",
    color: "crimson",
    action: "Explore Resources"
  },
  {
    icon: Star,
    title: "Story Discoveries",
    value: "New metamyths shared weekly",
    color: "silver",
    action: "Discover Stories"
  }
];

const advancedPathways = [
  {
    icon: GraduationCap,
    title: "Metamyth Facilitation",
    description: "Learn to guide others through organizational story regeneration",
    color: "ancient-gold"
  },
  {
    icon: Film,
    title: "Story Platform Collaboration", 
    description: "Help build the platform showcasing the world's best transformation stories",
    color: "mystical-teal"
  },
  {
    icon: Crown,
    title: "Federation Leadership",
    description: "Coordinate multi-organization collaborations and resource flows",
    color: "crimson"
  },
  {
    icon: Map,
    title: "Regional Quest Coordination",
    description: "Discover and connect purpose-driven projects in your bioregion",
    color: "silver"
  }
];

export default function TheFederation() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="typography-h1 text-ancient-gold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE FEDERATION
        </motion.h2>
        
        {/* Community Structure */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-[#81ecec]/10 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-[#81ecec]/15 via-deep-black/80 to-[#81ecec]/20 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 text-center hover-glow">
                <CardContent className="p-6">
                  <stat.icon className="text-ancient-gold mb-4 mx-auto" style={{fontSize: '3rem'}} />
                  <h3 className="font-angle font-bold text-ancient-gold mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-cream-white/80 mb-3" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    {stat.value}
                  </p>
                  <Button 
                    variant="ghost"
                    className="text-ancient-gold hover:text-mystical-teal transition-colors duration-300 p-0"
                  >
                    {stat.action} →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Initiation Pathway */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-[#81ecec]/10 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-[#81ecec]/15 via-deep-black/80 to-[#81ecec]/20 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="typography-h3 text-ancient-gold text-center mb-8">
                Initiation Pathway
              </h3>
              
              <Card className="bg-[#81ecec]/10 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-[#81ecec]/15 via-deep-black/80 to-[#81ecec]/20 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h4 className="typography-h3 text-mystical-teal mb-4">
                        METAMYTH GUIDE
                      </h4>
                      <p className="text-ancient-gold font-bold typography-h3 mb-4">$497</p>
                      <ul className="space-y-2 text-cream-white mb-6" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                        <li className="flex items-start">
                          <span className="text-mystical-teal mr-2">✓</span>
                          Complete self-guided story regeneration system
                        </li>
                        <li className="flex items-start">
                          <span className="text-mystical-teal mr-2">✓</span>
                          Community support and feedback
                        </li>
                        <li className="flex items-start">
                          <span className="text-mystical-teal mr-2">✓</span>
                          Implementation templates and tools
                        </li>
                        <li className="flex items-start">
                          <span className="text-mystical-teal mr-2">✓</span>
                          Pathway into active federation
                        </li>
                      </ul>
                      <div className="bg-mystical-teal/10 border border-mystical-teal/30 p-4 rounded">
                        <p className="text-mystical-teal font-bold">Outcome:</p>
                        <p className="text-cream-white/80">
                          Your complete metamyth + community integration
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button className="bg-mystical-teal text-deep-black font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300">
                        Begin Your Journey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Pathways */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedPathways.map((pathway, index) => (
              <Card 
                key={index}
                className={`bg-[#81ecec]/10 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-[#81ecec]/15 via-deep-black/80 to-[#81ecec]/20 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 hover-glow ${
                  pathway.color === 'crimson' ? 'border-crimson/30' :
                  pathway.color === 'mystical-teal' ? 'border-mystical-teal/30' :
                  pathway.color === 'ancient-gold' ? 'border-ancient-gold/30' : 'border-cream-white/30'
                }`}
              >
                <CardContent className="p-6">
                  <pathway.icon className="text-ancient-gold mb-4" style={{fontSize: '2rem'}} />
                  <h4 className={`font-bold mb-3 ${
                    pathway.color === 'crimson' ? 'text-crimson' :
                    pathway.color === 'mystical-teal' ? 'text-mystical-teal' :
                    pathway.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-cream-white'
                  }`}>
                    {pathway.title}
                  </h4>
                  <p className="text-cream-white/80 mb-4" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    {pathway.description}
                  </p>
                  <Button 
                    variant="ghost"
                    className="text-ancient-gold hover:text-mystical-teal transition-colors duration-300 p-0"
                  >
                    {index === 0 && "Learn More →"}
                    {index === 1 && "Join Platform →"}
                    {index === 2 && "Apply Now →"}
                    {index === 3 && "Start Coordinating →"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
