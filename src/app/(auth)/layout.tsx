"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { me, fetchMe, loading } = useAuthStore();
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  useEffect(() => {
    if (!loading && !me) router.replace('/auth/login');
  }, [loading, me, router]);
  if (loading || !me) return null;
  return <>{children}</>;
}
