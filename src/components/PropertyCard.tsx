
import React from "react";
import { Property, formatCurrency } from "@/lib/mock-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import GroupInvestment from "./GroupInvestment";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 property-card-hover relative">
      {/* Premium badge if applicable */}
      {property.premium && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gold-500 hover:bg-gold-600">Premium</Badge>
        </div>
      )}

      <Link to={`/property/${property.id}`}>
        <div className="relative h-48 bg-muted">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <Badge
            className={`absolute top-3 right-3 ${
              property.status === "Available" ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {property.status}
          </Badge>
        </div>
      </Link>

      <CardContent className="pt-6">
        <div className="space-y-3">
          <Link to={`/property/${property.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.name}
            </h3>
          </Link>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          
          {property.tags && property.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {property.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Price per Fraction</p>
              <p className="font-medium text-gray-900">
                {formatCurrency(property.pricePerFraction)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Min Investment</p>
              <p className="font-medium text-gray-900">
                {formatCurrency(property.minimumInvestment)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex-col">
        <div className="flex items-center justify-between w-full border-t pt-4 mt-2 mb-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">
              {property.propertyType}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded">
            <TrendingUp className="h-3 w-3" />
            <span>{property.annualYield}% yield</span>
          </div>
        </div>
        
        {/* Group Investment button */}
        {property.status === "Available" && (
          <div className="w-full">
            <GroupInvestment property={property} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
