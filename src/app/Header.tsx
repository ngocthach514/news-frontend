"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

type Me = {
	id: number;
	email: string;
	roles?: { slug: string }[];
};

export default function Header() {
	const { me, fetchMe, clear } = useAuthStore();

	useEffect(() => {
		fetchMe();
	}, [fetchMe]);

	const logout = async () => {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
			} finally {
				localStorage.removeItem('access_token');
				clear();
			}
	};

	const isAdmin = !!me?.roles?.some((r) => r.slug === 'admin');

	return (
		<header style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
			<Link href="/">Trang chủ</Link>
			<Link href="/news">Tin tức</Link>
			<Link href="/products">Sản phẩm</Link>
			{isAdmin && <Link href="/admin">Admin</Link>}
			<span style={{ marginLeft: 'auto' }} />
			{me ? (
				<>
					<span>Xin chào, {me.email}</span>
					<button onClick={logout}>Đăng xuất</button>
				</>
			) : (
				<>
					<Link href="/auth/login">Đăng nhập</Link>
					<Link href="/auth/register">Đăng ký</Link>
				</>
			)}
		</header>
	);
}
