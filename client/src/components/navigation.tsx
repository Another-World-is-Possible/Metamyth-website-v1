import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield } from "lucide-react";

interface NavigationProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Simple cursor consistency - remove the complex enforcement
  useEffect(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      // Remove any conflicting cursor styles
      navElement.style.removeProperty('cursor');
      
      // Remove cursor styles from all navigation elements
      const allNavElements = navElement.querySelectorAll('*');
      allNavElements.forEach((element) => {
        (element as HTMLElement).style.removeProperty('cursor');
      });
    }
  }, [activeTab]);

  const navItems = [
    { id: 'why-story', label: 'Why Story Matters' },
    { id: 'systems', label: 'The Systems' },
    { id: 'metamyth', label: 'Our Metamyth' },
    { id: 'stories', label: 'Stories We Tell' },
    { id: 'quest', label: 'The Quest' }
    // { id: 'federation', label: 'The Federation' } - Hidden but retained
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-forest-green/90 backdrop-blur-md border-b border-mystical-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => setActiveTab(null)}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <Shield className="text-ancient-gold animate-spin-slow h-6 w-6" />
            <span className="font-angle text-xl font-bold text-ancient-gold select-none">
              Metamyth
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-silver hover:text-ancient-gold transition-all duration-300 ${
                  activeTab === item.id ? 'text-ancient-gold nav-active-glow' : 'hover:nav-hover-glow'
                }`}
              >
                <span className="select-none font-game">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-ancient-gold">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-forest-green border-mystical-teal/30">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-silver hover:text-ancient-gold transition-colors duration-300 text-lg ${
                      activeTab === item.id ? 'text-ancient-gold' : ''
                    }`}
                  >
                    <span className="select-none">{item.label}</span>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
