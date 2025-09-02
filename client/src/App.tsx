import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import WhyStoryMattersPage from "@/pages/why-story-matters";
import SystemsPage from "@/pages/systems";
import MetamythPage from "@/pages/metamyth";
import StoriesPage from "@/pages/stories";
import QuestPage from "@/pages/quest";
import QuestionairePage from "@/pages/questionaire";
import FederationPage from "@/pages/federation";
import BeginPortal from "@/pages/begin-portal";
import MetamythJourneyPage from "@/pages/metamyth-journey";
import SwordCursor from "@/components/sword-cursor";
import { ImageLoadingProvider } from "@/contexts/ImageLoadingContext";
import { AudioProvider } from "@/contexts/audio-context";
import audioSrc from "@assets/Akira Ito Mind Music B [5G46AtNG-9I]_1756790164376.mp3";
import { useEffect } from "react";

function Router() {
  const [, navigate] = useLocation();

  // This effect runs once on initial render to handle redirects from 404.html
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      // Clear the stored path
      sessionStorage.removeItem('redirect');
      // Use the wouter hook to navigate to the intended page
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/why-story-matters" component={WhyStoryMattersPage} />
      <Route path="/systems" component={SystemsPage} />
      <Route path="/metamyth" component={MetamythPage} />
      <Route path="/stories" component={StoriesPage} />
      <Route path="/quest" component={QuestPage} />
      <Route path="/questionaire" component={QuestionairePage} />
      <Route path="/federation" component={FederationPage} />
      <Route path="/begin" component={BeginPortal} />
      <Route path="/metamyth-journey" component={MetamythJourneyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider audioSrc={audioSrc}>
        <ImageLoadingProvider>
          <TooltipProvider>
            <div className="dark">
              <SwordCursor />
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </ImageLoadingProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
