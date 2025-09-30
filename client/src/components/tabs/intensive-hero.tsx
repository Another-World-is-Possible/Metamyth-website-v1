import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Users, Film, CheckCircle, ExternalLink } from "lucide-react";
import { useImageLoading } from "@/contexts/ImageLoadingContext";

import visionaryShield from "@assets/visionary_shield_optimized.jpg";
import visionaryBanner from "@assets/of_course_here_is_the_revised_prompt-_a_luminous_crystalline_banner_waving_in_the_wind_with_ornate__fln51hw0qgjq8z60o21h_1_1755928687790.png";
import visionaryGlobe from "@assets/_visionary_globe-__prompt-_a_luminous_crystalline_globe_with_ornate_art_nouveau_gold_filigree_base__aw6pnmwev2ygzjspd1bk_1_1755928679344.png";

const whoThisServes = [
  {
    title: "Leaders Ready to Play a Bigger Game",
    description: "Success achieved, yet the sense remains this is just the beginning. What becomes possible when storytelling matches what's being built?",
    bgImage: visionaryShield
  },
  {
    title: "Visionaries Making the Impossible Real",
    description: "Clear calling, undeniable drive—needing story architecture and systems to manifest fully and communicate in ways that create inevitable response.",
    bgImage: visionaryBanner
  },
  {
    title: "Professionals Seeking What Comes After Success",
    description: "The game won, the exit achieved, the ladder climbed. Now: what makes all this matter? What story is worth living?",
    bgImage: visionaryGlobe
  }
];

const transformationPhases = [
  {
    id: 1,
    icon: Compass,
    title: "Phase One: The Metamyth Journey",
    subtitle: "Cracking Open the Narrative Foundation",
    duration: "90-minute intensive session",
    description: "In 90 minutes, we crack open the possibility space of your entire story. This isn't casual conversation—this is high-leverage work that restructures the narrative foundation of everything you're building.",
    elements: [
      "We excavate the crisis that called this work into existence",
      "We align scattered energy with the North Star",
      "We expand vision beyond what seemed possible",
      "We craft the living systems that turn dreams into inevitable outcomes",
      "We design how others discover their role in your story"
    ],
    outcome: "Complete metamyth with five foundational statements that become your North Star—the story architecture making everything else possible."
  },
  {
    id: 2,
    icon: Users,
    title: "Phase Two: The Story Living Intensive",
    subtitle: "Weaving Story Into All Operations",
    duration: "Multi-day deep dive",
    description: "Multi-day deep dive where story becomes living system woven into every aspect of your operations. We create 22 living artifacts that transform abstract narrative into practical decision-making tools.",
    elements: [
      "22 living artifacts become practical tools for decision-making",
      "Chart the course forward with strategy to actually live your story",
      "AI as living mission intelligence trained on your complete metamyth",
      "Create context-rich content that keeps you and your team aligned",
      "Every piece of communication becomes extension of the foundational story"
    ],
    outcome: "Full transformation where story isn't just told but embodied by everyone touching the work. Culture becomes self-organizing around shared narrative. Operations become regenerative."
  },
  {
    id: 3,
    icon: Film,
    title: "Phase Three: Story Cinema",
    subtitle: "Making Transformation Visible",
    duration: "Comprehensive media ecosystem",
    description: "Comprehensive media ecosystem using cinematic narrative to make transformation feel inevitable. We create fundraising support through authentic storytelling, build community magnetism across platforms.",
    elements: [
      "Cinematic narrative production using regenerated stories",
      "Fundraising support through authentic storytelling",
      "Community building across platforms",
      "Complete media implementation strategy",
      "Movie magic that helps people believe another world is possible"
    ],
    outcome: "Complete media ecology attracting people into your story. Your story becomes visible evidence that the future you're building is already taking form."
  }
];

