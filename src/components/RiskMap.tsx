
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cityRiskLevels } from "./RiskHeatmap";
import { mockProperties } from "@/lib/mock-data";

// Define city coordinates (mock data)
const cityCordinates: Record<string, [number, number]> = {
  "Mumbai": [72.8777, 19.0760],
  "Delhi": [77.1025, 28.7041],
  "Bangalore": [77.5946, 12.9716],
  "Pune": [73.8567, 18.5204],
  "Kolkata": [88.3639, 22.5726],
  "Chennai": [80.2707, 13.0827],
  "Hyderabad": [78.4867, 17.3850],
  "Ahmedabad": [72.5714, 23.0225],
  "Jaipur": [75.7873, 26.9124],
  "Lucknow": [80.9462, 26.8467],
  "Gurgaon": [77.0266, 28.4595]
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

const RiskMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = React.useState<string>("");

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // For demo purposes, we're using a temporary input field for the token
    // In a real app, this would come from environment variables or Supabase
    const token = prompt("Please enter your Mapbox public token to view the map. Visit mapbox.com to get a free token.", "");
    if (!token) return;
    
    setMapboxToken(token);
    
    // Initialize map
    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Wait for map to load before adding markers
    map.current.on('load', () => {
      // Get unique cities from properties
      const uniqueCities = Array.from(new Set(mockProperties.map(p => p.location)));
      
      // Add markers for each city with properties
      uniqueCities.forEach(city => {
        const coordinates = cityCordinates[city];
        if (!coordinates) return;
        
        const riskData = cityRiskLevels[city] || { risk: "Medium" };
        const color = getRiskColor(riskData.risk);
        
        // Create a marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = color;
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        
        // Count properties in this city
        const propertiesInCity = mockProperties.filter(p => p.location === city);
        
        // Create HTML content for popup with conditional rendering of appreciation
        const popupHTML = `
          <h3 style="font-weight: bold; margin-bottom: 8px;">${city}</h3>
          <p>Risk Level: <span style="color: ${color}; font-weight: bold;">${riskData.risk}</span></p>
          <p>Properties: ${propertiesInCity.length}</p>
          ${riskData.appreciation ? `<p>Appreciation: ${riskData.appreciation}</p>` : ''}
        `;
        
        // Add the marker to the map
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupHTML)
          )
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);
  
  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-lg text-center space-y-4">
        <p className="text-lg font-medium">Mapbox token required to view the risk map</p>
        <p className="text-sm text-slate-500">
          Visit <a href="https://mapbox.com" className="text-real-600 underline" target="_blank" rel="noopener noreferrer">mapbox.com</a> to get a free token
        </p>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg bg-slate-100 relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
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
