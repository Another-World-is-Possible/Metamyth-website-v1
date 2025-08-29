import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Mail, Phone, ExternalLink } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Note: For static deployment, the questionnaire submission is handled client-side
// For production with backend, replace the submitMutation logic with actual API calls
// Consider integrating with services like Netlify Forms, Formspree, or similar for form handling

interface Question {
  id: number;
  title: string;
  type: "radio" | "checkbox" | "text";
  options?: string[];
  placeholder?: string;
  subtitle: string;
  hasTextInput?: boolean;
  textPlaceholder?: string;
  examples?: string[];
  description?: string;
}

const questions = [
  {
    id: 1,
    title: "Your Authorship in the Great Story",
    subtitle: "Reality is authored by those who remember they hold the pen. In this great transition between worlds, some people discover they're writing their own story while others remain trapped in scripts they never chose. Where do you stand in claiming authorship of your destiny?",
    type: "radio",
    options: [
      "I actively author reality—leading an organization and shaping our narrative and direction",
      "I'm consciously building my story—creating a venture and controlling how it unfolds",
      "I have significant influence—helping write the story within a larger organization",
      "I'm authoring my voice—developing authentic personal or professional expression",
      "I'm awakening as an author—discovering my story while breaking free from others' expectations",
      "I feel like a character—stuck performing roles others wrote, desperately wanting to hold the pen"
    ],
    hasTextInput: false,
    description: "The first step to transformation is recognizing where you stand. Authors create worlds. Characters simply inhabit them."
  },
  {
    id: 2,
    title: "Your Vision of Victory",
    subtitle: "When your story reaches its triumphant conclusion—when you've authored the reality you came here to create—what victories do you see? What transformations become possible when your authentic narrative is fully expressed?",
    type: "checkbox",
    options: [
      "Crystal clarity—I know exactly who I am, what I offer, and why it matters deeply",
      "Magnetic attraction—The right people, opportunities, and resources flow to me naturally",
      "Thriving community—I'm surrounded by engaged allies who champion the work and each other",
      "Purposeful prosperity—My work generates abundant resources while serving what I care about most",
      "Authentic influence—My voice shapes conversations and decisions that create positive change",
      "Sustainable impact—My efforts compound over time, creating lasting transformation beyond myself",
      "Aligned organization—My team or company operates from shared values and unified vision",
      "Legacy worth leaving—Future generations inherit a more beautiful world because of my story"
    ],
    hasTextInput: false,
    description: "Victory isn't just personal success—it's the transformation that ripples out when authentic stories are lived fully."
  },
  {
    id: 3,
    title: "Your Story Challenges and Dragons",
    subtitle: "Every meaningful quest involves both discovering your unique gifts and facing what blocks your path. Heroes don't avoid dragons—they learn what treasures the dragons guard. What story challenges are you currently navigating?",
    type: "checkbox",
    options: [
      "Clarity—I need to understand my unique narrative and contribution clearly",
      "Message—I struggle to communicate my value or vision with power and consistency",
      "Attraction—I'm not magnetizing the right people, funding, or opportunities to my cause",
      "Focus—I'm scattered across directions without coherent momentum or storyline",
      "Community—I need to cultivate engaged audiences, stakeholders, or deeper team alignment",
      "Authenticity—My external success doesn't reflect my internal values or fulfill my soul",
      "Vision—I have ideas but struggle turning them into sustainable, scalable reality",
      "Alliance—I'm building this story alone when I desperately need aligned collaborators"
    ],
    hasTextInput: false,
    description: "Dragons aren't obstacles—they're guardians of the exact treasure you need. Your challenges reveal your destiny."
  },
  {
    id: 4,
    title: "The Scale of Your Quest",
    subtitle: "In the stories that matter most, heroes aren't measured by what they hoard but by what they're willing to risk for transformation. What magnitude of change are you here to author, and what is that story worth to your soul?",
    type: "radio",
    options: [
      "$15K-50K+ annually—Planetary transformation: My story serves global healing and deserves maximum commitment",
      "$5K-15K—Regional influence: My narrative reshapes industries, communities, and countless lives",
      "$1K-5K—Personal mastery: I'm investing strategically in becoming who I'm destined to be",
      "$500-1K—Apprentice path: I'm building capacity while proving my dedication to the quest",
      "Exploring scale—I'm still discovering what magnitude of story my soul is called to tell"
    ],
    hasTextInput: false,
    description: "The universe provides resources in proportion to the transformation you're brave enough to create."
  },
  {
    id: 5,
    title: "Your Wealth Beyond Gold",
    subtitle: "The old story says only those who can pay in money deserve transformation. We're writing a different story—one that recognizes the many forms of wealth that build new worlds. Beyond financial power, what riches do you bring to the fellowship of reality authors?",
    type: "checkbox",
    options: [
      "Systems—I redesign organizational structures and processes that regenerate rather than extract",
      "Technology—I build digital platforms and tools that connect consciousness and serve collaboration",
      "Economics—I work with money, investment, and resource flows in ways that heal rather than harm",
      "Creative—I use art, media, and storytelling to make impossible realities feel inevitable",
      "Community—I create spaces where authentic souls find each other and collective magic happens",
      "Narrative—I help articulate and spread stories that shift how people see what's possible",
      "Network—I connect the right people and resources at the perfect moments for breakthrough",
      "Presence—I offer consistent energy, attention, and unwavering commitment to what matters most"
    ],
    hasTextInput: true,
    textPlaceholder: "Write in your unique gifts...",
    description: "True wealth isn't what you own—it's what you create, connect, and contribute to the healing of our world."
  },
  {
    id: 6,
    title: "Your Moment of Readiness",
    subtitle: "Every hero's journey reaches the moment when destiny calls and the soul must answer. When you imagine stepping fully into your most authentic story—the vision that makes your heart race with possibility—what happens in your body, and when does that transformation begin?",
    type: "radio",
    options: [
      "Lightning strikes now—I feel electricity in my veins and I'm ready to embark on this quest immediately",
      "Thunder rolls within three moons—Something powerful is awakening and I'm actively seeking the right guides",
      "Storm clouds gather this cycle—I sense the perfect moment approaching and I'm preparing for the journey",
      "Still reading the signs—I feel the calling but I'm listening carefully for divine timing"
    ],
    hasTextInput: false,
    description: "The call to adventure doesn't wait for perfect conditions. It comes when your soul is ready to claim its destiny."
  },
  {
    id: 7,
    title: "Your Authority to Act",
    subtitle: "In the stories that change everything, heroes have the power to make decisions that matter. What authority do you command in writing the next chapters?",
    type: "radio",
    options: [
      "I decide for myself and others—I can commit resources and make strategic choices autonomously",
      "I influence major decisions—My voice carries significant weight in important choices",
      "I need to build consensus—I can advocate strongly but require others' agreement for major commitments",
      "I'm preparing for authority—I'm developing the capacity to make autonomous decisions",
      "I'm exploring my power—I'm discovering what authority I have and how to use it wisely"
    ],
    hasTextInput: false,
    description: "True power isn't dominion over others—it's the authority to author your authentic story into reality."
  }
];

