// src/components/layouts/page-layout.tsx

import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import SharedNavigation from "@/components/shared-navigation";
import SharedFooter from "@/components/layouts/shared-footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean; // Add new prop to hide footer
}

export default function PageLayout({ 
  children, 
  className = "", 
  hideFooter = false // Default to false
}: PageLayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={`flex flex-col min-h-screen bg-deep-black text-cream-white overflow-x-hidden ${className}`}>
      <SharedNavigation />
      
      <main className="relative flex-grow pt-16 flex flex-col">
        {children}
      </main>
      
      {/* Conditionally render the footer based on the new prop */}
      {!hideFooter && <SharedFooter />}
    </div>
  );
}