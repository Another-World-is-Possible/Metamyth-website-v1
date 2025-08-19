import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Target, Globe, Dna, Network, Building, RotateCcw } from "lucide-react";

const urgencyPoints = [
  {
    icon: Flame,
    title: "The Stakes Are Planetary",
    description: "While the world burns, most organizations waste their voice on meaningless metrics instead of meaningful transformation.",
    color: "crimson"
  },
  {
    icon: Target,
    title: "The Opportunity Is Here", 
    description: "The same consciousness that authored every system destroying our planet can author every system that could heal it.",
    color: "ancient-gold"
  },
  {
    icon: Globe,
    title: "The Power Is Proven",
    description: "Story built civilization. Story can rebuild it. The question remains whose narrative wins.",
    color: "mystical-teal"
  }
];

const audienceTypes = [
  {
    title: "Conscious Founders",
    description: "who have solutions to planetary problems but struggle to cut through noise and reach aligned resources"
  },
  {
    title: "Regenerative Enterprises", 
    description: "drowning in scattered messaging while competitors with worse products but better stories dominate markets"
  },
  {
    title: "Purpose-Driven Leaders",
    description: "ready to stop competing on features and start collaborating toward shared planetary healing"
  },
  {
    title: "Visionary Organizations",
    description: "prepared to author regenerative reality instead of remaining characters in extraction stories"
  }
];

const benefits = [
  {
    title: "Narrative Authority",
    description: "that positions you in planetary collaboration rather than market competition"
  },
  {
    title: "Authentic Magnetism",
    description: "that attracts aligned resources, team members, and community through genuine transformation"
  },
  {
    title: "Purpose Clarity", 
    description: "that eliminates scattered energy and aligns every decision with deeper mission"
  },
  {
    title: "Movement Momentum",
    description: "where customers become communities and transactions become transformations"
  }
];

const scienceConcepts = [
  {
    icon: Dna,
    title: "Mythogenetic Programming",
    description: "Like genes respond to environmental signals, consciousness responds to story signals. The narratives we believe literally program which futures we create.",
    color: "crimson"
  },
  {
    icon: Network,
    title: "Collective Intelligence",
    description: "When compatible stories federate, they generate solutions no individual narrative could produce—emergence applied to planetary healing.",
    color: "mystical-teal"
  },
  {
    icon: Building,
    title: "Reality Architecture", 
    description: "Every institution, system, and cultural form exists as crystallized narrative. Change the story, change the system.",
    color: "ancient-gold"
  },
  {
    icon: RotateCcw,
    title: "Regenerative Economics",
    description: "Purpose-driven organizations consistently outperform profit-focused entities across every metric predicting long-term success because story creates value.",
    color: "silver"
  }
];

const futureRequirements = [
  "Align with authentic purpose rather than artificial metrics",
  "Create value through regeneration rather than extraction",
  "Build communities rather than just customer bases", 
  "Tell stories that serve life rather than serve extraction"
];

export default function WhyStoryMatters() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-edensor text-4xl md:text-6xl font-bold text-crimson mb-8">
            WHY TELL STORIES ON A BURNING PLANET?
          </h1>
          <div className="w-24 h-1 bg-ancient-gold mx-auto mb-8"></div>
        </motion.div>

        {/* Most Urgent Creative Work */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-4">
            The Most Urgent Creative Work of Our Time
          </h2>
          <p className="text-2xl text-mystical-teal text-center font-bold mb-12 italic">
            "Story is species-level intervention."
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {urgencyPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-deep-black/50 mystical-border mystical-glow h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${point.color}/20 flex items-center justify-center mystical-glow`}>
                        <IconComponent className={`w-8 h-8 text-${point.color}`} />
                      </div>
                      <h3 className={`font-edensor text-xl font-bold text-${point.color} mb-3`}>
                        {point.title}
                      </h3>
                      <p className="text-silver/80 leading-relaxed">
                        {point.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Who This Serves */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-8">
            Who This Serves
          </h2>
          <p className="text-xl text-silver/90 text-center mb-8 italic">
            You feel the urgency but lack the narrative technology to create the response you need.
          </p>
          
          <Card className="bg-forest-green/30 border-2 border-forest-green mystical-glow">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {audienceTypes.map((audience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-mystical-teal rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-bold text-mystical-teal">{audience.title}</span>
                      <span className="text-silver/90"> {audience.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-ancient-gold font-bold text-center mt-8 text-lg">
                If you believe another world is possible but haven't mastered how to make that possibility inevitable through story—this work transforms everything.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* What You Gain */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-8">
            What You Gain When Story Serves Life
          </h2>
          
          <Card className="bg-ancient-gold/10 border-2 border-ancient-gold mystical-glow">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-ancient-gold text-xl">✓</span>
                    <div>
                      <span className="font-bold text-ancient-gold">{benefit.title}</span>
                      <span className="text-silver/90"> {benefit.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* The Science Behind Story */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-4">
            The Science Behind Story as Evolutionary Technology
          </h2>
          <p className="text-xl text-silver/90 text-center mb-12 font-bold">
            How consciousness actually works.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scienceConcepts.map((concept, index) => {
              const IconComponent = concept.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card className="bg-deep-black/50 mystical-border mystical-glow h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${concept.color}/20 flex items-center justify-center mystical-glow`}>
                        <IconComponent className={`w-8 h-8 text-${concept.color}`} />
                      </div>
                      <h3 className={`font-edensor text-lg font-bold text-${concept.color} mb-3`}>
                        {concept.title}
                      </h3>
                      <p className="text-silver/80 text-sm leading-relaxed">
                        {concept.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Why Now */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold text-center mb-8">
            Why Now Is The Moment
          </h2>
          <p className="text-xl text-silver/90 text-center mb-8">
            <strong>We're living through the climax of the human story</strong>—the moment when all threads converge in crisis determining consciousness's fate on Earth.
          </p>
          
          <Card className="bg-crimson/10 border-2 border-crimson mystical-glow">
            <CardContent className="p-8">
              <p className="text-lg text-silver/90 mb-6">
                The organizations that thrive in the next economy will be those who:
              </p>
              <div className="space-y-3">
                {futureRequirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-crimson rounded-full flex-shrink-0"></div>
                    <span className="text-silver/90 font-bold">{requirement}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-ancient-gold font-bold text-center mt-8 text-lg">
                The choice is elegant: Keep playing someone else's meaningless game, or start authoring the world your heart knows is possible.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="font-edensor text-3xl md:text-4xl font-bold text-ancient-gold mb-4">
            Ready to Transform Your Scattered Narrative Into Coherent Planetary Force?
          </h2>
          <p className="text-xl text-silver/90 mb-12 font-bold">
            Using humanity's oldest technology to serve humanity's greatest need.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Button className="bg-ancient-gold text-deep-black hover:bg-ancient-gold/80 font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg">
              DISCOVER YOUR METAMYTH
            </Button>
            <Button className="bg-mystical-teal text-deep-black hover:bg-mystical-teal/80 font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg">
              JOIN THE QUEST
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}