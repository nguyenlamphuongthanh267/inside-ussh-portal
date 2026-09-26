'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/types/news';
import { HeroSliderCard } from './HeroSliderCard';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { MOCK_PEOPLE } from '@/constants/mockData';

export interface HeroBannerProps {
  heroArticle: NewsArticle;
  featuredStories: NewsArticle[];
}

export function HeroBanner({ heroArticle, featuredStories }: HeroBannerProps) {
  const featuredLeader = MOCK_PEOPLE.find((p) => p.id === 'ppl_ngo_van_le') || MOCK_PEOPLE[0];

  useEffect(() => {
    const handleCustomModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: string; id?: string }>;
      const { type, id } = customEvent.detail || {};
      if (type === 'article') {
        const art = [heroArticle, ...featuredStories].find((a) => a.id === id);
        if (art) {
          window.location.href = `/tin-tuc/${art.slug}`;
        }
      } else if (type === 'memoir' || type === 'profile') {
        window.location.href = '/ky-nhan-van/ngo-van-le';
      } else if (type === 'minigame') {
        window.location.href = '/phut-thu-gian/minigame';
      } else if (type === 'funny') {
        window.location.href = '/phut-thu-gian/chuyen-vui';
      }
    };

    window.addEventListener('inside-ussh:open-modal', handleCustomModal);
    return () => window.removeEventListener('inside-ussh:open-modal', handleCustomModal);
  }, [heroArticle, featuredStories]);

  return (
    <section
      id="home"
      className="scroll-mt-20 sm:scroll-mt-24 pt-3 sm:pt-6 pb-8 sm:pb-12 bg-ussh-cream-50"
      aria-label="Cổng thông tin Inside USSH"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid matching Mockup (media_1789826790341.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Editorial Hero Banner Card                  */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 bg-[#F6ECE4] border border-[#E9D9CF] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-card relative overflow-hidden group">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-ussh-accent/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ussh-accent/10 text-ussh-accent text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-ussh-accent" />
                <span>Bản tin số 38 • Tháng 9/2026</span>
              </div>

              {/* Headline matching Mockup */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ussh-navy tracking-tight leading-snug mb-2 sm:mb-3 font-sans">
                INSIDE USSH: Nơi Kết Nối, Chia Sẻ của Người Nhân Văn
              </h1>

              {/* Short summary */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-normal line-clamp-3 sm:line-clamp-none">
                Không gian truyền thông nội bộ kết nối hơn 1.000 cán bộ, giảng viên và người lao động Trường ĐH KHXH&NV, ĐHQG-HCM. Nơi chia sẻ tri thức, tôn vinh những cống hiến thầm lặng và lan tỏa tinh thần nhân văn.
              </p>

              {/* CTA Button */}
              <div className="mb-4">
                <Link
                  href={`/tin-tuc/${heroArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ussh-navy text-white text-xs sm:text-sm font-semibold hover:bg-ussh-accent hover:shadow-md transition-all group-hover:gap-3 cursor-pointer"
                  title="Nhấp để đọc bài viết mới nhất"
                  aria-label="Đọc bài viết mới nhất"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Đọc bản tin mới nhất</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Highlight Stats to fill space seamlessly */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-2">
                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-2.5 text-center border border-white/90 shadow-2xs backdrop-blur-xs">
                  <div className="text-base sm:text-lg font-black text-ussh-navy dark:text-white leading-tight">1.000+</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Cán bộ, GV</div>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-2.5 text-center border border-white/90 shadow-2xs backdrop-blur-xs">
                  <div className="text-base sm:text-lg font-black text-ussh-accent leading-tight">70 Năm</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Truyền thống</div>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-2.5 text-center border border-white/90 shadow-2xs backdrop-blur-xs">
                  <div className="text-base sm:text-lg font-black text-amber-600 leading-tight">Kỳ 38</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Tháng 9/2026</div>
                </div>
              </div>
            </div>

            {/* Hero Image - flex-1 expands to fill 100% of remaining space */}
            <Link
              href={`/tin-tuc/${heroArticle.slug}`}
              className="relative z-10 flex-1 w-full min-h-[180px] sm:min-h-[260px] lg:min-h-[320px] rounded-2xl overflow-hidden shadow-soft border border-white/60 mt-2 sm:mt-3 cursor-pointer group/img block"
              title="Nhấp để đọc bài viết tiêu điểm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroArticle.imageUrl || '/images/docx/image4.jpg'}
                alt="Cán bộ giảng viên Inside USSH cùng chia sẻ niềm vui công tác"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover/img:from-black/70 transition-colors" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium drop-shadow-sm flex items-center justify-between">
                <span>Trường ĐH Khoa học Xã hội & Nhân văn</span>
                <span className="font-semibold text-amber-300 inline-flex items-center gap-1">
                  ĐHQG-HCM <ArrowRight className="w-3 h-3 group-hover/img:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3 Stacked Sections matching Mockup        */}
          {/* 1. Tin tức - Sự kiện                                     */}
          {/* 2. Người Nhân Văn                                        */}
          {/* 3. Phút thư giãn                                         */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* ---------------------------------------------------- */}
            {/* 1. Tin tức - Sự kiện                                */}
            {/* ---------------------------------------------------- */}
            <div id="news" className="scroll-mt-24">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-ussh-navy tracking-tight font-sans">
                    Tin tức - Sự kiện
                  </h2>
                  <span className="w-7 h-1 bg-ussh-accent rounded-full hidden sm:block" />
                </div>
              </div>

              {/* 3 Featured News Cards Grid (Compact & Natural Height - Zero Empty Space) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 items-stretch">
                {featuredStories.map((story) => (
                  <HeroSliderCard
                    key={story.id}
                    article={story}
                  />
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* 2. Ký Nhân văn (GS.TS.NGND Ngô Văn Lệ)               */}
            {/* ---------------------------------------------------- */}
            <div id="people" className="scroll-mt-24 pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-ussh-navy tracking-tight font-sans">
                    Ký Nhân văn
                  </h2>
                  <div className="flex items-center gap-1">
                    <span className="w-6 h-1 bg-ussh-accent rounded-full" />
                    <span className="w-2 h-1 bg-ussh-accent/50 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Dedicated Featured Portrait Card for Thay Ngo Van Le (Chuyển sang trang đọc bài chuyên sâu) */}
              {featuredLeader && (
                <Link
                  href="/ky-nhan-van/ngo-van-le"
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-card hover:border-ussh-accent/50 transition-all cursor-pointer group flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 block"
                >
                  {/* Portrait photo - Khung ảnh chân dung giữ trọn vẹn thần thái của Thầy */}
                  <div className="w-32 h-36 sm:w-40 sm:h-auto rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs group-hover:scale-[1.02] transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredLeader.avatarUrl}
                      alt={featuredLeader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Content details */}
                  <div className="flex flex-col justify-between flex-1 text-center sm:text-left min-w-0">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ussh-accent/10 text-ussh-accent text-[11px] font-bold tracking-wide uppercase mb-1.5">
                        <span>Gương sáng Nhân Văn</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-ussh-navy group-hover:text-ussh-accent transition-colors font-sans">
                        {featuredLeader.academicTitle} {featuredLeader.name}
                      </h3>
                      <p className="text-xs font-semibold text-ussh-accent mt-0.5">
                        {featuredLeader.position}
                      </p>
                      <p className="text-[11.5px] italic text-slate-600 mt-2.5 leading-relaxed bg-[#F8EFE9]/60 p-2.5 rounded-lg border-l-2 border-ussh-accent">
                        “{featuredLeader.quote}”
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Tác giả: <strong className="text-slate-600 uppercase">THẢO QUYÊN</strong>
                      </span>
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-ussh-accent group-hover:translate-x-0.5 transition-transform">
                        <span>Đọc toàn bài</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* ---------------------------------------------------- */}
            {/* 3. Phút thư giãn                                    */}
            {/* ---------------------------------------------------- */}
            <div id="entertainment" className="scroll-mt-24 pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-ussh-navy tracking-tight font-sans">
                    Phút thư giãn
                  </h2>
                  <span className="w-6 h-1 bg-ussh-accent rounded-full hidden sm:block" />
                </div>
              </div>

              {/* 2 Horizontal Cards matching Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card A: Minigame (Trang riêng chuyên sâu) */}
                <Link
                  id="minigame"
                  href="/phut-thu-gian/minigame"
                  className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-2xl p-3.5 sm:p-4 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-3 block overflow-hidden max-w-full"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Badge A */}
                    <div className="w-8 h-8 rounded-lg bg-ussh-accent text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                      A
                    </div>

                    {/* Crossword Thumbnail Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/docx/image20.png"
                        alt="Bảng rừng chữ Minigame"
                        className="w-full h-full max-w-full max-h-full object-contain block"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-ussh-accent">
                        MINIGAME HẰNG THÁNG
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug font-sans truncate">
                        Tổng giải thưởng: 5.000.000đ
                      </h3>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-ussh-accent mt-1 group-hover:underline">
                        <span>Chơi ngay!</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Card B: Góc Funny (Trang riêng chuyên sâu) */}
                <Link
                  id="funny"
                  href="/phut-thu-gian/chuyen-vui"
                  className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-2xl p-3.5 sm:p-4 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-3 relative block overflow-hidden max-w-full"
                >
                  <span id="funny-stories" className="scroll-mt-24 absolute top-0 left-0 pointer-events-none" />
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Badge B */}
                    <div className="w-8 h-8 rounded-lg bg-ussh-accent text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                      B
                    </div>

                    {/* Funny Illustration Thumbnail */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/docx/image2.png"
                        alt="Minh họa Funny"
                        className="w-full h-full max-w-full max-h-full object-contain block"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        FUNNY
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug font-sans line-clamp-1">
                        Sáng Quận 1, chiều Thủ Đức
                      </h3>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-ussh-accent mt-1 group-hover:underline">
                        <span>Đọc vui!</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
