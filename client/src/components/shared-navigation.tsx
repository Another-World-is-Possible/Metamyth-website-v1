import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield } from "lucide-react";
import { useLocation } from "wouter";

export default function SharedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, navigate] = useLocation();

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
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-forest-green/90 backdrop-blur-md border-b border-mystical-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <Shield className="text-ancient-gold animate-spin-slow h-6 w-6" />
            <span className="typography-h3 text-ancient-gold select-none">
              Metamyth
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.path)}
                className={`typography-body text-cream-white hover:text-ancient-gold transition-all duration-300 hover:bg-mystical-teal/20 ${
                  location === item.path ? 'text-ancient-gold bg-mystical-teal/10' : ''
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
                  <span className="typography-h3 text-ancient-gold">
                    Metamyth
                  </span>
                </div>
                
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.path)}
                    className={`justify-start typography-body text-cream-white hover:text-ancient-gold hover:bg-mystical-teal/20 transition-all duration-300 ${
                      location === item.path ? 'text-ancient-gold bg-mystical-teal/10' : ''
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