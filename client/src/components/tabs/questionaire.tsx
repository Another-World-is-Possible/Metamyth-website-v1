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

interface Question {
  id: number;
  title: string;
  type: "radio" | "checkbox" | "text";
  options?: string[];
  placeholder?: string;
  subtitle: string;
  hasTextInput?: boolean;
  examples?: string[];
}

const questions = [
  {
    id: 1,
    title: "In the middle of this great transition, are you writing your own story or just reacting to everyone else's chaos?",
    type: "radio",
    options: [
      "I'm actively writing my story—I know what I'm building and why it matters",
      "I'm mostly in control of my path but ready to go way deeper into conscious creation",
      "I'm breaking free from others' expectations but still discovering what's actually mine to write",
      "I feel completely stuck in stories other people wrote and I desperately want out"
    ],
    subtitle: "Most people discover they're not as much in control as they thought. The awakening can be uncomfortable—and liberating.",
    hasTextInput: true
  },
  {
    id: 2,
    title: "We're living through the end of one world and the birth of something entirely different. When you imagine stepping fully into who you could become in this emerging reality, what happens in your body?",
    type: "radio",
    options: [
      "I feel electric—I can see my role in what's coming and I'm actively moving toward it",
      "Something in me wakes up and hungers to explore this possibility deeper",
      "I feel it calling but invisible walls keep stopping me from breaking through",
      "I'm so buried under everyone else's crises I can barely imagine my own transformation"
    ],
    subtitle: "Your body knows the truth before your mind does. What it's telling you matters more than you realize.",
    hasTextInput: true
  },
  {
    id: 3,
    title: "The old story is changing. But some people are building what comes next. What have you learned or created that could actually serve the world we're trying to birth?",
    type: "checkbox",
    options: [
      "I understand broken systems and I see pathways to rebuild them regeneratively",
      "I build with technology but I want to create solutions that heal rather than extract",
      "I craft communication that helps people see through the illusions holding us back",
      "I naturally gather people around what matters most and watch communities come alive",
      "I spot opportunities and solutions that remain invisible to others",
      "I create meaningful work but I'm still learning how to make it economically sustainable",
      "I've cultivated networks that could connect game-changers for world-shifting collaboration",
      "When something genuinely matters, I show up with everything I have"
    ],
    subtitle: "Every person carries medicine the world desperately needs. Most haven't learned to see their gifts clearly yet.",
    hasTextInput: true
  },
  {
    id: 4,
    title: "Every person building something meaningful faces dragons—challenges that either defeat us or forge us into who we need to become. What's your dragon? What's the biggest obstacle between your potential and your current reality, and what happens if you don't slay it in the next 12 months?",
    type: "radio",
    options: [
      "I'm not clear on my unique contribution and I'm wasting precious time on work that isn't mine—years slip away",
      "I keep getting pulled into opportunities that drain me instead of feeding my real mission—burnout is inevitable",
      "I'm succeeding at things I don't care about while my soul's work gets no resources—I'm dying inside",
      "I know exactly what needs to exist but I can't crack the code on making it financially viable—I might surrender",
      "I'm scattered across too many directions and nothing gains real momentum—I'm spinning wheels while the world burns"
    ],
    subtitle: "The dragon that stops most people isn't external circumstances. It's internal clarity. This challenge is either your prison or your forge.",
    hasTextInput: true
  },
  {
    id: 5,
    title: "Transforming your story—stepping into who you're actually meant to be—requires investment in that process. If you found the right support to help you author your most authentic path, what feels realistic for investing in that transformation over the next year?",
    type: "radio",
    options: [
      "$15K-50K+ annually—Planetary impact: My story serves global transformation and deserves maximum investment",
      "$5K-15K—Community impact: My work affects many lives and merits significant commitment",
      "$1K-5K—Personal transformation: I'm focused on my own story development with strategic investment",
      "$500-1K—I'm building capacity while investing what I have in my authentic becoming",
      "Exploring possibilities—I need to understand what's available before committing resources"
    ],
    subtitle: "Your investment reflects both your capacity and your conviction about the transformation you're seeking. Resources follow commitment to authentic change.",
    hasTextInput: true
  },
  {
    id: 6,
    title: "The old story says only those who can pay in money deserve transformation. We're writing a different story—one that recognizes many forms of wealth. If you're not rich in cash, what are you rich in? How would you contribute to a community creating the new story of our time?",
    type: "checkbox",
    options: [
      "Systems design—I rebuild structures and processes that embed regenerative values",
      "Technology creation—I build digital tools and platforms for conscious collaboration",
      "Resource circulation—I understand finance and economic flows in service of life",
      "Creative expression—I use art and media to make new realities visible and compelling",
      "Community cultivation—I create spaces where authentic connection and mutual aid flourish",
      "Story amplification—I help articulate narratives that shift how people see what's possible",
      "Network weaving—I connect the right people for collaborative breakthroughs",
      "Time and presence—I show up consistently with energy and commitment to collective transformation"
    ],
    subtitle: "Transformation shouldn't be pay-to-play. The new economy recognizes that everyone brings unique forms of wealth. Your contribution determines your role in co-creating what's next.",
    hasTextInput: true
  },
  {
    id: 7,
    title: "Every transformation has a single point of maximum leverage—the one shift that unlocks everything else. What's yours? What one change would transform your entire trajectory?",
    type: "text",
    placeholder: "Getting crystal clarity on what I'm actually meant to build in this lifetime...",
    subtitle: "The thing you're most afraid to admit you need is usually the thing that would change everything.",
    hasTextInput: true,
    examples: [
      "Getting crystal clarity on what I'm actually meant to build in this lifetime...",
      "Finding genuine collaborators who share the vision and can help birth it...",
      "Cracking the code on sustainable economics for meaningful work...",
      "Breaking free from others' expectations and fully trusting my authentic path...",
      "Developing the courage to step into the leadership role this work demands..."
    ]
  }
];

