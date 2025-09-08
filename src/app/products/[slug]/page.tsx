"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

type Product = { id: number; slug: string; name: string; price: string; description?: string | null };

export default function ProductDetailPage() {
	const params = useParams<{ slug: string }>();
	const slug = (params?.slug as string) || '';
	const [item, setItem] = useState<Product | null>(null);

	useEffect(() => {
		if (!slug) return;
		api<Product>(`/products/${slug}`).then(setItem).catch(() => setItem(null));
	}, [slug]);

	if (!item) return <p>Không tìm thấy sản phẩm.</p>;
	return (
		<article>
			<h1>{item.name}</h1>
			<p style={{ fontWeight: 600 }}>{Number(item.price).toLocaleString('vi-VN')}₫</p>
			{item.description ? <div style={{ whiteSpace: 'pre-wrap' }}>{item.description}</div> : null}
		</article>
	);
}
