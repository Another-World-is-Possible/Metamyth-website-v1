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

const questions = [
  {
    id: 1,
    title: "In the middle of civilizational collapse and rebirth, are you writing your own story or just reacting to everyone else's chaos?",
    type: "radio",
    options: [
      "I'm actively writing my story—I know what I'm building and why it matters",
      "I'm mostly in control of my path but ready to go way deeper into conscious creation", 
      "I'm breaking free from others' expectations but still discovering what's actually mine to write",
      "I feel completely stuck in stories other people wrote and I desperately want out"
    ],
    subtitle: "Most people discover they're not as much in control as they thought. The awakening can be uncomfortable—and liberating."
  },
  {
    id: 2,
    title: "We're living through the collapse of the old world and the birth of something entirely different. When you imagine stepping fully into who you could become in this emerging reality, what happens in your body?",
    type: "radio",
    options: [
      "I feel electric—I can see my role in what's coming and I'm actively moving toward it",
      "Something in me wakes up and hungers to explore this possibility deeper",
      "I feel it calling but invisible walls keep stopping me from breaking through",
      "I'm so buried under everyone else's crises I can barely imagine my own transformation"
    ],
    subtitle: "Your body knows the truth before your mind does. What it's telling you matters more than you realize."
  },
  {
    id: 3,
    title: "The old economy is dying. But some people are building what comes next. What have you learned or created that could actually serve the world we're trying to birth?",
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
    subtitle: "Every person carries medicine the world desperately needs. Most haven't learned to see their gifts clearly yet."
  },
  {
    id: 4,
    title: "Every person building something meaningful hits the same core challenge that either stops them or becomes rocket fuel. What's the biggest gap between your potential and your current reality—and what happens if nothing changes in the next 12 months?",
    type: "radio",
    options: [
      "I'm not clear on my unique contribution and I'm wasting precious time on work that isn't mine—years slip away",
      "I keep getting pulled into opportunities that drain me instead of feeding my real mission—burnout is inevitable",
      "I'm succeeding at things I don't care about while my soul's work gets no resources—I'm dying inside",
      "I know exactly what needs to exist but I can't crack the code on making it financially viable—I might surrender",
      "I'm scattered across too many directions and nothing gains real momentum—I'm spinning wheels while the world burns"
    ],
    subtitle: "The thing that stops most people isn't external circumstances. It's internal clarity. This gap is either your prison or your laboratory."
  },
  {
    id: 5,
    title: "Building the new world requires vision, commitment, and resources. If you found the right strategic alliance to accelerate what you're here to create, what's genuinely realistic for your investment over the next 6-12 months?",
    type: "radio",
    options: [
      "$15K-50K+ annually—I command substantial resources and have authority to deploy them strategically",
      "$5K-15K—I have meaningful capacity and will invest significantly in authentic transformation",
      "$1K-5K—I'm strategic with resources but will commit to the right guidance and community",
      "$500-1K—I'm building capacity while investing primarily energy and attention in aligned work",
      "Exploring exchange—I need to understand what's possible before knowing what commitment makes sense"
    ],
    subtitle: "Most people either underestimate or overestimate their real capacity. Accurate assessment is the foundation of effective action."
  },
  {
    id: 6,
    title: "The emerging economy runs on collaboration, not extraction. Beyond what you might receive, how do you see yourself contributing to a community of people consciously authoring the future?",
    type: "radio",
    options: [
      "Systems innovation—I redesign structures, processes, and agreements that embed new values",
      "Technology development—I build platforms, tools, and digital solutions for conscious collaboration",
      "Economic transformation—I work with finance, investment, and resource circulation in regenerative ways",
      "Creative expression—I use art, design, and media to communicate visions that inspire transformation",
      "Community cultivation—I create spaces where authentic connection and mutual support flourish",
      "Story amplification—I help articulate and spread narratives that shift consciousness",
      "Network weaving—I connect souls and facilitate relationships that create collaborative magic",
      "Learning integration—I'm developing capacity to contribute more meaningfully as I grow"
    ],
    subtitle: "Communities that change the world are built by people who show up to give, not just get. Your contribution style reveals everything."
  },
  {
    id: 7,
    title: "Every transformation has a single point of maximum leverage—the one shift that unlocks everything else. Complete this sentence: \"If I could change one thing that would transform my entire trajectory, it would be...\"",
    type: "text",
    placeholder: "Getting crystal clarity on what I'm actually meant to build in this lifetime...",
    subtitle: "The thing you're most afraid to admit you need is usually the thing that would change everything."
  }
];

