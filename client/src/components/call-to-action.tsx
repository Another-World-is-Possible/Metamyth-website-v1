import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CallToActionProps {
  setActiveTab?: (tab: string) => void;
}

export default function CallToAction({ setActiveTab }: CallToActionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          className="scroll-fade-in typography-h2 font-angle text-center mb-4 text-ancient-gold text-glow-gold"
          style={{
            textShadow: `
              0 0 8px rgba(0, 0, 0, 0.8),
              0 0 16px rgba(0, 0, 0, 0.6),
              0 0 24px rgba(0, 0, 0, 0.4),
              0 0 12px rgba(212, 175, 55, 0.8),
              0 0 24px rgba(212, 175, 55, 0.5),
              0 0 36px rgba(212, 175, 55, 0.3)
            `
          }}
        >
          THE INVITATION
        </h2>
        
        <h3
          className="scroll-fade-in typography-h3 font-angle text-center mb-12 text-mystical-teal text-glow-teal"
          style={{
            textShadow: `
              0 0 8px rgba(0, 200, 160, 0.8),
              0 0 16px rgba(0, 200, 160, 0.5),
              0 0 24px rgba(0, 200, 160, 0.3),
              0 0 2px #000,
              0 0 4px #000
            `
          }}
        >
          Ready to stop being trapped in someone else's story<br />and start writing your own?
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto justify-center">
          <button
            onClick={() => setActiveTab?.('questionaire')}
            className="bg-ancient-gold text-deep-black font-angle font-bold text-xl py-4 px-8 rounded-lg hover:bg-ancient-gold/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-gold"
          >
            <div className="font-angle font-bold">REGENERATE YOUR STORY</div>
            <div className="text-base font-emerland mt-1">Transform your organization through story</div>
          </button>

          <button
            onClick={() => setActiveTab?.('questionaire')}
            className="bg-mystical-teal text-deep-black font-angle font-bold text-xl py-4 px-8 rounded-lg hover:bg-mystical-teal/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-teal"
          >
            <div className="font-angle font-bold">JOIN THE QUEST</div>
            <div className="text-base font-emerland mt-1">Build the new world with us</div>
          </button>
        </div>
      </div>
    </section>
  );
}
