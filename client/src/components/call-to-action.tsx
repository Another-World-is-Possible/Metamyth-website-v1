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
        >
          THE INVITATION
        </h2>
        
        <h3 
          className="scroll-fade-in typography-h3 font-angle text-center mb-12 text-ancient-gold text-glow-gold"
        >
          Ready to stop being trapped in someone else's story<br />and start writing your own?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="scroll-fade-in">
            <Card className="frosted-glass-subtle border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 hover-glow">
              <CardContent className="p-8 text-center">
                <h3
                  className="typography-h3 font-angle text-ancient-gold mb-4 text-glow-gold"
                >
                  REGENERATE YOUR STORY
                </h3>
                <p
                  className="typography-body font-emerland mb-6 text-cream-white text-glow-cream"
                >
                  Transform your organization through story
                </p>
                <Button
                  onClick={() => setActiveTab?.('questionaire')}
                  className="bg-ancient-gold text-deep-black font-angle font-bold py-2 px-6 rounded-lg hover:bg-ancient-gold/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-gold"
                >
                  <span className="font-bold">WORK WITH US</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="scroll-fade-in">
            <Card className="frosted-glass-subtle border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 hover-glow">
              <CardContent className="p-8 text-center">
                <h3
                  className="typography-h3 font-angle text-mystical-teal mb-4 text-glow-teal"
                >
                  JOIN THE QUEST
                </h3>
                <p
                  className="typography-body font-emerland mb-6 text-cream-white text-glow-cream"
                >
                  Build the new world with us
                </p>
                <Button
                  onClick={() => setActiveTab?.('questionaire')}
                  className="bg-mystical-teal text-deep-black font-angle font-bold py-2 px-6 rounded-lg hover:bg-mystical-teal/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer button-glow-teal"
                >
                  <span className="font-bold">BECOME A STORYTELLER</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
