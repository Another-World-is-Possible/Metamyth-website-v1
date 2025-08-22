import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import lightPossibilityImage from "@assets/json__light_possibility_space-__prompt-_extreme_close-up_inside_pure_light_refracting_through_gold__kma1ye6sql0jr5rdegoq_3_1755898973420.png";

export default function CallToAction() {
  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${lightPossibilityImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-deep-black/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="scroll-fade-in font-angle text-4xl md:text-5xl font-bold text-ancient-gold text-center mb-4">
          THE INVITATION
        </h2>
        
        <p className="scroll-fade-in font-game text-2xl md:text-3xl text-mystical-teal text-center mb-12 font-light italic">
          the future is one story away
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="scroll-fade-in">
            <Card className="bg-deep-black/50 mystical-border enhanced-glow hover-glow">
              <CardContent className="p-8 text-center">
                <h3 className="font-angle text-2xl font-bold text-ancient-gold mb-4">
                  REGENERATE YOUR STORY
                </h3>
                <p className="font-game text-silver mb-6">Transform your organization through story</p>
                <Button className="bg-ancient-gold text-deep-black font-game font-bold py-3 px-8 rounded-lg hover:bg-ancient-gold/80 transition-colors duration-300">
                  <span className="title-glow">WORK WITH US</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="scroll-fade-in">
            <Card className="bg-deep-black/50 mystical-border mystical-glow hover-glow">
              <CardContent className="p-8 text-center">
                <h3 className="font-angle text-2xl font-bold text-mystical-teal mb-4">
                  JOIN THE QUEST
                </h3>
                <p className="font-game text-silver mb-6">Build the new world with us</p>
                <Button className="bg-mystical-teal text-deep-black font-game font-bold py-3 px-8 rounded-lg hover:bg-mystical-teal/80 transition-colors duration-300">
                  <span className="title-glow">BECOME A STORYTELLER</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
