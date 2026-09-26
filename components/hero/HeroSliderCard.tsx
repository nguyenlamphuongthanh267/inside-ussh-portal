'use client';

import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/types/news';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface HeroSliderCardProps {
  article: NewsArticle;
  onReadMore?: (article: NewsArticle) => void;
}

export function HeroSliderCard({ article }: HeroSliderCardProps) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group bg-white rounded-2xl p-3 sm:p-3.5 border border-ussh-border/70 hover:border-ussh-accent/40 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between cursor-pointer block"
    >
      <div>
        {/* Image with zoom effect */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 rounded-md bg-ussh-navy/90 text-white text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
              {article.categoryName}
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime}
          </span>
        </div>

        {/* Title (Tít Roboto size in hoa in đậm) */}
        <h3 className="font-bold text-sm uppercase text-ussh-navy group-hover:text-ussh-accent transition-colors line-clamp-2 leading-snug mb-1.5 font-sans">
          {article.title}
        </h3>

        {/* Excerpt (Text 13) */}
        <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed mb-3 font-normal">
          {article.summary}
        </p>
      </div>

      {/* Button: Đọc thêm -> */}
      <div className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-ussh-accent text-white text-xs font-semibold group-hover:bg-ussh-accent-hover transition-colors shadow-xs">
        <span>Đọc toàn bài</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

