
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Portfolio from "./pages/Portfolio";
import GroupPortfolio from "./pages/GroupPortfolio";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

// Initialize Query Client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/group-portfolio" element={<GroupPortfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

<footer className="w-full text-center text-gray-500 py-4 text-sm">
  Made by <span className="text-blue-600 font-medium">Naman</span> —
  <a href="https://www.linkedin.com/in/YOUR-LINKEDIN-ID" target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-500">
    Connect on LinkedIn
  </a>
</footer>

export default App;
