
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cityRiskLevels } from "./RiskHeatmap";
import { mockProperties } from "@/lib/mock-data";
import L from "leaflet";

// Fix for default Leaflet marker icons not displaying properly
// This is needed because Leaflet's default marker icons reference assets that aren't bundled
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Define city coordinates (mock data)
const cityCordinates: Record<string, [number, number]> = {
  "Mumbai": [19.0760, 72.8777],
  "Delhi": [28.7041, 77.1025],
  "Bangalore": [12.9716, 77.5946],
  "Pune": [18.5204, 73.8567],
  "Kolkata": [22.5726, 88.3639],
  "Chennai": [13.0827, 80.2707],
  "Hyderabad": [17.3850, 78.4867],
  "Ahmedabad": [23.0225, 72.5714],
  "Jaipur": [26.9124, 75.7873],
  "Lucknow": [26.8467, 80.9462],
  "Gurgaon": [28.4595, 77.0266]
};

// Get risk color based on risk level
const getRiskColor = (risk: "Low" | "Medium" | "High") => {
  switch (risk) {
    case "Low":
      return "#10b981"; // Green
    case "Medium":
      return "#f59e0b"; // Yellow/Amber
    case "High":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
  }
};

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
  // @ts-ignore - Leaflet types don't include the Default export properly
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
};

// Custom icon creator function
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const RiskMap = () => {
  // Call once to fix icon issues
  React.useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg bg-slate-100 relative">
      <MapContainer 
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add markers for each city with properties */}
        {Object.entries(cityCordinates).map(([city, coordinates]) => {
          const riskData = cityRiskLevels[city] || { risk: "Medium" };
          const color = getRiskColor(riskData.risk);
          const propertiesInCity = mockProperties.filter(p => p.location === city);
          
          return (
            <Marker 
              key={city}
              position={coordinates}
              icon={createCustomIcon(color)}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold mb-1">{city}</h3>
                  <p className="text-sm">Risk Level: <span className="font-bold" style={{ color }}>{riskData.risk}</span></p>
                  <p className="text-sm">Properties: {propertiesInCity.length}</p>
                  {riskData.appreciation && <p className="text-sm">Appreciation: {riskData.appreciation}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md z-10">
        <p className="font-semibold text-sm mb-2">Risk Levels</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-xs">Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
            <span className="text-xs">High Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
