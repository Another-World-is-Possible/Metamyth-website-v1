import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SharedNavigation from "@/components/shared-navigation";
import HeroSection from "@/components/hero-section";
import LandingScreen from "@/components/landing-screen";
import MetamythTiles from "@/components/metamyth-tiles";
import CallToAction from "@/components/call-to-action";
import VideoSection from "@/components/video-section";
import SharedFooter from "@/components/layouts/shared-footer"; // Added import

import { useAudio } from "@/contexts/audio-context";

import bgImg from "@assets/_zln01ad4mec8v0qmtav0_0_1755899727372.jpg";


function HomeContent() {
  const [, navigate] = useLocation();
  const [showLanding, setShowLanding] = useState(true);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const { startMusic } = useAudio();

  const handleNavigation = (tab: string | null) => {
    if (tab === 'questionaire') {
      navigate('/questionaire');
    } else if (tab === 'metamyth') {
      navigate('/metamyth');
    } else if (tab === 'quest') {
      navigate('/quest');
    } else if (tab === 'stories') {
      navigate('/stories');
    } else if (tab === 'why-story') {
      navigate('/why-story-matters');
    } else if (tab === 'systems') {
      navigate('/systems');
    } else if (tab === 'federation') {
      navigate('/federation');
    }
    
    // Scroll to top when navigating from home page
    if (tab !== null) {
      window.scrollTo(0, 0);
    }
  };

  const handleBeginJourney = () => {
    setShowLanding(false);
    // Start the music when the journey begins
    startMusic();
    // Small delay before showing hero content for smooth transition
    setTimeout(() => {
      setShowHeroContent(true);
    }, 500);
  };

  useEffect(() => {
    // Enhanced Intersection Observer for immersive scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class with slight delay for more natural feel
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 50);
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      // Observe all scroll-triggered elements
      const scrollElements = document.querySelectorAll('.scroll-fade-in, .section-fade-in, .metamyth-section, .call-to-action-section');
      scrollElements.forEach(el => observer.observe(el));

      // Special handling for CallToAction section to load more promptly
      const callToActionSection = document.querySelector('.call-to-action-section');
      if (callToActionSection) {
        // Check if it's already in viewport
        const rect = callToActionSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // If the section is within 100px of the viewport, trigger it immediately
        if (rect.top <= windowHeight + 100) {
          setTimeout(() => {
            callToActionSection.classList.add('visible');
          }, 100);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const scrollElements = document.querySelectorAll('.scroll-fade-in, .section-fade-in, .metamyth-section, .call-to-action-section');
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-deep-black text-cream-white overflow-x-hidden">
      {/* Landing Screen */}
      {showLanding && <LandingScreen onBeginJourney={handleBeginJourney} />}
      
      
      <SharedNavigation />
      <main className="relative pt-16"> {/* Added pt-16 for top padding */}
        <HeroSection setActiveTab={handleNavigation} showContent={showHeroContent} />
        <div className="section-fade-in">
          <MetamythTiles setActiveTab={handleNavigation} />
        </div>
        <div className="section-fade-in">
          <div 
            className="relative"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll'
            }}
          >
            <CallToAction setActiveTab={handleNavigation} />
            <VideoSection />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <SharedFooter /> {/* Replaced hardcoded footer with the component */}
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}