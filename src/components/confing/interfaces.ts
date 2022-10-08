export interface Good {
  img: string;
  title: string;
  categories: string;
  values: number;
  year: number;
  cart: number;
  color: string;
  brand: string;
  price: number;
  description: string;
  size?: string;
  numberOfShelfs?: number;
  shelf?: number;
}

export interface LocalOptions {
  sort: string;
  categorie: string;
  items: Good[];
  price: [number, number];
  year: [number, number];
  value: [number, number];
  brands: string[];
  colors: string[];
}
