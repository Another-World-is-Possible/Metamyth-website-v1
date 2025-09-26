import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layouts/page-layout";
import { useLocation } from "wouter";
import cosmicPathwayBg from "@assets/cosmic_pathway_bg.png";

export default function TransformationJourneysPage() {
  const [, navigate] = useLocation();

  return (
    <PageLayout hideFooter={true} className="bg-black">
      {/* Cosmic pathway background */}
      <div 
        className="fixed inset-0 opacity-60 z-0"
        style={{
          backgroundImage: `url(${cosmicPathwayBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-amber-100">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-8 sm:py-0">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 text-gradient-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              METAMYTH JOURNEY
            </motion.h1>
            
            <motion.h2 
              className="font-thornelia text-lg sm:text-2xl md:text-4xl mb-8 sm:mb-12 text-amber-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Rewrite Your Life Story in 7 Weeks
            </motion.h2>
            
            <motion.div 
              className="space-y-4 sm:space-y-6 text-sm sm:text-lg leading-relaxed font-emerland max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p className="text-base sm:text-xl font-semibold text-amber-300">
                Take back control of your narrative. Transform from background character to author of reality while building the future we're all here to live.
              </p>
              <p>
                The oldest technology powered by modern magic. A system to reprogram your future and reclaim your story from the forces that have kept you playing small. Join the pioneers authoring the new world story.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Button 
                onClick={() => navigate('/journey-selection?tier=changemakers')}
                className="cta-button-base bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black text-base sm:text-xl px-6 sm:px-12 py-4 sm:py-6 shadow-[0_0_25px_rgba(72,196,196,0.5)]"
                data-testid="button-claim-author-seat-top"
              >
                CLAIM YOUR AUTHOR'S SEAT
              </Button>
            </motion.div>
          </div>
        </section>

        {/* The Calling Section */}
        <section className="py-12 sm:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE CALLING
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-center text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The World Demands We Become Who It Needs Us to Be
            </motion.h3>
            
            <motion.div 
              className="space-y-4 sm:space-y-6 text-sm sm:text-lg leading-relaxed font-emerland"
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
        <section className="py-12 sm:py-20 px-6 bg-black/30">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE METAMYTH SOLUTION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-12 text-center text-amber-200"
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
                  className="bg-black/40 p-4 sm:p-6 rounded-lg border-2 border-[hsl(178,65%,45%)] shadow-[0_0_15px_rgba(72,196,196,0.3)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-thornelia text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[hsl(178,65%,45%)]">
                    {movement.title}
                  </h4>
                  <p className="font-emerland text-sm sm:text-lg leading-relaxed text-amber-200">
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
        <section className="py-12 sm:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              REALITY AUTHORS IN ACTION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-12 text-center text-amber-200"
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
                  className="bg-black/40 p-4 sm:p-6 rounded-lg border-2 border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-thornelia text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[hsl(45,85%,55%)]">
                    {author.name}
                  </h4>
                  <p className="font-emerland text-sm sm:text-lg leading-relaxed text-amber-200">
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
        <section className="py-12 sm:py-20 px-6 bg-black/30">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 text-center text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Two Ways to Transform Your Story
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-lg leading-relaxed font-emerland text-center text-amber-200 mb-8 sm:mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Choose the path that matches where you are and where you're ready to go. Both lead to the same destination: living the epic story you were meant to tell.
            </motion.p>
            
            {/* Tier 1: METAMYTH TRANSFORMATION */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/50 p-4 sm:p-8 rounded-lg border-2 border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.3)] relative">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="font-angle text-xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-gradient-gold">
                    METAMYTH TRANSFORMATION
                  </h3>
                  <p className="font-emerland text-sm sm:text-lg text-amber-200 italic mb-4 sm:mb-6">
                    Complete Story Transformation Through Community
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Option A */}
                  <div className="bg-black/30 p-4 sm:p-6 rounded-lg border border-[hsl(45,85%,55%)]/50">
                    <h4 className="font-thornelia text-lg sm:text-xl mb-3 sm:mb-4 text-[hsl(45,85%,55%)]">
                      Option A: $700 + Your Gifts
                    </h4>
                    <p className="font-emerland text-amber-200 mb-3 sm:mb-4 italic text-sm sm:text-base">
                      Perfect for changemakers ready to contribute beyond money
                    </p>
                    <ul className="space-y-2 mb-4 font-emerland text-sm">
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>7-week complete transformation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>Contribution of skills, time and gifts to advance the mission</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>Self-guided community with expert facilitation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>All frameworks and materials</span>
                      </li>
                    </ul>
                    <Button 
                      onClick={() => navigate('/journey-selection?tier=metamyth-gifts')}
                      className="w-full py-3 text-xs font-semibold rounded-lg bg-[hsl(45,85%,55%)]/60 hover:bg-[hsl(45,85%,55%)]/80 text-black border border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.4)] font-bold"
                      data-testid="button-join-metamyth-gifts"
                    >
                      JOIN METAMYTH - $700 + CONTRIBUTION
                    </Button>
                  </div>

                  {/* Option B */}
                  <div className="bg-black/30 p-4 sm:p-6 rounded-lg border border-[hsl(45,85%,55%)]/50">
                    <h4 className="font-thornelia text-lg sm:text-xl mb-3 sm:mb-4 text-[hsl(45,85%,55%)]">
                      Option B: <span className="mr-2">$1,000</span><span className="line-through text-amber-200/50 text-sm sm:text-lg">$1,200</span> Full Investment
                    </h4>
                    <p className="font-emerland text-amber-200 mb-3 sm:mb-4 italic text-sm sm:text-base">
                      For those ready to dive in completely
                    </p>
                    <ul className="space-y-2 mb-4 font-emerland text-sm">
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>Same transformation, no additional contribution required</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>Complete focus on your story evolution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>All community features and materials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[hsl(45,85%,55%)] mr-2">✦</span>
                        <span>Access to observe Legend sessions</span>
                      </li>
                    </ul>
                    <Button 
                      onClick={() => navigate('/journey-selection?tier=metamyth-full')}
                      className="w-full py-3 text-xs font-semibold rounded-lg bg-[hsl(45,85%,55%)]/60 hover:bg-[hsl(45,85%,55%)]/80 text-black border border-[hsl(45,85%,55%)] shadow-[0_0_15px_rgba(255,215,0,0.4)] font-bold"
                      data-testid="button-join-metamyth-full"
                    >
                      <span className="mr-2">JOIN METAMYTH - $1,000</span><span className="line-through text-black/60 text-sm">$1,200</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tier 2: HERO'S CIRCLE */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-black/50 p-4 sm:p-8 rounded-lg border-2 border-[hsl(178,65%,45%)] shadow-[0_0_20px_rgba(72,196,196,0.4)] relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[hsl(178,65%,45%)] text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  LIMITED TO 15 VISIONARIES
                </div>
                
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="font-angle text-xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-gradient-teal">
                    HERO'S CIRCLE
                  </h3>
                  <p className="font-emerland text-sm sm:text-lg text-amber-200 italic mb-2">
                    Direct Mentorship & Elite Peer Community
                  </p>
                  <p className="font-thornelia text-lg sm:text-2xl text-[hsl(178,65%,45%)] mb-4 sm:mb-6">
                    $2,000 - Application Required
                  </p>
                </div>
                
                <p className="font-emerland text-amber-200 mb-6 text-center">
                  For visionaries ready for direct mentorship and peer community at the highest level
                </p>
                
                <div className="mb-6">
                  <h4 className="font-thornelia text-xl mb-4 text-[hsl(178,65%,45%)]">
                    What Makes This Extraordinary:
                  </h4>
                  <ul className="space-y-3 font-emerland">
                    {[
                      "Direct story feedback from me personally every week",
                      "3 intensive calls weekly with immediate access to guidance",
                      "Elite peer group of 14 other epic visionaries (two intimate sub-groups)",
                      "Founding cohort pricing - this rate will never be offered again",
                      "Partnership opportunity to help scale this transformation globally"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-[hsl(178,65%,45%)]">✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-thornelia text-xl mb-4 text-[hsl(178,65%,45%)]">
                    This is for you if:
                  </h4>
                  <ul className="space-y-2 font-emerland">
                    {[
                      "You're already doing significant work in the world",
                      "You want direct access and immediate feedback on your story",
                      "You're ready to be part of our founding community",
                      "You're willing to share your transformation to inspire others"
                    ].map((criteria, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-[hsl(178,65%,45%)]">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => navigate('/journey-selection?tier=heroes-circle')}
                  className="w-full py-3 text-sm font-semibold rounded-lg bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black shadow-[0_0_15px_rgba(72,196,196,0.4)] transition-all duration-300"
                  data-testid="button-apply-heroes-circle"
                >
                  APPLY - HERO'S CIRCLE $2,000
                </Button>
              </div>
            </motion.div>

            
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="font-angle text-2xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 text-gradient-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              THE MOMENT OF DECISION
            </motion.h2>
            
            <motion.h3 
              className="font-thornelia text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-amber-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              First Community Cohort - Only 50 Spots - Last Opportunity This Year
            </motion.h3>
            
            <motion.div 
              className="space-y-4 sm:space-y-6 text-sm sm:text-lg leading-relaxed font-emerland mb-8 sm:mb-12"
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
                onClick={() => navigate('/journey-selection?tier=metamyth-transformation')}
                className="bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black text-base sm:text-2xl px-6 sm:px-12 py-4 sm:py-6 font-semibold rounded-lg shadow-[0_0_25px_rgba(72,196,196,0.5)] transition-all duration-300"
                data-testid="button-claim-author-seat"
              >
                START YOUR TRANSFORMATION
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}