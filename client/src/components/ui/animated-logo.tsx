import { motion } from "framer-motion";
import { Shield, Sword } from "lucide-react";

export default function AnimatedLogo() {
  return (
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Shield className="text-ancient-gold drop-shadow-[0_0_20px_rgba(184,134,11,0.8)] drop-shadow-[0_0_40px_rgba(184,134,11,0.4)]" style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 10px rgba(184,134,11,0.6))' }} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          opacity: [1, 0.7, 1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sword className="text-mystical-teal drop-shadow-[0_0_15px_rgba(20,184,166,0.8)] drop-shadow-[0_0_30px_rgba(20,184,166,0.4)]" style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.6))' }} />
      </motion.div>
    </div>
  );
}
