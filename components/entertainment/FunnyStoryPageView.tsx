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
    <article className="min-h-screen bg-[#FDFCF9] pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-ussh-border/70 bg-white/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link
            href="/#entertainment"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ussh-navy hover:text-ussh-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Về bản tin Inside USSH</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-2xs ${
                isLiked
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-rose-600 hover:border-rose-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:text-ussh-navy hover:border-ussh-navy/30 bg-white transition-all shadow-2xs"
              title="Sao chép liên kết bài viết"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chia sẻ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Smile className="w-3.5 h-3.5" />
            Góc Funny • Bản tin nội bộ
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-medium">Inside USSH</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-ussh-navy font-sans leading-tight sm:leading-snug mb-5">
          {story.title}
        </h1>

        {/* Meta Line */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pb-6 border-b border-slate-200/80 mb-8">
          <div className="flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-500">Chuyên mục:</span>
            <strong className="text-ussh-navy font-bold">Chuyện vui công sở</strong>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>19/09/2026</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>2 phút đọc vui</span>
          </div>
        </div>

        {/* Illustration Image (Full natural aspect ratio, no crop, no zoom) */}
        <div className="my-8 space-y-2.5">
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md p-4 sm:p-6 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.imageUrl}
              alt="Minh họa công chức phượt thủ"
              className="w-full max-w-lg h-auto object-contain block mx-auto rounded-2xl"
            />
          </div>
          <p className="text-xs italic text-slate-500 text-center">
            Minh họa: Khi công chức Nhân Văn hóa “phượt thủ thành phố”
          </p>
        </div>

        {/* Sapo Lead Block */}
        <div className="my-8 bg-[#F6ECE4]/80 p-5 sm:p-7 rounded-2xl border-l-4 border-amber-600 shadow-xs">
          <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic">
            “{story.summary}”
          </p>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-6 text-slate-700 text-base sm:text-[17px] leading-relaxed font-normal">
          {story.paragraphs.map((para, i) => (
            <p key={i} className="text-justify leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Interactive Poll / Mood selector */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base sm:text-lg uppercase text-ussh-navy tracking-tight font-sans">
              Thầy Cô hôm nay thuộc “hệ di chuyển” nào?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
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
                      ? 'bg-amber-500/10 border-amber-500 text-ussh-navy font-bold shadow-xs'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl shrink-0">{opt.icon}</span>
                  <span className="text-xs sm:text-sm leading-snug">{opt.label}</span>
                </button>
              );
            })}
          </div>
          {selectedTransport && (
            <p className="text-xs text-emerald-700 font-semibold pt-1">
              ✓ Cảm ơn Thầy Cô đã chia sẻ! Chúc Thầy Cô một ngày làm việc tràn đầy năng lượng và an toàn trên mọi nẻo đường!
            </p>
          )}
        </div>

        {/* Bottom Back Button & Continue Exploring */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
            >
              <span>Chơi Minigame</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ky-nhan-van/ngo-van-le"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
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
