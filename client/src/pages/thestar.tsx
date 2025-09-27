import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layouts/page-layout";
import { Star, Plus, Trash2, Download, Upload, ToggleLeft, ToggleRight, Sparkles, Target, Users } from "lucide-react";
import cosmicPathwayBg from "@assets/cosmic_pathway_bg.png";

// Eight vital areas positioned around the star
const VITAL_AREAS = [
  { id: 'purposeful-authorship', name: 'PURPOSEFUL AUTHORSHIP', position: 'top', angle: 0, color: 'text-amber-400', x: 50, y: 15 },
  { id: 'visionary-strategy', name: 'VISIONARY STRATEGY', position: 'top-right', angle: 45, color: 'text-orange-400', x: 75, y: 25 },
  { id: 'truthful-expression', name: 'TRUTHFUL EXPRESSION', position: 'right', angle: 90, color: 'text-yellow-400', x: 85, y: 50 },
  { id: 'community-wellbeing', name: 'COMMUNITY WELLBEING', position: 'bottom-right', angle: 135, color: 'text-lime-400', x: 75, y: 75 },
  { id: 'structural-integrity', name: 'STRUCTURAL INTEGRITY', position: 'bottom', angle: 180, color: 'text-green-400', x: 50, y: 85 },
  { id: 'creative-attraction', name: 'CREATIVE ATTRACTION', position: 'bottom-left', angle: 225, color: 'text-teal-400', x: 25, y: 75 },
  { id: 'right-livelihood', name: 'RIGHT LIVELIHOOD', position: 'left', angle: 270, color: 'text-cyan-400', x: 15, y: 50 },
  { id: 'quest-council', name: 'QUEST COUNCIL', position: 'top-left', angle: 315, color: 'text-blue-400', x: 25, y: 25 }
];

interface StarData {
  gifts: { [key: string]: string[] };
  thresholds: { [key: string]: string[] };
  councilSupport: { [key: string]: any[] };
  agreements: { [key: string]: any[] };
}

