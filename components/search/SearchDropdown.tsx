'use client';

import React, { useState, useMemo } from 'react';
import {
  SearchCategoryFilter,
  SearchResultItem,
  PopularSuggestion,
  CATEGORY_FILTERS,
  POPULAR_SUGGESTIONS,
  searchAll,
} from '@/lib/services/searchService';
import { Search, Sparkles, ArrowRight, CornerDownLeft, Clock, Tag, X, Compass } from 'lucide-react';

export interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  onSelectResult: (item: SearchResultItem) => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectSuggestion: (sug: PopularSuggestion) => void;
}

export function SearchDropdown({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectResult,
  onNavigateSection,
  onSelectSuggestion,
}: SearchDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryFilter>('all');

  const results = useMemo(() => {
    return searchAll(query, selectedCategory);
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  const handleCategoryClick = (cat: { id: SearchCategoryFilter; label: string; targetId: string }) => {
    // Immediately navigate to that section on the page as requested by user
    onNavigateSection(cat.targetId);
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      className="absolute right-0 top-full mt-2 w-[340px] sm:w-[460px] md:w-[520px] max-h-[75vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-700 overflow-hidden z-50 flex flex-col animate-in fade-in zoom-in-95 duration-150"
      role="region"
      aria-label="Kết quả tìm kiếm"
    >
      {/* Category filter bar */}
      <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between gap-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 pl-1 shrink-0">
            Mục:
          </span>
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                title={!query.trim() ? `Đi đến mục ${cat.label}` : `Lọc theo mục ${cat.label}`}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-ussh-navy text-white dark:bg-ussh-accent font-semibold shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border border-slate-200/70 dark:border-slate-600 hover:bg-red-50 hover:text-ussh-accent dark:hover:bg-slate-600'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* If searching, quick jump button to that section */}
        {query.trim() && selectedCategory !== 'all' && (
          <button
            onClick={() => {
              const cat = CATEGORY_FILTERS.find((c) => c.id === selectedCategory);
              if (cat) onNavigateSection(cat.targetId);
            }}
            className="text-[11px] text-ussh-accent font-semibold hover:underline shrink-0 pl-2 whitespace-nowrap"
          >
            Đi đến mục này →
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100 dark:divide-slate-700/60 max-h-[460px]">
        {/* State 1: When user hasn't typed anything yet */}
        {!query.trim() && (
          <div className="p-3 text-left">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Gợi ý tìm kiếm phổ biến</span>
              </div>
              <span className="text-[10px] text-slate-400">Click để mở trực tiếp</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {POPULAR_SUGGESTIONS.map((sug) => (
                <button
                  key={sug.keyword}
                  onClick={() => onSelectSuggestion(sug)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-red-50 hover:text-ussh-accent dark:hover:bg-slate-600 transition-all border border-transparent hover:border-red-200 flex items-center gap-1.5 group/btn cursor-pointer shadow-2xs hover:scale-102"
                >
                  <span className="font-medium">{sug.keyword}</span>
                  {sug.badgeLabel && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white dark:bg-slate-800 text-slate-400 group-hover/btn:text-ussh-accent border border-slate-200/60 dark:border-slate-600">
                      {sug.badgeLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-ussh-cream-50 dark:bg-slate-700/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 flex items-start gap-2">
              <Compass className="w-4 h-4 text-ussh-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed">
                💡 <strong>Click vào bất kỳ mục hoặc gợi ý</strong> để hệ thống tự động cuộn trang và mở ngay nội dung tương ứng. Hỗ trợ cả <strong>tiếng Việt có dấu và không dấu</strong>.
              </p>
            </div>
          </div>
        )}

        {/* State 2: Results found */}
        {query.trim() && results.length > 0 && (
          <>
            <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-400 flex items-center justify-between">
              <span>
                Tìm thấy <strong>{results.length}</strong> kết quả cho &quot;{query}&quot;
              </span>
              <span className="text-[10px] text-slate-400">Click để điều hướng ngay</span>
            </div>

            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectResult(item)}
                className="p-2.5 sm:p-3 hover:bg-ussh-cream-50 dark:hover:bg-slate-700/60 rounded-xl transition-all cursor-pointer group flex items-start gap-3 text-left"
              >
                {/* Thumbnail */}
                {item.imageUrl && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200/60 dark:border-slate-600">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}
                    >
                      {item.categoryLabel}
                    </span>
                    {item.dateOrMeta && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
                        {item.dateOrMeta}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-ussh-navy dark:text-white leading-snug line-clamp-2 group-hover:text-ussh-accent transition-colors">
                    {item.title}
                  </h4>

                  {item.summary && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                      {item.summary}
                    </p>
                  )}
                </div>

                <div className="text-slate-300 group-hover:text-ussh-accent shrink-0 pt-2 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* State 3: No results found */}
        {query.trim() && results.length === 0 && (
          <div className="py-8 px-4 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Không tìm thấy kết quả nào phù hợp với &quot;{query}&quot;
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              Vui lòng thử lại với từ khóa ngắn hơn hoặc nhấp chọn các gợi ý bên dưới:
            </p>
            <div className="mt-3 flex justify-center gap-1.5 flex-wrap">
              {POPULAR_SUGGESTIONS.slice(0, 4).map((sug) => (
                <button
                  key={sug.keyword}
                  onClick={() => onSelectSuggestion(sug)}
                  className="px-2 py-1 text-[11px] rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-ussh-accent hover:bg-red-50"
                >
                  {sug.keyword}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-[11px] text-slate-400 px-3">
        <span>Click mục/gợi ý để đến trang tức thì</span>
        <button
          onClick={onClose}
          className="hover:text-slate-600 dark:hover:text-slate-200 font-medium cursor-pointer"
        >
          Đóng [Esc]
        </button>
      </div>
    </div>
  );
}
