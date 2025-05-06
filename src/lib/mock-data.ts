
export interface Property {
  id: string;
  name: string;
  location: string;
  pricePerFraction: number;
  minimumInvestment: number;
  annualYield: number;
  status: 'Available' | 'Sold Out';
  image: string;
  description: string;
  totalFractions: number;
  availableFractions: number;
  area: number; // in sq. ft.
  amenities: string[];
  rentalIncome: number; // monthly expected rental income
  propertyType: 'Residential' | 'Commercial' | 'Mixed Use';
}

export interface PortfolioItem {
  propertyId: string;
  investmentAmount: number;
  fractionsOwned: number;
  purchaseDate: string;
  currentValue: number;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Heights Apartment',
    location: 'Mumbai',
    pricePerFraction: 25000,
    minimumInvestment: 50000,
    annualYield: 8.5,
    status: 'Available',
    image: '/placeholder.svg',
    description: 'Luxurious apartment complex in the heart of Mumbai with stunning sea views.',
    totalFractions: 100,
    availableFractions: 45,
    area: 1200,
    amenities: ['Swimming Pool', 'Gym', 'Security', '24/7 Power Backup'],
    rentalIncome: 25000,
    propertyType: 'Residential'
  },
  {
    id: '2',
    name: 'Tech Park Office Space',
    location: 'Bangalore',
    pricePerFraction: 35000,
    minimumInvestment: 70000,
    annualYield: 10.2,
    status: 'Available',
    image: '/placeholder.svg',
    description: 'Premium office space in Bangalore\'s tech corridor with modern infrastructure.',
    totalFractions: 200,
    availableFractions: 120,
    area: 3500,
    amenities: ['Conference Rooms', 'High-speed Internet', 'Cafeteria', 'Parking'],
    rentalIncome: 45000,
    propertyType: 'Commercial'
  },
  {
    id: '3',
    name: 'Green Valley Villa',
    location: 'Pune',
    pricePerFraction: 40000,
    minimumInvestment: 80000,
    annualYield: 7.8,
    status: 'Sold Out',
    image: '/placeholder.svg',
    description: 'Spacious villa in a gated community surrounded by lush greenery.',
    totalFractions: 50,
    availableFractions: 0,
    area: 2800,
    amenities: ['Garden', 'Club House', 'Children\'s Play Area', 'Jogging Track'],
    rentalIncome: 35000,
    propertyType: 'Residential'
  },
  {
    id: '4',
    name: 'City Center Mall Space',
    location: 'Delhi',
    pricePerFraction: 50000,
    minimumInvestment: 100000,
    annualYield: 12.0,
    status: 'Available',
    image: '/placeholder.svg',
    description: 'Retail space in a busy shopping center with high footfall.',
    totalFractions: 150,
    availableFractions: 30,
    area: 5000,
    amenities: ['Air Conditioning', 'Escalators', 'Food Court Proximity', 'Security'],
    rentalIncome: 85000,
    propertyType: 'Commercial'
  },
  {
    id: '5',
    name: 'Riverside Residency',
    location: 'Kolkata',
    pricePerFraction: 20000,
    minimumInvestment: 40000,
    annualYield: 9.5,
    status: 'Available',
    image: '/placeholder.svg',
    description: 'Elegant apartment complex with a scenic view of the river.',
    totalFractions: 120,
    availableFractions: 80,
    area: 1500,
    amenities: ['Riverside View', 'Parking', 'Community Hall', 'Gym'],
    rentalIncome: 18000,
    propertyType: 'Residential'
  }
];

export const userPortfolio: PortfolioItem[] = [
  {
    propertyId: '1',
    investmentAmount: 100000,
    fractionsOwned: 4,
    purchaseDate: '2023-06-15',
    currentValue: 110000
  },
  {
    propertyId: '3',
    investmentAmount: 200000,
    fractionsOwned: 5,
    purchaseDate: '2023-02-10',
    currentValue: 230000
  },
  {
    propertyId: '4',
    investmentAmount: 150000,
    fractionsOwned: 3,
    purchaseDate: '2023-09-22',
    currentValue: 165000
  }
];

export const getUserPortfolioWithDetails = (): (PortfolioItem & { property: Property })[] => {
  return userPortfolio.map(item => {
    const property = mockProperties.find(p => p.id === item.propertyId)!;
    return {
      ...item,
      property
    };
  });
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const calculateTotalInvestment = (): number => {
  return userPortfolio.reduce((total, item) => total + item.investmentAmount, 0);
};

export const calculateCurrentValue = (): number => {
  return userPortfolio.reduce((total, item) => total + item.currentValue, 0);
};

export const calculateProjectedReturns = (): number => {
  return userPortfolio.reduce((total, item) => {
    const property = mockProperties.find(p => p.id === item.propertyId);
    if (property) {
      return total + (item.investmentAmount * property.annualYield / 100);
    }
    return total;
  }, 0);
};
