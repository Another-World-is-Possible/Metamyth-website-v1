import PageLayout from "@/components/layouts/page-layout";
import StoriesWeTell from "@/components/tabs/stories-we-tell";
import { useLocation } from "wouter";

export default function StoriesPage() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (tab: string | null) => {
    if (tab === 'systems') {
      navigate('/systems');
    } else if (tab === 'why-story') {
      navigate('/why-story-matters');
    } else if (tab === null) {
      navigate('/');
    }
    // Add other navigation cases as needed
  };

  return (
    <PageLayout>
      <StoriesWeTell setActiveTab={handleNavigation} />
    </PageLayout>
  );
}