export interface IProduct {
  id: any;
  title: string;
  product_code: string;
  type_product: string;
  price_net: number;
  price_gross: number;
  factor: string;
  status: boolean;
  slug: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  quantity?: any;
}
