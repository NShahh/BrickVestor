
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building, ChevronRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <div className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="p-3 rounded-full bg-real-100">
              <Building className="h-6 w-6 text-real-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Invest in Premium Real Estate
              <span className="text-real-600"> Fractions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-[800px]">
              Own a piece of high-value properties with minimal investment. Get
              started with PropFolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/explore">
                <Button size="lg" className="gap-2">
                  Explore Properties <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button size="lg" variant="outline">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-lg bg-blue-100 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Minimal Investment</h3>
                <p className="text-gray-600">
                  Start investing with as little as ₹40,000 and own a portion of
                  premium real estate properties.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-lg bg-green-100 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Passive Income</h3>
                <p className="text-gray-600">
                  Earn regular rental income from your property investments
                  without any property management hassles.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-lg bg-purple-100 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Diversified Portfolio</h3>
                <p className="text-gray-600">
                  Spread your investment across multiple properties to minimize
                  risk and maximize returns.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">How Fractional Real Estate Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-real-100 flex items-center justify-center text-real-600 font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="font-medium mb-2">Browse Properties</h3>
                  <p className="text-gray-600 text-sm">
                    Explore our curated selection of premium real estate
                    investment opportunities.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-real-100 flex items-center justify-center text-real-600 font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="font-medium mb-2">Purchase Fractions</h3>
                  <p className="text-gray-600 text-sm">
                    Buy fractions of properties that match your investment goals
                    and budget.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-real-100 flex items-center justify-center text-real-600 font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="font-medium mb-2">Earn Returns</h3>
                  <p className="text-gray-600 text-sm">
                    Receive your share of rental income and potential property
                    value appreciation.
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <Link to="/explore">
                  <Button>Start Exploring</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
