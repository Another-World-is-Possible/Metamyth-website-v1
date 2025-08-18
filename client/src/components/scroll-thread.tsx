import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollThreadProps {
  sectionIndex: number;
}

export default function ScrollThread({ sectionIndex }: ScrollThreadProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.8, once: false });

  return (
    <div 
      ref={ref}
      className="absolute left-0 w-full h-1 pointer-events-none flex items-center"
      style={{ 
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50
      }}
    >
      {/* Golden thread line */}
      <motion.div
        className="w-full h-0.5 relative"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { 
          scaleX: 1, 
          opacity: 1 
        } : { 
          scaleX: 0, 
          opacity: 0 
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          scaleX: { delay: 0.2 }
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.4) 15%, rgba(212, 175, 55, 1) 50%, rgba(212, 175, 55, 0.4) 85%, transparent 100%)",
          boxShadow: "0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(212, 175, 55, 0.3)",
          transformOrigin: "center"
        }}
      >
        {/* Additional glow layer */}
        <motion.div
          className="absolute inset-0 w-full h-0.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 30%, rgba(212, 175, 55, 0.6) 50%, rgba(212, 175, 55, 0.2) 70%, transparent 100%)",
            filter: "blur(1px)"
          }}
        />
        
        {/* Central bright spot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { 
            scale: 1, 
            opacity: [0, 1, 0.7] 
          } : { 
            scale: 0, 
            opacity: 0 
          }}
          transition={{ 
            duration: 1, 
            delay: 0.8,
            scale: { type: "spring", stiffness: 100 }
          }}
          style={{
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
      </motion.div>
    </div>
  );
}