export default function QUESTionaire() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1 = contact, 2+ = questions
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [textResponses, setTextResponses] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [showResult, setShowResult] = useState(false);
  const [qualification, setQualification] = useState<"calendar" | "discord">("discord");
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/questionnaire/submit", "POST", data);
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
    } else if (currentStep <= questions.length + 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      email: contactInfo.email,
      phone: contactInfo.phone,
      responses: responses,
      textResponses: textResponses,
    });
  };

  const progress = showResult ? 100 : Math.max(0, ((currentStep - 1) / (questions.length + 1)) * 100);
  const currentQuestion = questions[currentStep - 2];

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
          <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10 p-8">
            <CardContent>
              <h2 className="typography-h2 text-ancient-gold mb-6">
                Your QUESTionaire Journey Complete
              </h2>
              <p className="typography-body text-cream-white mb-8 leading-relaxed">
                This is it. We are standing at the threshold of something monumental. The old story that built our world is ending, and the new one is being written by people who remember they are the authors of reality itself. They're not waiting for permission or perfect conditions. They're picking up the pen and writing the future into existence—regenerative economies, collaborative communities, technology that serves life, governance that honors the whole.
              </p>
              <p className="typography-body text-cream-white mb-8 leading-relaxed">
                This could be the moment that changes everything for you. Your responses reveal exactly where you stand in this great authorship—and what specific support could accelerate your role in what's emerging. We'll reach out within 48 hours with resources, community, or strategic alliance opportunities designed for your unique position in the shift.
              </p>
              <p className="typography-body text-cream-white mb-8 leading-relaxed">
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
                  <p className="font-game text-ancient-gold font-bold">
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
              
              <p className="typography-body text-cream-white/80 mt-6 italic">
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
        QUESTION {Math.max(0, currentStep - 1)} / {questions.length}
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
              <h1 className="typography-h1 text-ancient-gold mb-8"
                  style={{ 
                    textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)'
                  }}>
                QUESTionaire
              </h1>
              <h2 className="typography-h3 text-mystical-teal mb-6 italic">
                "The 7-Question Journey That Reveals Who's Really Writing Your Life"
              </h2>
              <h3 className="typography-h3 text-ancient-gold mb-6 font-bold">
                "Are You the Hero of Your Story or a Background Character in Someone Else's?"
              </h3>
              <p className="typography-body text-cream-white mb-8 max-w-3xl mx-auto leading-relaxed">
                The old story is ending. Systems designed for scarcity are destroying abundance. Stories built on separation are fragmenting communities. But here's what the breakdown reveals: we're living through the greatest transformation in human history. All around the world, people are awakening to their power as reality authors. They've remembered the fundamental truth: reality is made of stories, and whoever controls the narrative controls the future. The fate of our species may depend on how many people remember they hold this power—before it's too late.
              </p>
              <p className="typography-body text-cream-white mb-12 max-w-3xl mx-auto leading-relaxed">
                The old story is ending. The new one is being written right now. Some people will author the future consciously. Others will simply react to what gets created around them. This journey reveals which one you are—and what becomes possible when you pick up the pen.
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
              <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-mystical-teal/60 shadow-lg shadow-mystical-teal/40">
                <CardContent className="p-8">
                  <h2 className="font-angle text-3xl font-bold text-ancient-gold text-center mb-6">
                    Your Journey Begins
                  </h2>
                  <p className="font-game text-center text-cream-white mb-8">
                    First, let's connect so we can share your results and next steps.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block font-game text-mystical-teal font-bold mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-deep-black/50 border-[#81ecec]/30 text-cream-white"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-game text-mystical-teal font-bold mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number (Optional)
                      </label>
                      <Input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-deep-black/50 border-[#81ecec]/30 text-cream-white"
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

          {/* Questions */}
          {currentStep >= 2 && currentStep <= questions.length + 1 && currentQuestion && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-deep-black/90 backdrop-blur-sm border-2 border-[#81ecec]/60 shadow-lg shadow-[#81ecec]/40 ring-2 ring-[#81ecec]/30 bg-gradient-to-br from-deep-black/95 via-deep-black/90 to-[#81ecec]/10">
                <CardContent className="p-8">
                  <h2 className="font-angle text-2xl md:text-3xl font-bold text-ancient-gold mb-6 text-center leading-tight">
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
                              <span className="font-game text-cream-white leading-relaxed">{option}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Personal response text area for all questions */}
                    <div className="mt-6">
                      <label className="block font-game text-mystical-teal font-bold mb-3">
                        Your personal response:
                      </label>
                      <Textarea
                        value={textResponses[currentQuestion.id] || ""}
                        onChange={(e) => handleTextResponse(currentQuestion.id, e.target.value)}
                        className="bg-deep-black/50 border-mystical-teal/30 text-cream-white min-h-32 font-game"
                        placeholder={currentQuestion.placeholder || "Share your thoughts..."}
                        data-testid={`textarea-question-${currentQuestion.id}`}
                      />
                      {currentQuestion.examples && (
                        <div className="mt-3">
                          <p className="font-game text-mystical-teal/70 text-sm mb-2">Examples:</p>
                          {currentQuestion.examples.map((example, index) => (
                            <p key={index} className="font-game text-cream-white/60 text-sm italic">- "{example}"</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="font-game text-mystical-teal/80 text-sm text-center mt-6 italic">
                    {currentQuestion.subtitle}
                  </p>
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      variant="ghost"
                      className="text-cream-white hover:text-ancient-gold font-game"
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    
                    {currentStep === questions.length + 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending}
                        className="bg-crimson hover:bg-crimson/80 text-cream-white font-angle font-bold py-3 px-6"
                        data-testid="button-submit"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Complete QUESTionaire"}
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
        </AnimatePresence>
      </div>
    </div>
  );
}