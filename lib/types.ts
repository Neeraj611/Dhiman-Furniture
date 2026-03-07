export type Category = 'Living Room' | 'Bedroom' | 'Office';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
  };
  materials: string[];
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
