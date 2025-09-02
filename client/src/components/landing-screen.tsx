import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LandingScreenProps {
  onBeginJourney: () => void;
}

export default function LandingScreen({ onBeginJourney }: LandingScreenProps) {
  const [typewriterText, setTypewriterText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const fullText = "The world is made of stories";
  
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Show button after text is complete
        setTimeout(() => {
          setShowButton(true);
        }, 1000);
      }
    }, 80); // Slower revelation speed

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Stars/space background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
        {/* Subtle star field */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Typewriter text */}
        <h1 className="typography-h1 font-angle text-gradient-gold mb-12 min-h-[100px] flex items-center justify-center">
          {typewriterText}
        </h1>

        {/* Begin Journey Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Button
              onClick={onBeginJourney}
              className="cta-button-base cta-button-gold text-xl px-8 py-4"
              data-testid="button-begin-journey"
            >
              BEGIN YOUR JOURNEY
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}