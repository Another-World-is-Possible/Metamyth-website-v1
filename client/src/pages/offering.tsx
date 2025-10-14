import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function Offering() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Prevent navigation away from this page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="min-h-screen bg-deep-black text-cream-white relative overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-deep-black via-forest-green/5 to-deep-black pointer-events-none" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-32"
        >
          <h1 className="font-display text-6xl md:text-8xl text-ancient-gold mb-8 leading-tight">
            THE METAMYTH
          </h1>
          <p className="font-game text-2xl md:text-3xl text-mystical-teal">
            The Future You Dream Is One Story Away
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-sm text-ancient-gold/60">Scroll to begin</span>
          <div className="w-6 h-10 border-2 border-ancient-gold/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-ancient-gold/60 rounded-full"
            />
          </div>
        </motion.div>

        {/* THE ORIGIN */}
        <Section title="THE ORIGIN" subtitle="The Cosmic Context">
          <p className="mb-6">Most people are living someone else's story.</p>
          
          <p className="mb-6">
            Going through the motions in lives they never chose. Working jobs that drain their souls. 
            Following blueprints handed down without question. Their struggles feel random. Their gifts go unused. 
            Deep down, they know they're meant for something more—but the path stays hidden beneath the noise.
          </p>
          
          <p className="mb-6">
            It's not just personal. Organizations built with purpose lose it beneath quarterly pressures. 
            Businesses succeed by every metric yet feel hollow. Teams execute without knowing why it matters.
          </p>
          
          <p className="mb-6">
            And it's bigger than that. The structures shaping our world—nations, corporations, money, markets—all 
            started as stories that became reality. The solutions of yesterday have calcified into the dragons of today.
          </p>
          
          <p className="mb-6 text-mystical-teal font-semibold">
            Here's the greatest struggle of all: we are powerful beyond measure. We're just stuck in the wrong story.
          </p>
          
          <p className="mb-6">
            We're at the climax of the human story. The old stories we're living have become the very obstacles 
            we're fighting. We must evolve.
          </p>
          
          <p className="mb-6">
            The ones who do won't just be winners in the new world—they get to be its authors.
          </p>
          
          <p className="text-ancient-gold font-semibold">
            Because if everything in the world is a story, and we remember we're holding the pen, anything becomes possible.
          </p>
        </Section>

        {/* THE CALLING */}
        <Section title="THE CALLING" subtitle="What You're Here to Do">
          <p className="mb-6 text-mystical-teal text-xl font-semibold">
            The Metamyth gives you back what was always yours—authorship of your life.
          </p>
          
          <p className="mb-8">
            This is story as technology—the oldest operating system on Earth. The same force that built nations 
            and corporations, the same power that created the world as we know it, now refined into systematic 
            process for conscious reality authorship.
          </p>
          
          <p className="mb-6 text-ancient-gold">The journey moves through seven stages:</p>
          
          <div className="space-y-6 ml-6 border-l-2 border-ancient-gold/20 pl-6">
            <Stage name="THE ORIGIN">
              Everything up until this moment becomes meaningful. The old story ends so the new one can begin—on purpose this time.
            </Stage>
            
            <Stage name="THE CALLING">
              Individual suffering reveals itself as planetary assignment. What broke you open becomes what you're here to heal in the world.
            </Stage>
            
            <Stage name="THE QUEST">
              Purpose elevates into quest—turning daily work into epic adventure, solving real problems with the fellowship already gathering.
            </Stage>
            
            <Stage name="THE VISION">
              The future reaches back to pull you forward. You author your highest potential stretched into the timeline you're here to create.
            </Stage>
            
            <Stage name="THE MISSION">
              Your mission becomes an evolving epic journey to become who the world needs you to be—mapping the trials that transform you into the person capable of fulfilling your vision.
            </Stage>
            
            <Stage name="THE REQUEST">
              Your transformation becomes your offering. As you invite people into the story, you create the legend that outlives you.
            </Stage>
            
            <Stage name="THE LEGACY">
              You craft the story they'll tell about you seven generations forward—then live up to it.
            </Stage>
          </div>
        </Section>

        {/* THE QUEST */}
        <Section title="THE QUEST" subtitle="Who This Serves">
          <div className="space-y-6">
            <p>Anyone trapped in meaninglessness wondering if there's actual purpose or just endless routine.</p>
            
            <p>Founders sensing something essential is missing even in success—ready to elevate from quarterly pressure to cosmic mission.</p>
            
            <p>Changemakers burning out fighting alone—ready to discover the fellowship already gathering.</p>
            
            <p>Organizations that forgot why they exist—ready to remember their origin story and reclaim their destiny.</p>
            
            <p>Visionaries knowing they're here for something planetary but lacking the map from breakthrough to transformation.</p>
            
            <div className="mt-10 pt-8 border-t border-crimson/30">
              <p className="text-crimson font-semibold mb-4">This is NOT for:</p>
              <ul className="space-y-2 text-crimson/80 ml-6">
                <li>• People who don't want to evolve</li>
                <li>• People who want business as usual</li>
                <li>• People content being background characters in someone else's story</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* STORY IS THE PORTAL */}
        <Section title="STORY IS THE PORTAL" subtitle="The Highest Leverage Point">
          <p className="mb-6 text-xl">Story is the portal into your world.</p>
          
          <p className="mb-6">
            Every person who comes into your life and organization comes in through your story. Every dollar 
            flows in through your story. The motivation that wakes you up in the morning and drives you forward 
            is your story.
          </p>
          
          <p className="text-mystical-teal font-semibold">
            This is the highest leverage point for changing your very reality—with deep reverberation into the 
            foundations of your existence, your business, your livelihood, your community.
          </p>
        </Section>

        {/* THE TRANSFORMATION */}
        <Section title="THE TRANSFORMATION">
          <p className="mb-6 text-ancient-gold">This process transforms:</p>
          
          <ul className="space-y-3 mb-10">
            <li>• Scattered dreams into inevitable visions</li>
            <li>• Indecision and confusion into crystal clarity</li>
            <li>• Busyness into easiness</li>
            <li>• Sales into service</li>
            <li>• Transaction into transformation</li>
            <li>• Marketing into movements</li>
            <li>• Branding into worldbuilding</li>
            <li>• Consumers and customers into characters in your story, attracted by your purpose</li>
            <li>• Background characters into authors of reality</li>
            <li>• Your life into the epic adventure it was always meant to be</li>
          </ul>
          
          <div className="mt-12 space-y-6">
            <h3 className="text-ancient-gold font-semibold text-2xl mb-6">When Purpose Pays</h3>
            
            <p>
              The process transforms how you make a living. Your personal transformation becomes your professional offering. 
              The journey you've been on becomes the medicine you provide. Your wounds become your wisdom, and that wisdom 
              becomes what sustains you economically.
            </p>
            
            <p>
              This isn't about slapping purpose onto an existing business model. It's about fundamentally restructuring how 
              value flows—where customers become characters in your quest, where community itself becomes the business model, 
              where marketing transforms into movement-building.
            </p>
            
            <p>
              We help you elevate your market into a cause, a self-aware culture that can endure and spread. A council to 
              build collective intelligence. Ultimately a commons for connecting customers and audiences with each other—creating 
              a field of transformation and a true community of purpose to advance your mission.
            </p>
            
            <p>
              This pulls us out of the race to the bottom that commodifies everything and gets right to what the biggest 
              brands in the world understand: people buy into an identity, a deeper meaning, and a community.
            </p>
            
            <p className="text-mystical-teal font-semibold">That's what everyone is really searching for.</p>
            
            <p>
              Organizations that help the most people and take on the biggest problems call in the most resources. We help 
              you align to that planetary potential, raise your positioning to cosmic stakes, and build something that lasts 
              not just quarters but generations.
            </p>
            
            <p className="text-ancient-gold text-xl font-semibold mt-8">When the story is right, purpose pays.</p>
          </div>
        </Section>

        {/* THE VISION */}
        <Section title="THE VISION" subtitle="What Becomes Possible">
          <div className="space-y-10">
            <div>
              <h4 className="text-ancient-gold font-semibold text-xl mb-4">Personal Level:</h4>
              <p>
                Victims become authors. Struggles transform into superpowers, qualifications, the unique medicine 
                offered to the world. Life becomes epic adventure lived on purpose.
              </p>
            </div>
            
            <div>
              <h4 className="text-ancient-gold font-semibold text-xl mb-4">Organizational Level:</h4>
              <p>
                Companies remember their cosmic assignment. Purpose guides every decision. Teams stop executing 
                and start questing. Success transcends quarterly metrics and becomes about legacy. Competition 
                disappears because the category itself elevates beyond comparison.
              </p>
            </div>
            
            <div>
              <h4 className="text-ancient-gold font-semibold text-xl mb-4">Planetary Level:</h4>
              <p className="mb-4">
                Individual breakthroughs connect to collective healing. Stories operating at mythic scale attract 
                mythic resources—investors funding missions that matter, partners joining regenerative quests, 
                communities gathering around transformation itself.
              </p>
              <p className="text-mystical-teal font-semibold">
                When enough people remember they're authors, the whole game changes.
              </p>
            </div>
          </div>
        </Section>

        {/* THE MISSION */}
        <Section title="THE MISSION" subtitle="How the Process Works">
          <p className="mb-6 text-xl">
            This process has rocked people's worlds and changed their lives in ways they didn't know were possible.
          </p>
          
          <p className="mb-6">
            We've turned people's greatest failures into the gifts they're proud to share. We've cracked entirely 
            new brands and seeded myths of completely new futures and timelines in the time it would take you to 
            watch a bad movie.
          </p>
          
          <p className="mb-6">
            Even people who've already achieved significant success consistently report having their minds blown. 
            That's because we see nothing short of absolutely epic potential in everyone. Our process routinely 
            turns struggles into superpowers—imagine what it does with real success.
          </p>
          
          <p className="mb-6 text-mystical-teal font-semibold">
            But like all magic, you have to commit. You have to believe.
          </p>
          
          <p>
            At the end of the day, we don't write your story for you. We'll help, and we're damn good at it. 
            But it's your story. The point is you're taking back control of it.
          </p>
        </Section>

        {/* THE REQUEST */}
        <Section title="THE REQUEST" subtitle="Begin Your Metamyth">
          <div className="bg-ancient-gold/5 border-2 border-ancient-gold/30 rounded-lg p-8 mb-8">
            <h4 className="text-ancient-gold font-semibold text-2xl mb-6">Foundation Session (90 minutes)</h4>
            
            <p className="mb-6">
              Bring your story—the experiences that shaped you, the struggles you survived, the vision pulling you forward.
            </p>
            
            <p className="mb-6">
              In a single conversation, patterns crack open. Purpose reveals itself. Territory gets mapped.
            </p>
            
            <p className="mb-6 text-mystical-teal font-semibold">From there, your Metamyth emerges.</p>
            
            <p className="mb-6">Two artifacts are created:</p>
            
            <div className="space-y-6 ml-6">
              <div>
                <h5 className="text-ancient-gold font-semibold mb-2">Your Metamyth (15-20 pages)</h5>
                <p className="text-sm leading-relaxed">
                  Authoring together the most epic and transformative vision of your highest potential into the 
                  future you're here to create. Your essential storytelling framework to cut through the noise and 
                  communicate the true value of your work to anyone. A living narrative that transforms branding 
                  into mythology, strategy into vision, confusion into undeniable clarity. Written in your voice 
                  as literature that makes your soul light up—the story you return to when things get hard.
                </p>
              </div>
              
              <div>
                <h5 className="text-ancient-gold font-semibold mb-2">Your Story Living Guide</h5>
                <p className="text-sm leading-relaxed">
                  Comprehensive strategy for actually living the story. Going beyond just telling into becoming 
                  who the world needs you to be. Systematizing the story into operations so it becomes your 
                  operating system for collective visioning, conscious authorship, and intentional evolution.
                </p>
              </div>
            </div>
            
            <p className="mt-8 text-mystical-teal text-lg">
              What emerges is you taking back your story. You become the conscious author of your reality.
            </p>
          </div>
        </Section>

        {/* THE LEGACY */}
        <Section title="THE LEGACY" subtitle="About Zachary Marlow">
          <p className="mb-6">
            Zachary Marlow died into the old story and was reborn into the new—with the remembrance that it's all 
            a mythic story, and we hold the pen.
          </p>
          
          <p className="mb-6">
            He realized he was writing his own life, which became an epic adventure to change with the world. Ten 
            years of living through countless stories—dying, being reborn, making films out of reality and elevating 
            it to epic, building community, growing organizations, advising cutting-edge companies around the world, 
            rebranding whole movements, using new media to change countless lives and provoke deep transformative 
            engagement.
          </p>
          
          <p className="mb-6">
            Then digging deeper into the story underneath the very fabric of reality itself. Taking all the breakdown 
            and breakthrough of his own journey into the future that is possible and returning with the elixir—the 
            transformative power to teach others how to do it themselves (without having to go on the crazy adventure 
            he did).
          </p>
          
          <p className="text-mystical-teal font-semibold">
            Now he guides others to discover what he learned: when you remember you're the author of reality and 
            have the courage to change with the world, everything becomes possible.
          </p>
        </Section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-32 mb-20 text-center"
        >
          <p className="font-display text-4xl md:text-5xl text-ancient-gold mb-12 leading-tight">
            The future you dream is one story away.
          </p>
          
          <Button
            asChild
            className="bg-ancient-gold hover:bg-ancient-gold/90 text-deep-black font-semibold"
            data-testid="button-book-session"
          >
            <a href="https://zcal.co/i/nIEsikdu" target="_blank" rel="noopener noreferrer">
              Schedule Your Story Strategy Session
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// Section component
function Section({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-32"
    >
      <div className="mb-10">
        <h2 className="font-display text-4xl md:text-5xl text-ancient-gold mb-3">
          {title}
        </h2>
        {subtitle && (
          <h3 className="font-game text-xl md:text-2xl text-mystical-teal">
            {subtitle}
          </h3>
        )}
      </div>
      <div className="font-game text-lg md:text-xl leading-relaxed space-y-6">
        {children}
      </div>
    </motion.section>
  );
}

// Stage component for the seven stages
function Stage({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-ancient-gold font-semibold mb-2">{name}</h4>
      <p className="text-base">{children}</p>
    </div>
  );
}

// Transform component
function Transform({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center gap-3 text-base">
      <span className="text-cream-white/60">{from}</span>
      <span className="text-mystical-teal">→</span>
      <span className="text-mystical-teal font-semibold">{to}</span>
    </div>
  );
}
