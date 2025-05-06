
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProperties, Property, formatCurrency } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator } from "lucide-react";

interface RentalYieldCalculatorProps {
  selectedPropertyId?: string;
}

const RentalYieldCalculator: React.FC<RentalYieldCalculatorProps> = ({ selectedPropertyId }) => {
  const [investment, setInvestment] = useState<number>(100000);
  const [duration, setDuration] = useState<number>(12);
  const [durationType, setDurationType] = useState<"months" | "years">("months");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Initialize with selected property if provided
  useEffect(() => {
    if (selectedPropertyId) {
      const property = mockProperties.find(p => p.id === selectedPropertyId);
      if (property) setSelectedProperty(property);
    }
  }, [selectedPropertyId]);

  // Calculate returns when inputs change
  useEffect(() => {
    if (!selectedProperty) return;
    
    const months = durationType === "years" ? duration * 12 : duration;
    const data = [];
    
    const monthlyReturn = (investment * (selectedProperty.annualYield / 100)) / 12;
    let cumulativeReturn = 0;
    
    for (let i = 0; i <= months; i++) {
      cumulativeReturn = monthlyReturn * i;
      data.push({
        month: i,
        returns: investment + cumulativeReturn
      });
    }
    
    setChartData(data);
  }, [investment, duration, durationType, selectedProperty]);

  const calculateMonthlyRentalIncome = (): number => {
    if (!selectedProperty) return 0;
    return (investment * (selectedProperty.annualYield / 100)) / 12;
  };

  const calculateTotalReturns = (): number => {
    if (!selectedProperty) return 0;
    const months = durationType === "years" ? duration * 12 : duration;
    const monthlyReturn = (investment * (selectedProperty.annualYield / 100)) / 12;
    return investment + (monthlyReturn * months);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calculator className="h-4 w-4" />
          Rental Yield Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Rental Yield Calculator</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="investment" className="text-right">
              Investment (₹)
            </Label>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="col-span-2"
            />
            <Select
              value={durationType}
              onValueChange={(value: "months" | "years") => setDurationType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="property" className="text-right">
              Property
            </Label>
            <div className="col-span-3">
              <Select
                value={selectedProperty?.id || ""}
                onValueChange={(value) => {
                  const property = mockProperties.find(p => p.id === value);
                  setSelectedProperty(property || null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name} ({property.annualYield}% yield)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedProperty && (
            <>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-medium text-sm text-slate-500">Monthly Rental Income</h3>
                    <p className="text-xl font-bold text-real-600">
                      {formatCurrency(calculateMonthlyRentalIncome())}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-medium text-sm text-slate-500">Total Returns</h3>
                    <p className="text-xl font-bold text-real-600">
                      {formatCurrency(calculateTotalReturns())}
                    </p>
                  </div>
                </div>
                
                <div className="h-64 mt-6 bg-slate-50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        label={{ 
                          value: durationType === "years" ? "Years" : "Months", 
                          position: "insideBottom", 
                          offset: -5 
                        }} 
                      />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value/1000)}k`}
                        label={{ 
                          value: "Amount (₹)", 
                          angle: -90, 
                          position: "insideLeft",
                          style: { textAnchor: "middle" }
                        }}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, "Value"]}
                        labelFormatter={(label) => `Month ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="returns"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalYieldCalculator;
