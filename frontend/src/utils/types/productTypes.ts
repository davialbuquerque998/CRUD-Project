export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
};

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
};

