import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ScrollThreadProps {
  sectionIndex: number;
  totalSections: number;
}

export default function ScrollThread({ sectionIndex, totalSections }: ScrollThreadProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  // Create smooth spring animations for better scroll feel
  const sectionProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  // Create different thread paths based on section index
  const getThreadPath = () => {
    const paths = [
      "M0,50 Q25,30 50,50 Q75,70 100,50", // Gentle wave
      "M0,40 Q50,60 100,40", // Simple curve
      "M0,60 Q25,40 50,60 Q75,40 100,60", // Double wave
      "M0,30 Q50,70 100,30", // Deep curve
      "M0,50 Q30,20 70,50 Q90,80 100,50", // Complex wave
    ];
    return paths[sectionIndex % paths.length];
  };

  // Create thread positions for scatter effect
  const getScatterPoints = () => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      points.push({
        x: (i / 7) * 100,
        y: 30 + Math.sin(i * 0.5) * 20,
        delay: i * 0.1
      });
    }
    return points;
  };

  return (
    <div 
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Main golden thread path */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`threadGradient-${sectionIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
              <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <filter id={`glow-${sectionIndex}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <motion.path
            d={getThreadPath()}
            stroke={`url(#threadGradient-${sectionIndex})`}
            strokeWidth="0.8"
            fill="none"
            filter={`url(#glow-${sectionIndex})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
            }}
            transition={{ 
              pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 0.5, delay: 0.3 }
            }}
          />
        </svg>
      </motion.div>

      {/* Floating golden particles that respond to scroll */}
      <div className="absolute inset-0">
        {getScatterPoints().map((point, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-ancient-gold rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              boxShadow: "0 0 8px #D4AF37",
              opacity: useTransform(sectionProgress, [0, 0.5, 1], [0, 1, 0]),
              scale: useTransform(sectionProgress, [0, 0.5, 1], [0, 1.2, 0]),
              x: useTransform(sectionProgress, [0, 1], [0, 50]),
            }}
            transition={{ 
              duration: 2,
              delay: point.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Scroll-responsive thread segments */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-0.5"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #D4AF37 20%, #D4AF37 80%, transparent 100%)",
          boxShadow: "0 0 10px #D4AF37",
          transform: "translateY(-50%)",
          scaleX: useTransform(sectionProgress, [0, 0.5, 1], [0, 1, 0]),
          opacity: useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Pulse effect at thread ends */}
      <motion.div
        className="absolute top-1/2 left-4 w-3 h-3 bg-ancient-gold rounded-full"
        style={{ transform: "translateY(-50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ 
          scale: [0, 1, 1.5, 1],
          opacity: [0, 1, 0.8, 1]
        }}
        transition={{ 
          duration: 2,
          delay: 1,
          ease: "easeOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-4 w-3 h-3 bg-ancient-gold rounded-full"
        style={{ transform: "translateY(-50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ 
          scale: [0, 1, 1.5, 1],
          opacity: [0, 1, 0.8, 1]
        }}
        transition={{ 
          duration: 2,
          delay: 1.5,
          ease: "easeOut"
        }}
      />
    </div>
  );
}