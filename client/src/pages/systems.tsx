import PageLayout from "@/components/layouts/page-layout";
import TheSystems from "@/components/tabs/the-systems";
import { useLocation } from "wouter";

export default function SystemsPage() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (tab: string | null) => {
    if (tab === 'questionaire') {
      navigate('/questionaire');
    } else if (tab === 'why-story') {
      navigate('/why-story-matters');
    } else if (tab === 'stories') {
      navigate('/stories');
    } else if (tab === null) {
      navigate('/');
    }
    
    // Scroll to top when navigating between pages
    window.scrollTo(0, 0);
  };

  return (
    <PageLayout>
      <TheSystems setActiveTab={handleNavigation} />
    </PageLayout>
  );
}