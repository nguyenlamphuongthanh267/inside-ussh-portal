'use client';

import React, { useState } from 'react';
import { NewsArticle } from '@/types/news';
import { NewsCard } from './NewsCard';
import { ArticleReaderModal } from './ArticleReaderModal';
import { Newspaper, Sparkles, Filter } from 'lucide-react';
import { MOCK_NEWS_ARTICLES } from '@/constants/mockData';

export interface LatestNewsSectionProps {
  articles?: NewsArticle[];
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Use provided articles or fall back to MOCK_NEWS_ARTICLES (strictly the 3 articles from docx)
  const allArticles = articles && articles.length > 0 ? articles : MOCK_NEWS_ARTICLES;

  const categories = [
    { id: 'all', label: 'Tất cả tin bài' },
    { id: 'su-kien', label: 'Sự kiện 70 năm' },
    { id: 'cong-doan', label: 'Nữ trí thức & Đoàn thể' },
    { id: 'dao-tao', label: 'Hội thảo & NCKH' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);

  return (
    <section
      id="news"
      className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-white border-t border-slate-100"
      aria-label="Tin tức - Sự kiện Inside USSH"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ussh-accent uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4" />
              <span>Bản tin nội bộ chính thức</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ussh-navy tracking-tight font-sans uppercase">
              Tin tức - Sự kiện
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
              Cập nhật chuỗi sự kiện kỷ niệm 70 năm truyền thống, hoạt động nữ trí thức và các hội thảo học thuật trọng điểm.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-ussh-navy shadow-xs'
                    : 'text-slate-600 hover:text-ussh-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Real News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((item) => (
            <NewsCard
              key={item.id}
              article={item}
              onReadMore={(art) => setSelectedArticle(art)}
            />
          ))}
        </div>

        {/* Read More Modal */}
        <ArticleReaderModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </section>
  );
}
