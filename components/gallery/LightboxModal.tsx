'use client';

import React, { useEffect, useState } from 'react';
import { GalleryMoment } from '@/types/gallery';
import { X, ChevronLeft, ChevronRight, Calendar, Camera } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface LightboxModalProps {
  isOpen: boolean;
  moment: GalleryMoment | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function LightboxModal({
  isOpen,
  moment,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !moment) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && onNext) {
        onNext();
      } else if (diff < 0 && onPrev) {
        onPrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Ảnh: ${moment.title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Đóng cửa sổ xem ảnh"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Ảnh trước"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Ảnh sau"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Content Container */}
      <div className="max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center px-2">
        <div className="relative overflow-hidden rounded-2xl max-h-[58vh] sm:max-h-[68vh] shadow-2xl flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={moment.imageUrl}
            alt={moment.title}
            className="max-h-[58vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-2xl select-none"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-3 sm:mt-4 text-center text-white max-w-xl px-2">
          <h3 className="text-sm sm:text-base md:text-lg font-bold font-sans line-clamp-1">
            {moment.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 italic font-normal">
            {moment.caption.replace(/^Chú thích ảnh:\s*/i, '')}
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(moment.date)}
            </span>
            {moment.photographer && (
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" />
                {moment.photographer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
