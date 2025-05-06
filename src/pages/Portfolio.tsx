
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getUserPortfolioWithDetails, 
  calculateTotalInvestment, 
  calculateCurrentValue,
  calculateProjectedReturns, 
  formatCurrency,
  investInProperty 
} from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import StatCard from "@/components/StatCard";
import { TrendingUp, DollarSign, Wallet, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Portfolio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const portfolioItems = getUserPortfolioWithDetails();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/portfolio" } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const totalInvestment = calculateTotalInvestment();
  const currentValue = calculateCurrentValue();
  const projectedAnnualReturns = calculateProjectedReturns();
  
  const portfolioGrowth = ((currentValue - totalInvestment) / totalInvestment) * 100;

  const handleInvest = (propertyId: string, amount: number) => {
    const result = investInProperty(propertyId, amount);
    
    if (result.success) {
      toast({
        title: "Investment successful",
        description: result.message
      });
    } else {
      toast({
        title: "Investment failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
        <p className="text-gray-500 mb-4">
          Track and manage your property investments
        </p>

        <div className="flex justify-between items-center mb-8">
          <div></div> {/* Empty div for flexbox spacing */}
          <Link to="/group-portfolio">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              View Group Portfolio
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Invested"
            value={formatCurrency(totalInvestment)}
            icon={<Wallet className="h-5 w-5 text-real-600" />}
            description="Current investment across all properties"
          />
          <StatCard
            title="Current Portfolio Value"
            value={formatCurrency(currentValue)}
            icon={<DollarSign className="h-5 w-5 text-real-600" />}
            trend={{
              value: parseFloat(portfolioGrowth.toFixed(2)),
              isPositive: portfolioGrowth > 0,
            }}
          />
          <StatCard
            title="Projected Annual Returns"
            value={formatCurrency(projectedAnnualReturns)}
            icon={<TrendingUp className="h-5 w-5 text-real-600" />}
            description="Based on current yield rates"
          />
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">My Properties</h2>
        
        {portfolioItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium mb-2">No investments yet</p>
              <p className="text-gray-500 mb-6">
                Start investing in properties to build your portfolio
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="px-4 py-2 bg-real-600 text-white rounded-md hover:bg-real-700"
              >
                Explore Properties
              </button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.propertyId} className="flex flex-col h-full">
                  <PropertyCard property={item.property} />
                  <Card className="mt-4 border-t-4 border-real-500">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Your Investment</p>
                          <p className="font-semibold">
                            {formatCurrency(item.investmentAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{item.sharesOwned ? "Shares Owned" : "Fractions Owned"}</p>
                          <p className="font-semibold">{item.sharesOwned || item.fractionsOwned}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Value</p>
                          <p className="font-semibold">
                            {formatCurrency(item.currentValue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Purchase Date</p>
                          <p className="font-semibold">
                            {new Date(item.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
