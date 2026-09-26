'use client';

import React, { useState, useEffect } from 'react';
import { GalleryMoment } from '@/types/gallery';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import { LightboxModal } from './LightboxModal';
import { MOCK_GALLERY } from '@/constants/mockData';

export interface MomentsGalleryProps {
  moments?: GalleryMoment[];
}

export function MomentsGallery({ moments }: MomentsGalleryProps) {
  const [selectedMoment, setSelectedMoment] = useState<GalleryMoment | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allMoments = moments && moments.length > 0 ? moments : MOCK_GALLERY;

  const categories = [
    { id: 'all', label: 'Tất cả khoảnh khắc (10)' },
    { id: 'community', label: 'Gắn kết nội bộ' },
    { id: 'academic', label: 'Học thuật & Lãnh đạo' },
    { id: 'culture', label: 'Văn hóa & Đoàn thể' },
  ];

  const filteredMoments = activeCategory === 'all'
    ? allMoments
    : allMoments.filter((m) => m.category === activeCategory);

  const handleOpenLightbox = (moment: GalleryMoment) => {
    const idx = allMoments.findIndex((m) => m.id === moment.id);
    setSelectedIndex(idx !== -1 ? idx : 0);
    setSelectedMoment(moment);
  };

  useEffect(() => {
    const handleCustomModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: string; id?: string }>;
      const { type, id } = customEvent.detail || {};
      if (type === 'gallery' && id) {
        const moment = allMoments.find((m) => m.id === id);
        if (moment) handleOpenLightbox(moment);
      }
    };
    window.addEventListener('inside-ussh:open-modal', handleCustomModal);
    return () => window.removeEventListener('inside-ussh:open-modal', handleCustomModal);
  }, [allMoments]);

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % allMoments.length;
    setSelectedIndex(nextIdx);
    setSelectedMoment(allMoments[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + allMoments.length) % allMoments.length;
    setSelectedIndex(prevIdx);
    setSelectedMoment(allMoments[prevIdx]);
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-white dark:bg-[#0b1120] border-t border-slate-100 dark:border-slate-800 transition-colors"
      aria-label="Khoảnh khắc Nhân Văn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ussh-accent dark:text-amber-400 uppercase tracking-wider mb-2">
              <ImageIcon className="w-4 h-4" />
              <span>Góc ảnh sự kiện</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ussh-navy dark:text-white tracking-tight font-sans uppercase">
              Khoảnh khắc Nhân Văn
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
              Ghi lại những khoảnh khắc chân thực, giàu cảm xúc trong các sự kiện Lễ Khai giảng và đời sống cán bộ, giảng viên Nhà trường.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 border border-transparent dark:border-slate-700/60 rounded-xl overflow-x-auto scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-slate-700 text-ussh-navy dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Real Moments Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMoments.map((moment, idx) => (
            <div
              key={moment.id}
              onClick={() => handleOpenLightbox(moment)}
              className={`group relative rounded-2xl overflow-hidden shadow-soft bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
                idx === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={moment.imageUrl}
                alt={moment.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-ussh-navy/95 via-ussh-navy/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 text-white">
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 mb-1">
                  {moment.categoryName}
                </span>

                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 mb-1 font-sans">
                  {moment.title}
                </h3>

                {/* Caption rule: Bỏ 'Chú thích ảnh:', Roboto size 11 in nghiêng */}
                <p className="text-[11px] italic text-slate-200 line-clamp-2 font-normal">
                  {moment.caption.replace(/^Chú thích ảnh:\s*/i, '')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={!!selectedMoment}
          moment={selectedMoment}
          onClose={() => setSelectedMoment(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </section>
  );
}
