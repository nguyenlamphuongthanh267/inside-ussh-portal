'use client';

import React from 'react';
import { NewsCategory } from '@/types/news';

export interface CategoryOption {
  key: NewsCategory;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { key: 'tat-ca', label: 'Tất cả' },
  { key: 'dao-tao', label: 'Đào tạo & Hợp tác' },
  { key: 'nghien-cuu', label: 'Nghiên cứu KH' },
  { key: 'cong-doan', label: 'Công đoàn' },
  { key: 'doan-hoi', label: 'Đoàn - Hội' },
  { key: 'su-kien', label: 'Sự kiện' },
];

export interface NewsFilterTabsProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
}

export function NewsFilterTabs({ activeCategory, onSelectCategory }: NewsFilterTabsProps) {
  return (
    <div
      className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none"
      role="tablist"
      aria-label="Lọc tin tức theo chuyên mục"
    >
      {CATEGORIES.map((cat) => {
        const isSelected = activeCategory === cat.key;
        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy ${
              isSelected
                ? 'bg-ussh-navy text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
