import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Building2, Network } from "lucide-react";

const offerings = [
  {
    icon: User,
    title: "INDIVIDUAL METAMYTH",
    price: "$2,497",
    color: "mystical-teal",
    features: [
      "Personal story regeneration through 5 movements",
      "20+ artifacts sequenced for life navigation",
      "Complete metamyth guide and implementation", 
      "Ongoing community access"
    ],
    process: "8-week guided journey + lifetime system access",
    scale: false
  },
  {
    icon: Building2,
    title: "ORGANIZATIONAL METAMYTH", 
    price: "$24,997",
    color: "ancient-gold",
    features: [
      "Complete story infrastructure for teams",
      "Organizational story regeneration",
      "Team alignment through shared narrative",
      "Strategic repositioning for authentic authority"
    ],
    process: "12-week transformation + ongoing integration",
    scale: true
  },
  {
    icon: Network,
    title: "FEDERATION BUILDING",
    price: "$100,000+",
    color: "crimson",
    features: [
      "Multi-organization story coordination",
      "Shared resource pooling systems", 
      "Cooperative economic architecture",
      "Planetary mission alignment"
    ],
    process: "6-month federation development + ecosystem integration",
    scale: false
  }
];

const assessmentQuestions = [
  {
    question: "What scale transformation are you seeking?",
    options: [
      "Personal story regeneration and life navigation",
      "Organizational transformation and team alignment", 
      "Multi-organization federation and planetary coordination"
    ]
  },
  {
    question: "How do you value story infrastructure investment?",
    options: [
      "Essential foundation for authentic transformation",
      "Interesting but need to see proven results first",
      "Seeking lowest-cost entry point to test approach"
    ]
  },
  {
    question: "Are you prepared for cosmic responsibility?",
    options: [
      "Yes, I serve the story over personal extraction",
      "Learning what this means for my specific context",
      "Still focused primarily on personal/organizational benefits"
    ]
  },
  {
    question: "Do you want to serve the story or extract from it?",
    options: [
      "Committed to regenerative collaboration over competition",
      "Open to new economic models but need practical examples",
      "Primarily seeking competitive advantage and profit maximization"
    ]
  }
];

export default function TheSystems() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold text-gradient-gold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE SYSTEMS
        </motion.h2>
        
        {/* Service Offerings */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={offering.scale ? "transform scale-105" : ""}
            >
              <Card className={`bg-deep-black/50 border border-${offering.color}/30 hover-glow`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <offering.icon className={`text-${offering.color} text-4xl mb-4 mx-auto`} />
                    <h3 className={`font-edensor text-2xl font-bold text-${offering.color} mb-2`}>
                      {offering.title}
                    </h3>
                    <p className={`text-${offering.color} font-bold text-2xl`}>
                      {offering.price}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 text-silver text-sm mb-8">
                    {offering.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className={`text-${offering.color} mr-2 mt-0.5 h-4 w-4 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`bg-${offering.color}/10 border border-${offering.color}/30 p-4 rounded mb-6`}>
                    <p className={`text-${offering.color} font-bold text-sm mb-1`}>Process:</p>
                    <p className="text-silver/80 text-sm">{offering.process}</p>
                  </div>
                  
                  <Button 
                    className={`w-full bg-${offering.color} text-deep-black font-bold py-3 rounded-lg hover:opacity-80 transition-opacity duration-300`}
                  >
                    {index === 0 && "Begin Your Metamyth"}
                    {index === 1 && "Transform Your Organization"}
                    {index === 2 && "Build Your Federation"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Assessment Framework */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-deep-black/50 border border-ancient-gold/30">
            <CardContent className="p-8">
              <h3 className="font-edensor text-2xl font-bold text-ancient-gold text-center mb-8">
                Are You Ready for Reality Architecture?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {assessmentQuestions.map((question, questionIndex) => (
                  <motion.div
                    key={questionIndex}
                    initial={{ opacity: 0, x: questionIndex % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + questionIndex * 0.1 }}
                  >
                    <h4 className="font-bold text-mystical-teal mb-3">
                      {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label 
                          key={optionIndex}
                          className="flex items-start text-silver text-sm cursor-pointer hover:text-ancient-gold transition-colors duration-300"
                        >
                          <input 
                            type="radio" 
                            name={`question-${questionIndex}`}
                            className="mr-3 mt-1 accent-mystical-teal"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button className="bg-ancient-gold text-deep-black font-bold py-3 px-8 rounded-lg hover-glow transition-all duration-300">
                  Get Your Readiness Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
