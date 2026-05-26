import axios from 'axios';
import Cookies from 'js-cookie';
import { mockTransactions, mockAnalytics } from './mockData';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('nova_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock implementations (replace with real API calls later)
export const getTransactions = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTransactions;
};

export const getAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAnalytics;
};

export const login = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (email === 'demo@novapay.com' && password === 'demo123') {
    return {
      token: 'mock-jwt-token',
      user: { id: '1', name: 'Demo User', email: 'demo@novapay.com' }
    };
  }
  throw new Error('Invalid credentials');
};

export const register = async (name: string, email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    token: 'mock-jwt-token',
    user: { id: Date.now().toString(), name, email }
  };
};

export default api;