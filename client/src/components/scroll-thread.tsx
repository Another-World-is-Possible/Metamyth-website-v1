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
      className="absolute left-0 w-full h-px pointer-events-none"
      style={{ 
        top: 0,
        zIndex: 50
      }}
    >
      {/* Golden thread line */}
      <motion.div
        className="w-full h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { 
          scaleX: 1, 
          opacity: 1 
        } : { 
          scaleX: 0, 
          opacity: 0 
        }}
        transition={{ 
          duration: 1.2, 
          ease: "easeInOut"
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.4) 20%, rgba(212, 175, 55, 0.9) 50%, rgba(212, 175, 55, 0.4) 80%, transparent 100%)",
          boxShadow: "0 0 6px rgba(212, 175, 55, 0.5)",
          transformOrigin: "center"
        }}
      />
    </div>
  );
}