const testimonials = [
  {
    name: "Michael Haupt",
    result: "Transformed from warning about civilizational collapse to leading innovator at the end of normal. First video: 3,000 views, 60 webinar sign-ups. Wrote a 30,000-word book in three weeks."
  },
  {
    name: "J Friday",
    result: "Evolved from struggling entrepreneur living in her car to first-ever fulfillionaire of the wellbeing economy—global community, millions of views, funds raised from passion."
  },
  {
    name: "Steve Keen",
    result: "Shifted from academic exile to economic revolutionary. We created his institutional blueprint, immediately generating $15,000 in funding and attracting 10 volunteers in one session."
  },
  {
    name: "Crystal",
    result: "\"Where you see the vision of my story is so much grander than what my mind had initially thought. I could tap into that expanded space of bigger possibility.\""
  },
  {
    name: "Zachary Marlow",
    result: "Turned a failed suicide attempt into the revelation that life is a story and we hold the pen. This became a global adventure across 6 continents, creating a network with thousands of collaborators."
  }
];

export default function IntensiveHero() {
  const { isImageReady, getImageSrc } = useImageLoading();
  const [showBackground, setShowBackground] = useState(false);
  const imageReady = isImageReady('systems');
  const systemsBackground = getImageSrc('systems');

  useEffect(() => {
    setShowBackground(false);
    const timer = setTimeout(() => {
      if (imageReady) {
        setShowBackground(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [imageReady]);

  if (!imageReady) {
    return (
      <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(120, 80%, 2%)' }}>
        <div className="text-ancient-gold font-angle">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background image with filter */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
          showBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${systemsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.5) contrast(1.0)'
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-deep-black/40" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-10">
          
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="typography-h1 text-ancient-gold mb-6 font-angle" style={{ textShadow: '0 0 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 0, 0, 0.7), 0 0 32px rgba(0, 0, 0, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
              INTENSIVE METAMYTH TRANSFORMATION
            </h1>
            <h2 className="typography-h2 text-mystical-teal mb-4 font-angle" style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.75), 0 0 16px rgba(0, 0, 0, 0.7)' }}>
              Story Architecture for Planetary Impact
            </h2>
            <p className="typography-lead text-cream-white max-w-4xl mx-auto leading-relaxed font-emerland italic" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
              From background character in someone else's plot to author of reality itself.
            </p>
            <div className="mt-8">
              <a 
                href="https://zcal.co/i/nIEsikdu" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-xl px-8 py-6"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  SCHEDULE YOUR STRATEGY SESSION
                </Button>
              </a>
            </div>
          </motion.div>

          {/* The Calling Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="typography-h2 font-bold text-ancient-gold mb-6 text-center">
                  THE CALLING
                </h3>
                <div className="space-y-4 text-cream-white font-emerland leading-relaxed text-lg" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                  <p>The world is burning. Systems designed for abundance create scarcity. Economic mythologies devour the living world. The stories holding civilization together reveal themselves as precisely what's tearing it apart.</p>
                  <p>We're living through the climax of the old story—the moment when everything built on extraction and competition reaches its natural conclusion. Leaders discover the ladders they climbed lean against collapsing walls. Professionals win games that reveal themselves as meaningless. Organizations doing good work can't break through the noise. Visionaries carry solutions the world desperately needs but can't seem to make real.</p>
                  <p>The crisis is both planetary and personal. The gap between who we are and who we're meant to be grows unbearable. Work that should feel meaningful drains the soul. Resources that should flow remain stuck. People who should naturally find us require convincing. Teams that should unite around mission operate from fragmented narratives.</p>
                  <p className="font-bold text-ancient-gold">We're stuck in the wrong story.</p>
                  <p>Living in plots we never chose, performing roles others wrote, competing in races to the bottom while the world burns.</p>
                  <p className="font-bold text-mystical-teal">But here's what the crisis reveals: we're not victims of this story. We're its authors. And what we've written, we can rewrite.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Quest Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="typography-h2 font-bold text-ancient-gold mb-6 text-center">
                  THE QUEST
                </h3>
                <div className="space-y-4 text-cream-white font-emerland leading-relaxed text-lg" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                  <p className="font-bold text-mystical-teal text-xl">Are you living your story or someone else's?</p>
                  <p>Most people never ask. They remain background characters in plots they never chose. But you're reading this, which means you've started questioning. You sense the gap. You know you're made for more.</p>
                  <p className="font-bold">Here's what changes everything:</p>
                  <p>Every dollar flowing to you comes through your story. Every person joining your mission enters through your narrative. The motivation getting you up, the coherence enabling you to lead, the capacity to transform systems—all emerge from story architecture powerful enough to support what you're here to create.</p>
                  <p>This is the highest leverage work possible. Get the foundational story right, and everything else becomes significantly easier. Skip this architecture, and spend years pushing instead of attracting, convincing instead of magnetizing, grinding instead of flowing.</p>
                  <p className="font-bold text-ancient-gold">Our work: help you discover what you're actually here for and give you back authorship.</p>
                  <p>To help you write your own evolution, plot your own arc into the future we're creating together. This goes beyond storytelling as communication. This is story as the technology of transformation itself—creating reality rather than reacting to it.</p>
                  <p>Purpose-driven approaches consistently outperform across every metric that matters. But without story architecture, that remains unrealized potential. When story aligns with actual capacity, everything shifts. The planetary scale becomes visible. The cosmic resources become accessible. The transformation becomes inevitable.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Who This Serves - Image Cards */}
          <div className="mb-16">
            <h3 className="typography-h2 font-bold text-center text-mystical-teal mb-12 font-angle">
              WHO THIS SERVES
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {whoThisServes.map((audience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 overflow-hidden hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 h-full">
                    <div 
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${audience.bgImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="typography-h3 font-bold text-ancient-gold mb-4">
                        {audience.title}
                      </h4>
                      <p className="text-lg leading-relaxed text-cream-white font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                        {audience.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Who This Serves */}
            <motion.div
              className="mt-8 grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40">
                <CardContent className="p-6">
                  <h4 className="typography-h3 font-bold text-ancient-gold mb-4">
                    Purpose-Driven Organizations Scaling Impact
                  </h4>
                  <p className="text-lg leading-relaxed text-cream-white font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                    Already doing meaningful work. Ready for story architecture that naturally attracts aligned resources while creating unified mission.
                  </p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40">
                <CardContent className="p-6">
                  <h4 className="typography-h3 font-bold text-ancient-gold mb-4">
                    Personal Brands Building Movements
                  </h4>
                  <p className="text-lg leading-relaxed text-cream-white font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                    Platform built, audience engaged, but impact could be exponentially larger. Ready to transform following into movement, transaction into transformation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* The Vision Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="typography-h2 font-bold text-ancient-gold mb-6 text-center">
                  THE VISION
                </h3>
                <div className="space-y-4 text-cream-white font-emerland leading-relaxed text-lg" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                  <p>Imagine waking up knowing exactly why you're here. Scattered threads suddenly coherent. No more questioning whether you're on the right path—you are the path.</p>
                  <p className="font-bold text-mystical-teal">The people and resources you need flow naturally.</p>
                  <p>Not through chasing or convincing, but because your story calls to those meant to find you. Prospects become partners. Transactions become transformations.</p>
                  <p className="font-bold text-mystical-teal">Your team operates from shared narrative.</p>
                  <p>Everyone knows not just what they do but why it matters. Culture becomes self-organizing. Decisions that used to require endless meetings now resolve through alignment with the larger arc.</p>
                  <p className="font-bold text-mystical-teal">The vision you've been carrying—the one that felt too big, too impossible—suddenly reveals itself as exactly the right size.</p>
                  <p>Not shrinking dreams to fit current capacity, but expanding capacity to match actual calling.</p>
                  <p className="font-bold text-ancient-gold">Work becomes the epic adventure it was meant to be.</p>
                  <p>Busyness transforms into flow. Marketing becomes movement. Branding becomes worldbuilding—crafting the mythologies that weave the culture of the future.</p>
                  <p className="text-xl font-bold text-mystical-teal">You're no longer background character in a story you didn't write. You're the author, creating the reality you came here to build.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Mission - Three Phases */}
          <div className="mb-16">
            <h3 className="typography-h2 font-bold text-center text-ancient-gold mb-12 font-angle">
              THE MISSION
            </h3>
            
            <div className="space-y-8">
              {transformationPhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-lg bg-ancient-gold/20 border-2 border-ancient-gold/60 shadow-lg shadow-ancient-gold/30">
                          <phase.icon className="text-ancient-gold text-3xl" style={{ textShadow: '0 0 8px currentColor' }} />
                        </div>

                        <div className="flex-1">
                          <h4 className="typography-h3 text-ancient-gold mb-2 font-angle">
                            {phase.title}
                          </h4>
                          <p className="text-2xl text-mystical-teal mb-2 italic font-emerland">
                            {phase.subtitle}
                          </p>
                          <p className="text-xl text-ancient-gold font-bold mb-4 font-angle">
                            {phase.duration}
                          </p>

                          <p className="text-lg text-cream-white mb-4 font-emerland leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                            {phase.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="text-xl text-ancient-gold font-bold mb-2 font-angle">Key Elements:</h5>
                              <ul className="space-y-1">
                                {phase.elements.map((element, idx) => (
                                  <li key={idx} className="text-cream-white/90 text-lg flex items-start gap-2 font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                                    <CheckCircle className="text-ancient-gold text-xs mt-1 flex-shrink-0" size={16} />
                                    {element}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-deep-black/60 border-2 border-ancient-gold rounded-lg p-4 shadow-lg shadow-ancient-gold/50">
                              <h5 className="text-ancient-gold font-bold mb-3 text-xl font-angle" style={{ textShadow: '0 0 8px currentColor' }}>Outcome:</h5>
                              <p className="text-cream-white text-lg font-medium leading-relaxed font-emerland" style={{ textShadow: '0 0 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.75), 0 0 12px rgba(0,0,0,0.7)' }}>
                                {phase.outcome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA after phases */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a 
                href="https://zcal.co/i/nIEsikdu" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-xl px-8 py-6"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  SCHEDULE YOUR STRATEGY SESSION
                </Button>
              </a>
            </motion.div>
          </div>

          {/* The Request Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="typography-h2 font-bold text-ancient-gold mb-6 text-center">
                  THE REQUEST
                </h3>
                <div className="space-y-4 text-cream-white font-emerland leading-relaxed text-lg" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                  <p>This work serves those ready to invest significantly in foundational transformation—intensive, personalized work that restructures reality itself, custom scoped to your needs and timeline.</p>
                  <p>Whether you're a leader seeking deeper alignment, a professional who's succeeded and now asks "what's next?", a personal brand ready to scale impact, a visionary making the impossible real, or an organization unifying around mission—if you know you're made for more and you're ready to author that reality, this conversation is for you.</p>
                  <p className="font-bold text-mystical-teal">In the strategy session, we'll explore what's possible and design the right intensive for your journey.</p>
                  <p className="italic">If you're moving at a slower pace or engaging with story at an earlier stage, our community transformation journeys may serve you better.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reality Authors in Action */}
          <div className="mb-16">
            <h3 className="typography-h2 font-bold text-center text-ancient-gold mb-12 font-angle">
              REALITY AUTHORS IN ACTION
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <h4 className="typography-h3 font-bold text-ancient-gold mb-3">
                        {testimonial.name}
                      </h4>
                      <p className="text-lg leading-relaxed text-cream-white font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7)' }}>
                        {testimonial.result}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-2xl text-mystical-teal font-bold mt-8 font-angle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Every person who commits to this work experiences something major shifting—if not everything.
            </motion.p>
          </div>

          {/* Final CTA */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <p className="typography-h2 text-mystical-teal mb-8 font-angle italic">
              The future we dream is one story away.
            </p>
            <a 
              href="https://zcal.co/i/nIEsikdu" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-xl px-8 py-6"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                SCHEDULE YOUR STRATEGY SESSION
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
