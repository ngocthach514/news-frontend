"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

type Article = {
	slug: string;
	title: string;
	summary?: string | null;
	publishedAt?: string;
};

export default function NewsPage() {
	const [data, setData] = useState<{ items: Article[]; total: number; page: number; limit: number } | null>(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		api<{ items: Article[]; total: number; page: number; limit: number }>(`/news?page=${page}&limit=10`).then(setData);
	}, [page]);

	const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

	return (
		<div>
			<h1>Tin tức</h1>
			<ul>
				{data?.items.map((a) => (
					<li key={a.slug}>
						<Link href={`/news/${a.slug}`}>{a.title}</Link>
						{a.summary ? <p>{a.summary}</p> : null}
					</li>
				))}
			</ul>
			<div style={{ display: 'flex', gap: 8 }}>
				<button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
					Trang trước
				</button>
				<span>
					Trang {page}/{totalPages}
				</span>
				<button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
					Trang sau
				</button>
			</div>
		</div>
	);
}
