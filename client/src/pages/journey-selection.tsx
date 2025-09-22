import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Sword, Feather, Plus } from "lucide-react";
import { useLocation } from "wouter";
import starryVoidBg from "@assets/_minimal_starry_void-__prompt-_deep_black_void_of_space_with_minimal_scattered_starlight_pure_black_vg62ynp7p0tqsuuy3buz_1_1757022711872.png";

interface JourneyTier {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  position: string;
  basePrice: number;
  colors: {
    primary: string;
    secondary: string;
    border: string;
    glow: string;
    background: string;
  };
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
    icon: <Shield className="w-8 h-8" />,
    position: "left-8",
    basePrice: 1200,
    colors: {
      primary: "hsl(0, 70%, 45%)", // Dark red
      secondary: "hsl(0, 60%, 35%)",
      border: "hsl(0, 70%, 45%)",
      glow: "rgba(220, 38, 38, 0.4)",
      background: "linear-gradient(135deg, hsl(0, 70%, 45%)/10, hsl(0, 50%, 25%)/5)"
    },
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
    icon: <Sword className="w-8 h-8" />,
    position: "left-1/2 transform -translate-x-1/2",
    basePrice: 2100,
    colors: {
      primary: "hsl(45, 85%, 55%)", // Gold
      secondary: "hsl(45, 75%, 45%)",
      border: "hsl(45, 85%, 55%)",
      glow: "rgba(255, 215, 0, 0.4)",
      background: "linear-gradient(135deg, hsl(45, 85%, 55%)/15, hsl(45, 65%, 35%)/5)"
    },
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
    icon: <Feather className="w-8 h-8" />,
    position: "right-8",
    basePrice: 4200,
    colors: {
      primary: "hsl(178, 65%, 45%)", // Teal
      secondary: "hsl(178, 55%, 35%)",
      border: "hsl(178, 65%, 45%)",
      glow: "rgba(72, 196, 196, 0.4)",
      background: "linear-gradient(135deg, hsl(178, 65%, 45%)/15, hsl(178, 45%, 25%)/5)"
    },
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
  const [selectedTier, setSelectedTier] = useState<string>('changemakers'); // Default to changemakers
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

  const selectedTierData = journeyTiers.find(tier => tier.id === selectedTier)!;
  const totalPrice = selectedTierData.basePrice + (scholarshipCount * 600);
  const paymentAmount = selectedPaymentPlan < selectedTierData.content.paymentPlans.length 
    ? selectedTierData.content.paymentPlans[selectedPaymentPlan].amount + (scholarshipCount * 600 / selectedTierData.content.paymentPlans[selectedPaymentPlan].payments)
    : 0;

  return (
    <div className="min-h-screen bg-black text-amber-100 overflow-hidden">
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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <motion.h1 
            className="font-angle text-3xl md:text-5xl mb-2 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Choose Your Place in the Journey
          </motion.h1>
          <motion.p 
            className="font-emerland text-sm text-[hsl(178,65%,45%)] font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            First cohort - 50 spots - Last opportunity this year
          </motion.p>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center px-4 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTier}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full max-w-6xl mx-auto"
            >
              
