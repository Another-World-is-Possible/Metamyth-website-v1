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
  type: "radio" | "checkbox" | "text";
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "ORIGIN",
    subtitle: "What Brought You to This Moment?",
    type: "text",
    placeholder: "Every hero's journey begins with what came before—the experiences that forged you, the struggles that strengthened you, the commitments that shaped you.\n\nTell us your story: What brought you here? What have you already tried to move your life or work forward? What have you invested—time, money, energy, heart—in transformation, growth, or building something meaningful?"
  },
  {
    id: 2,
    title: "THE DRAGON",
    subtitle: "The Challenge You Can No Longer Ignore",
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
    title: "THE AUTHOR",
    subtitle: "Claiming Your Power as Reality Author",
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
    title: "THE VISION",
    subtitle: "What Victory Looks Like",
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
    title: "THE PATH",
    subtitle: "How You Want to Create This Transformation",
    type: "radio",
    options: [
      "Intensive Direct Work — I want personalized 1-on-1 guidance to transform my organization's story, brand, and positioning at the highest level",
      "Community Transformation — I want to discover and build my story with facilitated group support and expert guidance",
      "Exploring Options — I'm still understanding what path serves me best"
    ]
  },
  {
    id: 6,
    title: "THE INVESTMENT",
    subtitle: "The Value of Your Transformation",
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
    title: "THE STAKES",
    subtitle: "The Cost of the Unchanged Story",
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
    title: "THE THRESHOLD",
    subtitle: "How Badly Do You Want This?",
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
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-deep-black text-cream-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          <Card className="backdrop-blur-lg bg-mystical-teal/10 border-2 border-ancient-gold shadow-2xl">
            <CardContent className="p-12">
              <h2 className="typography-h2 text-ancient-gold text-center mb-6 font-angle">
                Your Journey Awaits
              </h2>
              <div className="space-y-6 text-center">
                <p className="typography-lead text-cream-white font-emerland">
                  The old story is ending. When we remember we are the authors of reality itself, the stories that seemed impossible become inevitable.
                </p>
                <p className="typography-body text-cream-white font-emerland">
                  Your responses reveal where you are in this transformation and illuminate the specific support that could accelerate your journey.
                </p>
                <p className="typography-body text-cream-white font-emerland">
                  Within 48 hours, we'll reach out with the path designed for you—whether that's intensive direct work to transform your organizational story or community transformation to discover and build your authentic narrative.
                </p>
                <p className="typography-h3 text-mystical-teal font-angle mt-8">
                  What reality will you create?
                </p>
              </div>
              <div className="mt-12 flex justify-center">
                <Button
                  onClick={determineRoute}
                  className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold text-xl px-12 py-6"
                >
                  Discover Your Path
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black text-cream-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Opening - Only shown on first question */}
        {currentQuestion === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="typography-h1 text-ancient-gold mb-6 font-angle">
              Are You a Victim of Circumstance or an Author of Reality?
            </h1>
            <div className="space-y-4 text-cream-white font-emerland max-w-3xl mx-auto">
              <p className="typography-lead">
                Most people live as background characters in stories they never chose—following scripts written by others, performing roles assigned by circumstances, competing in games they didn't design.
              </p>
              <p className="typography-body">
                They wake up one day—successful, maybe even admired—and realize they're living someone else's story. The life they built doesn't match the life they were meant to live.
              </p>
              <p className="typography-body font-bold text-mystical-teal">
                Here's what changes everything: Reality is made of stories. Whoever controls the narrative controls the future.
              </p>
              <p className="typography-body">
                The old stories that once served us are ending. Not because they're being taken away, but because we're outgrowing them. We're being called to evolve—to stop being characters and become authors, to recognize the pen has always been in our hands.
              </p>
              <p className="typography-body italic">
                This questionnaire reveals where you are in that awakening. Eight questions showing whether you're living your story or someone else's, whether this is your moment to claim authorship.
              </p>
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-ancient-gold font-angle">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-mystical-teal font-angle">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-deep-black/50 rounded-full overflow-hidden">
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
            <Card className="backdrop-blur-lg bg-mystical-teal/10 border-2 border-ancient-gold shadow-2xl">
              <CardContent className="p-8">
                <h2 className="typography-h2 text-ancient-gold mb-2 font-angle">
                  {question.title}
                </h2>
                <h3 className="typography-h3 text-mystical-teal mb-8 font-emerland">
                  {question.subtitle}
                </h3>

                {question.type === "text" && (
                  <div className="space-y-4">
                    <p className="text-cream-white font-emerland whitespace-pre-line mb-4">
                      {question.placeholder}
                    </p>
                    <Textarea
                      value={(answers[question.id] as string) || ""}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      className="min-h-[200px] bg-deep-black/50 border-mystical-teal/50 text-cream-white font-emerland"
                      placeholder="Share your story..."
                    />
                  </div>
                )}

                {question.type === "radio" && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-emerland ${
                          answers[question.id] === option
                            ? "border-ancient-gold bg-ancient-gold/20 text-cream-white"
                            : "border-mystical-teal/30 bg-deep-black/30 text-cream-white hover:border-mystical-teal hover:bg-mystical-teal/10"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === "checkbox" && question.options && (
                  <div className="space-y-3">
                    <p className="text-cream-white/70 font-emerland mb-4 italic">
                      Select all that apply:
                    </p>
                    {question.options.map((option, index) => {
                      const isSelected = (answers[question.id] as string[] || []).includes(option);
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option, true)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-emerland ${
                            isSelected
                              ? "border-ancient-gold bg-ancient-gold/20 text-cream-white"
                              : "border-mystical-teal/30 bg-deep-black/30 text-cream-white hover:border-mystical-teal hover:bg-mystical-teal/10"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                                isSelected ? "border-ancient-gold bg-ancient-gold" : "border-mystical-teal"
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 text-deep-black" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-mystical-teal text-mystical-teal hover:bg-mystical-teal/20"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-ancient-gold hover:bg-ancient-gold/80 text-deep-black font-angle font-bold"
                  >
                    {isLastQuestion ? "Complete" : "Next"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
