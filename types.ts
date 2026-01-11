export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  category: string;
  image?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export type Category = 'burgers' | 'combos' | 'bebidas' | 'sobremesas' | 'ai-studio';

export interface MenuData {
  burgers: Product[];
  combos: Product[];
  bebidas: Product[];
  sobremesas: Product[];
}