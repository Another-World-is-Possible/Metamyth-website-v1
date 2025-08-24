import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import all background images
import heroBackground from "@assets/_f20qmpu9dartjp9dbfcm_0_1755891749225.png";
import questBackground from "@assets/_e7sgebpnxk7u4yvtn50v_0_1755993467347.png";
import metamythBackground from "@assets/_sunrise_mountain_road-__prompt-_vertical_composition_showing_rough_winding_mountain_road_with_dirt_wsb0x3teddz05i8om0dq_0_1755994182701.png";
import cosmicDragon from "@assets/cosmic_dragon_optimized.jpg";
import systemsBackground from "@assets/_x7er1zk1fla8a9b7ylmk_0_1755995147112.png";

interface ImageLoadingState {
  hero: boolean;
  quest: boolean;
  metamyth: boolean;
  whyStory: boolean;
  systems: boolean;
  allLoaded: boolean;
}

interface ImageLoadingContextType {
  imageState: ImageLoadingState;
  getImageSrc: (key: keyof Omit<ImageLoadingState, 'allLoaded'>) => string;
  isImageReady: (key: keyof Omit<ImageLoadingState, 'allLoaded'>) => boolean;
}

const imageMap = {
  hero: heroBackground,
  quest: questBackground,
  metamyth: metamythBackground,
  whyStory: cosmicDragon,
  systems: systemsBackground,
};

const ImageLoadingContext = createContext<ImageLoadingContextType | null>(null);

export const useImageLoading = () => {
  const context = useContext(ImageLoadingContext);
  if (!context) {
    throw new Error('useImageLoading must be used within ImageLoadingProvider');
  }
  return context;
};

interface ImageLoadingProviderProps {
  children: ReactNode;
}

export const ImageLoadingProvider = ({ children }: ImageLoadingProviderProps) => {
  const [imageState, setImageState] = useState<ImageLoadingState>({
    hero: false,
    quest: false,
    metamyth: false,
    whyStory: false,
    systems: false,
    allLoaded: false,
  });

  useEffect(() => {
    // Priority loading: Hero first, then tab backgrounds
    const loadImageSequentially = async () => {
      // Load hero background first (highest priority)
      const loadImage = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load ${src}`));
          img.src = src;
        });
      };

      try {
        // Hero background (landing page) - load first
        await loadImage(heroBackground);
        setImageState(prev => ({ ...prev, hero: true }));
        
        // Start loading all tab backgrounds in parallel after hero is loaded
        const tabPromises = [
          loadImage(questBackground).then(() => 
            setImageState(prev => ({ ...prev, quest: true }))
          ),
          loadImage(metamythBackground).then(() => 
            setImageState(prev => ({ ...prev, metamyth: true }))
          ),
          loadImage(cosmicDragon).then(() => 
            setImageState(prev => ({ ...prev, whyStory: true }))
          ),
          loadImage(systemsBackground).then(() => 
            setImageState(prev => ({ ...prev, systems: true }))
          ),
        ];

        // Wait for all tab backgrounds to load
        await Promise.all(tabPromises);
        setImageState(prev => ({ ...prev, allLoaded: true }));
        
      } catch (error) {
        console.warn('Some images failed to load:', error);
        // Set all to true as fallback to prevent infinite waiting
        setImageState({
          hero: true,
          quest: true,
          metamyth: true,
          whyStory: true,
          systems: true,
          allLoaded: true,
        });
      }
    };

    loadImageSequentially();
  }, []);

  const getImageSrc = (key: keyof Omit<ImageLoadingState, 'allLoaded'>): string => {
    return imageMap[key];
  };

  const isImageReady = (key: keyof Omit<ImageLoadingState, 'allLoaded'>): boolean => {
    return imageState[key];
  };

  const contextValue: ImageLoadingContextType = {
    imageState,
    getImageSrc,
    isImageReady,
  };

  return (
    <ImageLoadingContext.Provider value={contextValue}>
      {children}
    </ImageLoadingContext.Provider>
  );
};