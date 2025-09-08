const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

async function refreshToken(): Promise<string | null> {
  if (isRefreshing) {
    await new Promise<void>((resolve) => refreshQueue.push(resolve));
    return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  }
  isRefreshing = true;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof window !== 'undefined' && data?.access_token) {
      localStorage.setItem('access_token', data.access_token);
      return data.access_token as string;
    }
    return null;
  } finally {
    isRefreshing = false;
    refreshQueue.forEach((fn) => fn());
    refreshQueue = [];
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const doFetch = async (): Promise<Response> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      credentials: 'include',
      cache: 'no-store',
    });
  };

  let res = await doFetch();
  if (res.status === 401) {
    // attempt refresh and retry once
    const newToken = await refreshToken();
    if (newToken) {
      res = await doFetch();
    } else {
      if (typeof window !== 'undefined') localStorage.removeItem('access_token');
    }
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
