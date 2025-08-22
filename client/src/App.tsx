import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SwordCursor from "@/components/sword-cursor";
import { useEffect } from "react";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Force font reload on app start to bypass cache
    if (typeof document !== 'undefined' && 'fonts' in document) {
      console.log('Forcing font cache clear and reload...');
      document.fonts.clear();
      
      // Create a style element to force font reload
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'AngleFresh';
          src: url('/attached_assets/NCL%20Enigmatic%20Waesbendiy%20Slanted_1755896330770.otf?t=${Date.now()}') format('opentype');
          font-display: swap;
        }
        @font-face {
          font-family: 'GameFresh';
          src: url('/attached_assets/Game%20%26%20Reality_1755896347899.ttf?t=${Date.now()}') format('truetype');
          font-display: swap;
        }
        .font-angle { font-family: 'AngleFresh', serif !important; }
        .font-game { font-family: 'GameFresh', serif !important; }
      `;
      document.head.appendChild(style);
      console.log('Fresh font styles injected');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <SwordCursor />
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
