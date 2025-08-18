import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollThreadProps {
  sectionIndex: number;
}

export default function ScrollThread({ sectionIndex }: ScrollThreadProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  // Simple fade in/out based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const lineProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div 
      ref={ref}
      className="absolute left-0 w-full h-1 pointer-events-none"
      style={{ 
        top: 0,
        zIndex: 30
      }}
    >
      {/* Simple elegant dividing line */}
      <motion.div
        className="w-full h-px relative"
        style={{ opacity }}
      >
        {/* Main golden thread line */}
        <motion.div
          className="absolute inset-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 20%, rgba(212, 175, 55, 0.8) 50%, rgba(212, 175, 55, 0.3) 80%, transparent 100%)",
            boxShadow: "0 0 4px rgba(212, 175, 55, 0.4)",
            scaleX: lineProgress,
            transformOrigin: "center"
          }}
        />
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute top-0 left-1/2 w-32 h-px transform -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.6) 0%, transparent 70%)",
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.8, 0])
          }}
        />
        
        {/* Small moving particle along the line */}
        <motion.div
          className="absolute top-0 w-1 h-1 bg-ancient-gold rounded-full transform -translate-y-1/2"
          style={{
            left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            boxShadow: "0 0 6px #D4AF37",
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
          }}
        />
      </motion.div>
    </div>
  );
}