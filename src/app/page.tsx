"use client";
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function HomePage() {
  const [me, setMe] = useState<any | null>(null);

  useEffect(() => {
    api<any>('/auth/me').then(setMe).catch(() => setMe(null));
  }, []);

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      localStorage.removeItem('access_token');
      setMe(null);
    }
  };

  return (
    <div>
      <h1>Trang chủ</h1>
      {me ? (
        <>
          <p>Xin chào, {me.email}</p>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <>
          <p>Bạn có thể xem tin tức và sản phẩm mà không cần đăng nhập.</p>
          <ul>
            <li><a href="/news">Xem tin tức</a></li>
            <li><a href="/products">Xem sản phẩm</a></li>
          </ul>
        </>
      )}
    </div>
  );
}
