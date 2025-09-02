import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioControlsProps {
  audioSrc: string;
  autoPlay?: boolean;
}

export default function AudioControls({ audioSrc, autoPlay = false }: AudioControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    if (autoPlay && !isPlaying) {
      setIsPlaying(true);
      audio.play().catch(console.error);
    } else if (autoPlay && isPlaying) {
      audio.play().catch(console.error);
    }
  }, [volume, isPlaying, autoPlay]);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
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
    <div className="fixed top-4 right-4 z-50">
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
      
      {/* Music Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-black/50 backdrop-blur-sm border border-ancient-gold/30 rounded-full p-3 text-ancient-gold hover:bg-ancient-gold/20 transition-all duration-300"
          data-testid="button-audio-toggle"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {/* Expanded Controls */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-md border border-ancient-gold/30 rounded-lg p-4 min-w-[200px]"
          >
            {/* Play/Pause Toggle */}
            <div className="mb-3">
              <button
                onClick={togglePlay}
                className="w-full bg-ancient-gold/20 hover:bg-ancient-gold/30 text-ancient-gold border border-ancient-gold/30 rounded px-3 py-2 text-sm transition-all duration-200"
                data-testid="button-music-play-pause"
              >
                {isPlaying ? 'Pause Music' : 'Play Music'}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-2">
              <label className="text-ancient-gold text-sm">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer slider-thumb"
                data-testid="slider-volume"
              />
              <div className="text-ancient-gold/70 text-xs text-center">
                {Math.round(volume * 100)}%
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}