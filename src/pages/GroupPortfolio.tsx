
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  mockGroupPortfolios,
  getGroupPortfolioDetails, 
  formatCurrency,
  investInProperty,
  Property
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Search, Plus, TrendingUp, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";

const GroupPortfolio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [groupCode, setGroupCode] = useState("");
  const [activeGroup, setActiveGroup] = useState<any | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/group-portfolio" } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  
  const handleJoinGroup = () => {
    if (!groupCode) {
      toast({
        title: "Missing group code",
        description: "Please enter a valid group code",
        variant: "destructive"
      });
      return;
    }
    
    const groupDetails = getGroupPortfolioDetails(groupCode);
    
    if (!groupDetails) {
      toast({
        title: "Group not found",
        description: "No investment group found with that code",
        variant: "destructive"
      });
      return;
    }
    
    setActiveGroup(groupDetails);
    toast({
      title: "Group joined",
      description: `You are now viewing the ${groupDetails.name} portfolio`
    });
  };
  
  const handleInvestmentSubmit = () => {
    if (!selectedProperty || !investmentAmount || !activeGroup) return;
    
    const amount = parseFloat(investmentAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }
    
    const result = investInProperty(selectedProperty.id, amount, user.id, activeGroup.id);
    
    if (result.success) {
      toast({
        title: "Investment successful",
        description: result.message
      });
      
      // Update the active group with new data
      setActiveGroup(getGroupPortfolioDetails(activeGroup.id));
      setIsInvestDialogOpen(false);
      setInvestmentAmount("");
    } else {
      toast({
        title: "Investment failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };
  
  const calculateGrowth = (property: Property, totalShares: number): number => {
    // Mock growth calculation based on shares and property yield
    return property.annualYield * 1.2;
  };
  
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2">Group Portfolio</h1>
        <p className="text-gray-500 mb-8">
          Join or create investment groups to pool resources and invest together
        </p>
        
        <Tabs defaultValue={activeGroup ? "portfolio" : "join"}>
          <TabsList className="mb-8">
            <TabsTrigger value="join">Join Group</TabsTrigger>
            <TabsTrigger value="portfolio" disabled={!activeGroup}>Group Portfolio</TabsTrigger>
            <TabsTrigger value="members" disabled={!activeGroup}>Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="join">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Join an Investment Group</CardTitle>
                <CardDescription>Enter a group code to join an existing investment group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input 
                    placeholder="Enter group code" 
                    value={groupCode} 
                    onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                    className="max-w-xs"
                  />
                  <Button onClick={handleJoinGroup} className="gap-2">
                    <Search className="h-4 w-4" />
                    Join Group
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Available Groups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGroupPortfolios.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-real-600" /> 
                        {group.name}
                      </CardTitle>
                      <CardDescription>Code: {group.code}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{group.members.length} members</p>
                      <p className="text-sm">{group.investments.length} investments</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setGroupCode(group.code);
                          handleJoinGroup();
                        }}
                      >
                        Join This Group
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-real-600" /> 
                      Create New Group
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Start a new investment group and invite others to join</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Create Group</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {activeGroup && (
            <>
              <TabsContent value="portfolio">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{activeGroup.name}</h2>
                  <p className="text-gray-500 mb-6">Group code: {activeGroup.code}</p>
                  
                  {/* Group Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                      title="Total Investments"
                      value={formatCurrency(activeGroup.investments.reduce((total: number, inv: any) => total + inv.totalInvestment, 0))}
                      icon={<TrendingUp className="h-5 w-5 text-real-600" />}
                      description="Combined investment across all properties"
                    />
                    <StatCard
                      title="Total Members"
                      value={activeGroup.members.length.toString()}
                      icon={<Users className="h-5 w-5 text-real-600" />}
                      description="Number of investors in this group"
                    />
                    <StatCard
                      title="Investment Properties"
                      value={activeGroup.investments.length.toString()}
                      icon={<Building className="h-5 w-5 text-real-600" />}
                      description="Number of properties in portfolio"
                    />
                  </div>
                  
                  {/* Group Properties */}
                  <h3 className="text-xl font-bold mt-12 mb-6">Group Properties</h3>
                  
                  {activeGroup.investments.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-lg font-medium mb-2">No group investments yet</p>
                        <p className="text-gray-500 mb-6">
                          This group hasn't invested in any properties yet
                        </p>
                        <Button
                          onClick={() => navigate("/explore")}
                          className="px-4 py-2 bg-real-600 text-white rounded-md hover:bg-real-700"
                        >
                          Explore Properties
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeGroup.investments.map((item: any) => (
                        <div key={item.propertyId} className="flex flex-col h-full">
                          <PropertyCard property={item.property} />
                          <Card className="mt-4 border-t-4 border-real-500">
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Group Investment</p>
                                  <p className="font-semibold">
                                    {formatCurrency(item.totalInvestment)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Shares Owned</p>
                                  <p className="font-semibold">{item.totalShares}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Growth</p>
                                  <p className="font-semibold text-green-600">
                                    +{calculateGrowth(item.property, item.totalShares).toFixed(2)}%
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
                            <CardFooter>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                  setSelectedProperty(item.property);
                                  setIsInvestDialogOpen(true);
                                }}
                              >
                                Add Investment
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>Group Members</CardTitle>
                    <CardDescription>Members of {activeGroup.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeGroup.members.map((member: any) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                          {member.id === user.id && <span className="text-xs bg-real-100 text-real-800 px-2 py-1 rounded-full">You</span>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Invite New Member</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
        
        {/* Investment Dialog */}
        {selectedProperty && (
          <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invest in {selectedProperty.name}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <p className="text-sm text-gray-500">Share Price</p>
                    <p className="font-semibold">{formatCurrency(selectedProperty.sharePrice || 0)}</p>
                  </div>
                  <div className="border p-3 rounded-md">
                    <p className="text-sm text-gray-500">Available Shares</p>
                    <p className="font-semibold">{selectedProperty.availableShares || 0} shares</p>
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
                  
                  {investmentAmount && selectedProperty.sharePrice && (
                    <p className="text-sm mt-2">
                      Buying approximately {Math.floor(parseFloat(investmentAmount) / (selectedProperty.sharePrice || 1))} shares
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInvestDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleInvestmentSubmit}>Invest Now</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default GroupPortfolio;
