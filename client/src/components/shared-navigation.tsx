import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, Volume2, VolumeX } from "lucide-react";
import { useLocation } from "wouter";
import { useAudio } from "@/contexts/audio-context";
import { motion } from "framer-motion";

export default function SharedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, navigate] = useLocation();
  let audioControls = null;
  try {
    audioControls = useAudio();
  } catch (e) {
    // Audio context not available, skip audio controls
  }
  
  const { isPlaying, volume, showControls, togglePlay, setVolume, setShowControls } = audioControls || {
    isPlaying: false,
    volume: 0.5,
    showControls: false,
    togglePlay: () => {},
    setVolume: () => {},
    setShowControls: () => {}
  };

  // Clean approach - no forced cursor styles
  useEffect(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      const allNavElements = navElement.querySelectorAll('*');
      allNavElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.removeProperty('cursor');
      });
    }
  }, [location]);

  const navItems = [
    { id: 'why-story-matters', label: 'Why Story Matters', path: '/why-story-matters' },
    { id: 'systems', label: 'The Systems', path: '/systems' },
    { id: 'metamyth', label: 'Our Metamyth', path: '/metamyth' },
    { id: 'stories', label: 'Stories We Tell', path: '/stories' },
    { id: 'quest', label: 'Our Quest', path: '/quest' },
    { id: 'questionaire', label: 'QUESTionaire', path: '/questionaire' }
    // { id: 'federation', label: 'The Federation', path: '/federation' } - Hidden but retained
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    // Scroll to top when navigating to new page
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-forest-green/90 backdrop-blur-md border-b border-mystical-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <Shield className="text-ancient-gold animate-spin-slow h-6 w-6" />
            <span className="typography-h3 text-ancient-gold select-none text-glow-gold">
              Metamyth
            </span>
          </button>


          {/* Audio Controls + Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Audio Controls */}
            {audioControls && (
              <div className="relative">
                <button
                  onClick={() => setShowControls(!showControls)}
                  className="bg-black/50 backdrop-blur-sm border border-ancient-gold/30 rounded-full p-2 text-ancient-gold hover:bg-ancient-gold/20 transition-all duration-300"
                  data-testid="button-audio-toggle"
                >
                  {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>

                {/* Expanded Controls */}
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-md border border-ancient-gold/30 rounded-lg p-4 min-w-[200px] z-50"
                  >
                    {/* Play/Pause Toggle */}
                    <div className="mb-3">
                      <button
                        onClick={togglePlay}
                        className="w-full bg-ancient-gold/20 hover:bg-ancient-gold/30 text-ancient-gold border border-ancient-gold/30 rounded px-3 py-2 text-sm transition-all duration-200"
                        data-testid="button-music-play-pause"
                      >
                        {isPlaying ? 'Pause Music' : 'Play Music'}
                      </button>
                    </div>

                    {/* Volume Slider */}
                    <div className="space-y-2">
                      <label className="text-ancient-gold text-sm">Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer slider-thumb"
                        data-testid="slider-volume"
                      />
                      <div className="text-ancient-gold/70 text-xs text-center">
                        {Math.round(volume * 100)}%
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            
            {/* Navigation Items */}
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.path)}
                className={`typography-body transition-all duration-300 ${
                  location === item.path
                    ? 'nav-tab-active'
                    : 'text-cream-white hover:nav-tab-hover'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-cream-white hover:text-ancient-gold">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-forest-green border-l border-mystical-teal/30">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 mb-8">
                  <Shield className="text-ancient-gold animate-spin-slow h-6 w-6" />
                  <span className="typography-h3 text-ancient-gold text-glow-gold">
                    Metamyth
                  </span>
                </div>
                
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.path)}
                    className={`justify-start typography-body transition-all duration-300 ${
                      location === item.path
                        ? 'nav-tab-active'
                        : 'text-cream-white hover:nav-tab-hover'
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}