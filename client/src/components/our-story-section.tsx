import { motion } from "framer-motion";

export default function OurStorySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/70"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main Title */}
        <motion.h2 
          className="typography-h2 font-angle text-center mb-8 text-deep-black"
          style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          OUR STORY
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          className="typography-body text-center mb-12 max-w-4xl mx-auto leading-relaxed text-cream-white"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          The old world is ending and we're here to write the myth of our future 🦋
        </motion.p>

        <motion.p
          className="typography-body text-center mb-12 max-w-4xl mx-auto leading-relaxed text-cream-white"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="text-mystical-teal font-bold">Zachary Marlow</span> is a time traveling planetary storyteller, system weaver & filmmaker helping purpose-driven changemakers & organizations evolve consciously thru transformative story systems and magnetic media that attracts aligned communities and elevates work into adventure, changing reality one story at a time. As founder of <span className="text-ancient-gold font-bold">Another World Is Possible</span>, a story company, film arc & cooperative federation, he transforms vision into systems through Metamyth, powering ancient technology for modern transformation.
        </motion.p>

        {/* THE CALLING */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-angle text-mystical-teal mb-4 text-center">THE CALLING</h3>
          <p className="typography-body text-cream-white leading-relaxed text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Born from a post-scarcity future where humanity made it and lived in harmony with nature, where they've discovered abundance beyond imagination because they value life more than money. But the timeline glitched. He crash landed into this world of artificial scarcity, watching humanity destroy itself through addiction to extraction, dulling our infinite potential. The shock of witnessing this suicidal trajectory nearly killed him—a breakdown that became his breakthrough into understanding the power of story to shape worlds.
          </p>
        </motion.div>

        {/* THE QUEST */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-angle text-mystical-teal mb-4 text-center">THE QUEST</h3>
          <p className="typography-body text-cream-white leading-relaxed text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            The adventure was on! He crowdfunded his existence, traveled earth thru gift economies, infiltrated political campaigns, regenerative communities, cooperative movements, disasters & groundbreaking companies. Making films, awakening others, turning every crisis into meaning, he discovered the revelation: humanity already has every solution needed, humanity isn't broken, just disconnected from its own genius. Every breakthrough, visionary & working solution is part of one story that hasn't been told yet. That story is Metamyth.
          </p>
        </motion.div>

        {/* THE VISION */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-angle text-mystical-teal mb-4 text-center">THE VISION</h3>
          <p className="typography-body text-cream-white leading-relaxed text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Mapping the scattered seeds of tomorrow across six continents showed how quickly we could return to abundance. The future he came from isn't centuries away—it's one story away. When we connect isolated solutions thru shared narrative, put purpose before profit and remember we're nature evolving, the transformation happens fast. This ain't humanity's end but its midpoint. The new world rising.
          </p>
        </motion.div>

        {/* THE MISSION */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-angle text-mystical-teal mb-4 text-center">THE MISSION</h3>
          <p className="typography-body text-cream-white leading-relaxed text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            This is why he was sent back: to assemble the federation of greatest changemakers, solutions, and world-builders before the timeline splits permanently. He's weaving the story federation through Metamyth—the ancient technology to rewrite your life, turn it into a movie, and play it as the ultimate game.
          </p>
        </motion.div>

        {/* THE REQUEST */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-angle text-mystical-teal mb-4 text-center">THE REQUEST</h3>
          <p className="typography-body text-cream-white leading-relaxed text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Join us in threading humanity's scattered genius into the story that saves us all. Let's take back our story!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
