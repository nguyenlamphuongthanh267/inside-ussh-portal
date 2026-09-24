'use client';

import React from 'react';
import { NewsArticle } from '@/types/news';
import { ArrowRight, Calendar, Clock, User, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface NewsCardProps {
  article?: NewsArticle;
  onReadMore?: (article: NewsArticle) => void;
}

export function NewsCard({ article, onReadMore }: NewsCardProps) {
  // If real article data is provided, render it
  if (article && article.title) {
    return (
      <article
        id={`news-${article.id}`}
        className="scroll-mt-24 sm:scroll-mt-28 group bg-white rounded-2xl border border-slate-200/80 hover:border-ussh-accent/50 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
        onClick={() => onReadMore?.(article)}
      >
        <div>
          {/* 16:9 Image with zoom effect */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {article.categoryName && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="primary" size="sm" className="bg-white/95 backdrop-blur-xs font-semibold shadow-xs text-ussh-navy">
                  {article.categoryName}
                </Badge>
              </div>
            )}
            {article.isTrending && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ussh-accent text-white text-[10px] font-bold shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  Tiêu điểm
                </span>
              </div>
            )}
          </div>

          {/* Typography per guidelines: Tít Roboto size 16 in hoa in đậm, text 13 */}
          <div className="p-5">
            <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {formatDate(article.publishDate)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {article.readingTime}
              </span>
            </div>

            <h3 className="font-bold text-base text-ussh-navy group-hover:text-ussh-accent transition-colors line-clamp-2 leading-snug mb-2.5 uppercase font-sans">
              {article.title}
            </h3>

            <p className="text-[13px] text-slate-600 line-clamp-3 leading-relaxed mb-4 font-normal">
              {article.summary}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[12px] font-medium text-slate-700 truncate max-w-[130px]">
              {article.author.name}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReadMore?.(article);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ussh-cream-100 text-ussh-accent hover:bg-ussh-accent hover:text-white transition-all text-xs font-bold group-hover:gap-2"
          >
            <span>Đọc tiếp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    );
  }

  // Fallback placeholder
  return (
    <article
      className="bg-white rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between overflow-hidden"
      aria-label="Article placeholder"
    >
      <div>
        <div className="aspect-[16/9] w-full bg-slate-100/80 border-b border-slate-200/60 flex flex-col items-center justify-center text-slate-400">
          <span className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
            16:9 Image Placeholder
          </span>
        </div>
        <div className="p-5 space-y-3">
          <div className="h-4 w-20 bg-slate-200/70 rounded-full" />
          <div className="space-y-1.5">
            <div className="h-5 w-4/5 bg-slate-200/80 rounded-md" />
            <div className="h-5 w-2/3 bg-slate-200/80 rounded-md" />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full bg-slate-100 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-3.5 w-24 bg-slate-100 rounded" />
        <span className="text-xs font-semibold text-slate-300">Đọc thêm</span>
      </div>
    </article>
  );
}
