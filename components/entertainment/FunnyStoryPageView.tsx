'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Smile,
  Sparkles,
  ChevronRight,
  Heart,
  Share2,
  Check,
  Calendar,
  Clock,
  Coffee,
} from 'lucide-react';
import { MOCK_FUNNY_STORY } from '@/constants/mockData';

export function FunnyStoryPageView() {
  const story = MOCK_FUNNY_STORY;
  const [likes, setLikes] = useState(188);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  const transportOptions = [
    { id: 'ninja', label: 'Ninja phượt thủ (Xe máy áo chống nắng, chống gió)', icon: '🏍️' },
    { id: 'thien-su', label: 'Thiền sư xe buýt (Chế độ ngủ bù & ôm xấp giáo án)', icon: '🚌' },
    { id: 'metro', label: 'Metro Bến Thành (1.000 bước chân xuyên nắng cổng trường)', icon: '🚆' },
    { id: 'oto', label: 'Ô tô Lofi chill (Nhạc du dương nhưng vẫn tắc đường)', icon: '🚗' },
  ];

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="min-h-screen bg-[#FDFCF9] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-ussh-border/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Link
            href="/#entertainment"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ussh-navy dark:text-white hover:text-ussh-accent dark:hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Về bản tin Inside USSH</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-2xs ${
                isLiked
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white hover:border-ussh-navy/30 dark:hover:border-slate-600 bg-white dark:bg-slate-800 transition-all shadow-2xs"
              title="Sao chép liên kết bài viết"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Đã chép link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Chia sẻ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Smile className="w-3.5 h-3.5" />
            Góc Funny • Bản tin nội bộ
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Inside USSH</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-tight text-ussh-navy dark:text-white font-sans leading-snug mb-4">
          {story.title}
        </h1>

        {/* Meta Line */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pb-5 border-b border-slate-200/80 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-slate-500 dark:text-slate-400">Chuyên mục:</span>
            <strong className="text-ussh-navy dark:text-amber-400 font-bold">Chuyện vui công sở</strong>
          </div>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>19/09/2026</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>2 phút đọc vui</span>
          </div>
        </div>

        {/* Illustration Image - Shrink-to-fit without gray gutters */}
        <div className="my-6 space-y-2 text-center">
          <div className="inline-block rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.imageUrl}
              alt="Minh họa công chức phượt thủ"
              className="w-auto max-w-full max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain block mx-auto"
            />
          </div>
          <p className="text-xs italic text-slate-500 dark:text-slate-400 text-center">
            Minh họa: Khi công chức Nhân Văn hóa “phượt thủ thành phố”
          </p>
        </div>

        {/* Sapo Lead Block */}
        <div className="my-6 bg-[#F6ECE4]/80 dark:bg-slate-800/80 p-4 sm:p-5 rounded-2xl border-l-4 border-amber-600 dark:border-amber-400 shadow-xs">
          <p className="text-[15px] sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
            “{story.summary}”
          </p>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-5 text-slate-700 dark:text-slate-200 text-[15px] sm:text-base leading-relaxed font-normal">
          {story.paragraphs.map((para, i) => (
            <p key={i} className="text-justify leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Interactive Poll / Mood selector */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg uppercase text-ussh-navy dark:text-white tracking-tight font-sans">
              Thầy Cô hôm nay thuộc “hệ di chuyển” nào?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Bấm chọn để đồng cảm cùng đồng nghiệp trên tuyến đường Đinh Tiên Hoàng ↔ Linh Xuân:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {transportOptions.map((opt) => {
              const isSelected = selectedTransport === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTransport(opt.id)}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 dark:border-amber-400 text-ussh-navy dark:text-white font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span className="text-2xl shrink-0">{opt.icon}</span>
                  <span className="text-xs sm:text-sm leading-snug">{opt.label}</span>
                </button>
              );
            })}
          </div>
          {selectedTransport && (
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
              ✓ Cảm ơn Thầy Cô đã chia sẻ! Chúc Thầy Cô một ngày làm việc tràn đầy năng lượng và an toàn trên mọi nẻo đường!
            </p>
          )}
        </div>

        {/* Bottom Back Button & Continue Exploring */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#entertainment"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ussh-navy text-white text-sm font-semibold hover:bg-ussh-navy-dark transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/phut-thu-gian/minigame"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-ussh-accent dark:hover:text-amber-400 hover:border-ussh-accent/40 dark:hover:border-slate-600 bg-white dark:bg-slate-800 transition-colors"
            >
              <span>Chơi Minigame</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ky-nhan-van/ngo-van-le"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-ussh-accent dark:hover:text-amber-400 hover:border-ussh-accent/40 dark:hover:border-slate-600 bg-white dark:bg-slate-800 transition-colors"
            >
              <span>Ký Nhân văn</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
