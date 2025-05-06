
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface FilterSectionProps {
  locations: string[];
  onFilterChange: (filters: { location: string; minYield: number; maxYield: number }) => void;
  className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  locations, 
  onFilterChange,
  className = ""
}) => {
  const [location, setLocation] = useState<string>("");
  const [yieldRange, setYieldRange] = useState<[number, number]>([5, 15]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleYieldChange = (values: number[]) => {
    setYieldRange([values[0], values[1]]);
  };

  const applyFilters = () => {
    onFilterChange({
      location,
      minYield: yieldRange[0],
      maxYield: yieldRange[1],
    });
  };

  const resetFilters = () => {
    setLocation("");
    setYieldRange([5, 15]);
    onFilterChange({
      location: "",
      minYield: 5,
      maxYield: 15,
    });
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className={`${className} mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filter Properties</h2>
        <Button onClick={toggleFilters} variant="outline" size="sm" className="md:hidden">
          {isFiltersVisible ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
          {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className={`${isFiltersVisible ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="w-full p-2 border rounded-md border-input"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between">
              <Label htmlFor="yield-range">Annual Yield (%)</Label>
              <span className="text-sm text-gray-500">
                {yieldRange[0]}% - {yieldRange[1]}%
              </span>
            </div>
            <Slider
              defaultValue={yieldRange}
              min={0}
              max={20}
              step={0.5}
              onValueChange={handleYieldChange}
              className="py-4"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <Button
            onClick={applyFilters}
            className="flex-1 md:flex-none"
          >
            <Search className="h-4 w-4 mr-2" /> Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex-1 md:flex-none"
          >
            <X className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
