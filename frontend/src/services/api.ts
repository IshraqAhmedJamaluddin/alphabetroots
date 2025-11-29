import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart
export const getCart = async (sessionId: string) => {
  const response = await api.get(`/cart/${sessionId}`);
  return response.data;
};

export const addToCart = async (sessionId: string, productId: string, quantity: number = 1) => {
  const response = await api.post(`/cart/${sessionId}`, { productId, quantity });
  return response.data;
};

export const updateCartItem = async (sessionId: string, itemId: string, quantity: number) => {
  const response = await api.put(`/cart/${sessionId}/${itemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (sessionId: string, itemId: string) => {
  const response = await api.delete(`/cart/${sessionId}/${itemId}`);
  return response.data;
};

export const clearCart = async (sessionId: string) => {
  const response = await api.delete(`/cart/${sessionId}`);
  return response.data;
};

// Stories
export const getStories = async (featured?: boolean) => {
  const params = featured ? { featured: 'true' } : {};
  const response = await api.get('/stories', { params });
  return response.data;
};

export const getStory = async (id: string) => {
  const response = await api.get(`/stories/${id}`);
  return response.data;
};

// Gallery
export const getGalleryImages = async (category?: string) => {
  const params = category ? { category } : {};
  const response = await api.get('/gallery', { params });
  return response.data;
};

// Contact
export const submitContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  const response = await api.post('/contact', data);
  return response.data;
};

// Orders
export const createOrder = async (data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: Array<{ productId: string; quantity: number }>;
  sessionId?: string;
}) => {
  const response = await api.post('/orders', data);
  return response.data;
};

export const getOrder = async (orderNumber: string) => {
  const response = await api.get(`/orders/${orderNumber}`);
  return response.data;
};

// Session ID helper
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

