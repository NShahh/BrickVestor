
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties, formatCurrency, investInProperty } from "@/lib/mock-data";
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
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import RentalYieldCalculator from "@/components/RentalYieldCalculator";
import GroupInvestment from "@/components/GroupInvestment";
import RiskHeatmap from "@/components/RiskHeatmap";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const property = mockProperties.find((p) => p.id === id);
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState<boolean>(false);
  const [isInvesting, setIsInvesting] = useState<boolean>(false);

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
  
  const shareAvailabilityPercentage =
    property.totalShares && property.availableShares
      ? (property.availableShares / property.totalShares) * 100
      : 0;
  
  const handleInvestClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/property/${id}` } });
      return;
    }
    
    setIsInvestDialogOpen(true);
  };
  
  const handleInvestSubmit = () => {
    if (!investmentAmount || !property) return;
    
    const amount = parseFloat(investmentAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsInvesting(true);
    
    setTimeout(() => {
      const result = investInProperty(property.id, amount);
      
      if (result.success) {
        toast({
          title: "Investment successful",
          description: result.message
        });
        
        // Update local property state to reflect new available shares
        if (result.newAvailableShares !== undefined && property) {
          property.availableShares = result.newAvailableShares;
        }
        
        setIsInvestDialogOpen(false);
        setInvestmentAmount("");
      } else {
        toast({
          title: "Investment failed",
          description: result.message,
          variant: "destructive"
        });
      }
      
      setIsInvesting(false);
    }, 1000); // Simulate network request
  };

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
              <div className="h-64 md:h-96 bg-muted relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium tag if applicable */}
                {property.premium && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gold-500 hover:bg-gold-600 text-white">Premium</Badge>
                  </div>
                )}
                
                {/* Property tags if available */}
                {property.tags && property.tags.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/80 backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
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
                
                {/* Advanced Features section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Investment Tools</h2>
                  <div className="flex flex-wrap gap-3">
                    <RentalYieldCalculator selectedPropertyId={property.id} />
                    <RiskHeatmap />
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
                
                {/* Developer Info */}
                {property.developer && (
                  <>
                    <h2 className="text-xl font-semibold mb-4 mt-8">Developer</h2>
                    <div className="p-4 bg-slate-50 rounded-lg mb-6">
                      <p className="font-medium">{property.developer}</p>
                      <p className="text-sm text-gray-600 mt-1">Established Developer</p>
                    </div>
                  </>
                )}
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
                  
                  {property.sharePrice && (
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Share Price
                      </span>
                      <span className="text-sm font-semibold">
                        {formatCurrency(property.sharePrice)}
                      </span>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="mb-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Fractional Availability
                      </span>
                      <span className="text-sm">
                        {property.availableFractions} of {property.totalFractions}{" "}
                        fractions left
                      </span>
                    </div>
                    <Progress value={availabilityPercentage} className="h-2" />
                  </div>
                  
                  {property.sharePrice && property.totalShares && property.availableShares && (
                    <div className="mb-2 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Share Availability
                        </span>
                        <span className="text-sm">
                          {property.availableShares} of {property.totalShares}{" "}
                          shares left
                        </span>
                      </div>
                      <Progress value={shareAvailabilityPercentage} className="h-2" />
                    </div>
                  )}
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
                
                {/* Risk assessment */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Risk Assessment</h4>
                      <div className="flex items-center mt-1">
                        <div className={`h-2 w-2 rounded-full ${
                          property.location === "Mumbai" || property.location === "Bangalore" ? "bg-green-500" : 
                          property.location === "Pune" || property.location === "Kolkata" ? "bg-yellow-500" : "bg-red-500"
                        } mr-2`}></div>
                        <p className="text-sm">
                          {property.location === "Mumbai" || property.location === "Bangalore" ? "Low Risk" : 
                           property.location === "Pune" || property.location === "Kolkata" ? "Medium Risk" : "High Risk"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-3">
                <Button
                  className="w-full"
                  disabled={
                    property.status === "Sold Out" ||
                    property.availableFractions === 0
                  }
                  onClick={handleInvestClick}
                >
                  {property.status === "Available" &&
                  property.availableFractions > 0
                    ? "Invest Now"
                    : "Sold Out"}
                </Button>
                
                {property.status === "Available" && (
                  <GroupInvestment property={property} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Investment Dialog */}
      <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {property.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-3 rounded-md">
                <p className="text-sm text-gray-500">Share Price</p>
                <p className="font-semibold">{formatCurrency(property.sharePrice || property.pricePerFraction)}</p>
              </div>
              <div className="border p-3 rounded-md">
                <p className="text-sm text-gray-500">Available Shares</p>
                <p className="font-semibold">{property.availableShares || property.availableFractions}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Investment Amount (₹)</p>
              <Input
                type="number"
                placeholder="Enter amount"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
              
              {investmentAmount && (
                <p className="text-sm mt-2">
                  Buying approximately {Math.floor(parseFloat(investmentAmount) / (property.sharePrice || property.pricePerFraction))} shares
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleInvestSubmit} disabled={isInvesting}>
              {isInvesting ? "Processing..." : "Invest Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetail;
