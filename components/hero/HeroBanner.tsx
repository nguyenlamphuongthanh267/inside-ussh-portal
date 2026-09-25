'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NewsArticle } from '@/types/news';
import { PersonProfile } from '@/types/people';
import { HeroSliderCard } from './HeroSliderCard';
import { ProfileCard } from '@/components/people/ProfileCard';
import { ArticleReaderModal } from '@/components/news/ArticleReaderModal';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Gamepad2,
  Smile,
  Award,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  X,
  Quote,
} from 'lucide-react';
import { MOCK_PEOPLE, MOCK_MINIGAME_DOCX, MOCK_FUNNY_STORY } from '@/constants/mockData';

export interface HeroBannerProps {
  heroArticle: NewsArticle;
  featuredStories: NewsArticle[];
}

export function HeroBanner({ heroArticle, featuredStories }: HeroBannerProps) {
  // Modal states
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PersonProfile | null>(null);
  const [isMemoirOpen, setIsMemoirOpen] = useState(false);
  const [isMinigameOpen, setIsMinigameOpen] = useState(false);
  const [isFunnyOpen, setIsFunnyOpen] = useState(false);

  // Entertainment mini-poll states
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [showFullRules, setShowFullRules] = useState(false);
  const [funnyLiked, setFunnyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(256);

  // Carousel ref
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredLeader = MOCK_PEOPLE.find((p) => p.id === 'ppl_ngo_van_le') || MOCK_PEOPLE[0];

  useEffect(() => {
    const handleCustomModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: string; id?: string }>;
      const { type, id } = customEvent.detail || {};
      if (type === 'article') {
        const art = [heroArticle, ...featuredStories].find((a) => a.id === id);
        if (art) setSelectedArticle(art);
      } else if (type === 'profile') {
        const person = MOCK_PEOPLE.find((p) => p.id === id);
        if (person) setSelectedPerson(person);
      } else if (type === 'memoir') {
        setIsMemoirOpen(true);
      } else if (type === 'minigame') {
        setIsMinigameOpen(true);
      } else if (type === 'funny') {
        setIsFunnyOpen(true);
      }
    };

    window.addEventListener('inside-ussh:open-modal', handleCustomModal);
    return () => window.removeEventListener('inside-ussh:open-modal', handleCustomModal);
  }, [heroArticle, featuredStories]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const transportOptions = [
    { id: 'ninja', label: 'Ninja phượt thủ (Xe máy áo chống nắng)', icon: '🏍️' },
    { id: 'thien-su', label: 'Thiền sư xe buýt (Chế độ ngủ bù & xấp giáo án)', icon: '🚌' },
    { id: 'metro', label: 'Metro Bến Thành (1.000 bước chân xuyên nắng)', icon: '🚆' },
    { id: 'lofi', label: 'Hệ ô tô cá nhân (Thong dong nghe nhạc Lofi)', icon: '🚗' },
  ];

  const handleLike = () => {
    if (!funnyLiked) {
      setFunnyLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setFunnyLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

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
                <button
                  type="button"
                  onClick={() => setSelectedArticle(featuredStories[0] || heroArticle)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ussh-navy text-white text-xs sm:text-sm font-semibold hover:bg-ussh-accent hover:shadow-md transition-all group-hover:gap-3 cursor-pointer"
                  title="Nhấp để đọc bài viết mới nhất"
                  aria-label="Đọc bài viết mới nhất"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Đọc bản tin mới nhất</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
            <div
              onClick={() => setSelectedArticle(featuredStories[0] || heroArticle)}
              className="relative z-10 flex-1 w-full min-h-[180px] sm:min-h-[260px] lg:min-h-[320px] rounded-2xl overflow-hidden shadow-soft border border-white/60 mt-2 sm:mt-3 cursor-pointer group/img"
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
            </div>
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
                    onReadMore={(article) => setSelectedArticle(article)}
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

              {/* Dedicated Featured Portrait Card for Thay Ngo Van Le (Khung ảnh trọn vẹn không bị zoom/cắt) */}
              {featuredLeader && (
                <div
                  onClick={() => setIsMemoirOpen(true)}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-card hover:border-ussh-accent/50 transition-all cursor-pointer group flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6"
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
                        <span>Đọc câu chuyện</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
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
                {/* Card A: Minigame */}
                <div
                  id="minigame"
                  onClick={() => setIsMinigameOpen(true)}
                  className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-2xl p-3.5 sm:p-4 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Badge A */}
                    <div className="w-8 h-8 rounded-lg bg-ussh-accent text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                      A
                    </div>

                    {/* Crossword Thumbnail Icon */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/docx/image20.png"
                        alt="Bảng rừng chữ Minigame"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-ussh-accent">
                        MINIGAME HẰNG THÁNG
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug font-sans">
                        Tổng giải thưởng: 5.000.000đ
                      </h3>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-ussh-accent mt-1 group-hover:underline">
                        <span>Chơi ngay!</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card B: Góc Funny */}
                <div
                  id="funny"
                  onClick={() => setIsFunnyOpen(true)}
                  className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-2xl p-3.5 sm:p-4 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-3 relative"
                >
                  <span id="funny-stories" className="scroll-mt-24 absolute top-0 left-0 pointer-events-none" />
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Badge B */}
                    <div className="w-8 h-8 rounded-lg bg-ussh-accent text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                      B
                    </div>

                    {/* Funny Illustration Thumbnail */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/docx/image2.png"
                        alt="Minh họa Funny"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="min-w-0">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODALS                                                   */}
      {/* ======================================================== */}

      {/* 1. Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* 2. Memoir Modal for GS.TS.NGND Ngô Văn Lệ */}
      {isMemoirOpen && featuredLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="memoir-modal-title"
          onClick={() => setIsMemoirOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 sticky top-0 z-20">
              <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent">
                Người Nhân Văn • Ký chân dung
              </span>
              <button
                onClick={() => setIsMemoirOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
              <div>
                <h2
                  id="memoir-modal-title"
                  className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ussh-navy leading-snug font-sans mb-2"
                >
                  {featuredLeader.storyTitle}
                </h2>
                <div className="text-xs text-slate-500 pb-4 border-b border-slate-100">
                  Tác giả: <strong className="text-ussh-navy uppercase">{featuredLeader.author || 'Thảo Quyên'}</strong> • Bản tin Inside USSH
                </div>
              </div>

              {/* Primary Image */}
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden max-h-[460px] bg-slate-100 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredLeader.avatarUrl}
                    alt={featuredLeader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] italic text-slate-500 text-center">
                  GS.TS.NGND Ngô Văn Lệ trong buổi trò chuyện tại nhà riêng. Ảnh: Thảo Quyên
                </p>
              </div>

              {/* Sapo Lead Paragraph (Roboto text 13, in đậm, khung border cách điệu giống tin tức) */}
              {featuredLeader.sapo && (
                <p className="text-[13px] font-semibold text-slate-800 leading-relaxed bg-ussh-cream-50 p-4 rounded-xl border-l-4 border-ussh-accent">
                  {featuredLeader.sapo}
                </p>
              )}

              {/* Story Paragraphs with Subheadings */}
              <div className="space-y-4 text-[13px] leading-relaxed text-slate-700 font-normal">
                {featuredLeader.storyParagraphs ? (
                  featuredLeader.storyParagraphs.map((para, i) => {
                    // Check if paragraph is a subheading (trung đề)
                    if (para.startsWith('## ')) {
                      const subheading = para.replace('## ', '');
                      return (
                        <h3
                          key={i}
                          className="text-base sm:text-lg font-bold text-ussh-navy uppercase tracking-tight pt-4 pb-1 border-b border-ussh-border/70 flex items-center gap-2 font-sans"
                        >
                          <span className="w-1.5 h-4 bg-ussh-accent rounded-full inline-block" />
                          <span>{subheading}</span>
                        </h3>
                      );
                    }

                    return (
                      <React.Fragment key={i}>
                        <p>{para}</p>
                        {i === 4 && featuredLeader.secondaryImage && (
                          <div className="my-6 space-y-2">
                            <div className="rounded-2xl overflow-hidden max-h-[420px] bg-slate-100 border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={featuredLeader.secondaryImage.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {(() => {
                              const cap = featuredLeader.secondaryImage.caption?.replace(/^Chú thích ảnh:\s*/i, '').trim();
                              if (!cap) return null;
                              const match = cap.match(/^(.*?)(?:[\.\s\-–—]*)\s*(\(?Ảnh:\s*[^)]+\)?)$/i);
                              if (match) {
                                return (
                                  <div className="text-[11.5px] text-slate-500 text-center font-normal px-2 space-y-1">
                                    <p className="italic leading-relaxed">{match[1].trim()}</p>
                                    <p className="not-italic font-semibold text-slate-700 text-[11px] tracking-wide inline-flex items-center justify-center gap-1">
                                      <span className="text-slate-400">•</span>
                                      <span>{match[2].trim()}</span>
                                    </p>
                                  </div>
                                );
                              }
                              return <p className="text-[11px] italic text-slate-500 text-center">{cap}</p>;
                            })()}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <p>{featuredLeader.bio}</p>
                )}
              </div>

              {/* Concluding Quote */}
              <div className="bg-[#F6ECE4] rounded-2xl p-5 border-l-4 border-ussh-accent text-[13px]">
                <p className="italic font-medium text-slate-800">
                  “{featuredLeader.quote}”
                </p>
              </div>

              {/* Author Footer Credit */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Tác giả: <strong className="text-ussh-navy uppercase font-bold">{featuredLeader.author || 'THẢO QUYÊN'}</strong></span>
                <span>Inside USSH • Trường ĐH KHXH&NV, ĐHQG-HCM</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Selected Faculty Profile Modal */}
      {selectedPerson && selectedPerson.id !== 'ppl_ngo_van_le' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent">
                Chân dung Người Nhân Văn
              </span>
              <button
                onClick={() => setSelectedPerson(null)}
                className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-ussh-cream-100 shadow-soft mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPerson.avatarUrl}
                  alt={selectedPerson.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 id="profile-modal-title" className="text-lg font-bold text-ussh-navy font-sans">
                {selectedPerson.academicTitle} {selectedPerson.name}
              </h3>
              <p className="text-xs font-semibold text-ussh-accent mt-0.5">
                {selectedPerson.position}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedPerson.facultyDepartment}
              </p>

              {selectedPerson.quote && (
                <div className="mt-5 p-4 rounded-2xl bg-[#F6ECE4] border-l-4 border-ussh-accent text-left w-full">
                  <p className="text-xs italic text-slate-800 leading-relaxed">
                    “{selectedPerson.quote}”
                  </p>
                </div>
              )}

              {selectedPerson.bio && (
                <p className="text-xs text-slate-600 mt-4 leading-relaxed text-left w-full">
                  {selectedPerson.bio}
                </p>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex justify-end">
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="px-5 py-2 rounded-xl bg-ussh-navy text-white text-xs font-semibold hover:bg-ussh-navy-light transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Minigame Modal */}
      {isMinigameOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="minigame-modal-title"
          onClick={() => setIsMinigameOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-ussh-cream-100 text-ussh-navy flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-ussh-navy" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent block">
                    Minigame hàng tuần • Thử thách trí tuệ
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Tổng giải thưởng: 4.800.000đ
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMinigameOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
              <div>
                <h3
                  id="minigame-modal-title"
                  className="font-bold text-lg sm:text-xl text-ussh-navy uppercase leading-snug mb-1 font-sans"
                >
                  {MOCK_MINIGAME_DOCX.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {MOCK_MINIGAME_DOCX.subtitle}
                </p>
              </div>

              {/* Puzzle Image & Hint */}
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-3 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MOCK_MINIGAME_DOCX.imageUrl}
                  alt="Bảng rừng chữ Minigame Khoanh chữ Tìm dấu ấn Nhân Văn"
                  className="w-full max-h-[360px] object-contain rounded-xl"
                />
                <span className="text-[11px] italic text-slate-500 mt-2 text-center">
                  Gợi ý: Có một từ khóa chỉ đọc được khi xoay bản tin 180 độ!
                </span>
              </div>

              {/* Prize Breakdown Table */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ussh-navy block mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Cơ cấu giải thưởng
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {MOCK_MINIGAME_DOCX.prizes.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border ${
                        idx === 0
                          ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="block text-[11px] font-bold text-ussh-accent">{p.rank}</span>
                      <span className="block text-xs font-bold text-slate-900 mt-0.5">{p.amount}</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to play (Steps) */}
              <div className="space-y-2 bg-ussh-cream-50/80 p-4 rounded-xl border border-ussh-border/70 text-[13px] text-slate-700">
                <span className="font-bold text-xs text-ussh-navy uppercase block">Cách thức tham gia:</span>
                {MOCK_MINIGAME_DOCX.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-ussh-accent shrink-0">•</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Full Rules Accordion */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowFullRules(!showFullRules)}
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-ussh-navy transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-ussh-accent" />
                    Nguyên tắc xét thưởng & Lưu ý chi tiết
                  </span>
                  {showFullRules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showFullRules && (
                  <div className="p-4 bg-white space-y-2 text-[12px] text-slate-600 border-t border-slate-200">
                    <p className="font-semibold text-slate-800">
                      Đối tượng: {MOCK_MINIGAME_DOCX.targetAudience}
                    </p>
                    <ul className="space-y-1.5 pl-2 list-disc list-inside">
                      {MOCK_MINIGAME_DOCX.rulesSummary.map((rule, idx) => (
                        <li key={idx} className="leading-relaxed">{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:px-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50">
              <span className="text-xs text-slate-500">
                Gửi câu trả lời qua Google Form chính thức trước ngày 25/09/2026
              </span>
              <a
                href={MOCK_MINIGAME_DOCX.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-ussh-accent text-white text-xs font-bold hover:bg-ussh-accent-hover transition-all shadow-xs"
              >
                <span>Gửi đáp án qua Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Funny Story Reader Modal */}
      {isFunnyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="funny-modal-title"
          onClick={() => setIsFunnyOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Smile className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent">
                  Góc cười Nhân Văn • Inside USSH
                </span>
              </div>
              <button
                onClick={() => setIsFunnyOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
              <h3
                id="funny-modal-title"
                className="font-bold text-lg sm:text-xl text-ussh-navy uppercase leading-snug font-sans"
              >
                {MOCK_FUNNY_STORY.title}
              </h3>

              {/* Illustration Image */}
              <div className="rounded-2xl overflow-hidden bg-amber-50/60 border border-amber-100 p-3 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MOCK_FUNNY_STORY.imageUrl}
                  alt="Minh họa giáo làng Nhân Văn phượt thủ thành phố"
                  className="max-h-60 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Story Content */}
              <div className="space-y-3.5 text-[13px] leading-relaxed text-slate-700 font-normal">
                {MOCK_FUNNY_STORY.paragraphs.map((p, i) => (
                  <p key={i} className={i === MOCK_FUNNY_STORY.paragraphs.length - 1 ? 'font-semibold text-ussh-navy pt-1' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Interactive Mini-Poll */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-xs font-bold text-ussh-navy block mb-3">
                  Bình chọn nhanh: Thầy Cô thuộc hệ nào dưới đây?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {transportOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedTransport(opt.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                        selectedTransport === opt.id
                          ? 'bg-ussh-accent/10 border-ussh-accent text-ussh-navy font-bold'
                          : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-base">{opt.icon}</span>
                      <span className="line-clamp-1">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {selectedTransport && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Đã ghi nhận lựa chọn của Thầy/Cô! Cảm ơn đã tương tác cùng bản tin.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:px-8 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  funnyLiked
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>❤️ Thả tim ({likeCount})</span>
              </button>

              <button
                onClick={() => setIsFunnyOpen(false)}
                className="px-5 py-2 rounded-xl bg-ussh-navy text-white text-xs font-semibold hover:bg-ussh-navy-light transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
