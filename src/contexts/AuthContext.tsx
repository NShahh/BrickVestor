
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would validate credentials with your backend
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    
    const newUser = { id: "1", email, name: email.split("@")[0] };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Mock signup function
  const signup = async (email: string, name: string, password: string) => {
    // Simulate API call delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would create a new user in your backend
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error("Password must be at least 6 characters");
    }
    
    const newUser = { id: "1", email, name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
