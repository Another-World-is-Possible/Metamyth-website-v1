import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Mail, Phone, ExternalLink, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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
      "I'm consciously building my story—creating an organization and controlling how it unfolds",
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
    subtitle: "When your story reaches its triumphant conclusion—when you've authored the reality you came here to create—what victories do you see? What transformations become possible when your authentic narrative is fully expressed? (Select all that resonate)",
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
    subtitle: "Every meaningful quest involves both discovering your unique gifts and facing what blocks your path. Heroes don't avoid dragons—they learn what treasures the dragons guard. What story challenges are you currently navigating? (Select all that apply)",
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
    textPlaceholder: "Write in your unique field...",
    description: "True wealth isn't what you own—it's what you create, connect, and contribute to the healing of our world."
  },
  {
    id: 6,
    title: "Your Moment of Readiness",
    subtitle: "Every hero's journey reaches the moment when destiny calls and the soul must answer. When you imagine stepping fully into your most authentic story—the vision that makes your heart race with possibility—what happens in your body, and when does that transformation begin?",
    type: "radio",
    options: [
      "Lightning strikes now—I'm ready to begin this transformation immediately",
      "Thunder rolls within three moons—I'm prepared to start within the next few months",
      "Storm clouds gather this cycle—I'm building toward action within this year",
      "Still reading the signs—I'm exploring when the timing will be right"
    ],
    hasTextInput: false,
    description: "The call to adventure doesn't wait for perfect conditions. It comes when your soul is ready to claim its destiny."
  },
  {
    id: 7,
    title: "The Cost of the Unchanged Story",
    subtitle: "Every hero faces this choice: transform or remain trapped. If you stay exactly where you are now—living the same story, facing the same challenges, following the same patterns—what does your reality look like 12 months from now?",
    type: "radio",
    options: [
      "The slow death—My potential withers while I perform in stories that drain my soul",
      "The grinding wheel—I'll be exhausted from spinning in circles without real progress",
      "The fading dream—The vision that calls to me grows dimmer until I stop believing it's possible",
      "The missed moment—This window for transformation closes and I'm left wondering what could have been",
      "The same prison—Nothing changes and I remain stuck in patterns that no longer serve anyone",
      "The wasted gifts—My unique contributions never reach the people who desperately need them"
    ],
    hasTextInput: false,
    description: "The price of an unchanged story is always higher than the cost of transformation. Time doesn't wait for anyone."
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
  const [showSpecificResult, setShowSpecificResult] = useState(false);
  const [qualification, setQualification] = useState<"advanced" | "community">("community");
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      // This now calls our Supabase Edge Function
      const { data: functionData, error } = await supabase.functions.invoke(
        "submit-questionnaire",
        {
          body: data,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      // The Edge Function will return the qualification status
      return functionData;
    },
    onSuccess: (data: any) => {
      setQualification(data.qualified);
      setShowResult(true);
      toast({
        title: "Success!",
        description: data.message,
      });
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
      // Basic email format validation
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(contactInfo.email)) {
        toast({
          title: "Invalid Email Format",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep >= 3 && currentStep <= questions.length + 2) {
      // Check if current question is answered
      const questionIndex = currentStep - 3;
      const currentQuestionId = questions[questionIndex]?.id;
      
      if (!responses[currentQuestionId] || 
          (Array.isArray(responses[currentQuestionId]) && responses[currentQuestionId].length === 0)) {
        toast({
          title: "Answer Required",
          description: "Please answer this question to continue.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(prev => prev + 1);
    } else if (currentStep <= questions.length + 3) {
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

  if (showResult && !showSpecificResult) {
    return (
      <div className="min-h-screen overflow-y-auto" 
           style={{
             backgroundColor: '#1D4241',
             backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                              linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
                              radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
           }}>
        <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center w-full"
          >
          <Card className="backdrop-blur-lg bg-white/5 border-2 border-[#F0E2B6]/30 shadow-xl shadow-[#F0E2B6]/20 ring-2 ring-[#F0E2B6]/20 hover:border-[#F0E2B6]/50 hover:shadow-[#F0E2B6]/30 transition-all duration-300 p-8">
            <CardContent>
              <h2 className="typography-h2 text-ancient-gold mb-6 font-angle">
                Your QUESTionaire Journey Complete
              </h2>
              <p className="text-base text-cream-white mb-6 leading-relaxed font-grillages">
                The old story is ending whether we like it or not, and we have a narrow window to create the future we want. When we remember we are the authors of reality itself, the stories that seemed impossible become inevitable. This is how legends begin: with a single choice to step into the story you came here to tell. Your responses have revealed your position in this transformation and illuminated the specific support that could accelerate your role in what's emerging. Within 48 hours, we'll reach out with the alliance, resources, or community designed to help you craft the narrative that transforms not just your world, but reality itself.
              </p>
              <p className="text-base text-cream-white mb-6 leading-relaxed font-grillages">
                What reality will you create?
              </p>
              
              <Button 
                onClick={() => setShowSpecificResult(true)}
                className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-4 px-8 mb-6"
              >
                YOUR RESULTS
              </Button>
              
              <p className="text-xs text-cream-white/80 mt-6 italic font-grillages">
                The future isn't waiting for heroes to save it. It's waiting for authors to write it.
              </p>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResult && showSpecificResult) {
    return (
      <div className="min-h-screen overflow-y-auto" 
           style={{
             backgroundColor: '#1D4241',
             backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                              linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
                              radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
           }}>
        <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center w-full"
          >
          <Card className="backdrop-blur-lg bg-white/5 border-2 border-[#F0E2B6]/30 shadow-xl shadow-[#F0E2B6]/20 ring-2 ring-[#F0E2B6]/20 hover:border-[#F0E2B6]/50 hover:shadow-[#F0E2B6]/30 transition-all duration-300 p-8">
            <CardContent>
              <h2 className="typography-h2 text-ancient-gold mb-6 font-angle">
                {qualification === "advanced" ? "The Next Chapter of Your Story Awaits" : "Your Story Journey Begins in Community"}
              </h2>
              
              {qualification === "advanced" ? (
                <div className="space-y-4">
                  <p className="text-base text-[#F0E2B6] font-grillages">
                    Your responses reveal someone who has already begun consciously crafting reality and is ready for the deeper work of transformation. You operate with the resources and authority to make meaningful change happen, and you sense there's something even greater wanting to emerge through your story.
                  </p>
                  <p className="text-base text-[#F0E2B6] font-grillages mb-6">
                    The path forward is strategic alliance with guides who understand the magnitude of change you're here to create and can help you unlock the full potential of your narrative.
                  </p>
                  <a 
                    href="https://zcal.co/i/nIEsikdu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-[#F0E2B6] hover:bg-[#F0E2B6]/80 text-[#1D4241] font-angle font-bold py-4 px-8">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Schedule Your Story Strategy Session
                    </Button>
                  </a>
                  <p className="text-sm text-cream-white/80 mt-4 font-grillages italic">
                    In this strategic conversation, we'll map exactly where you are in your journey and reveal the specific support that could accelerate your transformation into the reality you're meant to author.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base text-[#F0E2B6] font-grillages">
                    Your story is calling you toward transformation, and the wisest way to answer that call is alongside fellow travelers who understand the path you're walking. Every epic begins with gathering the right companions and resources for the adventure ahead.
                  </p>
                  <p className="text-base text-[#F0E2B6] font-grillages mb-6">
                    You're positioned perfectly to develop your narrative through community connection, story-building tools, and the support of others who are also stepping into their authentic power.
                  </p>
                  <a 
                    href="https://luma.com/u7vz8286" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mb-4"
                  >
                    <Button className="bg-[#F0E2B6] hover:bg-[#F0E2B6]/80 text-[#1D4241] font-angle font-bold py-4 px-8">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join the Community Quest Call
                    </Button>
                  </a>
                  <p className="text-sm text-cream-white/80 mt-4 font-grillages italic">
                    Connect with other story-builders, access transformation resources, and experience our revolutionary MetaMyth system as it develops. Your evolution accelerates in community.
                  </p>
                </div>
              )}
              
              <p className="text-xs text-cream-white/80 mt-6 italic font-grillages">
                The future isn't waiting for heroes to save it. It's waiting for authors to write it.
              </p>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden" 
         style={{
           backgroundColor: '#1D4241',
           backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                            linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
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
              <h1 className="text-4xl text-ancient-gold mb-8 text-glow-gold font-angle">
                The QUESTionaire: The Complete Call to Adventure
              </h1>
              
              <Card className="backdrop-blur-lg bg-mystical-teal/8 border-2 border-[#81ecec]/70 shadow-xl shadow-[#81ecec]/50 ring-2 ring-[#81ecec]/40 hover:border-[#81ecec]/90 hover:shadow-[#81ecec]/70 transition-all duration-300 mb-8">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl text-mystical-teal mb-6 italic typography-body">
                    "The 7-Question Journey That Reveals Who's Really Writing Your Life: Are You the Hero of Your Story<br />or a Background Character in Someone Else's?"
                  </h2>
                  <p className="text-lg text-cream-white mb-0 max-w-2xl mx-auto leading-relaxed font-grillages">
                    The old story is ending—systems designed for scarcity destroying abundance, narratives built on separation fragmenting communities, economic myths optimized for extraction devouring the living world. But here's what the breakdown reveals: we're living through the greatest transformation in human history. All around the world, people are awakening to their power as reality authors. They've remembered the fundamental truth that reality is made of stories, and whoever controls the narrative controls the future. The fate of our species may depend on how many people remember they hold this power before it's too late. This could be your moment of awakening.
                  </p>
                </CardContent>
              </Card>
              
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
                  <h2 className="text-3xl font-angle text-ancient-gold text-center mb-4">
                    Your Journey Begins
                  </h2>
                  <p className="text-base text-center text-cream-white mb-6 font-grillages">
                    First, let's connect so we can share your results and next steps.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-base text-mystical-teal font-grillages mb-2">
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
                      <label className="block text-base text-mystical-teal font-grillages mb-2">
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
                    <button
                      onClick={handleNext}
                      className="cta-button-base cta-button-gold questionnaire-button"
                      data-testid="button-continue"
                    >
                      Continue to Questions <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
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
                  <h2 className="text-3xl font-angle text-ancient-gold text-center mb-4">
                    The Origin of Your Quest
                  </h2>
                  <p className="text-base font-grillages text-center text-cream-white mb-6 leading-relaxed">
                    Every hero's journey begins with what came before—the experiences that forged you, the struggles that strengthened you, the commitments that shaped you. Tell us your story:
                  </p>
                  <p className="text-base font-grillages text-cream-white mb-6 leading-relaxed">
                    What brought you to this moment? What have you already tried to move your life or work forward? What have you invested—time, money, energy, heart—in transformation, growth, or building something meaningful?
                  </p>
                  
                  <Textarea
                    value={originStory}
                    onChange={(e) => setOriginStory(e.target.value)}
                    className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-20 text-base font-grillages"
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
                    <button
                      onClick={handleNext}
                      className="cta-button-base cta-button-gold questionnaire-button"
                    >
                      Continue Your Quest <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
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
                  <h2 className="text-3xl font-angle text-ancient-gold mb-4 text-center leading-tight">
                    {currentQuestion.title}
                  </h2>
                  
                  <p className="text-lg text-mystical-teal/80 text-center mb-6 font-grillages leading-relaxed">
                    {currentQuestion.subtitle}
                  </p>
                  
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
                              <span className="text-base text-cream-white leading-relaxed font-grillages">{option}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Personal response text area ONLY for questions with hasTextInput: true */}
                    {currentQuestion.hasTextInput && (
                      <div className="mt-6">
                        <label className="block text-base text-mystical-teal font-grillages mb-3">
                          Write in your unique field:
                        </label>
                        <Textarea
                          value={textResponses[currentQuestion.id] || ""}
                          onChange={(e) => handleTextResponse(currentQuestion.id, e.target.value)}
                          className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-20 text-base font-grillages"
                          placeholder={currentQuestion.textPlaceholder || "Share your thoughts..."}
                          data-testid={`textarea-question-${currentQuestion.id}`}
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-base text-cream-white/80 text-center mt-4 italic font-grillages leading-relaxed">
                    {currentQuestion.description}
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
                      <button
                        onClick={handleNext}
                        disabled={false}
                        className="cta-button-base cta-button-gold questionnaire-button"
                        data-testid="button-next"
                      >
                        Your Final Prophecy <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={false}
                        className="cta-button-base cta-button-teal questionnaire-button"
                        data-testid="button-next"
                      >
                        Next Question <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
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
                  <h2 className="text-3xl font-angle text-ancient-gold text-center mb-4">
                    Your Legacy Prophecy
                  </h2>
                  <p className="text-base font-grillages text-cream-white mb-6 leading-relaxed">
                    Every great story reaches the moment when the hero glimpses their ultimate destiny—the legacy they're called to create, the change they're meant to author into reality.
                  </p>
                  <p className="text-base font-grillages text-cream-white mb-6 leading-relaxed">
                    Close your eyes and travel to the future. You're looking back at the extraordinary transformation we created together—the story we authored, the reality we built, the world we healed. What are you most proud of? What legacy did your authentic story create? What became possible because you remembered you were the author?
                  </p>
                  
                  <Textarea
                    value={legacyVision}
                    onChange={(e) => setLegacyVision(e.target.value)}
                    className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-20 text-base font-grillages"
                    placeholder="Your legacy prophecy..."
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
                    <button
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending}
                      className="cta-button-base cta-button-crimson questionnaire-button"
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : "Complete QUESTionaire"}
                      {!submitMutation.isPending && <ChevronRight className="w-4 h-4 ml-1" />}
                    </button>                  
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