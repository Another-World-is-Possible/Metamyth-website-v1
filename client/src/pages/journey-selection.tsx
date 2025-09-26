import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Sword, Globe, Plus } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import SharedNavigation from "@/components/shared-navigation";
import starryVoidBg from "@assets/_minimal_starry_void-__prompt-_deep_black_void_of_space_with_minimal_scattered_starlight_pure_black_vg62ynp7p0tqsuuy3buz_1_1757022711872.png";

interface JourneyTier {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  position: string;
  basePrice: number;
  originalPrice?: number;
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
    paymentPlans: { payments: number; amount: number; originalAmount?: number }[];
  };
}

const journeyTiers: JourneyTier[] = [
  {
    id: "metamyth-transformation",
    title: "METAMYTH TRANSFORMATION",
    subtitle: "Complete Story Transformation Through Community",
    icon: <Shield className="w-8 h-8" />,
    position: "left-8",
    basePrice: 700,
    originalPrice: 1200,
    colors: {
      primary: "hsl(45, 85%, 55%)", // Gold
      secondary: "hsl(45, 75%, 45%)",
      border: "hsl(45, 85%, 55%)",
      glow: "rgba(255, 215, 0, 0.4)",
      background: "linear-gradient(135deg, hsl(45, 85%, 55%)/15, hsl(45, 65%, 35%)/5)"
    },
    content: {
      whereYouAre: [
        "You know there's more. You've felt it in quiet moments when the noise stops and something deeper calls. Maybe you're successful but unfulfilled, climbing ladders that lean against the wrong walls. Or you carry a vision burning in your heart but struggle to make it real in the world.",
        "You're ready to stop seeking and start becoming. You understand that transformation requires more than inspiration—it needs systems, community, and the courage to be witnessed as you author yourself into who you're meant to be."
      ],
      howWeServe: [
        "The MetaMyth Transformation provides complete story transformation through facilitated community circles. You're placed in intimate groups where your vision gets refined and your obstacles transform into assets. These become laboratories for your emerging authentic story.",
        "You get access to observe our Hero's Circle sessions—learning from their direct coaching while focusing on your own transformation in community circles designed for mutual support and accountability."
      ],
      includes: [
        "Complete MetaMyth journey across all five movements",
        "Facilitated story circles with expert guidance",
        "Access to observe Hero's Circle sessions (listen-only)",
        "All frameworks, materials, and app access",
        "Community forum for ongoing connection",
        "Recorded content library for integration",
        "Weekend integration and reflection sessions"
      ],
      paymentPlans: [
        { payments: 1, amount: 700, originalAmount: 1200 },
        { payments: 2, amount: 380, originalAmount: 650 },
        { payments: 3, amount: 263, originalAmount: 450 }
      ]
    }
  },
  {
    id: "heroes-circle",
    title: "HERO'S CIRCLE",
    subtitle: "Direct Mentorship & Elite Peer Community",
    icon: <Sword className="w-8 h-8" />,
    position: "left-1/2 transform -translate-x-1/2",
    basePrice: 1500,
    originalPrice: 2100,
    colors: {
      primary: "hsl(178, 65%, 45%)", // Teal
      secondary: "hsl(178, 55%, 35%)",
      border: "hsl(178, 65%, 45%)",
      glow: "rgba(72, 196, 196, 0.4)",
      background: "linear-gradient(135deg, hsl(178, 65%, 45%)/15, hsl(178, 45%, 25%)/5)"
    },
    content: {
      whereYouAre: [
        "You've outgrown your old story completely. You're already doing significant work in the world, but you know your deepest calling is bigger than your current reality. Your vision is so large that people can't see it, so revolutionary it sounds impossible, so important you can't afford to get the story wrong.",
        "You're ready for direct access, immediate feedback, and a peer group of other visionaries operating at planetary scale. You understand that legendary impact requires legendary support."
      ],
      howWeServe: [
        "The Hero's Circle provides direct story mentorship and elite peer community. You're part of an exclusive circle of 15 visionaries, divided into two intimate sub-groups for deeper connection. Every session includes direct access to personalized guidance on your specific story challenges.",
        "You become part of our founding community—the pioneers who help scale this transformation globally while receiving the most intensive support we offer."
      ],
      includes: [
        "Two direct mentorship calls weekly with immediate access to personalized guidance",
        "90 minutes of Q&A every Friday - full session dedicated to your questions",
        "Elite peer group of 14 other epic visionaries (two sub-groups of 7-8)",
        "Midpoint reflection call to integrate the first half of your journey",
        "Completion ceremony call to anchor your transformation",
        "Founding cohort pricing - this rate will never be offered again",
        "Partnership opportunity to help scale this work through your network",
        "Case study collaboration to document your transformation"
      ],
      paymentPlans: [
        { payments: 1, amount: 1500, originalAmount: 2100 },
        { payments: 2, amount: 788, originalAmount: 1100 },
        { payments: 3, amount: 525, originalAmount: 734 }
      ]
    }
  }
];

