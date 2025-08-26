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
          className="font-angle text-4xl md:text-6xl font-bold text-ancient-gold text-center mb-16"
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
              <Card className={`bg-deep-black/50 border border-${stat.color}/30 text-center hover-glow`}>
                <CardContent className="p-6">
                  <stat.icon className={`text-${stat.color} text-3xl mb-4 mx-auto`} />
                  <h3 className={`font-bold text-${stat.color} mb-2`}>
                    {stat.title}
                  </h3>
                  <p className="text-cream-white/80 text-sm mb-3">
                    {stat.value}
                  </p>
                  <Button 
                    variant="ghost"
                    className={`text-${stat.color} text-sm hover:text-ancient-gold transition-colors duration-300 p-0`}
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
          <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 hover:border-[#81ecec]/80 hover:shadow-[#81ecec]/60 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-angle text-2xl font-bold text-ancient-gold text-center mb-8">
                Initiation Pathway
              </h3>
              
              <Card className="bg-forest-green/50 border border-mystical-teal/30">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h4 className="font-angle text-2xl font-bold text-mystical-teal mb-4">
                        METAMYTH GUIDE
                      </h4>
                      <p className="text-ancient-gold font-bold text-2xl mb-4">$497</p>
                      <ul className="space-y-2 text-cream-white text-sm mb-6">
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
                        <p className="text-mystical-teal font-bold text-sm">Outcome:</p>
                        <p className="text-cream-white/80 text-sm">
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
                className={`bg-deep-black/50 border border-${pathway.color}/30 hover-glow`}
              >
                <CardContent className="p-6">
                  <pathway.icon className={`text-${pathway.color} text-2xl mb-4`} />
                  <h4 className={`font-bold text-${pathway.color} mb-3`}>
                    {pathway.title}
                  </h4>
                  <p className="text-cream-white/80 text-sm mb-4">
                    {pathway.description}
                  </p>
                  <Button 
                    variant="ghost"
                    className={`text-${pathway.color} text-sm hover:text-ancient-gold transition-colors duration-300 p-0`}
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
