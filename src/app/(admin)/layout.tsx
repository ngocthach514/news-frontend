"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { me, fetchMe, loading } = useAuthStore();
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  useEffect(() => {
    const isAdmin = !!me?.roles?.some((r) => r.slug === 'admin');
    if (!loading && !isAdmin) router.replace('/auth/login');
  }, [loading, me, router]);
  if (loading || !me) return null;
  return <>{children}</>;
}