export default function QUESTionaire() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1 = contact, 2+ = questions
  const [responses, setResponses] = useState<Record<number, any>>({});
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
              <h2 className="font-angle text-3xl font-bold text-ancient-gold mb-6">
                Your QUESTionaire Journey Complete
              </h2>
              <p className="font-khaft text-lg text-silver mb-8 leading-relaxed">
                Your responses reveal exactly where you stand in this great authorship. 
                We'll reach out within 48 hours with resources, community, or collaboration 
                designed for your specific role in writing what comes next.
              </p>
              
              {qualification === "calendar" ? (
                <div className="space-y-4">
                  <p className="font-game text-mystical-teal font-bold">
                    You qualify for intensive story work! Schedule your deep dive session:
                  </p>
                  <a 
                    href="https://zcal.co/i/kEqudqJ1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-4 px-8 text-lg">
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
                    <Button className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold py-4 px-8 text-lg">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Our Discord Community
                    </Button>
                  </a>
                </div>
              )}
              
              <p className="font-khaft text-silver/80 text-sm mt-6 italic">
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
      <div className="fixed top-6 right-6 z-40 font-angle text-ancient-gold text-sm tracking-wider">
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
              <h1 className="font-angle text-5xl md:text-7xl font-bold text-ancient-gold mb-8"
                  style={{ 
                    textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)'
                  }}>
                QUESTionaire
              </h1>
              <h2 className="font-game text-2xl md:text-3xl text-mystical-teal mb-6 italic">
                "The 7-Question Journey That Reveals Who's Really Writing Your Life"
              </h2>
              <p className="font-khaft text-lg text-silver mb-8 max-w-3xl mx-auto leading-relaxed">
                Right now, our civilization is writing its final chapters. Systems designed for scarcity are destroying abundance. 
                Stories built on separation are fragmenting communities. But here's what the breakdown reveals: we're living through 
                the greatest transformation in human history.
              </p>
              <p className="font-game text-lg text-ancient-gold mb-12 font-bold">
                Are You the Hero of Your Story or a Background Character in Someone Else's?
              </p>
              <Button
                onClick={handleNext}
                className="bg-mystical-teal hover:bg-mystical-teal/80 text-deep-black font-angle font-bold py-4 px-8 text-xl"
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
                  <p className="font-khaft text-center text-silver mb-8">
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
                        className="bg-deep-black/50 border-[#81ecec]/30 text-silver"
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
                        className="bg-deep-black/50 border-[#81ecec]/30 text-silver"
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
                  
                  {currentQuestion.type === "text" ? (
                    <div className="space-y-6">
                      <Textarea
                        value={responses[currentQuestion.id] || ""}
                        onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                        className="bg-deep-black/50 border-mystical-teal/30 text-silver min-h-32 font-khaft"
                        placeholder={currentQuestion.placeholder}
                        data-testid={`textarea-question-${currentQuestion.id}`}
                      />
                    </div>
                  ) : (
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
                            <span className="font-khaft text-silver leading-relaxed">{option}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  <p className="font-khaft text-mystical-teal/80 text-sm text-center mt-6 italic">
                    {currentQuestion.subtitle}
                  </p>
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      variant="ghost"
                      className="text-silver hover:text-ancient-gold font-game"
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    
                    {currentStep === questions.length + 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending}
                        className="bg-crimson hover:bg-crimson/80 text-white font-angle font-bold py-3 px-6"
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
                            ? !responses[currentQuestion.id]?.trim()
                            : !responses[currentQuestion.id]
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