import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass, Bridge, Mountain, Plus } from "lucide-react";
import { useLocation } from "wouter";
import starryVoidBg from "@assets/_minimal_starry_void-__prompt-_deep_black_void_of_space_with_minimal_scattered_starlight_pure_black_vg62ynp7p0tqsuuy3buz_1_1757022711872.png";

interface JourneyTier {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  position: string;
  basePrice: number;
  content: {
    whereYouAre: string[];
    howWeServe: string[];
    includes: string[];
    paymentPlans: { payments: number; amount: number }[];
  };
}

const journeyTiers: JourneyTier[] = [
  {
    id: "seekers",
    title: "SEEKERS",
    subtitle: "Discovering Your Authentic Story",
    icon: <Compass className="w-8 h-8" />,
    position: "left-8",
    basePrice: 1200,
    content: {
      whereYouAre: [
        "Life feels like something happening to you rather than something you're creating. You're surviving the story you're living, reacting to circumstances, trying to keep your head above water while the world spins around you.",
        "You sense there's something more—a deeper story wanting to emerge—but you feel trapped by the narrative you were handed. You're tired of being a character in someone else's plot and ready to discover what it means to become the author of your own reality."
      ],
      howWeServe: [
        "The Seekers experience creates the foundation for taking back authorship of your life. You join the full cohort for weekly Monday community calls where you'll work through each movement of the MetaMyth alongside others who are also remembering their power to rewrite reality.",
        "Your custom app becomes a living system where you build story artifacts week by week, revealing connections between where you've been, where you are, and where you're capable of going. The recorded content library provides flexibility to revisit concepts and work at your own pace. The self-organizing community connects you with fellow travelers who understand what it feels like to outgrow a story that never really fit."
      ],
      includes: [
        "Weekly Monday community calls with the full cohort",
        "Complete MetaMyth app with all seven movements",
        "Recorded content library for self-paced exploration",
        "Forum access for ongoing community connection",
        "Permanent access to your story artifacts and tools"
      ],
      paymentPlans: [
        { payments: 1, amount: 1200 },
        { payments: 2, amount: 650 },
        { payments: 3, amount: 450 }
      ]
    }
  },
  {
    id: "changemakers",
    title: "CHANGEMAKERS",
    subtitle: "Intensive Transformation Through Fellowship",
    icon: <Bridge className="w-8 h-8" />,
    position: "left-1/2 transform -translate-x-1/2",
    basePrice: 2100,
    content: {
      whereYouAre: [
        "You've outgrown your old life. You know you're meant for more than what you're currently living. Maybe you climbed the ladder society pointed you toward only to realize it was leaning against the wrong wall. Or you carry a vision burning in your heart—you know exactly why you're here and what you're meant to create, but you struggle to make that vision real in the world.",
        "You're on the threshold between knowing what you want and actually living it. You have the passion but need the systems, support, and strategic clarity to bridge the gap between what is and what could be. You understand that real transformation requires community, accountability, and the courage to be witnessed as you become who you're meant to be."
      ],
      howWeServe: [
        "The Changemaker experience provides intensive support for the leap from knowing to becoming. You're placed in carefully curated story circles of 4-6 people—intimate containers where your vision gets refined and your obstacles transform into assets. These become laboratories for your emerging authentic story.",
        "Your weekly rhythm includes Monday community calls with the full cohort, Friday Q&A sessions for direct support as you navigate transformation, and weekend mixers that create cross-pollination between circles. You receive community facilitation training, developing your capacity to guide others while deepening your own journey."
      ],
      includes: [
        "Weekly Monday community calls with the full cohort",
        "Complete MetaMyth app with all seven movements",
        "Recorded content library for self-paced integration",
        "Curated story circles (4-6 people maximum)",
        "Friday Q&A calls for direct transformation support",
        "Weekend mixer calls connecting you with the larger movement",
        "Priority placement in intimate accountability partnerships",
        "Community facilitation training",
        "Forum access for ongoing community connection"
      ],
      paymentPlans: [
        { payments: 1, amount: 2100 },
        { payments: 2, amount: 1100 },
        { payments: 3, amount: 750 }
      ]
    }
  },
  {
    id: "worldbuilders",
    title: "WORLD BUILDERS",
    subtitle: "Scaling Transformation to Planetary Impact",
    icon: <Mountain className="w-8 h-8" />,
    position: "right-8",
    basePrice: 4200,
    content: {
      whereYouAre: [
        "You're a leader, a legend in the making, a hero already established on your journey and ready to go further. You've built something significant in the world, accumulated influence and resources, yet you know your greatest contribution still lies ahead. You carry a vision that could change everything—an idea, innovation, or way of being that the world desperately needs.",
        "You understand that your personal transformation ripples through everyone you influence. Your story extends beyond your individual life into your work, relationships, platform, and legacy. You're ready to take full authorship of your role in the larger story of human transformation."
      ],
      howWeServe: [
        "The World Builder experience operates as an exclusive mastermind of established leaders building something bigger than themselves. Your container includes peers who navigate the complexities of conscious leadership at scale.",
        "Your weekly rhythm includes Monday community calls, Friday Q&A sessions, and weekend mixers, plus two strategic consultation calls designed to integrate your metamyth directly into your existing platform and future vision. You select a protégé—someone you sponsor into the Changemaker tier, recognizing that transformation scales through relationship and example."
      ],
      includes: [
        "Weekly Monday community calls with the full cohort",
        "Complete MetaMyth app with all seven movements",
        "Recorded content library for self-paced integration",
        "Exclusive World Builder mastermind format",
        "Friday Q&A calls for direct transformation support",
        "Weekend mixer calls with the larger community",
        "Two strategic consultation calls for integration and implementation",
        "Ability to select and sponsor a protégé (Changemaker level)",
        "Direct support for scaling transformation into existing work",
        "Case study development for movement inspiration",
        "Forum access for ongoing community connection"
      ],
      paymentPlans: [
        { payments: 1, amount: 4200 },
        { payments: 2, amount: 2200 },
        { payments: 3, amount: 1500 }
      ]
    }
  }
];

