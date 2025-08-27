import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CallToActionProps {
  setActiveTab?: (tab: string) => void;
}

export default function CallToAction({ setActiveTab }: CallToActionProps) {
  return (
    <section className="relative py-20 overflow-hidden call-to-action-section">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          className="scroll-fade-in typography-h2 font-angle text-center mb-6 text-ancient-gold text-glow-gold"
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
          className="scroll-fade-in typography-h3 font-angle text-center mb-16 text-mystical-teal text-glow-gold leading-relaxed"
          style={{
            textShadow: `
              0 0 8px rgba(212, 175, 55, 0.8),
              0 0 16px rgba(212, 175, 55, 0.5),
              0 0 24px rgba(212, 175, 55, 0.3),
              0 0 2px #000,
              0 0 4px #000
            `
          }}
        >
          Ready to stop being trapped in someone else's story<br />and start writing your own?
        </h3>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          <Button
            onClick={() => setActiveTab?.('questionaire')}
            className="bg-ancient-gold text-deep-black font-angle font-bold py-4 px-8 rounded-full hover:bg-ancient-gold/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-lg shadow-ancient-gold/50 border-0 mx-4 mb-6"
          >
            <span className="text-glow-gold text-xl">BEGIN YOUR JOURNEY</span>
          </Button>
          <Button
            onClick={() => setActiveTab?.('questionaire')}
            className="bg-mystical-teal text-deep-black font-angle font-bold py-4 px-8 rounded-full hover:bg-mystical-teal/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer shadow-lg shadow-mystical-teal/50 border-0 mx-4 mb-6"
          >
            <span className="text-glow-teal text-xl">JOIN THE QUEST</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
