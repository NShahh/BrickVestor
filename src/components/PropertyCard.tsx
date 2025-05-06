
import React from "react";
import { Property, formatCurrency } from "@/lib/mock-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-300 property-card-hover">
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
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.name}
            </h3>
            
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
            
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
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full border-t pt-4 mt-2">
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
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
