import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineData = [
  {
    id: 1,
    title: "Foundation",
    year: "2024-2027",
    color: "ancient-gold",
    position: "0%"
  },
  {
    id: 2, 
    title: "Adventure Spreads",
    year: "2027-2032",
    color: "mystical-teal",
    position: "50%"
  },
  {
    id: 3,
    title: "Planetary",
    year: "2032-2040", 
    color: "crimson",
    position: "100%"
  }
];

export default function InteractiveTimeline() {
  const [selectedHorizon, setSelectedHorizon] = useState<number | null>(null);

  return (
    <Card className="bg-deep-black/50 border border-mystical-teal/30">
      <CardContent className="p-8">
        {/* Golden Thread */}
        <div className="relative mb-12">
          <motion.div 
            className="w-full h-1 bg-gradient-to-r from-transparent via-ancient-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <div className="absolute top-0 left-0 w-full flex justify-between">
            {timelineData.map((point, index) => (
              <motion.div
                key={point.id}
                className={`rounded-full w-4 h-4 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300 ${point.color === 'crimson' ? 'bg-crimson' : 
                           point.color === 'mystical-teal' ? 'bg-mystical-teal' : 
                           point.color === 'ancient-gold' ? 'bg-ancient-gold' : 'bg-white'}`}
                style={{ left: point.position }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
                onClick={() => setSelectedHorizon(selectedHorizon === point.id ? null : point.id)}
              />
            ))}
          </div>
        </div>

        {/* Timeline Labels */}
        <div className="flex justify-between mb-8">
          {timelineData.map((point) => (
            <div key={point.id} className="text-center flex-1">
              <h4 className={`font-bold typography-technical ${point.color === 'crimson' ? 'text-crimson' : 
                           point.color === 'mystical-teal' ? 'text-mystical-teal' : 
                           point.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}>
                {point.title}
              </h4>
              <p className="text-cream-white/60 typography-technical">
                {point.year}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedHorizon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className={`border ${timelineData[selectedHorizon - 1]?.color === 'crimson' ? 'border-crimson/30' : 
                           timelineData[selectedHorizon - 1]?.color === 'mystical-teal' ? 'border-mystical-teal/30' : 
                           timelineData[selectedHorizon - 1]?.color === 'ancient-gold' ? 'border-ancient-gold/30' : 'border-white/30'}`}>
              <CardContent className="p-6">
                <h3 className={`typography-h3 font-bold mb-4 ${timelineData[selectedHorizon - 1]?.color === 'crimson' ? 'text-crimson' : 
                           timelineData[selectedHorizon - 1]?.color === 'mystical-teal' ? 'text-mystical-teal' : 
                           timelineData[selectedHorizon - 1]?.color === 'ancient-gold' ? 'text-ancient-gold' : 'text-white'}`}>
                  Horizon {selectedHorizon} Details
                </h3>
                <p className="text-cream-white">
                  Detailed information about this horizon would go here...
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
