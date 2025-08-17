import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveTimeline from "@/components/ui/interactive-timeline";

const horizons = [
  {
    id: 1,
    title: "HORIZON 1: FOUNDATION",
    subtitle: "2024-2027 - Building the Story Technologies",
    color: "ancient-gold",
    items: [
      "Developing MythOS operating system",
      "Creating MetaMyth AI architecture", 
      "Establishing core story infrastructure",
      "Testing complete metamyth process"
    ],
    status: "Current Trial: Launching the story technologies"
  },
  {
    id: 2,
    title: "HORIZON 2: THE ADVENTURE SPREADS",
    subtitle: "2027-2032 - Creating the Platform of Stories",
    color: "mystical-teal",
    items: [
      "Building platform showcasing the world's best stories",
      "Weaving them together into cooperative federation",
      "Creating synergistic regenerative economic system", 
      "Establishing virtuous cycle of story-based economics"
    ],
    status: "Victory: Demonstrating regenerative economics at scale"
  },
  {
    id: 3,
    title: "HORIZON 3: PLANETARY",
    subtitle: "2032-2040 - The New Story Becomes Undeniable",
    color: "crimson",
    items: [
      "Stories we showcase become obvious superior option",
      "MetaMyth system interactive and playable worldwide",
      "People find their quests and federate together",
      "Global movements emerging from story coherence"
    ],
    status: "Ultimate Vision: Species connected through story-based collaboration"
  }
];

export default function TheQuest() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-gradient-gold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE QUEST
        </motion.h2>
        
        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InteractiveTimeline />
        </motion.div>

        {/* Horizon Details */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {horizons.map((horizon, index) => (
            <motion.div
              key={horizon.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className={`bg-forest-green/50 border border-${horizon.color}/30 hover-glow`}>
                <CardContent className="p-6">
                  <h3 className={`font-edensor text-2xl font-bold text-${horizon.color} mb-4`}>
                    {horizon.title}
                  </h3>
                  <p className="text-silver/80 mb-4 text-sm">{horizon.subtitle}</p>
                  <ul className="space-y-2 text-silver text-sm mb-4">
                    {horizon.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className={`text-${horizon.color} mr-2`}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`p-3 bg-${horizon.color}/10 rounded border-l-4 border-${horizon.color}`}>
                    <p className={`text-${horizon.color} text-sm font-bold`}>
                      {horizon.status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Current Chapter */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-deep-black/50 border border-ancient-gold/30">
            <CardContent className="p-8">
              <h3 className="font-edensor text-2xl font-bold text-ancient-gold mb-6 text-center">
                WHERE WE ARE NOW
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-mystical-teal mb-3">What We're Building:</h4>
                  <p className="text-silver text-sm">
                    The foundational story technologies that will power the next phase of human collaboration and planetary healing.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-mystical-teal mb-3">What We Need:</h4>
                  <p className="text-silver text-sm">
                    Visionary partners ready for reality architecture and committed to serving the story over extraction.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
                <Button className="bg-mystical-teal text-deep-black font-bold py-3 px-6 rounded-lg hover-glow transition-all duration-300">
                  <span className="mr-2">👥</span>
                  JOIN OUR COMMUNITY
                </Button>
                <Button className="bg-ancient-gold text-deep-black font-bold py-3 px-6 rounded-lg hover-glow transition-all duration-300">
                  <span className="mr-2">📖</span>
                  GET THE METAMYTH GUIDE - $497
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-crimson text-crimson font-bold py-3 px-6 rounded-lg hover:bg-crimson hover:text-white transition-all duration-300"
                >
                  <span className="mr-2">🤝</span>
                  BECOME A PARTNER
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
