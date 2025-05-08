
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockProperties } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskMap from "./RiskMap";

// Define risk levels for each city - exported for reuse in RiskMap component
export const cityRiskLevels: Record<string, {
  risk: "Low" | "Medium" | "High";
  appreciation: string;
  tier: "1" | "2" | "3";
}> = {
  "Mumbai": { risk: "Low", appreciation: "12% annually", tier: "1" },
  "Delhi": { risk: "Low", appreciation: "10% annually", tier: "1" },
  "Bangalore": { risk: "Low", appreciation: "14% annually", tier: "1" },
  "Pune": { risk: "Medium", appreciation: "8% annually", tier: "2" },
  "Kolkata": { risk: "Medium", appreciation: "7% annually", tier: "1" },
  "Chennai": { risk: "Low", appreciation: "9% annually", tier: "1" },
  "Hyderabad": { risk: "Low", appreciation: "11% annually", tier: "1" },
  "Ahmedabad": { risk: "Medium", appreciation: "7% annually", tier: "2" },
  "Jaipur": { risk: "High", appreciation: "5% annually", tier: "2" },
  "Lucknow": { risk: "High", appreciation: "4% annually", tier: "2" },
  "Gurgaon": { risk: "Low", appreciation: "11% annually", tier: "1" },
};

// Get risk color based on risk level
const getRiskColor = (risk: "Low" | "Medium" | "High") => {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "High":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RiskHeatmap: React.FC = () => {
  // Get unique locations from properties
  const locations = Array.from(new Set(mockProperties.map((property) => property.location)));
  const [activeTab, setActiveTab] = useState<"table" | "map">("table");
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Risk Heatmap
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Property Risk Heatmap</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "table" | "map")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="pt-4 pb-2">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-500">
                Risk assessment based on location, market trends, and historical data
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low Risk</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">High Risk</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>City Tier</TableHead>
                    <TableHead>Appreciation Rate</TableHead>
                    <TableHead>Properties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => {
                    const riskData = cityRiskLevels[location] || {
                      risk: "Medium",
                      appreciation: "Unknown",
                      tier: "2",
                    };
                    
                    const propertiesInLocation = mockProperties.filter(
                      (p) => p.location === location
                    );
                    
                    return (
                      <TableRow key={location}>
                        <TableCell className="font-medium">{location}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(
                              riskData.risk
                            )}`}
                          >
                            {riskData.risk}
                          </span>
                        </TableCell>
                        <TableCell>Tier {riskData.tier}</TableCell>
                        <TableCell>{riskData.appreciation}</TableCell>
                        <TableCell>{propertiesInLocation.length}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="py-4">
            <RiskMap />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RiskHeatmap;
