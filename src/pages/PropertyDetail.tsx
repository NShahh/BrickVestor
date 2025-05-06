
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties, formatCurrency } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Home,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Property Not Found</CardTitle>
            <CardDescription>
              The property you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/explore")}>
              Back to Explore
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const availabilityPercentage =
    (property.availableFractions / property.totalFractions) * 100;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container px-4 py-8 mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="h-64 md:h-96 bg-muted">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{property.name}</h1>
                    <div className="flex items-center mt-1 text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <Badge
                    className={`mt-2 md:mt-0 ${
                      property.status === "Available"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>

                <Separator className="my-6" />

                <h2 className="text-xl font-semibold mb-4">About This Property</h2>
                <p className="text-gray-700 mb-6">{property.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building className="h-4 w-4 mr-1 text-real-600" />
                      <span className="text-sm text-gray-600">Type</span>
                    </div>
                    <p className="font-medium">{property.propertyType}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Home className="h-4 w-4 mr-1 text-real-600" />
                      <span className="text-sm text-gray-600">Area</span>
                    </div>
                    <p className="font-medium">{property.area} sq ft</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 mr-1 text-real-600" />
                      <span className="text-sm text-gray-600">Annual Yield</span>
                    </div>
                    <p className="font-medium">{property.annualYield}%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 mr-1 text-real-600" />
                      <span className="text-sm text-gray-600">Rental Income</span>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(property.rentalIncome)}/mo
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-slate-50 rounded-md text-sm"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>
                  Start investing in this property today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Price per Fraction
                    </span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(property.pricePerFraction)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Minimum Investment
                    </span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(property.minimumInvestment)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Annual Yield
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {property.annualYield}%
                    </span>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Availability
                      </span>
                      <span className="text-sm">
                        {property.availableFractions} of {property.totalFractions}{" "}
                        fractions left
                      </span>
                    </div>
                    <Progress value={availabilityPercentage} className="h-2" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">
                        Projected Returns
                      </h4>
                      <p className="text-sm text-green-700">
                        Invest {formatCurrency(property.minimumInvestment)} and
                        get approximately{" "}
                        {formatCurrency(
                          (property.minimumInvestment * property.annualYield) / 100
                        )}{" "}
                        annually
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={
                    property.status === "Sold Out" ||
                    property.availableFractions === 0
                  }
                >
                  {property.status === "Available" &&
                  property.availableFractions > 0
                    ? "Invest Now"
                    : "Sold Out"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
