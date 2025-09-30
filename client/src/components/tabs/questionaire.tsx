import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  type: "radio" | "checkbox" | "text";
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "QUESTION 1: ORIGIN",
    subtitle: "What Brought You to This Moment?",
    description: "Every hero's journey begins with what came before—the experiences that forged you, the struggles that strengthened you, the commitments that shaped you.\n\nTell us your story: What brought you here? What have you already tried to move your life or work forward? What have you invested—time, money, energy, heart—in transformation, growth, or building something meaningful?",
    type: "text",
    placeholder: "Share your story..."
  },
  {
    id: 2,
    title: "QUESTION 2: THE DRAGON",
    subtitle: "The Challenge You Can No Longer Ignore",
    description: "Every meaningful quest involves facing what blocks your path. What story challenges are you currently navigating?",
    type: "checkbox",
    options: [
      "Clarity — I need to understand my unique narrative and contribution clearly",
      "Communication — I struggle to express my value or vision with power and consistency",
      "Attraction — I'm not magnetizing the right people, funding, or opportunities",
      "Focus — I'm scattered across directions without coherent momentum",
      "Community — I need to cultivate engaged audiences, stakeholders, or deeper team alignment",
      "Authenticity — My external success doesn't reflect my internal values or fulfill my soul",
      "Vision — I have ideas but struggle turning them into sustainable, scalable reality",
      "Alliance — I'm building alone when I desperately need aligned collaborators",
      "Meaning — My life or work lacks the sense of purpose I know is possible"
    ]
  },
  {
    id: 3,
    title: "QUESTION 3: THE AUTHOR",
    subtitle: "Claiming Your Power as Reality Author",
    description: "You hold the pen. Where are you in claiming authorship of your destiny?",
    type: "radio",
    options: [
      "Leading the story — I actively shape organizational narrative and direction",
      "Building my story — I'm consciously creating and controlling how it unfolds",
      "Influencing the story — I help write the story within a larger organization",
      "Developing my voice — I'm cultivating authentic personal or professional expression",
      "Awakening as author — I'm discovering my story while breaking free from others' expectations",
      "Ready to begin — I feel stuck performing roles others wrote, want to hold the pen"
    ]
  },
  {
    id: 4,
    title: "QUESTION 4: THE VISION",
    subtitle: "What Victory Looks Like",
    description: "When your story reaches its triumphant conclusion—when you've authored the reality you came here to create—what transformations become possible?",
    type: "checkbox",
    options: [
      "Crystal clarity — I know exactly who I am, what I offer, and why it matters deeply",
      "Magnetic attraction — The right people, opportunities, and resources flow to me naturally",
      "Thriving community — I'm surrounded by engaged allies who champion the work",
      "Purposeful prosperity — My work generates abundant resources while serving what I care about most",
      "Authentic influence — My voice shapes conversations and decisions that create positive change",
      "Sustainable impact — My efforts compound over time, creating lasting transformation",
      "Aligned organization — My team or company operates from shared values and unified vision",
      "Legacy worth leaving — Future generations inherit a more beautiful world because of my story"
    ]
  },
  {
    id: 5,
    title: "QUESTION 5: THE PATH",
    subtitle: "How You Want to Create This Transformation",
    description: "Different journeys serve different moments. How do you want to create this transformation?",
    type: "radio",
    options: [
      "Intensive Direct Work — I want personalized 1-on-1 guidance to transform my organization's story, brand, and positioning at the highest level",
      "Community Transformation — I want to discover and build my story with facilitated group support and expert guidance",
      "Exploring Options — I'm still understanding what path serves me best"
    ]
  },
  {
    id: 6,
    title: "QUESTION 6: THE INVESTMENT",
    subtitle: "The Value of Your Transformation",
    description: "When you imagine living the story you just envisioned—fully aligned, magnetically attractive, creating the impact you're meant for—what level of investment matches that transformation?",
    type: "radio",
    options: [
      "$15K-50K+ — Maximum commitment for intensive personalized support",
      "$6K-15K — Strategic investment in direct guidance and personalized work",
      "$2K-6K — Meaningful commitment through high-level community transformation",
      "$1K-2K — Significant investment while building capacity through community support",
      "$500-1K — Starting point, proving dedication through community journey",
      "Exploring investment levels — Still understanding what's possible"
    ]
  },
  {
    id: 7,
    title: "QUESTION 7: THE STAKES",
    subtitle: "The Cost of the Unchanged Story",
    description: "If you stay exactly where you are now—living the same story, facing the same challenges, following the same patterns—what does your reality look like 12 months from now?",
    type: "radio",
    options: [
      "Potential withers — My gifts remain unrealized while I perform in stories that drain my soul",
      "Grinding wheel — I'll be exhausted from spinning in circles without real progress",
      "Fading dream — The vision calling to me grows dimmer until I stop believing it's possible",
      "Missed moment — This window for transformation closes and I'm left wondering what could have been",
      "Same prison — Nothing changes and I remain stuck in patterns that no longer serve",
      "Wasted gifts — My unique contributions never reach the people who desperately need them"
    ]
  },
  {
    id: 8,
    title: "QUESTION 8: THE THRESHOLD",
    subtitle: "How Badly Do You Want This?",
    description: "You're standing at the threshold of transformation. The old story ends whether we're ready or not. Those who step through now become the authors of what comes next. Those who wait remain characters in someone else's plot.\n\nHow urgent is this transformation for you?",
    type: "radio",
    options: [
      "Lightning strikes now — I'm ready to step through immediately. This can't wait.",
      "Thunder rolls soon — I'm committed to beginning within the next month. I'm preparing to leap.",
      "Storm clouds gather — I'm building toward this transformation within the next few months.",
      "Still reading the signs — I'm exploring when the timing will align."
    ]
  }
];

