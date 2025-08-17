import { motion } from "framer-motion";
import { Shield, Sword } from "lucide-react";

export default function AnimatedLogo() {
  return (
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Shield className="text-ancient-gold text-9xl" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          opacity: [1, 0.7, 1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sword className="text-mystical-teal text-6xl" />
      </motion.div>
    </div>
  );
}
