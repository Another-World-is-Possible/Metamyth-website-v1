import PageLayout from "@/components/layouts/page-layout";
import WhyStoryMatters from "@/components/tabs/why-story-matters";
import { useLocation } from "wouter";

export default function WhyStoryMattersPage() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (tab: string | null) => {
    if (tab === 'questionaire') {
      navigate('/questionaire');
    } else if (tab === 'systems') {
      navigate('/systems');
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
      <WhyStoryMatters setActiveTab={handleNavigation} />
    </PageLayout>
  );
}