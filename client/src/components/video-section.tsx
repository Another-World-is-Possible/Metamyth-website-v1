import { motion } from "framer-motion";

interface VideoSectionProps {
  setActiveTab?: (tab: string) => void;
}

export default function VideoSection({ setActiveTab }: VideoSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/60"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2 
          className="typography-h2 font-angle text-center mb-4 text-deep-black"
          style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          THE METAMYTH PHILOSOPHY
        </motion.h2>
        
        <motion.p
          className="typography-body font-thornelia text-center mb-12 max-w-4xl mx-auto leading-relaxed text-cream-white"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Speaking to conscious leaders and visionary changemakers, founder <span className="text-mystical-teal font-bold">Zachary Marlow</span> unveils the Metamyth System—five questions that transform crisis into compelling quest.
        </motion.p>

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-ancient-gold/20">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/q4-D5VfJUNU?si=vv_sDNDszpG_c9_j"
                title="The Metamyth Philosophy - Zachary Marlow"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          
          {/* Subtle golden glow effect around video */}
          <div className="absolute inset-0 rounded-lg pointer-events-none">
            <div className="absolute inset-0 rounded-lg border border-ancient-gold/30 shadow-lg shadow-ancient-gold/20" />
          </div>
        </motion.div>

        <motion.h3
          className="typography-h2 font-angle text-center mt-12 max-w-4xl mx-auto text-ancient-gold"
          style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 1px 1px 3px rgba(0, 0, 0, 0.9)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          "The future we want is one story away."
        </motion.h3>
      </div>
    </section>
  );
}