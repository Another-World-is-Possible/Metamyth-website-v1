import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, Volume2, VolumeX, User } from "lucide-react";
import { useLocation } from "wouter";
import { useAudio } from "@/contexts/audio-context";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import AuthDialog from "@/components/auth-dialog";

export default function SharedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, navigate] = useLocation();
  const audioControlsRef = useRef<HTMLDivElement>(null);
  const profileControlsRef = useRef<HTMLDivElement>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  // Auth state
  const { user, loading: authLoading, signOut } = useAuth();
  
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (audioControlsRef.current && !audioControlsRef.current.contains(event.target as Node)) {
        setShowControls(false);
      }
      if (profileControlsRef.current && !profileControlsRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showProfileMenu) {
          setShowProfileMenu(false);
          event.stopPropagation();
        }
        if (showControls) {
          setShowControls(false);
          event.stopPropagation();
        }
      }
    };

    // Close pop-ups when focus moves to iframe (e.g., user clicks inside it)
    const handleWindowBlur = () => {
      // Small delay to let focus settle, then close if focus is in an iframe
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'IFRAME') {
          setShowControls(false);
          setShowProfileMenu(false);
        }
      }, 0);
    };

    if (showControls || showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      window.addEventListener("blur", handleWindowBlur);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [showControls, showProfileMenu]);

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
    { id: 'story-system', label: 'Story System', path: '/story-system' },
    { id: 'transformation-journeys', label: 'Transformation Journeys', path: '/transformation-journeys' },
    { id: 'metamyth', label: 'Our Metamyth', path: '/metamyth' },
    { id: 'quest', label: 'Our Quest', path: '/quest' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-forest-green/90 backdrop-blur-md border-b border-mystical-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Audio Controls Group - START */}
          <div className="flex items-center"> {/* New div to group logo and audio */}
            <button 
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
            >
              <Shield className="text-ancient-gold animate-spin-slow h-6 w-6" />
              <span className="typography-h3 text-ancient-gold select-none text-glow-gold">
                <span className="hidden md:inline">Metamyth</span>
                <span className="md:hidden">M</span>
              </span>
            </button>

            {/* Audio Controls (Moved here with ml-2 for spacing) */}
            {audioControls && (
              <div className="relative ml-2" ref={audioControlsRef}> {/* Added ml-2 here */}
                <button
                  onClick={() => setShowControls(!showControls)}
                  className="bg-black/50 backdrop-blur-sm border border-ancient-gold/30 rounded-full p-2 text-ancient-gold transition-all duration-300 hover:!bg-[hsl(45,85%,55%,0.4)] hover:!border-[hsl(45,85%,55%,0.6)]"
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
                    className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-md border border-ancient-gold/30 rounded-lg p-4 min-w-[200px] z-50" // Changed right-0 to left-0
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

            {/* Profile Menu */}
            {!authLoading && (
              <div className="relative ml-2" ref={profileControlsRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`backdrop-blur-sm rounded-full p-2 transition-all duration-300 ${
                    user 
                      ? 'bg-black/50 border border-ancient-gold/30 text-ancient-gold hover:!bg-[hsl(45,85%,55%,0.4)] hover:!border-[hsl(45,85%,55%,0.6)]'
                      : 'bg-primary text-primary-foreground hover:bg-[hsl(178,65%,35%)] shadow-[0_0_15px_rgba(72,196,196,0.5)] border-2 border-primary ring-[1.5px] ring-inset ring-black'
                  }`}
                  data-testid="button-profile"
                  title="Profile"
                >
                  <User size={18} />
                </button>

                {/* Profile Menu Popover */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-md border border-ancient-gold/30 rounded-lg p-4 min-w-[240px] z-50"
                  >
                    {user ? (
                      // Logged in user menu
                      <div className="space-y-3">
                        <div className="pb-3 border-b border-ancient-gold/20">
                          <p className="text-ancient-gold text-sm font-semibold mb-1">Signed in as</p>
                          <p className="text-cream-white text-xs break-all">{user.email}</p>
                          {!user.email_confirmed_at && (
                            <p className="text-orange-400 text-xs mt-2 flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                              Email not verified - cloud sync disabled
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setShowProfileMenu(false);
                          }}
                          className="w-full bg-ancient-gold/20 hover:bg-ancient-gold/30 text-ancient-gold border border-ancient-gold/30 rounded px-3 py-2 text-sm transition-all duration-200"
                          data-testid="button-signout"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      // Anonymous user menu
                      <div className="space-y-3">
                        <p className="text-ancient-gold text-sm font-semibold mb-2">Account</p>
                        <button
                          onClick={() => {
                            setAuthDialogOpen(true);
                            setShowProfileMenu(false);
                          }}
                          className="w-full bg-ancient-gold/20 hover:bg-ancient-gold/30 text-ancient-gold border border-ancient-gold/30 rounded px-3 py-2 text-sm transition-all duration-200"
                          data-testid="button-signin"
                        >
                          Sign In / Register
                        </button>
                        <p className="text-cream-white/60 text-xs text-center pt-2 border-t border-ancient-gold/20">
                          Create an account to sync your journey progress across devices
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </div>
          {/* Logo and Audio Controls Group - END */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center divide-x divide-mystical-teal/30">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.path)}
                className={`text-xs px-1 py-0.5 md:px-1.5 md:py-1 transition-all duration-300 whitespace-normal text-center leading-tight ${
                  location === item.path
                    ? 'nav-tab-active'
                    : 'text-cream-white hover:nav-tab-hover'
                }`}
                data-testid={`nav-${item.id}`}
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

      {/* Auth Dialog */}
      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={() => {
          setAuthDialogOpen(false);
        }}
      />
    </nav>
  );
}