export default function QUESTionaire() {
  const [, navigate] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [showOpening, setShowOpening] = useState(true);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (value: string, isCheckbox: boolean = false) => {
    if (isCheckbox) {
      const currentAnswers = (answers[question.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((a) => a !== value)
        : [...currentAnswers, value];
      setAnswers({ ...answers, [question.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const handleTextAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const canProceed = () => {
    const answer = answers[question.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return answer.trim().length > 0;
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowCompletion(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBegin = () => {
    setShowOpening(false);
    window.scrollTo(0, 0);
  };

  const determineRoute = () => {
    // Get the relevant answers
    const pathAnswer = answers[5] as string; // Question 5: THE PATH
    const investmentAnswer = answers[6] as string; // Question 6: THE INVESTMENT
    const thresholdAnswer = answers[8] as string; // Question 8: THE THRESHOLD

    // Check for intensive track
    const isIntensivePath = pathAnswer?.includes("Intensive Direct Work");
    const isHighInvestment = investmentAnswer?.includes("$6K-15K") || 
                            investmentAnswer?.includes("$15K-50K+");
    const isHighUrgency = thresholdAnswer?.includes("Lightning strikes now") || 
                         thresholdAnswer?.includes("Thunder rolls soon");

    // Route to Story System if intensive path + high investment + high urgency
    if (isIntensivePath && isHighInvestment && isHighUrgency) {
      navigate('/story-system');
    } else {
      // Otherwise route to Transformation Journeys
      navigate('/transformation-journeys');
    }
  };

  // Opening screen
  if (showOpening) {
    return (
      <div className="min-h-screen overflow-y-auto" 
           style={{
             backgroundColor: '#1D4241',
             backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                              linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
                              radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
           }}>
        <div className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full"
          >
            <Card className="backdrop-blur-lg bg-white/5 border-2 border-[#F0E2B6]/30 shadow-xl shadow-[#F0E2B6]/20 ring-2 ring-[#F0E2B6]/20 hover:border-[#F0E2B6]/50 hover:shadow-[#F0E2B6]/30 transition-all duration-300 p-6 md:p-12">
              <CardContent className="p-0">
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-ancient-gold mb-6 md:mb-8 text-center font-angle leading-tight" 
                    style={{
                      textShadow: `0 0 20px rgba(212, 175, 55, 0.4), 
                                  0 0 40px rgba(212, 175, 55, 0.2),
                                  0 4px 6px rgba(0, 0, 0, 0.5)`
                    }}>
                  Are You a Victim of Circumstance or an Author of Reality?
                </h1>
                
                <div className="space-y-4 md:space-y-6 text-cream-white font-emerland text-base md:text-lg leading-relaxed mb-8 md:mb-12">
                  <p>
                    Most people live as background characters in stories they never chose—following scripts written by others, performing roles assigned by circumstances, competing in games they didn't design.
                  </p>
                  <p>
                    They wake up one day—successful, maybe even admired—and realize they're living someone else's story. The life they built doesn't match the life they were meant to live.
                  </p>
                  <p className="font-bold text-mystical-teal text-lg md:text-xl">
                    Here's what changes everything: Reality is made of stories. Whoever controls the narrative controls the future.
                  </p>
                  <p>
                    The old stories that once served us are ending. Not because they're being taken away, but because we're outgrowing them. We're being called to evolve—to stop being characters and become authors, to recognize the pen has always been in our hands.
                  </p>
                  <p className="italic text-lg md:text-xl">
                    This questionnaire reveals where you are in that awakening. Eight questions showing whether you're living your story or someone else's, whether this is your moment to claim authorship.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleBegin}
                    size="lg"
                    className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 w-full md:w-auto"
                  >
                    Begin Your Journey
                    <ChevronRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Completion screen
  if (showCompletion) {
    return (
      <div className="min-h-screen overflow-y-auto" 
           style={{
             backgroundColor: '#1D4241',
             backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                              linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
                              radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
           }}>
        <div className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl w-full mx-auto"
          >
            <Card className="backdrop-blur-lg bg-white/5 border-2 border-[#F0E2B6]/30 shadow-xl shadow-[#F0E2B6]/20 ring-2 ring-[#F0E2B6]/20 hover:border-[#F0E2B6]/50 hover:shadow-[#F0E2B6]/30 transition-all duration-300 p-6 md:p-12">
              <CardContent className="p-0">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-ancient-gold text-center mb-6 md:mb-8 font-angle leading-tight"
                    style={{
                      textShadow: `0 0 20px rgba(212, 175, 55, 0.4), 
                                  0 0 40px rgba(212, 175, 55, 0.2),
                                  0 4px 6px rgba(0, 0, 0, 0.5)`
                    }}>
                  Your Journey Awaits
                </h2>
                <div className="space-y-4 md:space-y-6 text-center">
                  <p className="text-lg md:text-xl text-cream-white font-emerland leading-relaxed">
                    The old story is ending. When we remember we are the authors of reality itself, the stories that seemed impossible become inevitable.
                  </p>
                  <p className="text-base md:text-lg text-cream-white font-emerland leading-relaxed">
                    Your responses reveal where you are in this transformation and illuminate the specific support that could accelerate your journey.
                  </p>
                  <p className="text-base md:text-lg text-cream-white font-emerland leading-relaxed">
                    Within 48 hours, we'll reach out with the path designed for you—whether that's intensive direct work to transform your organizational story or community transformation to discover and build your authentic narrative.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl text-mystical-teal font-angle mt-6 md:mt-8"
                     style={{
                       textShadow: `0 0 20px rgba(129, 236, 236, 0.4), 
                                   0 0 40px rgba(129, 236, 236, 0.2),
                                   0 4px 6px rgba(0, 0, 0, 0.5)`
                     }}>
                    What reality will you create?
                  </p>
                </div>
                <div className="mt-8 md:mt-12 flex justify-center">
                  <Button
                    onClick={determineRoute}
                    size="lg"
                    className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 w-full md:w-auto"
                  >
                    Discover Your Path
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Question screens
  return (
    <div className="min-h-screen overflow-y-auto" 
         style={{
           backgroundColor: '#1D4241',
           backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                            linear-gradient(45deg, rgba(29,66,65,0.9), rgba(29,66,65,0.8)), 
                            radial-gradient(circle at 30% 70%, rgba(129, 236, 236, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
         }}>
      <div className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto">
          {/* Progress bar */}
          <div className="mb-6 md:mb-8">
            <div className="mb-2">
              <span className="text-ancient-gold font-angle text-base md:text-lg">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="h-2 md:h-3 bg-deep-black/50 rounded-full overflow-hidden border border-ancient-gold/30">
              <motion.div
                className="h-full bg-gradient-to-r from-ancient-gold to-mystical-teal"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="backdrop-blur-lg bg-white/5 border-2 border-[#F0E2B6]/30 shadow-xl shadow-[#F0E2B6]/20 ring-2 ring-[#F0E2B6]/20 hover:border-[#F0E2B6]/50 hover:shadow-[#F0E2B6]/30 transition-all duration-300 p-4 md:p-8">
                <CardContent className="p-0">
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-ancient-gold mb-2 md:mb-3 font-angle leading-tight"
                      style={{
                        textShadow: `0 0 20px rgba(212, 175, 55, 0.4), 
                                    0 0 40px rgba(212, 175, 55, 0.2),
                                    0 4px 6px rgba(0, 0, 0, 0.5)`
                      }}>
                    {question.title}
                  </h2>
                  <h3 className="text-lg md:text-xl lg:text-2xl text-mystical-teal mb-4 md:mb-6 font-emerland leading-tight"
                      style={{
                        textShadow: `0 0 20px rgba(129, 236, 236, 0.3), 
                                    0 0 40px rgba(129, 236, 236, 0.15),
                                    0 4px 6px rgba(0, 0, 0, 0.5)`
                      }}>
                    {question.subtitle}
                  </h3>

                  <div className="mb-6 md:mb-8 text-cream-white font-emerland text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {question.description}
                  </div>

                  {question.type === "text" && (
                    <Textarea
                      value={(answers[question.id] as string) || ""}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      className="min-h-[200px] md:min-h-[250px] bg-deep-black/50 border-2 border-mystical-teal/50 text-cream-white font-emerland text-base md:text-lg focus:border-ancient-gold/70 focus:ring-ancient-gold/50"
                      placeholder={question.placeholder}
                    />
                  )}

                  {question.type === "radio" && question.options && (
                    <div className="space-y-3 md:space-y-4">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-300 font-emerland text-base md:text-lg ${
                            answers[question.id] === option
                              ? "border-ancient-gold bg-ancient-gold/20 text-cream-white shadow-lg shadow-ancient-gold/20"
                              : "border-mystical-teal/30 bg-deep-black/30 text-cream-white hover:border-mystical-teal hover:bg-mystical-teal/10 hover:shadow-lg hover:shadow-mystical-teal/10"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {question.type === "checkbox" && question.options && (
                    <div className="space-y-3 md:space-y-4">
                      <p className="text-cream-white/70 font-emerland mb-3 md:mb-4 italic text-sm md:text-base">
                        Select all that apply:
                      </p>
                      {question.options.map((option, index) => {
                        const isSelected = (answers[question.id] as string[] || []).includes(option);
                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option, true)}
                            className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-300 font-emerland text-base md:text-lg ${
                              isSelected
                                ? "border-ancient-gold bg-ancient-gold/20 text-cream-white shadow-lg shadow-ancient-gold/20"
                                : "border-mystical-teal/30 bg-deep-black/30 text-cream-white hover:border-mystical-teal hover:bg-mystical-teal/10 hover:shadow-lg hover:shadow-mystical-teal/10"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 md:w-6 md:h-6 rounded border-2 mr-3 md:mr-4 flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? "border-ancient-gold bg-ancient-gold" : "border-mystical-teal"
                                }`}
                              >
                                {isSelected && (
                                  <svg className="w-3 h-3 md:w-4 md:h-4 text-deep-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                  </svg>
                                )}
                              </div>
                              {option}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between gap-3 mt-8 md:mt-10">
                    <Button
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="border-2 border-mystical-teal text-mystical-teal hover:bg-mystical-teal/20 disabled:opacity-50 font-angle font-bold text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold disabled:opacity-50 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                    >
                      {isLastQuestion ? "Complete" : "Next"}
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