export default function JourneySelectionPage() {
  const [location, setLocation] = useLocation();
  const [selectedTier, setSelectedTier] = useState<string>('metamyth-transformation'); // Default to metamyth transformation tier
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(0);

  // Check URL parameters for pre-selection and scroll to top
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const params = new URLSearchParams(window.location.search);
    const tierParam = params.get('tier');
    
    // Map new tier parameters to actual tier IDs
    const tierMapping: { [key: string]: string } = {
      'metamyth-gifts': 'metamyth-transformation',
      'metamyth-full': 'metamyth-transformation',
      'metamyth-transformation': 'metamyth-transformation',
      'heroes-circle': 'heroes-circle',
      // Legacy support
      'seekers': 'metamyth-transformation',
      'changemakers': 'metamyth-transformation',
      'storyteller': 'metamyth-transformation'
    };
    
    const mappedTier = tierParam ? tierMapping[tierParam] : null;
    if (mappedTier && journeyTiers.find(t => t.id === mappedTier)) {
      setSelectedTier(mappedTier);
    } else {
      // Set default tier if no URL parameter
      setSelectedTier('metamyth-transformation');
    }
  }, [location]);

  const selectedTierData = journeyTiers.find(tier => tier.id === selectedTier) || journeyTiers[0]; // Fallback to first tier for display
  const totalPrice = selectedTierData.basePrice + (scholarshipCount * 600);
  const paymentAmount = selectedPaymentPlan < selectedTierData.content.paymentPlans.length 
    ? selectedTierData.content.paymentPlans[selectedPaymentPlan].amount + (scholarshipCount * 600 / selectedTierData.content.paymentPlans[selectedPaymentPlan].payments)
    : 0;

  // Countdown Timer Component
  const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="bg-black/60 border-2 border-amber-500 rounded-lg p-4 max-w-lg mx-auto" style={{ boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)' }}>
        <div className="text-center mb-2">
          <div className="font-thornelia text-lg text-amber-400 mb-2">Time Until Enrollment Closes</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-amber-500/20 rounded p-2">
              <div className="font-angle text-xl md:text-2xl text-amber-300 font-bold">{timeLeft.days}</div>
              <div className="font-emerland text-xs text-amber-200">DAYS</div>
            </div>
            <div className="bg-amber-500/20 rounded p-2">
              <div className="font-angle text-xl md:text-2xl text-amber-300 font-bold">{timeLeft.hours}</div>
              <div className="font-emerland text-xs text-amber-200">HOURS</div>
            </div>
            <div className="bg-amber-500/20 rounded p-2">
              <div className="font-angle text-xl md:text-2xl text-amber-300 font-bold">{timeLeft.minutes}</div>
              <div className="font-emerland text-xs text-amber-200">MINS</div>
            </div>
            <div className="bg-amber-500/20 rounded p-2">
              <div className="font-angle text-xl md:text-2xl text-amber-300 font-bold">{timeLeft.seconds}</div>
              <div className="font-emerland text-xs text-amber-200">SECS</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-amber-100 overflow-hidden">
      <SharedNavigation />
      
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
      <div className="relative z-10 min-h-screen flex flex-col pt-16">
        {/* Header */}
        <header className="text-center py-8 px-6 max-w-3xl mx-auto">
          <motion.h1 
            className="font-angle text-3xl md:text-5xl mb-2 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Choose Your Place in the Journey
          </motion.h1>
          {/* Countdown Timer */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <CountdownTimer targetDate="2025-10-20T23:59:59" />
          </motion.div>
          
          {/* Prominent Spots Remaining */}
          <motion.div 
            className="inline-block bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500 rounded-lg px-6 py-3 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
            style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
          >
            <div className="text-center">
              <div className="font-angle text-2xl md:text-3xl text-red-400 font-bold mb-1">
                45 SPOTS LEFT
              </div>
              <div className="font-emerland text-sm text-amber-200 font-semibold">
                out of 50 • First Cohort • Last Opportunity This Year
              </div>
            </div>
          </motion.div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTier}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full max-w-3xl mx-auto"
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

                {/* Simplified Pricing Section */}
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                  <div 
                    className="bg-black/60 backdrop-blur-sm border-2 rounded-lg p-8"
                    style={{
                      borderColor: selectedTierData.colors.border,
                      background: selectedTierData.colors.background,
                      boxShadow: `0 0 25px ${selectedTierData.colors.glow}`
                    }}
                  >
                    <div className="max-w-2xl mx-auto text-center">
                      {/* Main Message */}
                      <p className="font-thornelia text-3xl text-amber-200 mb-8">
                        The future you dream is one story away.
                      </p>

                      {/* Pricing Options */}
                      {selectedTier === 'metamyth-transformation' ? (
                        <motion.div
                          className="mb-6 space-y-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 2.8 }}
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Option A: $700 + Contribution */}
                            <div className="bg-black/40 p-6 rounded-lg border-2 border-[hsl(45,85%,55%)]/50">
                              <h4 className="font-thornelia text-xl mb-3 text-[hsl(45,85%,55%)]">
                                Option A: $700 + Contribution
                              </h4>
                              <p className="font-emerland text-amber-200 mb-4 text-sm">
                                Perfect for changemakers ready to contribute beyond money
                              </p>
                              <p className="font-emerland text-amber-200/80 mb-4 text-xs">
                                $500 value contribution (skills, time, network, advocacy)
                              </p>
                              
                              {/* Payment Plans */}
                              <div className="mb-4 space-y-2">
                                <p className="font-emerland text-amber-200/90 text-xs font-semibold">Payment Plans Available:</p>
                                <div className="text-xs text-amber-200/70 space-y-1">
                                  <div>• $700 full payment</div>
                                  <div>• 2 payments of $375</div>
                                  <div>• 3 payments of $258</div>
                                </div>
                              </div>
                              
                              <a 
                                href="https://buy.stripe.com/aFa00ibh6duo0Ta62OfQI01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 text-center bg-[hsl(45,85%,55%)]/80 hover:bg-[hsl(45,85%,55%)] text-black mb-3"
                                data-testid="button-join-metamyth-gifts"
                              >
                                JOIN METAMYTH - $700 + CONTRIBUTION
                              </a>
                              
                            </div>

                            {/* Option B: $1000 Full */}
                            <div className="bg-black/40 p-6 rounded-lg border-2 border-[hsl(45,85%,55%)]">
                              <h4 className="font-thornelia text-xl mb-3 text-[hsl(45,85%,55%)]">
                                Option B: $1,000 Full Investment
                              </h4>
                              <p className="font-emerland text-amber-200 mb-4 text-sm">
                                For those ready to dive in completely
                              </p>
                              <p className="font-emerland text-amber-200/80 mb-4 text-xs">
                                Same transformation, no additional contribution required
                              </p>
                              
                              {/* Payment Plans */}
                              <div className="mb-4 space-y-2">
                                <p className="font-emerland text-amber-200/90 text-xs font-semibold">Payment Plans Available:</p>
                                <div className="text-xs text-amber-200/70 space-y-1">
                                  <div>• $1,000 full payment</div>
                                  <div>• 2 payments of $525</div>
                                  <div>• 3 payments of $367</div>
                                </div>
                              </div>
                              
                              <a 
                                href="https://buy.stripe.com/28E28qad276031i1MyfQI02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 text-center mb-3"
                                style={{
                                  backgroundColor: selectedTierData.colors.primary,
                                  color: 'black',
                                  boxShadow: `0 0 15px ${selectedTierData.colors.glow}`
                                }}
                                data-testid="button-join-metamyth-full"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <span>JOIN METAMYTH - $1,000</span>
                                  <span className="line-through text-black/60 text-sm">$1,200</span>
                                </div>
                              </a>
                              
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // HERO'S CIRCLE
                        <motion.div
                          className="mb-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 2.8 }}
                        >
                          <div className="bg-black/40 p-8 rounded-lg border-2 border-[hsl(178,65%,45%)] relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[hsl(178,65%,45%)] text-black px-4 py-1 rounded-full text-sm font-semibold">
                              LIMITED TO 15 VISIONARIES
                            </div>
                            <div className="text-center">
                              <h3 className="font-thornelia text-3xl mb-4 text-[hsl(178,65%,45%)]">
                                Application Required
                              </h3>
                              <p className="font-emerland text-amber-200 mb-6">
                                For visionaries ready for direct mentorship and peer community at the highest level
                              </p>
                              <div className="mb-6">
                                <div className="flex items-center justify-center gap-3">
                                  <span className="font-angle text-4xl text-[hsl(178,65%,45%)]">$1,500</span>
                                  <span className="font-angle text-2xl line-through text-amber-200/50">$2,100</span>
                                </div>
                                <p className="font-emerland text-amber-200/80 text-sm mt-2">
                                  Founding cohort pricing - this rate will never be offered again
                                </p>
                              </div>
                              <Button 
                                onClick={() => window.open('https://zcal.co/i/OmCpmYrt', '_blank', 'noopener,noreferrer')}
                                className="w-full py-4 text-xl font-semibold rounded-lg bg-[hsl(178,65%,45%)] hover:bg-[hsl(178,65%,35%)] text-black shadow-[0_0_15px_rgba(72,196,196,0.4)] transition-all duration-300"
                                data-testid="button-apply-heroes-circle"
                              >
                                APPLY FOR HERO'S CIRCLE
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Origin Pricing Info */}
                      <p className="font-emerland text-amber-200/90 mb-8 text-lg">
                        Origin pricing for first 25 heroes to take back their story.
                      </p>

                      {/* Secondary Button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 3.0 }}
                      >
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://zcal.co/i/OmCpmYrt', '_blank', 'noopener,noreferrer');
                          }}
                          className="w-full py-4 text-xl font-semibold rounded-lg transition-all duration-300 bg-transparent mb-3 relative z-10 cursor-pointer"
                          style={{
                            borderColor: selectedTierData.colors.primary,
                            color: selectedTierData.colors.primary,
                            pointerEvents: 'auto'
                          }}
                          data-testid="button-book-call"
                        >
                          Questions? Book a Call
                        </Button>
                        <p className="font-emerland text-amber-200/70 text-sm">
                          Payment plans • Contribution options • General questions
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ultra-Compact Timeline Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm py-4">
          <div className="w-full max-w-3xl mx-auto px-8">
            <div className="relative h-28">
              {/* Gradient Line - Clamped to circle centers */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
                style={{
                  left: '57px', // 32px (left button) + 25px (button center) = 57px
                  right: '57px', // Same distance from right
                  background: 'linear-gradient(to right, hsl(0,70%,45%), hsl(45,85%,55%))'
                }}
              ></div>
              
              {/* Timeline Points */}
              {journeyTiers.map((tier, index) => {
                // Calculate exact positions to avoid transform conflicts
                const buttonLeft = index === 0 ? 32 : 'calc(100% - 82px)';
                const circleLeft = index === 0 ? 5 : 5; // 5px to center 40px circle in 50px button
                // Helper for text positioning - same coordinates that work for circles  
                const centerXFor = (i: number) => i === 0 ? '57px' : 'calc(100% - 57px)';
                
                return (
                  <React.Fragment key={`timeline-${tier.id}`}>
                    {/* Title Above - Positioned absolutely in timeline container */}
                    <motion.div 
                      className="absolute whitespace-nowrap text-center pointer-events-none z-20"
                      style={{ 
                        left: centerXFor(index),
                        top: 'calc(50% - 42px)', // Above the timeline
                        transform: 'translateX(-50%)'
                      }}
                      animate={{
                        opacity: selectedTier === tier.id ? 1 : 0.7
                      }}
                      transition={{ duration: 0.3 }}
                      initial={false}
                      layout="position"
                    >
                      <div 
                        className="font-emerland font-bold tracking-wide leading-none whitespace-nowrap"
                        style={{
                          fontSize: '10px',
                          color: selectedTier === tier.id ? tier.colors.primary : 'rgb(253 230 138)'
                        }}
                      >
                        {tier.title}
                      </div>
                    </motion.div>
                    
                    {/* Description Below - Positioned absolutely in timeline container */}
                    <motion.div 
                      className="absolute text-center pointer-events-none z-20"
                      style={{ 
                        left: centerXFor(index),
                        top: 'calc(50% + 28px)', // Below the timeline
                        transform: 'translateX(-50%)',
                        width: '120px' // Give it a fixed width for proper wrapping
                      }}
                      animate={{
                        opacity: selectedTier === tier.id ? 1 : 0.6
                      }}
                      transition={{ duration: 0.3 }}
                      initial={false}
                      layout="position"
                    >
                      <div className="font-emerland text-amber-200/70 leading-tight" style={{ fontSize: '12px' }}>
                        {tier.subtitle}
                      </div>
                    </motion.div>
                    
                    <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Update state directly for immediate response
                      setSelectedTier(tier.id);
                      // Also update URL for sharing/bookmarking
                      const currentPath = window.location.pathname;
                      window.history.replaceState({}, '', `${currentPath}?tier=${tier.id}`);
                      window.scrollTo(0, 0); // Scroll to top when tier changes
                    }}
                    className="cursor-pointer absolute z-10"
                    style={{
                      left: buttonLeft,
                      top: 'calc(50% - 25px)', // Center 50px button vertically
                      width: '50px',
                      height: '50px'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon Circle - Centered on button/line */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center absolute pointer-events-none"
                      style={{
                        backgroundColor: '#000000',
                        border: `${selectedTier === tier.id ? '2px' : '1px'} solid ${tier.colors.primary}`,
                        boxShadow: selectedTier === tier.id ? `0 0 15px ${tier.colors.glow}, 0 0 25px ${tier.colors.glow}` : '0 0 3px rgba(0,0,0,0.3)',
                        left: '50%', // Center of button
                        top: '50%', // Center of button
                        zIndex: 10,
                        transform: selectedTier === tier.id ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%) scale(1)'
                      }}
                    >
                      <div 
                        className="w-4 h-4 flex items-center justify-center"
                        style={{ color: tier.colors.primary }}
                      >
                        {tier.icon}
                      </div>
                    </div>
                  </motion.button>
                </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom padding to prevent timeline obstruction */}
      <div className="h-32"></div>
    </div>
  );
}