              {/* Cinematic Title Section */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className={`p-4 rounded-full border-4 ${selectedTier === 'seekers' ? 'border-[hsl(0,70%,45%)] bg-[hsl(0,70%,45%)]/10' : selectedTier === 'changemakers' ? 'border-[hsl(45,85%,55%)] bg-[hsl(45,85%,55%)]/10' : 'border-[hsl(178,65%,45%)] bg-[hsl(178,65%,45%)]/10'}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                    style={{
                      boxShadow: `0 0 30px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <div className={`w-16 h-16 flex items-center justify-center`} style={{ color: selectedTierData.colors.primary }}>
                      {selectedTierData.icon}
                    </div>
                  </motion.div>
                </div>
                
                <motion.h1 
                  className="font-angle text-5xl md:text-7xl mb-4"
                  style={{ color: selectedTierData.colors.primary }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  {selectedTierData.title}
                </motion.h1>
                
                <motion.p 
                  className="font-emerland text-xl md:text-2xl text-amber-200 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {selectedTierData.subtitle}
                </motion.p>
              </motion.div>

              {/* Content Sections Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Where You Are */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <div 
                    className="bg-black/60 backdrop-blur-sm border-2 rounded-lg p-6"
                    style={{
                      borderColor: selectedTierData.colors.border,
                      background: selectedTierData.colors.background,
                      boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <h3 className="font-angle text-2xl mb-4" style={{ color: selectedTierData.colors.primary }}>
                      Where You Are in Your Journey
                    </h3>
                    <div className="space-y-4">
                      {selectedTierData.content.whereYouAre.map((paragraph, index) => (
                        <p key={index} className="font-emerland text-amber-200 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* How We Serve */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <div 
                    className="bg-black/60 backdrop-blur-sm border-2 rounded-lg p-6"
                    style={{
                      borderColor: selectedTierData.colors.border,
                      background: selectedTierData.colors.background,
                      boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <h3 className="font-angle text-2xl mb-4" style={{ color: selectedTierData.colors.primary }}>
                      How We Serve You at This Level
                    </h3>
                    <div className="space-y-4">
                      {selectedTierData.content.howWeServe.map((paragraph, index) => (
                        <p key={index} className="font-emerland text-amber-200 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* What's Included */}
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <div 
                    className="bg-black/60 backdrop-blur-sm border-2 rounded-lg p-6"
                    style={{
                      borderColor: selectedTierData.colors.border,
                      background: selectedTierData.colors.background,
                      boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <h3 className="font-angle text-2xl mb-6 text-center" style={{ color: selectedTierData.colors.primary }}>
                      Your Transformation Includes
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedTierData.content.includes.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start bg-black/40 p-3 rounded"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 2 + (index * 0.1) }}
                        >
                          <span className="mr-2 mt-1" style={{ color: selectedTierData.colors.primary }}>✦</span>
                          <span className="font-emerland text-amber-200 text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Pricing Section */}
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                  <div 
                    className="bg-black/60 backdrop-blur-sm border-2 rounded-lg p-6"
                    style={{
                      borderColor: selectedTierData.colors.border,
                      background: selectedTierData.colors.background,
                      boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <h3 className="font-angle text-3xl mb-6 text-center text-gradient-gold">
                      What Is Your Story Worth to You?
                    </h3>

                    <div className="max-w-2xl mx-auto">
                      {/* Investment Display */}
                      <div className="text-center mb-6">
                        <div className="font-thornelia text-4xl mb-2" style={{ color: selectedTierData.colors.primary }}>
                          ${totalPrice.toLocaleString()}
                        </div>
                        <p className="font-emerland text-amber-200">
                          Baseline: ${selectedTierData.basePrice.toLocaleString()}
                          {scholarshipCount > 0 && ` + ${scholarshipCount} scholarship${scholarshipCount > 1 ? 's' : ''}`}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Scholarship Controls */}
                        <div className="space-y-4">
                          <p className="font-emerland text-amber-200 text-center">Bring others with you:</p>
                          <div className="flex justify-center items-center space-x-3">
                            <Button
                              onClick={() => setScholarshipCount(Math.max(0, scholarshipCount - 1))}
                              disabled={scholarshipCount === 0}
                              className="px-3 py-1"
                              style={{
                                backgroundColor: `${selectedTierData.colors.primary}20`,
                                borderColor: selectedTierData.colors.primary,
                                color: selectedTierData.colors.primary
                              }}
                            >
                              -
                            </Button>
                            <span className="font-thornelia text-xl min-w-[2rem] text-center" style={{ color: selectedTierData.colors.primary }}>
                              {scholarshipCount}
                            </span>
                            <Button
                              onClick={() => setScholarshipCount(scholarshipCount + 1)}
                              className="px-3 py-1"
                              style={{
                                backgroundColor: `${selectedTierData.colors.primary}20`,
                                borderColor: selectedTierData.colors.primary,
                                color: selectedTierData.colors.primary
                              }}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Payment Plans */}
                        <div className="space-y-3">
                          <p className="font-emerland text-amber-200 text-center">Payment plans:</p>
                          {selectedTierData.content.paymentPlans.map((plan, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedPaymentPlan(index)}
                              className={`w-full p-2 rounded border-2 transition-all duration-300 text-sm ${
                                selectedPaymentPlan === index
                                  ? 'bg-opacity-20'
                                  : 'border-opacity-30 hover:border-opacity-60'
                              }`}
                              style={{
                                borderColor: selectedTierData.colors.border,
                                backgroundColor: selectedPaymentPlan === index ? `${selectedTierData.colors.primary}20` : 'transparent'
                              }}
                            >
                              <div className="font-thornelia" style={{ color: selectedTierData.colors.primary }}>
                                {plan.payments === 1 ? 'Full Payment' : `${plan.payments} Payments`}
                              </div>
                              <div className="font-emerland text-amber-200">
                                ${Math.ceil(paymentAmount).toLocaleString()}{plan.payments > 1 ? ` each` : ''}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 2.8 }}
                      >
                        <Button 
                          className="w-full py-4 text-xl font-semibold rounded-lg transition-all duration-300"
                          style={{
                            backgroundColor: selectedTierData.colors.primary,
                            color: selectedTier === 'seekers' ? 'white' : 'black',
                            boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                          }}
                          data-testid="button-claim-author-seat"
                        >
                          CLAIM YOUR AUTHOR'S SEAT
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Clean Timeline Navigation at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm py-6">
          <div className="w-full max-w-4xl mx-auto px-8">
            {/* Timeline Line with Gradient */}
            <div className="relative">
              {/* Gradient Line */}
              <div 
                className="absolute top-1/2 left-8 right-8 h-1 transform -translate-y-1/2 rounded-full"
                style={{
                  background: 'linear-gradient(to right, hsl(0,70%,45%), hsl(45,85%,55%), hsl(178,65%,45%))'
                }}
              ></div>
              
              {/* Timeline Points */}
              <div className="flex justify-between items-center relative">
                {journeyTiers.map((tier, index) => (
                  <motion.button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className="flex flex-col items-center group relative z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon Circle */}
                    <motion.div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300"
                      style={{
                        backgroundColor: 'rgb(0, 0, 0)',
                        border: `${selectedTier === tier.id ? '3px' : '2px'} solid ${tier.colors.primary}`,
                        boxShadow: selectedTier === tier.id ? `0 0 15px ${tier.colors.glow}` : '0 0 5px rgba(0,0,0,0.3)'
                      }}
                      animate={{
                        scale: selectedTier === tier.id ? 1.15 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ color: tier.colors.primary }}
                      >
                        {tier.icon}
                      </div>
                    </motion.div>
                    
                    {/* Title */}
                    <motion.div 
                      className="text-center"
                      animate={{
                        opacity: selectedTier === tier.id ? 1 : 0.7,
                        y: selectedTier === tier.id ? -2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="font-emerland text-xs font-bold tracking-wider"
                        style={{
                          color: selectedTier === tier.id ? tier.colors.primary : 'rgb(253 230 138)'
                        }}
                      >
                        {tier.title}
                      </div>
                      <div className="font-emerland text-xs text-amber-200/60 mt-1">
                        {tier.subtitle.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}