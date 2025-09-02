import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  showControls: boolean;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setShowControls: (show: boolean) => void;
  startMusic: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
  audioSrc: string;
}

export function AudioProvider({ children, audioSrc }: AudioProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const startMusic = () => {
    setIsPlaying(true);
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(console.error);
    }
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      volume,
      showControls,
      togglePlay,
      setVolume,
      setShowControls,
      startMusic,
      audioRef
    }}>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}