"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

type Article = {
	slug: string;
	title: string;
	content: string;
	publishedAt?: string;
	viewCount?: number;
};

export default function ArticleDetailPage() {
	const params = useParams<{ slug: string }>();
	const slug = (params?.slug as string) || '';
	const [article, setArticle] = useState<Article | null>(null);

	useEffect(() => {
		if (!slug) return;
		api<Article>(`/news/${slug}`).then(setArticle).catch(() => setArticle(null));
	}, [slug]);

	if (!article) return <p>Không tìm thấy bài viết.</p>;
	return (
		<article>
			<h1>{article.title}</h1>
			{article.publishedAt ? <p>Xuất bản: {new Date(article.publishedAt).toLocaleString('vi-VN')}</p> : null}
			<div style={{ whiteSpace: 'pre-wrap' }}>{article.content}</div>
		</article>
	);
}
