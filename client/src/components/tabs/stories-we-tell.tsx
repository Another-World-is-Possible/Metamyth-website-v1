import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ServerCog, Network, Globe } from "lucide-react";

import visionaryShield from "@assets/Screenshot 2025-08-23 at 10.55.55 AM_1755973624457.png";
import visionaryBanner from "@assets/of_course_here_is_the_revised_prompt-_a_luminous_crystalline_banner_waving_in_the_wind_with_ornate__fln51hw0qgjq8z60o21h_1_1755928687790.png";
import visionaryGlobe from "@assets/_visionary_globe-__prompt-_a_luminous_crystalline_globe_with_ornate_art_nouveau_gold_filigree_base__aw6pnmwev2ygzjspd1bk_1_1755928679344.png";

const audienceTypes = [
  {
    title: "Visionary Changemakers",
    description: "Revolutionary thinkers who see the world that's possible but struggle to communicate transformative ideas that could reshape entire systems. These are the pattern-breakers, paradigm-shifters, and evolutionary catalysts whose visions are often dismissed as too radical or impossible.",
    bgImage: visionaryShield,
    challenges: "Brilliant breakthrough concepts trapped in academic jargon, dismissed by conventional thinking, or failing to gain traction despite their transformative potential. Often feeling isolated in their vision.",
    transformation: "Through metamyth methodology, we translate visionary concepts into compelling narrative architecture that makes the impossible feel inevitable and attracts the right allies and resources.",
    potential: "Movements that fundamentally shift how we understand reality, attract significant funding, build powerful coalitions, and create new categories of possibility that didn't exist before."
  },
  {
    title: "Purpose-Driven Entrepreneurs", 
    description: "Business leaders who know there's a better way to do commerce - one that heals rather than extracts - but find themselves caught between profit pressures and authentic purpose. They're building the regenerative economy but need story architecture to communicate their deeper mission.",
    bgImage: visionaryBanner,
    challenges: "Caught between investor expectations and authentic mission, unable to communicate purpose without sounding hollow or naive. Struggling to prove that regenerative business models can be both profitable and transformative.",
    transformation: "Metamyth work reveals the authentic organizational story that naturally integrates impact with income, purpose with profit, showing how regenerative models are actually more sustainable long-term.",
    potential: "Regenerative enterprises that prove another economy is not only possible but more profitable, creating new business models that other entrepreneurs replicate, ultimately shifting how we understand commerce itself."
  },
  {
    title: "Transforming Organizations",
    description: "Nonprofits, corporations, and institutions that have outgrown their original structures and are ready to evolve beyond extractive patterns into regenerative collaboration. These organizations sense they could be part of something much larger.",
    bgImage: visionaryGlobe,
    challenges: "Stuck in outdated organizational models, competing for limited resources, struggling with mission drift, internal dysfunction, or the sense that their impact isn't matching their potential despite good intentions.",
    transformation: "Organizational metamyth work reveals unexpected federation opportunities and authentic collaborative structures that multiply rather than divide impact, creating entirely new models of institutional cooperation.",
    potential: "Network effects that exponentially multiply impact beyond what any single organization could achieve, collaborative funding models that replace competition with coordination, and systemic transformation at the scale our challenges require."
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
        
        {/* Metamyth Divider */}
        <section className="flex justify-center py-16">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>🌱</div>
          </motion.div>
        </section>
        
        {/* Who We Serve */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {audienceTypes.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-deep-black/50 mystical-border mystical-glow overflow-hidden hover-glow">
                <div 
                  className="h-56 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${audience.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-edensor text-2xl font-bold text-ancient-gold mb-4">
                    {audience.title}
                  </h3>
                  <p className="mb-6 leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>
                    {audience.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-crimson mb-2 flex items-center">
                        <span className="w-2 h-2 bg-crimson rounded-full mr-2"></span>
                        Common Challenges
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>{audience.challenges}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-mystical-teal mb-2 flex items-center">
                        <span className="w-2 h-2 bg-mystical-teal rounded-full mr-2"></span>
                        Our Approach
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>{audience.transformation}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-ancient-gold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-ancient-gold rounded-full mr-2"></span>
                        Potential Unlocked
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>{audience.potential}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Metamyth Divider */}
        <section className="flex justify-center py-16">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>⭐</div>
          </motion.div>
        </section>

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
                      <p className="text-sm" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <p className="mb-6 max-w-2xl mx-auto" style={{ color: '#f0f0f0', textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)' }}>
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

        {/* Metamyth Divider */}
        <section className="flex justify-center py-16">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-5xl" style={{ textShadow: '0 0 16px rgba(129, 236, 236, 0.9)' }}>🔥</div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
