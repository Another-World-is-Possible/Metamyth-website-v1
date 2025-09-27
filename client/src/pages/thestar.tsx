import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layouts/page-layout";
import { Star, Plus, Trash2, Download, ToggleLeft, ToggleRight } from "lucide-react";
import cosmicPathwayBg from "@assets/cosmic_pathway_bg.png";

// Eight vital areas positioned around the star
const VITAL_AREAS = [
  { id: 'purposeful-authorship', name: 'PURPOSEFUL AUTHORSHIP', position: 'top', angle: 0, color: 'text-amber-400' },
  { id: 'visionary-strategy', name: 'VISIONARY STRATEGY', position: 'top-right', angle: 45, color: 'text-orange-400' },
  { id: 'truthful-expression', name: 'TRUTHFUL EXPRESSION', position: 'right', angle: 90, color: 'text-yellow-400' },
  { id: 'community-wellbeing', name: 'COMMUNITY WELLBEING', position: 'bottom-right', angle: 135, color: 'text-lime-400' },
  { id: 'structural-integrity', name: 'STRUCTURAL INTEGRITY', position: 'bottom', angle: 180, color: 'text-green-400' },
  { id: 'creative-attraction', name: 'CREATIVE ATTRACTION', position: 'bottom-left', angle: 225, color: 'text-teal-400' },
  { id: 'right-livelihood', name: 'RIGHT LIVELIHOOD', position: 'left', angle: 270, color: 'text-cyan-400' },
  { id: 'quest-council', name: 'QUEST COUNCIL', position: 'top-left', angle: 315, color: 'text-blue-400' }
];

interface StarData {
  gifts: { [key: string]: string[] };
  thresholds: { [key: string]: string[] };
  priorities: { [key: string]: number };
  councilSupport: { [key: string]: any };
  agreements: { [key: string]: any };
}

