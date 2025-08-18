import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ServerCog, Network, Globe } from "lucide-react";

const audienceTypes = [
  {
    title: "Visionary Changemakers",
    description: "Revolutionary thinkers struggling to communicate breakthrough ideas that could transform entire industries or social systems.",
    bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    challenges: "Brilliant concepts trapped in jargon, dismissed as too radical, or failing to gain traction",
    transformation: "Story architecture translates vision into compelling narrative that attracts allies and resources",
    potential: "Movements that shift paradigms, attract funding, build coalitions around new possibilities"
  },
  {
    title: "Purpose-Driven Entrepreneurs",
    description: "Business leaders seeking to align profit with planetary healing, but struggling to articulate their deeper mission.",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    challenges: "Caught between profit pressures and purpose, unable to communicate authentic mission without sounding hollow",
    transformation: "Metamyth methodology reveals the authentic story that naturally integrates impact and income",
    potential: "Regenerative enterprises that prove another economy is possible while maintaining financial sustainability"
  },
  {
    title: "Transforming Organizations",
    description: "Nonprofits, corporations, and institutions ready to evolve beyond extractive patterns into regenerative collaboration.",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    challenges: "Stuck in outdated models, competing for resources, struggling with mission drift or organizational dysfunction",
    transformation: "Organizational metamyth work reveals federation opportunities and authentic collaborative structures",
    potential: "Network effects that multiply impact, collaborative funding models, systemic transformation at scale"
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

export default function StoriesWeTell() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-ancient-gold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STORIES WE TELL
        </motion.h2>
        
        {/* Who We Serve */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {audienceTypes.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-deep-black/50 mystical-border mystical-glow overflow-hidden hover-glow h-full">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${audience.bgImage})` }}
                />
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-edensor text-xl font-bold text-ancient-gold mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-silver/80 text-sm mb-4 flex-grow">
                    {audience.description}
                  </p>
                  <div className="space-y-3 text-xs text-silver/70">
                    <div>
                      <span className="font-bold text-crimson block mb-1">Common Challenges:</span>
                      <p>{audience.challenges}</p>
                    </div>
                    <div>
                      <span className="font-bold text-mystical-teal block mb-1">Our Approach:</span>
                      <p>{audience.transformation}</p>
                    </div>
                    <div>
                      <span className="font-bold text-ancient-gold block mb-1">Potential Unlocked:</span>
                      <p>{audience.potential}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Demonstration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-deep-black/50 mystical-border enhanced-glow">
            <CardContent className="p-8">
              <h3 className="font-edensor text-2xl font-bold text-ancient-gold text-center mb-8">
                Our Process: From Story to System
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`mx-auto w-16 h-16 rounded-full bg-${step.color}/20 flex items-center justify-center mb-4 mystical-glow`}>
                        <IconComponent className={`w-8 h-8 text-${step.color}`} />
                      </div>
                      <h4 className={`font-edensor text-lg font-bold text-${step.color} mb-2`}>
                        {step.title}
                      </h4>
                      <p className="text-silver/80 text-sm">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-silver/80 mb-6 max-w-2xl mx-auto">
                  Whether you're an individual visionary, purpose-driven entrepreneur, or transforming organization, 
                  we meet you where you are and help architect the story that unlocks your authentic power.
                </p>
                <Button className="bg-mystical-teal text-deep-black font-bold py-3 px-8 rounded-lg hover:bg-mystical-teal/80 transition-colors duration-300">
                  Discover Your Story Architecture
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
