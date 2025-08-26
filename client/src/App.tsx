import { Switch, Route } from "wouter";
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
import SwordCursor from "@/components/sword-cursor";
import { ImageLoadingProvider } from "@/contexts/ImageLoadingContext";
import { useEffect } from "react";


function Router() {
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageLoadingProvider>
        <TooltipProvider>
          <div className="dark">
            <SwordCursor />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ImageLoadingProvider>
    </QueryClientProvider>
  );
}

export default App;
