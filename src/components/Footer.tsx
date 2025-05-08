import React from "react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">Designed and Developed by Naman.</p>
          <a 
            href="https://www.linkedin.com/in/namandedhia" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "ml-2 p-1 rounded-md",
              "hover:bg-gray-100 transition-colors"
            )}
            aria-label="LinkedIn"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
              alt="LinkedIn logo" 
              className="h-5 w-5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
