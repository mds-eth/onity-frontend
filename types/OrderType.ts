export interface IOrders {
  id: number;
  hotel: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  cnpj: string;
  icms: boolean;
  orders: IProduct[];
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  ipi: number;
  slug: string;
  title: string;
  factor: string;
  status: boolean;
  quantity: number;
  file_path: string;
  price_net: number;
  created_at: string;
  updated_at: string;
  price_gross: number;
  product_code: string;
  type_product: string;
}
