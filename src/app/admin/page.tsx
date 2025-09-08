"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

type Me = { id: number; email: string; roles?: { slug: string }[] };

export default function AdminPage() {
	const [loading, setLoading] = useState(true);
	const [authorized, setAuthorized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const me = await api<Me>('/auth/me');
				const isAdmin = !!me.roles?.some((r) => r.slug === 'admin');
				if (!isAdmin) {
					router.replace('/auth/login');
					return;
				}
				setAuthorized(true);
			} catch {
				router.replace('/auth/login');
			} finally {
				setLoading(false);
			}
		})();
	}, [router]);

	if (loading) return <p>Đang kiểm tra quyền...</p>;
	if (!authorized) return null;

	return (
		<div>
			<h1>Admin</h1>
			<p>Chào mừng bạn đến trang quản trị.</p>
		</div>
	);
}
