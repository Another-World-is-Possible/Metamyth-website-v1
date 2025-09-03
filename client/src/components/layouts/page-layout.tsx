import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import SharedNavigation from "@/components/shared-navigation";
import SharedFooter from "@/components/layouts/shared-footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    // This structure creates a flexible column that fills the screen's height
    <div className={`flex flex-col min-h-screen bg-deep-black text-cream-white overflow-x-hidden ${className}`}>
      <SharedNavigation />
      
      {/* This main section will now grow to fill space and add padding for the nav */}
      <main className="relative flex-grow pt-16">
        {children}
      </main>
      
      <SharedFooter />
    </div>
  );
}