export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  in_stock: boolean;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Story {
  id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  pdf_url?: string;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GalleryImage {
  id: string;
  title?: string;
  image_url: string;
  description?: string;
  category?: string;
  display_order: number;
  created_at: Date;
}

export interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  name?: string;
  price?: number;
  image_url?: string;
  created_at: Date;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  total_amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at: Date;
}

