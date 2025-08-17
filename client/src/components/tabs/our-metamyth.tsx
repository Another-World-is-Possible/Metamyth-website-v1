import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const accordionItems = [
  {
    id: "origin",
    title: "THE ORIGIN: THE COSMIC SETUP",
    icon: "🌟",
    items: [
      "Our Core Programming: Storytellers who've walked 6 continents",
      "Our Foundational Influences: Indigenous wisdom + emergent technology", 
      "Our Pivotal Incident: Recognizing extraction's hold on narrative",
      "Our Innate Essence: Reality architects and consciousness weavers"
    ]
  },
  {
    id: "calling",
    title: "THE CALLING: THE PLANETARY WOUND",
    icon: "🐉",
    items: [
      "The Dragon: The extraction economy destroying our only home",
      "The Threshold: Our breakdown becoming breakthrough qualification",
      "The Shield: Protecting others from narrative colonization",
      "The Pearl: Wisdom that individual healing serves collective healing"
    ]
  },
  {
    id: "quest",
    title: "THE QUEST: OUR COSMIC ASSIGNMENT",
    icon: "⭐",
    items: [
      "The Star: Restore story to its rightful place as consciousness technology",
      "The Character: Purpose-driven visionaries ready to author reality",
      "The Banner: We serve the story, not profit or competition",
      "The Sword: Metamyth system that sequences stories into functional tools"
    ]
  },
  {
    id: "possible",
    title: "WHAT IS POSSIBLE: THE WORLD WE'RE BUILDING",
    icon: "🔮",
    items: [
      "The Looking Glass: Work becomes adventure, purpose pays, collaboration wins",
      "The Transformation: From extraction to regeneration across all systems",
      "The Globe: Planetary federation of conscious organizations",
      "The Map: Three horizons of scaling transformation"
    ]
  },
  {
    id: "journey",
    title: "THE JOURNEY: OUR MISSION IN ACTION",
    icon: "⛲",
    items: [
      "The Fountain: Our actual resources and growing federation",
      "The Ethos: We serve the story, value flows to regeneration",
      "The Plot: Building complete story infrastructure for transformation",
      "The Compass: Eight currencies enabling multi-capital accounting"
    ]
  },
  {
    id: "request",
    title: "THE RE-QUEST: CALLING OUR KINDRED",
    icon: "🏆",
    items: [
      "The Grail: Complete metamyth system for reality architecture",
      "The Initiation: From individual transformation to planetary coordination",
      "The Campfire: Federation of storytellers changing reality",
      "The Messages: Specific calls to action for different readiness levels"
    ]
  }
];

export default function OurMetamyth() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-6xl font-bold shimmer-text text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          OUR METAMYTH
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-6">
            {accordionItems.map((item, index) => (
              <AccordionItem 
                key={item.id}
                value={item.id}
                className="bg-deep-black/50 mystical-border mystical-glow rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="hover:bg-mystical-teal/10 transition-colors duration-300 p-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-edensor text-xl font-bold text-ancient-gold text-left">
                      {item.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 border-t border-mystical-teal/30">
                  <div className="space-y-4">
                    {item.items.map((text, itemIndex) => (
                      <motion.p 
                        key={itemIndex}
                        className="text-silver flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                      >
                        <span className="text-mystical-teal mr-3 mt-1">•</span>
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xl text-silver mb-6">Ready to create your own metamyth?</p>
          <Button className="bg-ancient-gold text-deep-black font-bold py-4 px-8 rounded-lg hover-glow transition-all duration-300 text-lg">
            PURCHASE THE METAMYTH GUIDE - $497
          </Button>
          <p className="text-sm text-silver/60 mt-4">Complete system for regenerating your authentic story</p>
        </motion.div>
      </div>
    </div>
  );
}