export default function TheStarPage() {
  const [activeTab, setActiveTab] = useState("fountain");
  const [viewMode, setViewMode] = useState<"personal" | "organizational">("personal");
  const [starData, setStarData] = useState<StarData>({
    gifts: {},
    thresholds: {},
    priorities: {},
    councilSupport: {},
    agreements: {}
  });

  // Initialize empty arrays for each vital area
  VITAL_AREAS.forEach(area => {
    if (!starData.gifts[area.id]) starData.gifts[area.id] = [];
    if (!starData.thresholds[area.id]) starData.thresholds[area.id] = [];
  });

  const addGift = (areaId: string, gift: string) => {
    if (gift.trim()) {
      setStarData(prev => ({
        ...prev,
        gifts: {
          ...prev.gifts,
          [areaId]: [...(prev.gifts[areaId] || []), gift.trim()]
        }
      }));
    }
  };

  const addThreshold = (areaId: string, threshold: string) => {
    if (threshold.trim()) {
      setStarData(prev => ({
        ...prev,
        thresholds: {
          ...prev.thresholds,
          [areaId]: [...(prev.thresholds[areaId] || []), threshold.trim()]
        }
      }));
    }
  };

  const removeGift = (areaId: string, index: number) => {
    setStarData(prev => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        [areaId]: prev.gifts[areaId]?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const removeThreshold = (areaId: string, index: number) => {
    setStarData(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [areaId]: prev.thresholds[areaId]?.filter((_, i) => i !== index) || []
      }
    }));
  };

  // Calculate star point intensity based on gifts vs thresholds
  const getPointIntensity = (areaId: string) => {
    const gifts = starData.gifts[areaId]?.length || 0;
    const thresholds = starData.thresholds[areaId]?.length || 0;
    const balance = gifts - thresholds;
    return Math.max(0.3, Math.min(1, 0.5 + (balance * 0.1)));
  };

  const getPointColor = (areaId: string) => {
    const gifts = starData.gifts[areaId]?.length || 0;
    const thresholds = starData.thresholds[areaId]?.length || 0;
    const balance = gifts - thresholds;
    
    if (balance > 0) return "text-amber-400"; // Warm colors for gifts
    if (balance < 0) return "text-blue-400";  // Cool colors for thresholds
    return "text-gray-400";
  };

  return (
    <PageLayout hideFooter={true} className="bg-black min-h-screen">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-40 z-0"
        style={{
          backgroundImage: `url(${cosmicPathwayBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 text-amber-100 py-8 px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-angle text-3xl md:text-5xl mb-4 text-gradient-gold">
            THE EIGHT-POINTED STAR
          </h1>
          <p className="font-thornelia text-lg md:text-xl text-amber-200 mb-6">
            Dynamic Balance & Mission Completion Tool
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-emerland text-sm">Personal</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === "personal" ? "organizational" : "personal")}
              className="p-2"
            >
              {viewMode === "personal" ? 
                <ToggleLeft className="h-6 w-6 text-amber-400" /> : 
                <ToggleRight className="h-6 w-6 text-amber-400" />
              }
            </Button>
            <span className="font-emerland text-sm">Organizational</span>
          </div>
        </motion.div>

        {/* Eight-Pointed Star Visualization */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-96 h-96">
            {/* Central Star */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-32 h-32 text-ancient-gold animate-pulse" />
            </div>
            
            {/* Eight Points with Labels */}
            {VITAL_AREAS.map((area, index) => {
              const radius = 140;
              const angleRad = (area.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              
              return (
                <motion.div
                  key={area.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: getPointIntensity(area.id), 
                    scale: 1 
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-4 h-4 rounded-full ${getPointColor(area.id)} border-2 border-current shadow-lg group-hover:shadow-xl transition-all duration-300`} />
                  <div className="absolute whitespace-nowrap text-xs font-emerland text-center mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {area.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Interface Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-amber-400/30 rounded-lg">
              <TabsTrigger value="fountain" className="font-emerland text-amber-200 data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400">
                FOUNTAIN
              </TabsTrigger>
              <TabsTrigger value="path" className="font-emerland text-amber-200 data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400">
                PATH
              </TabsTrigger>
              <TabsTrigger value="council" className="font-emerland text-amber-200 data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400">
                COUNCIL
              </TabsTrigger>
              <TabsTrigger value="ethos" className="font-emerland text-amber-200 data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400">
                ETHOS
              </TabsTrigger>
            </TabsList>

            {/* FOUNTAIN TAB - Assessment & Mapping */}
            <TabsContent value="fountain" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {VITAL_AREAS.map((area) => (
                  <FountainAreaCard 
                    key={area.id}
                    area={area}
                    gifts={starData.gifts[area.id] || []}
                    thresholds={starData.thresholds[area.id] || []}
                    onAddGift={(gift) => addGift(area.id, gift)}
                    onAddThreshold={(threshold) => addThreshold(area.id, threshold)}
                    onRemoveGift={(index) => removeGift(area.id, index)}
                    onRemoveThreshold={(index) => removeThreshold(area.id, index)}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border border-amber-400/50">
                  <Download className="w-4 h-4 mr-2" />
                  Complete Fountain Assessment
                </Button>
              </div>
            </TabsContent>

            {/* PATH TAB - Development Sequencing */}
            <TabsContent value="path" className="mt-8">
              <div className="text-center py-12">
                <h3 className="font-thornelia text-2xl text-amber-400 mb-4">PATH - Development Sequencing</h3>
                <p className="font-emerland text-amber-200 mb-8">Prioritize and sequence your threshold challenges for optimal development</p>
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-8">
                  <p className="font-emerland text-amber-300">Path interface coming next - drag and drop threshold prioritization</p>
                </div>
              </div>
            </TabsContent>

            {/* COUNCIL TAB - Support Network */}
            <TabsContent value="council" className="mt-8">
              <div className="text-center py-12">
                <h3 className="font-thornelia text-2xl text-amber-400 mb-4">COUNCIL - Support Network</h3>
                <p className="font-emerland text-amber-200 mb-8">Build your support system for each threshold challenge</p>
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-8">
                  <p className="font-emerland text-amber-300">Council interface coming next - support network management</p>
                </div>
              </div>
            </TabsContent>

            {/* ETHOS TAB - Agreements & Accountability */}
            <TabsContent value="ethos" className="mt-8">
              <div className="text-center py-12">
                <h3 className="font-thornelia text-2xl text-amber-400 mb-4">ETHOS - Agreements & Accountability</h3>
                <p className="font-emerland text-amber-200 mb-8">Create commitments for development and gift sharing</p>
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-8">
                  <p className="font-emerland text-amber-300">Ethos interface coming next - agreements and accountability system</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
}

// Component for individual area assessment in Fountain tab
function FountainAreaCard({ 
  area, 
  gifts, 
  thresholds, 
  onAddGift, 
  onAddThreshold, 
  onRemoveGift, 
  onRemoveThreshold 
}: {
  area: typeof VITAL_AREAS[0];
  gifts: string[];
  thresholds: string[];
  onAddGift: (gift: string) => void;
  onAddThreshold: (threshold: string) => void;
  onRemoveGift: (index: number) => void;
  onRemoveThreshold: (index: number) => void;
}) {
  const [newGift, setNewGift] = useState("");
  const [newThreshold, setNewThreshold] = useState("");

  const handleAddGift = () => {
    onAddGift(newGift);
    setNewGift("");
  };

  const handleAddThreshold = () => {
    onAddThreshold(newThreshold);
    setNewThreshold("");
  };

  return (
    <Card className="bg-black/40 border border-amber-400/30 hover:border-amber-400/50 transition-colors duration-300">
      <CardHeader className="pb-3">
        <CardTitle className={`font-emerland text-sm ${area.color} text-center`}>
          {area.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gifts Section */}
        <div>
          <h4 className="font-emerland text-xs text-amber-400 mb-2">GIFTS</h4>
          <div className="space-y-2 mb-3">
            {gifts.map((gift, index) => (
              <div key={index} className="flex items-center gap-2 bg-amber-400/10 p-2 rounded border border-amber-400/20">
                <span className="font-emerland text-xs text-amber-200 flex-1">{gift}</span>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRemoveGift(index)}
                  className="h-6 w-6 p-0 text-amber-400/60 hover:text-amber-400"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add gift..."
              value={newGift}
              onChange={(e) => setNewGift(e.target.value)}
              className="flex-1 bg-black/50 border-amber-400/30 text-amber-200 text-xs placeholder:text-amber-400/50"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGift()}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddGift}
              className="text-amber-400 hover:text-amber-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Thresholds Section */}
        <div>
          <h4 className="font-emerland text-xs text-blue-400 mb-2">THRESHOLDS</h4>
          <div className="space-y-2 mb-3">
            {thresholds.map((threshold, index) => (
              <div key={index} className="flex items-center gap-2 bg-blue-400/10 p-2 rounded border border-blue-400/20">
                <span className="font-emerland text-xs text-blue-200 flex-1">{threshold}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveThreshold(index)}
                  className="h-6 w-6 p-0 text-blue-400/60 hover:text-blue-400"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add threshold..."
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              className="flex-1 bg-black/50 border-blue-400/30 text-blue-200 text-xs placeholder:text-blue-400/50"
              onKeyPress={(e) => e.key === 'Enter' && handleAddThreshold()}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddThreshold}
              className="text-blue-400 hover:text-blue-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}