export default function QUESTionaire() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1 = contact, 2 = origin, 3+ = questions, last = legacy
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [textResponses, setTextResponses] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [originStory, setOriginStory] = useState("");
  const [legacyVision, setLegacyVision] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [qualification, setQualification] = useState<"calendar" | "discord">("discord");
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      // For static deployment, we'll simulate the API call
      // In a real deployment, you might want to integrate with a service like Netlify Forms, Formspree, or similar
      console.log("Questionnaire submission (static mode):", data);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple qualification logic based on responses
      // You can customize this logic based on your needs
      const hasHighEngagement = Object.values(data.responses || {}).some((response: any) =>
        Array.isArray(response) ? response.length > 2 : typeof response === "string" ? response.length > 30 : response > 3
      );

      return {
        qualified: hasHighEngagement ? "calendar" : "discord",
        message: "Thank you for your submission!"
      };
    },
    onSuccess: (data: any) => {
      setQualification(data.qualified);
      setShowResult(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleResponse = (questionId: number, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleTextResponse = (questionId: number, value: string) => {
    setTextResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (!contactInfo.email) {
        toast({
          title: "Email Required",
          description: "Please enter your email address to continue.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep <= questions.length + 3) { // +3 for origin, questions, and legacy
      setCurrentStep(prev => prev + 1);
    }
    // Scroll to top when transitioning to next question
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top when transitioning to previous question
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Merge text responses into main responses object
    const combinedResponses = { ...responses, ...textResponses };
    
    submitMutation.mutate({
      email: contactInfo.email,
      phone: contactInfo.phone,
      originStory,
      legacyVision,
      responses: combinedResponses,
    });
  };

  const progress = showResult ? 100 : Math.max(0, ((currentStep - 1) / (questions.length + 3)) * 100);
  const currentQuestion = questions[currentStep - 3]; // Adjust for origin section

  if (showResult) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center p-4" 
           style={{
             backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.9), rgba(20,40,60,0.8)), 
                              radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
           }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 p-8">
            <CardContent>
              <h2 className="typography-h2 text-ancient-gold mb-6 font-angle">
                Your QUESTionaire Journey Complete
              </h2>
              <p className="typography-body text-cream-white mb-8 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                This is it. We are standing at the threshold of something monumental. The old story that built our world is ending, and the new one is being written by people who remember they are the authors of reality itself. They're not waiting for permission or perfect conditions. They're picking up the pen and writing the future into existence—regenerative economies, collaborative communities, technology that serves life, governance that honors the whole.
              </p>
              <p className="typography-body text-cream-white mb-8 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                This could be the moment that changes everything for you. Your responses reveal exactly where you stand in this great authorship—and what specific support could accelerate your role in what's emerging. We'll reach out within 48 hours with resources, community, or strategic alliance opportunities designed for your unique position in the shift.
              </p>
              <p className="typography-body text-cream-white mb-8 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                But understand this: we don't write your story for you—we help you LIVE it. As with all real magic, the more you believe, the realer it becomes. This work requires commitment, courage, and the willingness to step into the unknown. The pen is in your hand. The future is waiting. What story will you write?
              </p>
              
              {qualification === "calendar" ? (
                <div className="space-y-4">
                  <p className="typography-body text-mystical-teal font-bold">
                    You qualify for intensive story work! Schedule your deep dive session:
                  </p>
                  <a 
                    href="https://zcal.co/i/kEqudqJ1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-4 px-8">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Book Your Story Architecture Session
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="typography-body text-ancient-gold font-bold">
                    Join our community of conscious story architects:
                  </p>
                  <a 
                    href="https://discord.gg/XttnT2fX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-4 px-8">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Our Discord Community
                    </Button>
                  </a>
                </div>
              )}
              
              <p className="typography-body text-cream-white/80 mt-6 italic" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                The future isn't waiting for heroes to save it. It's waiting for authors to write it.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black overflow-hidden" 
         style={{
           backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.9), rgba(20,40,60,0.8)), 
                            radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23129f9f" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
         }}>
      
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-deep-black/50 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-mystical-teal to-ancient-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Counter */}
      <div className="fixed top-6 right-6 z-40 font-angle text-ancient-gold tracking-wider">
        {currentStep === 0 && "INTRODUCTION"}
        {currentStep === 1 && "CONTACT INFO"}
        {currentStep === 2 && "YOUR ORIGIN"}
        {currentStep >= 3 && currentStep <= questions.length + 2 && `QUESTION ${currentStep - 2} / ${questions.length}`}
        {currentStep === questions.length + 3 && "LEGACY PROPHECY"}
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 pt-24">
        <AnimatePresence mode="wait">
          {/* Intro Screen */}
          {currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="typography-h1 text-ancient-gold mb-8 text-glow-gold font-angle">
                The QUESTionaire: The Complete Call to Adventure
              </h1>
              <h2 className="typography-h3 text-mystical-teal mb-6 italic font-game">
                "The 7-Question Journey That Reveals Who's Really Writing Your Life"
              </h2>
              <h3 className="typography-h3 text-ancient-gold mb-6 font-game">
                "Are You the Hero of Your Story or a Background Character in Someone Else's?"
              </h3>
              <p className="typography-body text-cream-white mb-12 max-w-3xl mx-auto leading-relaxed font-game" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                The old story is ending—systems designed for scarcity destroying abundance, narratives built on separation fragmenting communities, economic myths optimized for extraction devouring the living world. But here's what the breakdown reveals: we're living through the greatest transformation in human history. All around the world, people are awakening to their power as reality authors. They've remembered the fundamental truth that reality is made of stories, and whoever controls the narrative controls the future. 
                <br /><br />
                The old story is ending whether we like it or not, and we have a very narrow window to create the future we want. When we remember we are the authors of reality itself, the stories that seemed impossible become inevitable through those brave enough to live them.
              </p>
              <Button
                onClick={handleNext}
                className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-4 px-8"
              >
                Embark on Your QUESTionaire
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Contact Info Collection */}
          {currentStep === 1 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="typography-h3 font-bold text-ancient-gold text-center mb-6">
                    Your Journey Begins
                  </h2>
                  <p className="typography-body text-center text-cream-white mb-8 font-emerland" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    First, let's connect so we can share your results and next steps.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block typography-body text-mystical-teal font-bold mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-[#81ecec]/10 border-[#81ecec]/50 text-cream-white focus:border-[#81ecec]/80 focus:ring-1 focus:ring-[#81ecec]/30"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    
                    <div>
                      <label className="block typography-body text-mystical-teal font-bold mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number (Optional)
                      </label>
                      <Input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-[#81ecec]/10 border-[#81ecec]/50 text-cream-white focus:border-[#81ecec]/80 focus:ring-1 focus:ring-[#81ecec]/30"
                        placeholder="+1 (555) 123-4567"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button
                      onClick={handleNext}
                      className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-3 px-6"
                      data-testid="button-continue"
                    >
                      Continue to Questions
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Origin of Your Quest */}
          {currentStep === 2 && (
            <motion.div
              key="origin"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="typography-h2 font-angle text-ancient-gold text-center mb-6">
                    The Origin of Your Quest
                  </h2>
                  <p className="typography-body font-game text-center text-cream-white mb-6 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    Every hero's journey begins with what came before—the experiences that forged you, the struggles that strengthened you, the commitments that shaped you. Tell us your story:
                  </p>
                  <p className="typography-body font-game text-cream-white mb-6 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    What brought you to this moment? What have you already tried to move your life or work forward? What have you invested—time, money, energy, heart—in transformation, growth, or building something meaningful?
                  </p>
                  
                  <Textarea
                    value={originStory}
                    onChange={(e) => setOriginStory(e.target.value)}
                    className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-32 typography-body font-kardige"
                    placeholder="Share the story that brought you here..."
                    data-testid="textarea-origin-story"
                  />
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="text-cream-white hover:text-ancient-gold typography-body"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-3 px-6"
                    >
                      Continue Your Quest
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Questions */}
          {currentStep >= 3 && currentStep <= questions.length + 2 && currentQuestion && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="typography-h3 font-bold text-ancient-gold mb-6 text-center leading-tight">
                    {currentQuestion.title}
                  </h2>
                  
                  <div className="space-y-6">
                    {currentQuestion.type !== "text" && (
                      <div className="space-y-4">
                        {currentQuestion.options?.map((option, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-mystical-teal/60 hover:bg-mystical-teal/10 ${
                              currentQuestion.type === "radio" 
                                ? (responses[currentQuestion.id] === option ? 'border-[#81ecec] bg-[#81ecec]/20' : 'border-silver/30')
                                : (responses[currentQuestion.id]?.includes(option) ? 'border-[#81ecec] bg-[#81ecec]/20' : 'border-silver/30')
                            }`}
                            onClick={() => {
                              if (currentQuestion.type === "radio") {
                                handleResponse(currentQuestion.id, option);
                              } else {
                                const current = responses[currentQuestion.id] || [];
                                const updated = current.includes(option) 
                                  ? current.filter((item: string) => item !== option)
                                  : [...current, option];
                                handleResponse(currentQuestion.id, updated);
                              }
                            }}
                            data-testid={`option-${currentQuestion.id}-${index}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                                currentQuestion.type === "radio" 
                                  ? (responses[currentQuestion.id] === option ? 'border-[#81ecec] bg-[#81ecec]' : 'border-silver')
                                  : (responses[currentQuestion.id]?.includes(option) ? 'border-[#81ecec] bg-[#81ecec]' : 'border-silver')
                              }`} />
                              <span className="typography-body text-cream-white leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>{option}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Personal response text area for all questions */}
                    <div className="mt-6">
                      <label className="block typography-body text-mystical-teal font-bold mb-3">
                        Your personal response:
                      </label>
                      <Textarea
                        value={textResponses[currentQuestion.id] || ""}
                        onChange={(e) => handleTextResponse(currentQuestion.id, e.target.value)}
                        className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-32 typography-body"
                        placeholder={currentQuestion.textPlaceholder || "Share your thoughts..."}
                        data-testid={`textarea-question-${currentQuestion.id}`}
                      />
                    </div>
                  </div>

                  <p className="typography-technical text-mystical-teal/80 text-center mt-6 italic text-glow-teal">
                    {currentQuestion.subtitle}
                  </p>

                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="text-cream-white hover:text-ancient-gold typography-body"
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>

                    {currentStep === questions.length + 2 ? (
                      <Button
                        onClick={handleNext}
                        disabled={
                          currentQuestion.type === "text" 
                            ? !textResponses[currentQuestion.id]?.trim()
                            : false
                        }
                        className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-3 px-6"
                        data-testid="button-next"
                      >
                        Your Final Prophecy
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        disabled={
                          currentQuestion.type === "text" 
                            ? !textResponses[currentQuestion.id]?.trim()
                            : false
                        }
                        className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-3 px-6"
                        data-testid="button-next"
                      >
                        Next Question
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Legacy Prophecy */}
          {currentStep === questions.length + 3 && (
            <motion.div
              key="legacy"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="typography-h2 font-angle text-ancient-gold text-center mb-6">
                    Your Legacy Prophecy
                  </h2>
                  <p className="typography-body font-game text-cream-white mb-6 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    Every great story reaches the moment when the hero glimpses their ultimate destiny—the legacy they're called to create, the change they're meant to author into reality.
                  </p>
                  <p className="typography-body font-game text-cream-white mb-6 leading-relaxed" style={{ textShadow: '0 0 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 0, 0, 0.6)' }}>
                    If you could author reality itself—if your vision could reshape the world—what would you create? What specific transformation would you bring to life? What legacy would you leave that heals the damage and regenerates abundance? Paint the picture of the world you're called to create:
                  </p>
                  
                  <Textarea
                    value={legacyVision}
                    onChange={(e) => setLegacyVision(e.target.value)}
                    className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-32 typography-body font-kardige"
                    placeholder="Envision your legacy and the world you will create..."
                    data-testid="textarea-legacy-vision"
                  />
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="text-cream-white hover:text-ancient-gold typography-body"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending}
                      className="bg-crimson hover:bg-crimson/80 text-cream-white font-angle font-bold py-3 px-6"
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Complete QUESTionaire"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}