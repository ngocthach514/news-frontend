"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader } from './ui/sheet';
import { useAuthStore } from '@/lib/auth-store';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { me, clear, fetchMe } = useAuthStore();

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
      <header className="site-header">
        <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
        <Link href="/" className="brand">Web Tin Tức</Link>
        <div className="spacer" />
        {me ? (
          <div className="user-row">
            <span className="user-email">{me.email}</span>
            <button onClick={logout} className="logout-btn">Đăng xuất</button>
          </div>
        ) : (
          <div className="auth-row">
            <Link href="/auth/login">Đăng nhập</Link>
            <Link href="/auth/register">Đăng ký</Link>
          </div>
        )}
      </header>

      <Sheet open={open} onOpenChange={setOpen} side="left">
        <SheetHeader>Menu</SheetHeader>
        <SheetContent>
          <nav className="nav-links" onClick={() => setOpen(false)}>
            <Link href="/">Trang chủ</Link>
            <Link href="/news">Tin tức</Link>
            <Link href="/products">Sản phẩm</Link>
            {me?.roles?.some((r) => r.slug === 'admin') && <Link href="/admin">Admin</Link>}
            {me ? <Link href="/account">Tài khoản</Link> : null}
            {me ? <Link href="/settings">Cài đặt</Link> : null}
          </nav>
        </SheetContent>
      </Sheet>

      <style jsx>{`
        .site-header { display:flex; align-items:center; gap:12px; padding:12px; border-bottom:1px solid #eee; position:sticky; top:0; background:#fff; z-index: 10; }
        .menu-btn { font-size:20px; background:none; border:1px solid #ddd; border-radius:8px; padding:6px 10px; }
        .brand { font-weight:700; color:#111; }
        .spacer { margin-left:auto; }
        .auth-row, .user-row { display:flex; align-items:center; gap:12px; }
        .logout-btn { background:#ef4444; color:#fff; border:none; border-radius:8px; padding:6px 10px; }
        .nav-links { display:flex; flex-direction:column; gap:10px; }
      `}</style>
    </>
  );
}
