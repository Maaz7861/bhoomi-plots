/**
 * Centralized API client for Admin Portal (unified my-app version).
 * API_BASE_URL is just '/api' since backend is same-origin.
 */

export const API_BASE_URL = '/api';

// ── Auth Token Helpers ─────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('bhoomi_admin_token');
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bhoomi_admin_token', token);
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('bhoomi_admin_token');
  localStorage.removeItem('bhoomi_admin_user');
}

export function getAdminUser(): { name: string; email: string; role: string } | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('bhoomi_admin_user');
  return user ? JSON.parse(user) : null;
}

export function setAdminUser(user: { name: string; email: string; role: string }): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bhoomi_admin_user', JSON.stringify(user));
}

function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Auth API ──────────────────────────────────────────────────

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }

  setToken(data.token);
  if (data.admin) {
    setAdminUser(data.admin);
  }

  return data;
}

// ── Plots API ─────────────────────────────────────────────────

export interface PlotData {
  _id?: string;
  title: string;
  category: 'plots' | 'land' | 'residential' | 'commercial';
  price: string;
  priceRange?: string;
  bhk?: string;
  location: string;
  description: string;
  features?: string;
  status: string;
  reraNumber?: string;
  developer?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  createdAt?: string;
}

export async function getPlots(category?: string): Promise<PlotData[]> {
  const url = category ? `${API_BASE_URL}/plots?category=${category}` : `${API_BASE_URL}/plots`;
  const res = await fetch(url, { headers: getAuthHeaders(), cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch plots.');
  }
  return data.data || [];
}

export async function getPlot(id: string): Promise<PlotData> {
  const res = await fetch(`${API_BASE_URL}/plots/${id}`, { headers: getAuthHeaders() });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch plot.');
  }
  return data.data;
}

export async function createPlot(plot: Omit<PlotData, '_id' | 'createdAt'>): Promise<PlotData> {
  const res = await fetch(`${API_BASE_URL}/plots`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(plot),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create plot.');
  }
  return data.data;
}

export async function updatePlot(id: string, plot: Partial<PlotData>): Promise<PlotData> {
  const res = await fetch(`${API_BASE_URL}/plots/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(plot),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update plot.');
  }
  return data.data;
}

export async function deletePlot(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/plots/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete plot.');
  }
}

// ── Banners API ───────────────────────────────────────────────

export interface BannerData {
  _id?: string;
  imageUrl: string;
  ctaText?: string;
  link?: string;
  isActive: boolean;
  createdAt?: string;
}

export async function getBanners(): Promise<BannerData[]> {
  const res = await fetch(`${API_BASE_URL}/banners`, { headers: getAuthHeaders(), cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch banners.');
  }
  return data.data || [];
}

export async function getActiveBanner(): Promise<BannerData | null> {
  const res = await fetch(`${API_BASE_URL}/banners/active`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch active banner.');
  }
  return data.data || null;
}

export async function createBanner(banner: Omit<BannerData, '_id' | 'createdAt'>): Promise<BannerData> {
  const res = await fetch(`${API_BASE_URL}/banners`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(banner),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create banner.');
  }
  return data.data;
}

export async function updateBanner(id: string, banner: Partial<BannerData>): Promise<BannerData> {
  const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(banner),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update banner.');
  }
  return data.data;
}

export async function deleteBanner(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete banner.');
  }
}

// ── Upload API ────────────────────────────────────────────────

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Image upload failed.');
  }

  return data.url;
}
