
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property, formatCurrency } from "@/lib/mock-data";
import { Copy, Share2, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupInvestmentProps {
  property: Property;
}

interface GroupMember {
  id: string;
  name: string;
  amount: number;
  joinedAt: Date;
}

const GroupInvestment: React.FC<GroupInvestmentProps> = ({ property }) => {
  const [groupName, setGroupName] = useState("");
  const [investmentCode, setInvestmentCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [activeGroup, setActiveGroup] = useState<{
    id: string;
    name: string;
    members: GroupMember[];
    totalCommitted: number;
    deadline: Date;
  } | null>(null);
  const { toast } = useToast();

  // Generate a random investment code
  const generateInvestmentCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInvestmentCode(randomCode);
    return randomCode;
  };

  // Create new investment group
  const handleCreateGroup = () => {
    if (!groupName) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your investment group",
        variant: "destructive",
      });
      return;
    }

    const code = generateInvestmentCode();
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 14); // 2 weeks from now

    // Create new group with current user as first member
    setActiveGroup({
      id: `group-${Date.now()}`,
      name: groupName,
      members: [
        {
          id: "user-1",
          name: "You",
          amount: property.minimumInvestment,
          joinedAt: new Date(),
        },
      ],
      totalCommitted: property.minimumInvestment,
      deadline: deadline,
    });

    toast({
      title: "Group Created!",
      description: `Your investment group ${groupName} has been created successfully.`,
    });
  };

  // Handle joining a group
  const handleJoinGroup = () => {
    if (!joinCode) {
      toast({
        title: "Enter code",
        description: "Please enter a valid investment code",
        variant: "destructive",
      });
      return;
    }

    // Mock joining the group - in reality this would validate against backend
    if (joinCode === investmentCode && activeGroup) {
      const newMember: GroupMember = {
        id: `user-${activeGroup.members.length + 1}`,
        name: `Investor ${activeGroup.members.length + 1}`,
        amount: property.minimumInvestment,
        joinedAt: new Date(),
      };

      setActiveGroup({
        ...activeGroup,
        members: [...activeGroup.members, newMember],
        totalCommitted: activeGroup.totalCommitted + property.minimumInvestment,
      });

      toast({
        title: "Joined Group!",
        description: `You have successfully joined the investment group ${activeGroup.name}.`,
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "The investment code you entered is invalid.",
        variant: "destructive",
      });
    }
  };

  // Handle copying the invitation code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(investmentCode);
    toast({
      title: "Copied!",
      description: "Investment code copied to clipboard",
    });
  };

  // Calculate progress towards minimum investment
  const calculateProgress = (): number => {
    if (!activeGroup) return 0;
    return Math.min((activeGroup.totalCommitted / 50000) * 100, 100);
  };

  // Format date as string
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Co-Invest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Group Investment for {property.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeGroup ? "status" : "create"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create/Join Group</TabsTrigger>
            <TabsTrigger value="status" disabled={!activeGroup}>
              Group Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Create a new investment group</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <Button onClick={handleCreateGroup} className="w-full mt-2">
                  Create Group
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="join-code">Join an existing group</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="join-code"
                    placeholder="Enter investment code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={handleJoinGroup}>Join</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            {activeGroup && (
              <div className="space-y-4 py-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">{activeGroup.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-sm text-slate-500">Invitation Code:</p>
                    <code className="bg-slate-200 px-2 py-1 rounded text-sm font-mono">
                      {investmentCode}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Investment Progress</p>
                    <p className="text-sm text-slate-500">
                      {formatCurrency(activeGroup.totalCommitted)} of {formatCurrency(50000)}
                    </p>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-real-600 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Investment Deadline: {formatDate(activeGroup.deadline)}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Group Members ({activeGroup.members.length})</h4>
                  <div className="border rounded-lg divide-y">
                    {activeGroup.members.map((member) => (
                      <div key={member.id} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-slate-500">
                            Joined {formatDate(member.joinedAt)}
                          </p>
                        </div>
                        <p className="font-medium">{formatCurrency(member.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleCopyCode} className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Code
                  </Button>
                  <Button
                    disabled={activeGroup.totalCommitted < 50000}
                    className="gap-2"
                  >
                    {activeGroup.totalCommitted >= 50000
                      ? "Complete Investment"
                      : `₹${50000 - activeGroup.totalCommitted} more needed`}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInvestment;
