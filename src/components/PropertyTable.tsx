
import React from "react";
import { Property, formatCurrency } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyTableProps {
  properties: Property[];
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  const navigate = useNavigate();
  
  const handleRowClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price per Fraction (₹)</TableHead>
            <TableHead>Min Investment</TableHead>
            <TableHead>Annual Yield (%)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow 
              key={property.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(property.id)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <span>{property.name}</span>
                  {property.premium && (
                    <Badge className="bg-gold-500 hover:bg-gold-600">Premium</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{formatCurrency(property.pricePerFraction)}</TableCell>
              <TableCell>{formatCurrency(property.minimumInvestment)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1 text-green-700">
                  <TrendingUp className="h-3 w-3" />
                  <span>{property.annualYield}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    property.status === "Available" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell>{property.propertyType}</TableCell>
              <TableCell>
                <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyTable;
