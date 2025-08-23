import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const accordionItems = [
  {
    id: "origin",
    title: "THE ORIGIN: THE END OF THE OLD STORY",
    icon: "🌱",
    isNarrative: true,
    narrative: "Once upon a time, a storyteller wandered the earth documenting solutions to humanity's greatest challenges, living his life as conscious narrative while building movements that transformed millions. Across the world, another soul fought through darkness until his vision reached her in her deepest hour. When they found each other beneath distant stars, their love became a beacon drawing forth scattered dreamers and builders who had been searching for the same story in different languages."
  },
  {
    id: "calling",
    title: "I. THE CALL TO ADVENTURE",
    icon: "🐉",
    sectionTitle: "OUR CALLING",
    quote: "All the world's suffering flows from a single source—a story we forgot we wrote.",
    items: [
      "THE DRAGON: A broken story—a species destroying its only home for a story of money, a story of power, demonstrating narrative's transformative potential by nearly ending the world.",
      "THE THRESHOLD: Being so broken by meaninglessness we physically couldn't function in the extraction system—our breakdown became our qualification.",
      "THE SHIELD: The trauma that forged integrity, protecting us from being absorbed into fake stories so we could shield others from narrative colonization.",
      "THE PEARL: Understanding that consciousness can reprogram itself—we live in mythogenetic sequences that can be consciously evolved from fear/contraction to love/expansion through story technology."
    ]
  },
  {
    id: "quest",
    title: "II. THE QUEST",
    icon: "⭐",
    sectionTitle: "OUR QUEST",
    quote: "We wield the most ancient technology powered by modern magic: Write your reality, play it like the ultimate game, film it into existence to attract people into your quest.",
    items: [
      "THE STAR: Restore story to its rightful place as consciousness technology—the primordial force that turns scattered tribes into civilizations.",
      "THE CHARACTER: Purpose-driven visionaries ready to author reality rather than suffer it—the \"we\" identity of planetary-scale storytellers serving the story, not profit or competition.",
      "THE BANNER: We are planetary-scale storytellers—positioning ourselves not in market competition but as architects of the next phase of human evolution through conscious narrative.",
      "THE SWORD: Story itself—humanity's most ancient technology powered by modern magic, the specific action we take to cut through illusion and strike at the heart of transformation."
    ]
  },
  {
    id: "possible",
    title: "III. WHAT IS POSSIBLE",
    icon: "🔮",
    sectionTitle: "OUR VISION",
    quote: "A world where work becomes adventure, purpose literally pays, and regenerative collaboration outperforms extractive competition.",
    items: [
      "THE LOOKING GLASS: We transform work into quest, purpose into profit, customers into communities, scattered efforts into coordinated transformation.",
      "THE TRANSFORMATION: From extraction to regeneration across all systems—the identity change that enables and results from following purpose fully.",
      "THE GLOBE: A cooperative federation of semi-autonomous, interconnected organizations woven together like tapestry—each thread distinct yet part of a greater pattern.",
      "THE MAP: Building complete story infrastructure that scales—from individual story regeneration to organizational transformation to planetary coordination."
    ]
  },
  {
    id: "journey",
    title: "IV. THE JOURNEY",
    icon: "⛲",
    sectionTitle: "OUR MISSION",
    quote: "We build the complete story system that helps purpose-driven visionaries discover their authentic narrative, sequence it into functional tools, and federate with aligned stories to solve planetary challenges.",
    items: [
      "THE FOUNTAIN: Our abundance of storytelling magic, vision, and purpose that we urgently need to give away—too much story technology requiring people to join the quest.",
      "THE ETHOS: We serve the story—when story becomes currency, individual success requires collective flourishing. We are each other's resources.",
      "THE PLOT: Our current mission—build a company, crystallize our service offering, get back together, assemble the best storytellers in the world.",
      "THE COMPASS: Eight-dimensional navigation across all forms of capital—Purpose, Vision, Truth, Community, Creativity, Systems, Economy-Ecology, Story."
    ]
  },
  {
    id: "request",
    title: "V. THE RE-QUEST",
    icon: "🏆",
    sectionTitle: "OUR CALL TO ACTION",
    quote: "Calling the next generation of storytellers ready to stop being characters in someone else's extraction story and start authoring the regenerative reality your heart knows is possible.",
    items: [
      "THE GRAIL: Metamyth regeneration technology—the transformation we went through becomes our gift, the specific process that sequences scattered narratives into coherent forces.",
      "THE INITIATION: Our journey from meaningless extraction to purposeful regeneration mapped as others' pathway—the specific process that transforms strangers into allies.",
      "THE CAMPFIRE: Spiral community where people advance through meaningful contribution across eight forms of value—the radial system where everyone becomes characters in shared planetary story.",
      "THE INVITATION: Join the storytellers building the new world through conscious narrative architecture."
    ]
  },
  {
    id: "legacy",
    title: "LEGACY: THE STORY TOLD AROUND FUTURE CAMPFIRES",
    icon: "🔥",
    items: [
      "\"Can you believe they had the hardest challenge humanity ever faced—the end of meaning itself—yet they fought for everyone and won?\"",
      "\"Can you imagine people used to work as slaves to fake money instead of adventuring with friends for purpose?\"",
      "\"Why didn't they just walk away from the bad game sooner? Well, they finally did. That's why we live free.\"",
      "The legacy we create: Unremarkable wisdom in a remarkably beautiful world."
    ]
  }
];

export default function OurMetamyth() {
  return (
    <div className="bg-forest-green py-20 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-angle text-4xl md:text-6xl font-bold shimmer-text text-center mb-16"
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
                    <h3 className="font-angle text-xl font-bold text-ancient-gold text-left">
                      {item.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 border-t border-mystical-teal/30">
                  <div className="space-y-6">
                    {item.isNarrative ? (
                      <motion.p 
                        className="font-game text-lg leading-relaxed"
                        style={{
                          color: '#f0f0f0',
                          textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.narrative}
                      </motion.p>
                    ) : (
                      <>
                        {item.sectionTitle && (
                          <motion.h4 
                            className="font-angle text-2xl font-bold text-ancient-gold"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.sectionTitle}
                          </motion.h4>
                        )}
                        {item.quote && (
                          <motion.blockquote 
                            className="font-game text-xl font-semibold text-mystical-teal italic border-l-4 border-ancient-gold pl-6 py-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            "{item.quote}"
                          </motion.blockquote>
                        )}
                        {item.items && (
                          <div className="space-y-4">
                            {item.items.map((text, itemIndex) => (
                              <motion.p 
                                key={itemIndex}
                                className="font-game flex items-start"
                                style={{
                                  color: '#f0f0f0',
                                  textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)'
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: itemIndex * 0.1 + 0.2 }}
                              >
                                <span className="text-mystical-teal mr-3 mt-1">•</span>
                                {text}
                              </motion.p>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>


      </div>
    </div>
  );
}
