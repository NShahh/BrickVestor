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
  premium?: boolean;
  tags?: string[];
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
    image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace',
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
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833',
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
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
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
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552',
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
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840',
    description: 'Elegant apartment complex with a scenic view of the river.',
    totalFractions: 120,
    availableFractions: 80,
    area: 1500,
    amenities: ['Riverside View', 'Parking', 'Community Hall', 'Gym'],
    rentalIncome: 18000,
    propertyType: 'Residential'
  },
  // Premium Properties
  {
    id: '6',
    name: 'Oberoi Enclave Penthouse',
    location: 'Mumbai',
    pricePerFraction: 120000,
    minimumInvestment: 240000,
    annualYield: 11.2,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    description: 'Exclusive penthouse in South Mumbai with panoramic sea views and luxury finishes.',
    totalFractions: 40,
    availableFractions: 15,
    area: 4800,
    amenities: ['Private Terrace', 'Infinity Pool', 'Smart Home System', 'Private Elevator', 'Wine Cellar'],
    rentalIncome: 180000,
    propertyType: 'Residential',
    premium: true,
    tags: ['Luxury', 'Sea View', 'Penthouse']
  },
  {
    id: '7',
    name: 'Platinum Business Hub',
    location: 'Bangalore',
    pricePerFraction: 85000,
    minimumInvestment: 170000,
    annualYield: 13.5,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
    description: 'Grade A commercial space in Bangalore\'s financial district with premium amenities.',
    totalFractions: 100,
    availableFractions: 42,
    area: 12000,
    amenities: ['Helipad', 'Executive Lounges', 'Conference Center', '5G Infrastructure', 'Green Building Certification'],
    rentalIncome: 320000,
    propertyType: 'Commercial',
    premium: true,
    tags: ['Grade A Commercial', 'Financial District', 'Green Building']
  },
  {
    id: '8',
    name: 'Aralias Residence',
    location: 'Gurgaon',
    pricePerFraction: 95000,
    minimumInvestment: 190000,
    annualYield: 9.8,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    description: 'Ultra-luxury condominium in Gurgaon\'s prestigious Golf Course Road with premium amenities.',
    totalFractions: 80,
    availableFractions: 25,
    area: 3600,
    amenities: ['Golf Course Access', 'Private Cinema', 'Temperature-Controlled Pool', 'Concierge Service', 'Spa Center'],
    rentalIncome: 145000,
    propertyType: 'Residential',
    premium: true,
    tags: ['Gated Community', 'Golf Course View', 'Ultra Luxury']
  },
  {
    id: '9',
    name: 'Heritage Haveli Collection',
    location: 'Jaipur',
    pricePerFraction: 70000,
    minimumInvestment: 140000,
    annualYield: 10.5,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    description: 'Restored heritage properties in Jaipur converted into luxury boutique hotels.',
    totalFractions: 60,
    availableFractions: 30,
    area: 8500,
    amenities: ['Heritage Architecture', 'Cultural Experiences', 'Luxury Hospitality', 'Tourism Potential', 'Rooftop Dining'],
    rentalIncome: 210000,
    propertyType: 'Mixed Use',
    premium: true,
    tags: ['Heritage Property', 'Hospitality', 'Tourism']
  },
  {
    id: '10',
    name: 'Bay View Skyscraper',
    location: 'Chennai',
    pricePerFraction: 110000,
    minimumInvestment: 220000,
    annualYield: 12.2,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace',
    description: 'Mixed-use skyscraper in Chennai\'s seafront with residential and commercial spaces.',
    totalFractions: 120,
    availableFractions: 60,
    area: 25000,
    amenities: ['Sea View', 'Retail Space', 'Fine Dining', 'Executive Offices', 'Fitness Center'],
    rentalIncome: 280000,
    propertyType: 'Mixed Use',
    premium: true,
    tags: ['Skyscraper', 'Seafront', 'Mixed Use']
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

// New helper function to get premium properties
export const getPremiumProperties = (): Property[] => {
  return mockProperties.filter(property => property.premium);
};