export default function JourneySelectionPage() {
  const [location] = useLocation();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(0);

  // Check URL parameters for pre-selection
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const tier = params.get('tier');
    if (tier && journeyTiers.find(t => t.id === tier)) {
      setSelectedTier(tier);
    }
  }, [location]);

  const selectedTierData = journeyTiers.find(tier => tier.id === selectedTier);
  const totalPrice = selectedTierData ? selectedTierData.basePrice + (scholarshipCount * 600) : 0;
  const paymentAmount = selectedTierData && selectedPaymentPlan < selectedTierData.content.paymentPlans.length 
    ? selectedTierData.content.paymentPlans[selectedPaymentPlan].amount + (scholarshipCount * 600 / selectedTierData.content.paymentPlans[selectedPaymentPlan].payments)
    : 0;

  return (
    <div className="min-h-screen bg-black text-amber-100">
      {/* Starry background */}
      <div 
        className="fixed inset-0 opacity-60"
        style={{
          backgroundImage: `url(${starryVoidBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="text-center py-16 px-4">
          <motion.h1 
            className="font-angle text-4xl md:text-6xl mb-4 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Choose Your Place in the Journey
          </motion.h1>
          <motion.p 
            className="font-thornelia text-xl md:text-2xl mb-6 text-amber-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Where are you in your story transformation?
          </motion.p>
          <motion.p 
            className="font-emerland text-lg text-[hsl(178,65%,45%)] font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            First cohort - 50 spots - Last opportunity this year
          </motion.p>
        </header>

        <div className="flex flex-col lg:flex-row min-h-[70vh]">
          {/* Journey Timeline */}
          <div className="lg:w-2/3 px-4 lg:px-8">
            {/* Journey Path */}
            <div className="relative mb-16 lg:mb-8">
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(45,85%,55%)] via-[hsl(178,65%,45%)] to-[hsl(45,85%,55%)] opacity-50"></div>
              
              {/* Journey Stations */}
              <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0 lg:relative">
                {journeyTiers.map((tier) => (
                  <motion.div
                    key={tier.id}
                    className={`relative ${tier.position} cursor-pointer group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <div className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                      selectedTier === tier.id 
                        ? 'border-[hsl(178,65%,45%)] bg-[hsl(178,65%,45%)]/20 shadow-[0_0_30px_rgba(72,196,196,0.5)]' 
                        : 'border-[hsl(45,85%,55%)] bg-[hsl(45,85%,55%)]/10 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:border-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,45%)]/10'
                    }`}>
                      <div className={`transition-all duration-300 ${
                        selectedTier === tier.id ? 'text-[hsl(178,65%,45%)]' : 'text-[hsl(45,85%,55%)] group-hover:text-[hsl(178,65%,45%)]'
                      }`}>
                        {tier.icon}
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="font-angle text-xl md:text-2xl text-gradient-gold mb-2">{tier.title}</h3>
                      <p className="font-emerland text-sm text-amber-200">{tier.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:w-1/3 px-4 lg:px-8">
            <AnimatePresence mode="wait">
              {selectedTier ? (
                <motion.div
                  key={selectedTier}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/60 backdrop-blur-sm border-2 border-[hsl(178,65%,45%)] rounded-lg p-6 shadow-[0_0_30px_rgba(72,196,196,0.3)]"
                >
                  {selectedTierData && (
                    <>
                      <div className="mb-6">
                        <h2 className="font-angle text-2xl md:text-3xl text-gradient-gold mb-2">
                          {selectedTierData.title}
                        </h2>
                        <p className="font-emerland text-lg text-amber-200 italic">
                          {selectedTierData.subtitle}
                        </p>
                      </div>

                      {/* Where You Are */}
                      <div className="mb-6">
                        <h3 className="font-thornelia text-xl text-[hsl(178,65%,45%)] mb-3">
                          Where You Are in Your Journey
                        </h3>
                        {selectedTierData.content.whereYouAre.map((paragraph, index) => (
                          <p key={index} className="font-emerland text-sm leading-relaxed text-amber-200 mb-3">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* How We Serve */}
                      <div className="mb-6">
                        <h3 className="font-thornelia text-xl text-[hsl(178,65%,45%)] mb-3">
                          How We Serve You at This Level
                        </h3>
                        {selectedTierData.content.howWeServe.map((paragraph, index) => (
                          <p key={index} className="font-emerland text-sm leading-relaxed text-amber-200 mb-3">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Includes */}
                      <div className="mb-8">
                        <h3 className="font-thornelia text-xl text-[hsl(178,65%,45%)] mb-3">
                          Your Transformation Includes
                        </h3>
                        <div className="space-y-2">
                          {selectedTierData.content.includes.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-[hsl(45,85%,55%)] mr-2 mt-1">✦</span>
                              <span className="font-emerland text-sm text-amber-200">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Section */}
                      <div className="border-t border-[hsl(178,65%,45%)]/30 pt-6">
                        <h3 className="font-angle text-2xl text-gradient-gold mb-4 text-center">
                          What Is Your Story Worth to You?
                        </h3>

                        {/* Base Investment */}
                        <div className="text-center mb-4">
                          <div className="font-thornelia text-3xl text-[hsl(45,85%,55%)] mb-2">
                            ${totalPrice.toLocaleString()}
                          </div>
                          <p className="font-emerland text-sm text-amber-200">
                            Baseline investment: ${selectedTierData.basePrice.toLocaleString()}
                            {scholarshipCount > 0 && ` + ${scholarshipCount} scholarship${scholarshipCount > 1 ? 's' : ''} ($${(scholarshipCount * 600).toLocaleString()})`}
                          </p>
                        </div>

                        {/* Scholarship Buttons */}
                        <div className="flex justify-center items-center space-x-3 mb-6">
                          <span className="font-emerland text-sm text-amber-200">Bring others with you:</span>
                          <Button
                            onClick={() => setScholarshipCount(Math.max(0, scholarshipCount - 1))}
                            disabled={scholarshipCount === 0}
                            className="bg-[hsl(45,85%,55%)]/20 hover:bg-[hsl(45,85%,55%)]/30 text-[hsl(45,85%,55%)] border border-[hsl(45,85%,55%)]/50 px-3 py-1 text-sm"
                          >
                            -
                          </Button>
                          <span className="font-thornelia text-lg text-[hsl(178,65%,45%)] min-w-[2rem] text-center">
                            {scholarshipCount}
                          </span>
                          <Button
                            onClick={() => setScholarshipCount(scholarshipCount + 1)}
                            className="bg-[hsl(45,85%,55%)]/20 hover:bg-[hsl(45,85%,55%)]/30 text-[hsl(45,85%,55%)] border border-[hsl(45,85%,55%)]/50 px-3 py-1 text-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Payment Plans */}
                        <div className="mb-6">
                          <p className="font-emerland text-sm text-amber-200 mb-3 text-center">Payment plans available:</p>
                          <div className="space-y-2">
                            {selectedTierData.content.paymentPlans.map((plan, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedPaymentPlan(index)}
                                className={`w-full p-3 rounded border-2 transition-all duration-300 ${
                                  selectedPaymentPlan === index
                                    ? 'border-[hsl(178,65%,45%)] bg-[hsl(178,65%,45%)]/10'
                                    : 'border-[hsl(45,85%,55%)]/30 hover:border-[hsl(45,85%,55%)]/60'
                                }`}
                              >
                                <div className="font-thornelia text-[hsl(45,85%,55%)]">
                                  {plan.payments === 1 ? 'Full Payment' : `${plan.payments} Payments`}
                                </div>
                                <div className="font-emerland text-sm text-amber-200">
                                  ${Math.ceil(paymentAmount).toLocaleString()}{plan.payments > 1 ? ` each` : ''}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Claim Button */}
                        <Button 
                          className="w-full py-4 text-xl font-semibold rounded-lg bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black shadow-[0_0_25px_rgba(72,196,196,0.5)] transition-all duration-300"
                          data-testid="button-claim-author-seat"
                        >
                          CLAIM YOUR AUTHOR'S SEAT
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/40 border-2 border-[hsl(45,85%,55%)]/30 rounded-lg p-8 text-center shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                >
                  <Compass className="w-16 h-16 text-[hsl(45,85%,55%)] mx-auto mb-4 opacity-50" />
                  <p className="font-emerland text-lg text-amber-200">
                    Select your journey stage to discover your path
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}