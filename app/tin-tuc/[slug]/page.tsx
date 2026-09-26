import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsService } from '@/lib/services/newsService';
import { NewsArticleView } from '@/components/news/NewsArticleView';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = newsService.getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await newsService.getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Không tìm thấy bài viết | Inside USSH',
    };
  }

  return {
    title: `${article.title} | Inside USSH`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Inside USSH`,
      description: article.summary,
      url: `https://inside-ussh-portal.vercel.app/tin-tuc/${article.slug}`,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name],
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({ params }: ArticlePageProps) {
  const article = await newsService.getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <NewsArticleView article={article} />;
}
