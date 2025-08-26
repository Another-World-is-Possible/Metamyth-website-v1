import PageLayout from "@/components/layouts/page-layout";
import WhyStoryMatters from "@/components/tabs/why-story-matters";
import { useLocation } from "wouter";

export default function WhyStoryMattersPage() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (tab: string | null) => {
    if (tab === 'systems') {
      navigate('/systems');
    } else if (tab === 'stories') {
      navigate('/stories');
    } else if (tab === null) {
      navigate('/');
    }
    // Add other navigation cases as needed
  };

  return (
    <PageLayout>
      <WhyStoryMatters setActiveTab={handleNavigation} />
    </PageLayout>
  );
}