export default function TheStarPage() {
  const [activeTab, setActiveTab] = useState("fountain");
  const [viewMode, setViewMode] = useState<"personal" | "organizational">("personal");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [starData, setStarData] = useState<StarData>({
    gifts: {},
    thresholds: {},
    councilSupport: {},
    agreements: {}
  });

  // Initialize empty arrays for each vital area
  VITAL_AREAS.forEach(area => {
    if (!starData.gifts[area.id]) starData.gifts[area.id] = [];
    if (!starData.thresholds[area.id]) starData.thresholds[area.id] = [];
    if (!starData.councilSupport[area.id]) starData.councilSupport[area.id] = [];
    if (!starData.agreements[area.id]) starData.agreements[area.id] = [];
  });

  // Auto-save to localStorage whenever starData changes
  useEffect(() => {
    try {
      localStorage.setItem(`star-tool-${viewMode}`, JSON.stringify(starData));
    } catch (error) {
      console.error('Error saving star data:', error);
    }
  }, [starData, viewMode]);

  // Load data from localStorage on mount and view mode change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`star-tool-${viewMode}`);
      if (saved) {
        setStarData(JSON.parse(saved));
      } else {
        // Reset to empty data if no saved data for this mode
        setStarData({
          gifts: {},
          thresholds: {},
          councilSupport: {},
          agreements: {}
        });
      }
    } catch (error) {
      console.error('Error loading star data:', error);
      // Reset to empty data on error
      setStarData({
        gifts: {},
        thresholds: {},
        councilSupport: {},
        agreements: {}
      });
    }
  }, [viewMode]);

  // Calculate star point intensity based on gifts vs thresholds
  const getPointIntensity = (areaId: string) => {
    const gifts = starData.gifts[areaId]?.length || 0;
    const thresholds = starData.thresholds[areaId]?.length || 0;
    
    if (gifts > thresholds) return 'high'; // More gifts than thresholds - warm/glowing
    if (thresholds > gifts) return 'low'; // More thresholds than gifts - cool/contracted
    return 'medium'; // Balanced
  };

  // Get point visual style based on intensity and tab
  const getPointStyle = (area: typeof VITAL_AREAS[0]) => {
    const intensity = getPointIntensity(area.id);
    const isSelected = selectedArea === area.id;
    
    let baseClasses = "absolute cursor-pointer transition-all duration-300 transform hover:scale-110";
    
    if (isSelected) {
      baseClasses += " scale-125 ring-2 ring-amber-400 ring-opacity-50";
    }
    
    // Size based on intensity
    const sizeClasses = intensity === 'high' ? 'w-8 h-8' : intensity === 'low' ? 'w-4 h-4' : 'w-6 h-6';
    
    // Color based on intensity and area
    let colorClasses = area.color;
    if (intensity === 'high') {
      colorClasses += " drop-shadow-lg filter brightness-125";
    } else if (intensity === 'low') {
      colorClasses += " opacity-60";
    }
    
    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  };

  // Handle star point click
  const handlePointClick = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  // Data management functions
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
        [areaId]: prev.gifts[areaId].filter((_, i) => i !== index)
      }
    }));
  };

  const removeThreshold = (areaId: string, index: number) => {
    setStarData(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [areaId]: prev.thresholds[areaId].filter((_, i) => i !== index)
      }
    }));
  };

  const exportData = () => {
    const dataToExport = {
      personal: JSON.parse(localStorage.getItem('star-tool-personal') || '{}'),
      organizational: JSON.parse(localStorage.getItem('star-tool-organizational') || '{}'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `star-tool-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        if (importedData.personal) {
          localStorage.setItem('star-tool-personal', JSON.stringify(importedData.personal));
        }
        if (importedData.organizational) {
          localStorage.setItem('star-tool-organizational', JSON.stringify(importedData.organizational));
        }
        
        // Reload current view mode data
        const saved = localStorage.getItem(`star-tool-${viewMode}`);
        if (saved) {
          setStarData(JSON.parse(saved));
        } else {
          setStarData({
            gifts: {},
            thresholds: {},
            councilSupport: {},
            agreements: {}
          });
        }
        
        event.target.value = '';
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('star-tool-personal');
      localStorage.removeItem('star-tool-organizational');
      setStarData({
        gifts: {},
        thresholds: {},
        councilSupport: {},
        agreements: {}
      });
    }
  };

  const selectedAreaData = selectedArea ? VITAL_AREAS.find(a => a.id === selectedArea) : null;

  return (
    <PageLayout>
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${cosmicPathwayBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Content overlay */}
        <div className="relative z-10 bg-black/70 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 py-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-thornelia text-3xl md:text-5xl text-amber-400 mb-3">
                THE EIGHT-POINTED STAR TOOL
              </h1>
              <p className="font-emerland text-lg text-amber-200 max-w-3xl mx-auto">
                Navigate your eight vital areas through the interactive star
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
              {/* Personal vs Organizational Toggle */}
              <div className="flex items-center gap-2">
                <span className="font-emerland text-amber-300 text-sm">Personal</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "personal" ? "organizational" : "personal")}
                  className="p-0 h-auto"
                >
                  {viewMode === "personal" ? (
                    <ToggleLeft className="h-6 w-6 text-amber-400" />
                  ) : (
                    <ToggleRight className="h-6 w-6 text-amber-400" />
                  )}
                </Button>
                <span className="font-emerland text-amber-300 text-sm">Organizational</span>
              </div>

              {/* Data Management */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={exportData}
                  className="text-amber-400 hover:text-amber-300"
                  title="Export all data"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-400 hover:text-amber-300 relative"
                  title="Import data"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllData}
                  className="text-red-400 hover:text-red-300"
                  title="Clear all data"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tab System */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-amber-400/30">
                <TabsTrigger value="fountain" className="data-[state=active]:bg-amber-400/20 text-amber-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  FOUNTAIN
                </TabsTrigger>
                <TabsTrigger value="path" className="data-[state=active]:bg-amber-400/20 text-amber-200">
                  <Target className="w-4 h-4 mr-2" />
                  PATH
                </TabsTrigger>
                <TabsTrigger value="council" className="data-[state=active]:bg-amber-400/20 text-amber-200">
                  <Users className="w-4 h-4 mr-2" />
                  COUNCIL
                </TabsTrigger>
                <TabsTrigger value="ethos" className="data-[state=active]:bg-amber-400/20 text-amber-200">
                  <Star className="w-4 h-4 mr-2" />
                  ETHOS
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Interactive Star Visualization */}
                <div className="lg:col-span-2">
                  <Card className="bg-black/40 border border-amber-400/30 h-96 relative">
                    <CardContent className="p-0 h-full">
                      {/* Central Star with Interactive Points */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Central star shape */}
                        <div className="absolute w-32 h-32 text-amber-400/20">
                          <Star className="w-full h-full" />
                        </div>
                        
                        {/* Clickable points around the star */}
                        {VITAL_AREAS.map((area) => (
                          <motion.div
                            key={area.id}
                            className={getPointStyle(area)}
                            style={{ 
                              left: `${area.x}%`, 
                              top: `${area.y}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => handlePointClick(area.id)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star className="w-full h-full" />
                            
                            {/* Area label */}
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-emerland ${area.color} whitespace-nowrap pointer-events-none`}>
                              {area.name}
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Central balance indicator */}
                        <div className="absolute w-4 h-4 bg-amber-400 rounded-full opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-4 text-center">
                    <p className="font-emerland text-amber-200 text-sm">
                      Click on any star point to interact with that vital area
                    </p>
                  </div>
                </div>

                {/* Area Detail Panel */}
                <div>
                  {selectedAreaData ? (
                    <AreaDetailPanel 
                      area={selectedAreaData}
                      gifts={starData.gifts[selectedAreaData.id] || []}
                      thresholds={starData.thresholds[selectedAreaData.id] || []}
                      activeTab={activeTab}
                      onAddGift={(gift) => addGift(selectedAreaData.id, gift)}
                      onAddThreshold={(threshold) => addThreshold(selectedAreaData.id, threshold)}
                      onRemoveGift={(index) => removeGift(selectedAreaData.id, index)}
                      onRemoveThreshold={(index) => removeThreshold(selectedAreaData.id, index)}
                    />
                  ) : (
                    <Card className="bg-black/40 border border-amber-400/30">
                      <CardContent className="p-8 text-center">
                        <Sparkles className="w-12 h-12 text-amber-400/50 mx-auto mb-4" />
                        <h3 className="font-thornelia text-xl text-amber-400 mb-2">Select a Vital Area</h3>
                        <p className="font-emerland text-amber-200/80">
                          Click on any point of the star to explore and develop that area
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              
              {/* Tab-specific content */}
              <TabsContent value="fountain" className="mt-8">
                <FountainView starData={starData} />
              </TabsContent>
              
              <TabsContent value="path" className="mt-8">
                <PathView starData={starData} />
              </TabsContent>
              
              <TabsContent value="council" className="mt-8">
                <CouncilView starData={starData} />
              </TabsContent>
              
              <TabsContent value="ethos" className="mt-8">
                <EthosView starData={starData} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}

// Area Detail Panel Component
function AreaDetailPanel({ 
  area, 
  gifts, 
  thresholds, 
  activeTab, 
  onAddGift, 
  onAddThreshold, 
  onRemoveGift, 
  onRemoveThreshold 
}: {
  area: typeof VITAL_AREAS[0];
  gifts: string[];
  thresholds: string[];
  activeTab: string;
  onAddGift: (gift: string) => void;
  onAddThreshold: (threshold: string) => void;
  onRemoveGift: (index: number) => void;
  onRemoveThreshold: (index: number) => void;
}) {
  const [newGift, setNewGift] = useState("");
  const [newThreshold, setNewThreshold] = useState("");

  const handleAddGift = () => {
    if (newGift.trim()) {
      onAddGift(newGift);
      setNewGift("");
    }
  };

  const handleAddThreshold = () => {
    if (newThreshold.trim()) {
      onAddThreshold(newThreshold);
      setNewThreshold("");
    }
  };

  return (
    <Card className="bg-black/40 border border-amber-400/30">
      <CardHeader>
        <CardTitle className={`font-emerland text-lg ${area.color}`}>
          {area.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeTab === 'fountain' && (
          <>
            {/* Gifts Section */}
            <div>
              <h4 className="font-emerland text-sm text-green-400 mb-3">GIFTS ({gifts.length})</h4>
              <div className="space-y-2 mb-3">
                {gifts.map((gift, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-400/10 rounded">
                    <span className="flex-1 font-emerland text-sm text-amber-200">{gift}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveGift(index)}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a gift..."
                  value={newGift}
                  onChange={(e) => setNewGift(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGift()}
                  className="bg-black/50 border-amber-400/30 text-amber-200 text-sm"
                />
                <Button onClick={handleAddGift} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thresholds Section */}
            <div>
              <h4 className="font-emerland text-sm text-red-400 mb-3">THRESHOLDS ({thresholds.length})</h4>
              <div className="space-y-2 mb-3">
                {thresholds.map((threshold, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-red-400/10 rounded">
                    <span className="flex-1 font-emerland text-sm text-amber-200">{threshold}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveThreshold(index)}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a threshold..."
                  value={newThreshold}
                  onChange={(e) => setNewThreshold(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddThreshold()}
                  className="bg-black/50 border-amber-400/30 text-amber-200 text-sm"
                />
                <Button onClick={handleAddThreshold} size="sm" className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'fountain' && (
          <div className="text-center py-8">
            <p className="font-emerland text-amber-200/80">
              {activeTab.toUpperCase()} view for {area.name} - coming soon
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Tab View Components (simplified for now)
function FountainView({ starData }: { starData: StarData }) {
  const totalGifts = Object.values(starData.gifts).flat().length;
  const totalThresholds = Object.values(starData.thresholds).flat().length;
  
  return (
    <Card className="bg-black/40 border border-amber-400/30">
      <CardHeader>
        <CardTitle className="font-thornelia text-xl text-amber-400">Fountain Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-thornelia text-green-400">{totalGifts}</div>
            <div className="font-emerland text-sm text-amber-200">Total Gifts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-thornelia text-red-400">{totalThresholds}</div>
            <div className="font-emerland text-sm text-amber-200">Total Thresholds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PathView({ starData }: { starData: StarData }) {
  return (
    <Card className="bg-black/40 border border-amber-400/30">
      <CardHeader>
        <CardTitle className="font-thornelia text-xl text-amber-400">Development Path</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-emerland text-amber-200">Path timeline interface coming soon...</p>
      </CardContent>
    </Card>
  );
}

function CouncilView({ starData }: { starData: StarData }) {
  return (
    <Card className="bg-black/40 border border-amber-400/30">
      <CardHeader>
        <CardTitle className="font-thornelia text-xl text-amber-400">Council Network</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-emerland text-amber-200">Council network interface coming soon...</p>
      </CardContent>
    </Card>
  );
}

function EthosView({ starData }: { starData: StarData }) {
  return (
    <Card className="bg-black/40 border border-amber-400/30">
      <CardHeader>
        <CardTitle className="font-thornelia text-xl text-amber-400">Sacred Agreements</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-emerland text-amber-200">Agreements interface coming soon...</p>
      </CardContent>
    </Card>
  );
}