import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ServerCog, Network, Globe } from "lucide-react";

const transformations = [
  {
    title: "The Regenerative Entrepreneur",
    description: "From burnout to breakthrough: How one founder used metamyth principles to transform their startup into a regenerative force.",
    bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    startingPoint: "Stuck in extractive business model",
    transformation: "Discovered authentic purpose-driven narrative",
    outcomes: "300% revenue growth, team alignment, planetary impact"
  },
  {
    title: "The Federated Organization",
    description: "How a traditional nonprofit transformed into a story-driven movement that coordinates multiple organizations.",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    startingPoint: "Siloed efforts, competition for resources",
    transformation: "Organizational metamyth revealed federation potential",
    outcomes: "5x partner network, collaborative funding, systemic impact"
  },
  {
    title: "The Reality Film Project",
    description: "Turning personal transformation into cinematic storytelling that attracts resources and builds community.",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    startingPoint: "Personal vision without platform",
    transformation: "Story architecture became film project",
    outcomes: "Funded film, speaking opportunities, movement building"
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
          className="font-edensor text-4xl md:text-6xl font-bold shimmer-text text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STORIES WE TELL
        </motion.h2>
        
        {/* Featured Transformations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {transformations.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-deep-black/50 mystical-border mystical-glow overflow-hidden hover-glow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.bgImage})` }}
                />
                <CardContent className="p-6">
                  <h3 className="font-edensor text-xl font-bold text-ancient-gold mb-3">
                    {story.title}
                  </h3>
                  <p className="text-silver/80 text-sm mb-4">
                    {story.description}
                  </p>
                  <div className="space-y-2 text-xs text-silver/60 mb-4">
                    <p>
                      <span className="font-bold text-mystical-teal">Starting Point:</span> {story.startingPoint}
                    </p>
                    <p>
                      <span className="font-bold text-mystical-teal">Transformation:</span> {story.transformation}
                    </p>
                    <p>
                      <span className="font-bold text-mystical-teal">Outcomes:</span> {story.outcomes}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-mystical-teal font-bold text-sm hover:text-ancient-gold transition-colors duration-300 p-0"
                  >
                    Read Full Story →
                  </Button>
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
                How Metamyth Regeneration Works
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  >
                    <div className={`w-16 h-16 bg-${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="text-deep-black text-2xl" />
                    </div>
                    <h4 className={`font-bold text-${step.color} mb-2`}>
                      {step.title}
                    </h4>
                    <p className="text-silver/80 text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
