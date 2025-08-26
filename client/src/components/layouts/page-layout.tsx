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

  // Scroll to top whenever the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={`min-h-screen bg-deep-black text-cream-white overflow-x-hidden ${className}`}>
      <SharedNavigation />
      <main className="relative">
        {children}
      </main>
      <SharedFooter />
    </div>
  );
}