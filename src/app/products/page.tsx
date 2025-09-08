"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

type Product = { id: number; slug: string; name: string; price: string };

export default function ProductsPage() {
	const [items, setItems] = useState<Product[]>([]);

	useEffect(() => {
		api<Product[]>('/products').then(setItems);
	}, []);

	return (
		<div>
			<h1>Sản phẩm</h1>
			<ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
				{items.map((p) => (
					<li key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
						<h3 style={{ margin: '0 0 6px' }}>
							<Link href={`/products/${p.slug}`}>{p.name}</Link>
						</h3>
						<div>{Number(p.price).toLocaleString('vi-VN')}₫</div>
					</li>
				))}
			</ul>
		</div>
	);
}
