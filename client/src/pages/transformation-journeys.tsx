import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SharedNavigation from "@/components/shared-navigation";
import { useLocation } from "wouter";
import cosmicPathwayBg from "@assets/cosmic_pathway_bg.png";

export default function TransformationJourneysPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black text-amber-100">
      <SharedNavigation />
      
      {/* Cosmic pathway background */}
      <div 
        className="fixed inset-0 opacity-60"
        style={{
          backgroundImage: `url(${cosmicPathwayBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-angle text-6xl md:text-8xl mb-8 text-gradient-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              METAMYTH JOURNEY
            </motion.h1>
            
            <motion.h2 
              className="font-thornelia text-2xl md:text-4xl mb-12 text-amber-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Rewrite Your Life Story in 7 Weeks
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-lg leading-relaxed font-emerland max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p className="text-xl font-semibold text-amber-300">
                Take back control of your narrative. Transform from background character to author of reality while building the future we're all here to live.
              </p>
              <p>
                The oldest technology powered by modern magic. A system to reprogram your future and reclaim your story from the forces that have kept you playing small. Join the pioneers authoring the new world story.
              </p>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Button 
                onClick={() => navigate('/journey-selection?tier=changemakers')}
                className="cta-button-base bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black text-xl px-12 py-6 shadow-[0_0_25px_rgba(72,196,196,0.5)]"
                data-testid="button-claim-author-seat-top"
              >
                CLAIM YOUR AUTHOR'S SEAT
              </Button>
            </motion.div>
          </div>
        </section>

        {/* The Calling Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="font-angle text-4xl md:text-6xl mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE CALLING
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-2xl md:text-3xl mb-8 text-center text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The World Demands We Become Who It Needs Us to Be
            </motion.h3>
            
            <motion.div 
              className="space-y-6 text-lg leading-relaxed font-emerland"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                We cannot stay stuck in this old story. It's destroying everything we know and burning the best years of our lives. Every moment we wait, every moment we remain trapped in someone else's narrative, is an entire future that doesn't happen.
              </p>
              <p>
                The real urgency isn't linear—it's exponential. Every day we languish in the old story brings us closer to global ruin and further from the amazing world and life we could be living if we wrote our stories.
              </p>
              <p>
                You've outgrown the story you're living. Whether you're a successful leader questioning your legacy, a conscious entrepreneur struggling to express your vision, a changemaker whose ideas get ignored, or someone who feels completely stuck in meaningless routine—the pattern is the same: you're living someone else's narrative instead of authoring your own.
              </p>
              <p>
                The symptoms show up everywhere. Life feels meaningless, like we are living in a world we didn't choose. Your livelihood feels disconnected from your purpose. You feel powerless—or you know you are capable of more than the story you're in allows. You can't communicate your vision powerfully enough to attract the resources it deserves. You feel powerless watching the world spiral while your potential stays locked away. Your obstacles define you instead of qualifying you to help others transform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The MetaMyth Solution */}
        <section className="py-20 px-4 bg-black/30">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="font-angle text-4xl md:text-6xl mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE METAMYTH SOLUTION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-2xl md:text-3xl mb-12 text-center text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Five Movements That Restructure Reality
            </motion.h3>
            
            <motion.div 
              className="grid gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                {
                  title: "The Calling",
                  description: "transforms your deepest struggles into cosmic qualifications, revealing how your wounds become the wisdom the world desperately needs."
                },
                {
                  title: "The Quest", 
                  description: "aligns your scattered energy with your North Star purpose, the magnetic force that guides every decision and attracts aligned opportunities."
                },
                {
                  title: "The Vision",
                  description: "charts your evolutionary path from current reality to planetary impact, expanding what you thought possible in your lifetime."
                },
                {
                  title: "The Mission",
                  description: "crafts living systems that turn dreams into inevitable outcomes through regenerative approaches that make your purpose profitable."
                },
                {
                  title: "The Request",
                  description: "teaches you to magnetize community and resources, bringing your transformation home to change the world around you."
                }
              ].map((movement, index) => (
                <motion.div 
                  key={movement.title}
                  className="bg-black/40 p-6 rounded-lg border-2 border-[hsl(178,65%,45%)] shadow-[0_0_15px_rgba(72,196,196,0.3)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-thornelia text-xl md:text-2xl mb-4 text-[hsl(178,65%,45%)]">
                    {movement.title}
                  </h4>
                  <p className="font-emerland text-lg leading-relaxed text-amber-200">
                    {movement.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p 
              className="mt-12 text-lg leading-relaxed font-emerland text-center text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              This progression turns breakdown into breakthrough, obstacles into qualifications, and individual healing into planetary service. You emerge knowing exactly why you're here and how to make that purpose pay while serving the collective transformation.
            </motion.p>
          </div>
        </section>

        {/* Reality Authors in Action */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="font-angle text-4xl md:text-6xl mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              REALITY AUTHORS IN ACTION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-2xl md:text-3xl mb-12 text-center text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transformations That Changed Everything
            </motion.h3>
            
            <motion.div 
              className="grid gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                {
                  name: "Michael Haupt",
                  transformation: "transformed from warning about civilizational collapse to leading innovator at the end of normal. Immediately got 3,000 views on his first video telling his new story with 60 sign-ups to his webinar. The life-changing revelation helped make sense of his messed-up life and reconnected him to his purpose."
                },
                {
                  name: "J Friday",
                  transformation: "evolved from struggling entrepreneur to first ever fulfillionaire of the wellbeing economy. Went from living in her car to having a global community and a world-changing mission with millions of views on content and funds raised from her passion—all from remembering that she is the storyteller."
                },
                {
                  name: "Steve Keen",
                  transformation: "shifted from academic exile to economic revolutionary, reshaping how the world thinks about money. We helped Steve create an entire blueprint for the new economy and his institution, immediately fundraising $15,000 from his engaged community and attracting 10 volunteers in one webinar."
                },
                {
                  name: "Ryan Tomlinson",
                  transformation: "moved from successful benevolent cultural disruptor to pollinator of the planetary scale renaissance. Thought he was successful in living his vision, until our session \"blew his mind\" and revealed that his definitions of success were just the beginning—an epic journey lay ahead of him."
                },
                {
                  name: "Zachary Marlow",
                  transformation: "originator of Another World Is Possible, turned a failed suicide attempt into the revelation that life is a story and we hold the pen. This became a global adventure across 6 continents with story as his only currency, creating a global network with thousands of friends and collaborators, engaging hundreds of thousands of people through content, attracting the most beautiful and talented fiancé you can imagine, and growing an organization with hundreds of volunteers who changed their life's purpose."
                }
              ].map((author, index) => (
                <motion.div 
                  key={author.name}
                  className="bg-black/40 p-6 rounded-lg border-2 border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-thornelia text-xl md:text-2xl mb-4 text-[hsl(45,85%,55%)]">
                    {author.name}
                  </h4>
                  <p className="font-emerland text-lg leading-relaxed text-amber-200">
                    {author.transformation}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg leading-relaxed font-emerland text-amber-200 font-semibold">
                Every single person who has gone through this system has experienced something major shifting in their life, if not everything. The transformation is inevitable when you commit to the process and take back your story.
              </p>
              <p className="font-angle text-3xl md:text-4xl text-gradient-gold font-bold">
                Taking back your story can change lives, systems, reality
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-black/30">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="font-angle text-4xl md:text-6xl mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THREE PATHWAYS TO AUTHORSHIP
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                {
                  title: "SEEKERS",
                  subtitle: "Discovering your authentic story",
                  features: [
                    "Weekly community calls",
                    "Forum access",
                    "Complete MetaMyth guide",
                    "Self-organizing peer connections"
                  ],
                  description: "Perfect for exploration mode when you need community support to uncover your deeper purpose."
                },
                {
                  title: "CHANGEMAKERS",
                  subtitle: "Intensive transformation",
                  features: [
                    "Everything Seekers receive",
                    "Curated story circles of 4-6 people",
                    "Weekly feedback calls with guides",
                    "Midweek mixers",
                    "Community facilitation training"
                  ],
                  description: "Designed for people ready for deep accountability and intimate transformation.",
                  highlight: true
                },
                {
                  title: "WORLD BUILDERS",
                  subtitle: "Scaling transformation to planetary impact",
                  features: [
                    "Exclusive mastermind for established leaders",
                    "All previous benefits",
                    "Strategic consultation",
                    "Direct facilitator access",
                    "Protégé scholarship selection"
                  ],
                  description: "For established leaders with brands, companies, and world-changing visions."
                }
              ].map((pathway, index) => (
                <motion.div 
                  key={pathway.title}
                  className={`bg-black/50 p-8 rounded-lg border-2 ${
                    pathway.highlight 
                      ? 'border-[hsl(178,65%,45%)] shadow-[0_0_20px_rgba(72,196,196,0.4)]' 
                      : 'border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  } relative hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {pathway.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[hsl(178,65%,45%)] text-black px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="font-angle text-2xl md:text-3xl mb-4 text-gradient-gold">
                      {pathway.title}
                    </h3>
                    <p className="font-emerland text-base text-amber-200 italic">
                      {pathway.subtitle}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6 font-emerland">
                    {pathway.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`mr-2 ${pathway.highlight ? 'text-[hsl(178,65%,45%)]' : 'text-[hsl(45,85%,55%)]'}`}>✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="font-emerland text-sm leading-relaxed text-amber-200 mb-6">
                    {pathway.description}
                  </p>
                  
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      const tierMap: { [key: string]: string } = {
                        'SEEKERS': 'seekers',
                        'CHANGEMAKERS': 'changemakers', 
                        'WORLD BUILDERS': 'worldbuilders'
                      };
                      const tierParam = tierMap[pathway.title] || 'changemakers';
                      navigate(`/journey-selection?tier=${tierParam}`);
                    }}
                    className={`w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 relative z-10 cursor-pointer ${
                      pathway.highlight 
                        ? 'bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black shadow-[0_0_15px_rgba(72,196,196,0.4)]' 
                        : 'bg-[hsl(45,85%,55%)]/60 hover:bg-[hsl(45,85%,55%)]/80 text-black border border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.4)] font-bold'
                    }`}
                    data-testid={`button-select-${pathway.title.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      background: pathway.highlight ? undefined : 'hsla(45, 85%, 55%, 0.6)',
                      color: pathway.highlight ? undefined : 'black',
                      border: pathway.highlight ? undefined : '1px solid hsl(45, 85%, 55%)',
                      fontWeight: pathway.highlight ? undefined : 'bold',
                      pointerEvents: 'auto' // Ensure buttons are clickable
                    }}
                  >
                    JOIN {pathway.title}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="font-angle text-4xl md:text-6xl mb-8 text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE MOMENT OF DECISION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-2xl md:text-3xl mb-8 text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              First Community Cohort - Only 50 Spots - Last Opportunity This Year
            </motion.h3>
            
            <motion.div 
              className="space-y-6 text-lg leading-relaxed font-emerland mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                We're taking only 50 people through this inaugural community cohort. This is your chance to join the founding adventurers in the new world, the first community of reality authors who chose to stop living someone else's story.
              </p>
              <p className="text-amber-300 font-semibold">
                The future we dream of is one story away.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                onClick={() => navigate('/journey-selection?tier=changemakers')}
                className="bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black text-2xl px-12 py-6 font-semibold rounded-lg shadow-[0_0_25px_rgba(72,196,196,0.5)] transition-all duration-300"
                data-testid="button-claim-author-seat"
              >
                CLAIM YOUR AUTHOR'S SEAT
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}