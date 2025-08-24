import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 
          className="scroll-fade-in font-angle text-4xl md:text-5xl font-bold text-center mb-4"
          style={{
            color: '#000000',
            textShadow: '0 0 8px rgba(212, 175, 55, 0.9), 0 0 16px rgba(212, 175, 55, 0.7), 0 0 24px rgba(212, 175, 55, 0.5)'
          }}
        >
          THE INVITATION
        </h2>
        
        <h3 
          className="scroll-fade-in font-angle text-2xl md:text-3xl text-center mb-12"
          style={{
            color: '#000000',
            textShadow: '0 0 8px rgba(212, 175, 55, 0.9), 0 0 16px rgba(212, 175, 55, 0.7), 0 0 24px rgba(212, 175, 55, 0.5)'
          }}
        >
          Ready to stop being trapped in someone else's story<br />and writing your own?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="scroll-fade-in">
            <Card className="bg-deep-black/95 backdrop-blur-md border-2 border-[#81ecec]/80 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-deep-black/98 via-deep-black/95 to-[#81ecec]/15 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 hover-glow">
              <CardContent className="p-8 text-center">
                <h3 
                  className="font-angle text-2xl font-bold text-ancient-gold mb-4"
                  style={{
                    textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.7), 2px 2px 6px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  REGENERATE YOUR STORY
                </h3>
                <p 
                  className="font-game mb-6"
                  style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Transform your organization through story
                </p>
                <Button 
                  className="bg-ancient-gold text-deep-black font-game font-bold py-3 px-8 rounded-lg hover:bg-ancient-gold/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <span className="title-glow font-bold" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>WORK WITH US</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="scroll-fade-in">
            <Card className="bg-deep-black/95 backdrop-blur-md border-2 border-[#81ecec]/80 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 bg-gradient-to-br from-deep-black/98 via-deep-black/95 to-[#81ecec]/15 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 hover-glow">
              <CardContent className="p-8 text-center">
                <h3 
                  className="font-angle text-2xl font-bold text-mystical-teal mb-4"
                  style={{
                    textShadow: '0 0 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.7), 2px 2px 6px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  JOIN THE QUEST
                </h3>
                <p 
                  className="font-game mb-6"
                  style={{ color: '#f0f0f0', textShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4), 2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Build the new world with us
                </p>
                <Button 
                  className="bg-mystical-teal text-deep-black font-game font-bold py-3 px-8 rounded-lg hover:bg-mystical-teal/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    boxShadow: '0 4px 20px rgba(20, 184, 166, 0.4), 0 0 20px rgba(20, 184, 166, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <span className="title-glow font-bold" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>BECOME A STORYTELLER</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
