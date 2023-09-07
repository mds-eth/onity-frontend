export interface IProduct {
  id: number;
  title: string;
  product_code: string;
  type_product: string;
  price_net: number;
  price_gross: number;
  factor: string;
  ipi: number;
  status: boolean;
  file_path: string;
  created_at: string;
  updated_at: string;
}
