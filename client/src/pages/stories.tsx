import PageLayout from "@/components/layouts/page-layout";
import StoriesWeTell from "@/components/tabs/stories-we-tell";
import { useLocation } from "wouter";

export default function StoriesPage() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (tab: string | null) => {
    if (tab === 'questionaire') {
      navigate('/questionaire');
    } else if (tab === 'systems') {
      navigate('/systems');
    } else if (tab === 'why-story') {
      navigate('/why-story-matters');
    } else if (tab === null) {
      navigate('/');
    }
    
    // Scroll to top when navigating between pages
    window.scrollTo(0, 0);
  };

  return (
    <PageLayout>
      <StoriesWeTell setActiveTab={handleNavigation} />
    </PageLayout>
  );
}