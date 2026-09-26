'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { X, Tag, ArrowRight, BookOpen, Clock, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { searchAll, SearchResultItem } from '@/lib/services/searchService';
import { MOCK_NEWS_ARTICLES, MOCK_PEOPLE, MOCK_FUNNY_STORY } from '@/constants/mockData';

export interface TagArticlesModalProps {
  isOpen: boolean;
  tag: string;
  currentSlug?: string;
  onClose: () => void;
}

export function TagArticlesModal({
  isOpen,
  tag,
  currentSlug,
  onClose,
}: TagArticlesModalProps) {
  // Find all items matching this tag
  const matchingItems = useMemo(() => {
    if (!tag) return [];

    // 1. Direct search using searchService
    let results = searchAll(tag, 'all');

    // 2. If results are few, supplement with related news/people articles sharing common topics
    if (results.length < 2) {
      const fallbackArticles = MOCK_NEWS_ARTICLES.filter((a) => a.slug !== currentSlug);
      for (const fb of fallbackArticles) {
        if (!results.some((r) => r.modalId === fb.id || r.routeUrl?.includes(fb.slug))) {
          results.push({
            id: `news_${fb.id}`,
            type: 'news',
            categoryLabel: fb.categoryName || 'Tin tức',
            badgeColor: 'bg-red-50 text-ussh-accent border-red-200',
            title: fb.title,
            summary: fb.summary,
            imageUrl: fb.imageUrl,
            dateOrMeta: `${fb.publishDate} • ${fb.readingTime}`,
            actionType: 'open-article',
            targetId: 'news',
            modalId: fb.id,
            routeUrl: `/tin-tuc/${fb.slug}`,
          });
        }
      }
    }

    return results;
  }, [tag, currentSlug]);

  if (!isOpen || !tag) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-ussh-navy shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/40 text-ussh-accent dark:text-amber-400 flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-800/40">
              <Tag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  Chủ đề bài viết
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10.5px] font-black">
                  {matchingItems.length} nội dung liên quan
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-ussh-navy dark:text-white truncate">
                #{tag}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng hộp thoại"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: List of matching articles */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {matchingItems.map((item, index) => {
            const isCurrent = Boolean(
              currentSlug &&
              item.routeUrl &&
              (item.routeUrl.includes(currentSlug) || item.modalId === currentSlug)
            );

            return (
              <div
                key={item.id || index}
                className={`pt-3.5 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-3 rounded-2xl transition-all ${
                  isCurrent
                    ? 'bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700'
                }`}
              >
                {/* Thumbnail */}
                {item.imageUrl && (
                  <div className="w-full sm:w-28 h-32 sm:h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Content info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.categoryLabel}
                    </span>
                    {item.dateOrMeta && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                        {item.dateOrMeta}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                        <CheckCircle2 className="w-3 h-3 text-amber-600" />
                        Đang đọc bài viết này
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="w-full sm:w-auto shrink-0 flex justify-end pt-1 sm:pt-0">
                  {isCurrent ? (
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 px-3 py-1.5 italic">
                      Bài hiện tại
                    </span>
                  ) : item.routeUrl ? (
                    <Link
                      href={item.routeUrl}
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-xl bg-ussh-navy hover:bg-ussh-accent text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <span>Đọc bài viết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/#news"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>Xem mục</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Liên kết chủ đề tự động · Cổng thông tin Inside USSH</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
