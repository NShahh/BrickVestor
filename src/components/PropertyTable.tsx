
import React from "react";
import { Property, formatCurrency } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface PropertyTableProps {
  properties: Property[];
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
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
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{property.name}</TableCell>
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
