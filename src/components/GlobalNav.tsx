"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { useAuthStore } from '@/lib/auth-store';

export function GlobalNav() {
  const [open, setOpen] = useState(false);
  const { me, clear } = useAuthStore();

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    } finally {
      localStorage.removeItem('access_token');
      clear();
    }
  };

  return (
    <>
      <button className="nav-fab" onClick={() => setOpen(true)} aria-label="Menu">
        ☰
      </button>
      <Sheet open={open} onOpenChange={setOpen} side="left">
        <SheetHeader>Menu</SheetHeader>
        <SheetContent>
          <nav className="nav-links" onClick={() => setOpen(false)}>
            <Link href="/">Trang chủ</Link>
            <Link href="/news">Tin tức</Link>
            <Link href="/products">Sản phẩm</Link>
            {me?.roles?.some((r) => r.slug === 'admin') && <Link href="/admin">Admin</Link>}
            {me ? <Link href="/auth/login" onClick={(e) => { e.preventDefault(); logout(); }}>Đăng xuất</Link> : (
              <>
                <Link href="/auth/login">Đăng nhập</Link>
                <Link href="/auth/register">Đăng ký</Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <style jsx>{`
        .nav-fab {
          position: fixed; bottom: 16px; right: 16px; width: 48px; height: 48px;
          border-radius: 9999px; border: none; background: #111827; color: #fff; font-size: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,.15); z-index: 1002; cursor: pointer;
        }
        .nav-links { display: flex; flex-direction: column; gap: 10px; }
      `}</style>
    </>
  );
}
