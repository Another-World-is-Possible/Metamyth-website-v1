import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/60"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-5xl font-bold text-ancient-gold text-center mb-4"
          style={{
            textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000, 0px 2px 0px #000000, 2px 0px 0px #000000, 0px -2px 0px #000000, -2px 0px 0px #000000'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          THE METAMYTH PHILOSOPHY
        </motion.h2>
        
        <motion.p 
          className="text-lg text-center mb-12 max-w-4xl mx-auto font-alice leading-relaxed"
          style={{
            color: '#000000',
            textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.5), 0 0 24px rgba(212, 175, 55, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Speaking to conscious leaders and visionary changemakers, founder <span className="text-mystical-teal font-bold">Zachary Marlow</span> drops a mind-bending truth: we're destroying the world for stories. But if we imagined this nightmare, we can imagine our way out. This talk unveils the Metamyth System—five questions that transform crisis into compelling quest. Marlow shows how ancient storytelling technology can liberate organizations from extractive paradigms. Ready to stop being trapped in someone else's story and start writing your own?
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

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-mystical-teal/80 italic font-alice">
            "If we imagined this nightmare, we can imagine our way out."
          </p>
        </motion.div>
      </div>
    </section>
  );
}