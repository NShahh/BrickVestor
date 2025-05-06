
import React, { useState, useEffect } from "react";
import { Property, mockProperties, getPremiumProperties } from "@/lib/mock-data";
import PropertyCard from "@/components/PropertyCard";
import PropertyTable from "@/components/PropertyTable";
import FilterSection from "@/components/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List } from "lucide-react";
import RiskHeatmap from "@/components/RiskHeatmap";

const Explore = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [filters, setFilters] = useState({
    location: "",
    minYield: 5,
    maxYield: 15,
  });
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  
  // Get premium properties
  const premiumProperties = getPremiumProperties();

  // Extract unique locations from properties
  const locations = Array.from(new Set(mockProperties.map(p => p.location)));

  // Apply filters to properties
  useEffect(() => {
    let filtered = [...mockProperties];
    
    // Apply location filter if selected
    if (filters.location) {
      filtered = filtered.filter(p => p.location === filters.location);
    }
    
    // Apply yield filter
    filtered = filtered.filter(
      p => p.annualYield >= filters.minYield && p.annualYield <= filters.maxYield
    );
    
    // Apply premium filter
    if (showPremiumOnly) {
      filtered = filtered.filter(p => p.premium);
    }
    
    setProperties(filtered);
  }, [filters, showPremiumOnly]);

  const handleFilterChange = (newFilters: { location: string; minYield: number; maxYield: number }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Explore Properties</h1>
            <p className="text-gray-500 mt-1">
              Discover premium real estate investment opportunities
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <RiskHeatmap />
            
            <Tabs
              defaultValue="grid"
              value={view}
              onValueChange={(v) => setView(v as "grid" | "table")}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" /> Grid
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <List className="h-4 w-4" /> Table
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <FilterSection 
          locations={locations}
          onFilterChange={handleFilterChange}
          className="bg-white p-6 rounded-lg shadow-sm mb-8"
        />
        
        {/* Premium toggle */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="premium-only" 
              className="rounded text-real-600 focus:ring-real-500 h-4 w-4"
              checked={showPremiumOnly}
              onChange={(e) => setShowPremiumOnly(e.target.checked)}
            />
            <label htmlFor="premium-only" className="ml-2 text-sm font-medium">
              Show Premium Properties Only
            </label>
          </div>
        </div>

        {/* Featured Premium Properties */}
        {!showPremiumOnly && premiumProperties.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Featured Premium Properties</h2>
              <button 
                onClick={() => setShowPremiumOnly(true)}
                className="text-sm text-real-600 hover:underline"
              >
                View All Premium
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* All Properties or Filtered Results */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {showPremiumOnly ? "Premium Properties" : "All Properties"}
          </h2>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No properties found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            <div>
              {view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <PropertyTable properties={properties} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
