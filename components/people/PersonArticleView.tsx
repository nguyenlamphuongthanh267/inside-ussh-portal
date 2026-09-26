'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PersonProfile } from '@/types/people';
import { MOCK_NEWS_ARTICLES } from '@/constants/mockData';
import { TagArticlesModal } from '../news/TagArticlesModal';
import {
  ArrowLeft,
  Share2,
  Check,
  Calendar,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  ExternalLink,
  Tag,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface PersonArticleViewProps {
  person: PersonProfile;
}

export function PersonArticleView({ person }: PersonArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Number(scroll.toFixed(0)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="min-h-screen bg-[#FDFCF9] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 pb-20 transition-colors">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-ussh-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-ussh-border/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Link
            href="/#people"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ussh-navy dark:text-amber-300 hover:text-ussh-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Về bản tin Inside USSH</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-200 hover:text-ussh-navy hover:border-ussh-navy/30 bg-white dark:bg-slate-800 transition-all shadow-2xs"
              title="Sao chép liên kết bài viết"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Đã chép link</span>
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

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Category Badge & Breadcrumbs */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ussh-accent/10 text-ussh-accent dark:bg-amber-400/10 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Ký Nhân văn • Ký chân dung
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bản tin Inside USSH</span>
        </div>

        {/* Article Title */}
        <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-tight text-ussh-navy dark:text-white font-sans leading-snug mb-4">
          {person.storyTitle || `${person.academicTitle} ${person.name}: Giữ lửa Nhân văn từ những ngày gian khó`}
        </h1>

        {/* Author & Meta Line */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pb-5 border-b border-slate-200/80 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 dark:text-slate-500 font-normal">Tác giả:</span>
            <strong className="text-ussh-navy dark:text-amber-300 font-bold uppercase tracking-wide">
              {person.author || 'THẢO QUYÊN'}
            </strong>
          </div>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>19/09/2026</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>5 phút đọc</span>
          </div>
        </div>

        {/* Featured Portrait Hero Image (Shrink-to-fit container: ôm sát ảnh, không viền xám thừa) */}
        <div className="my-6 space-y-2 text-center">
          <div className="inline-block rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.avatarUrl}
              alt={person.name}
              className="w-auto max-w-full max-h-[380px] sm:max-h-[440px] md:max-h-[480px] object-contain block mx-auto"
            />
          </div>
          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 text-center font-normal px-2 space-y-1">
            <p className="italic leading-relaxed">
              GS.TS.NGND Ngô Văn Lệ trong buổi trò chuyện tại nhà riêng.
            </p>
            <p className="not-italic font-semibold text-slate-700 dark:text-slate-300 text-xs tracking-wide inline-flex items-center justify-center gap-1">
              <span className="text-slate-400">•</span>
              <span>Ảnh: Thảo Quyên</span>
            </p>
          </div>
        </div>

        {/* Sapo Lead Block */}
        {person.sapo && (
          <div className="my-6 bg-[#F6ECE4]/80 dark:bg-slate-800/80 p-4 sm:p-5 rounded-2xl border-l-4 border-ussh-accent dark:border-amber-500 shadow-xs">
            <p className="text-[15px] sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              {person.sapo}
            </p>
          </div>
        )}

        {/* Article Body Paragraphs with Subheadings */}
        <div className="space-y-5 text-slate-700 dark:text-slate-200 text-[15px] sm:text-base leading-relaxed font-normal">
          {person.storyParagraphs?.map((para, i) => {
            // Check if paragraph is a subheading (trung đề)
            if (para.startsWith('## ')) {
              const subheading = para.replace('## ', '');
              return (
                <div key={i} className="pt-5 pb-1.5">
                  <h2 className="text-lg sm:text-xl font-bold text-ussh-navy dark:text-white tracking-tight font-sans flex items-center gap-2.5 border-b border-ussh-border dark:border-slate-800 pb-2">
                    <span className="w-1.5 h-4.5 bg-ussh-accent dark:bg-amber-400 rounded-full inline-block shrink-0" />
                    <span>{subheading}</span>
                  </h2>
                </div>
              );
            }

            return (
              <React.Fragment key={i}>
                <p className="text-left sm:text-justify leading-relaxed">{para}</p>

                {/* Secondary Photo insertion at midpoint (Shrink-to-fit container) */}
                {i === 4 && person.secondaryImage && (
                  <div className="my-8 space-y-2 text-center">
                    <div className="inline-block rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm max-w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={person.secondaryImage.url}
                        alt="Tập thể lãnh đạo cán bộ Nhân văn"
                        className="w-auto max-w-full max-h-[360px] sm:max-h-[420px] md:max-h-[460px] object-contain block mx-auto"
                      />
                    </div>
                    {(() => {
                      const cap = person.secondaryImage.caption?.replace(/^Chú thích ảnh:\s*/i, '').trim();
                      if (!cap) return null;
                      const match = cap.match(/^(.*?)(?:[\.\s\-–—]*)\s*(\(?Ảnh:\s*[^)]+\)?)$/i);
                      if (match) {
                        return (
                          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 text-center font-normal px-2 space-y-1">
                            <p className="italic leading-relaxed">{match[1].trim()}</p>
                            <p className="not-italic font-semibold text-slate-700 dark:text-slate-300 text-xs tracking-wide inline-flex items-center justify-center gap-1">
                              <span className="text-slate-400">•</span>
                              <span>{match[2].trim()}</span>
                            </p>
                          </div>
                        );
                      }
                      return <p className="text-xs italic text-slate-500 dark:text-slate-400 text-center">{cap}</p>;
                    })()}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Featured Pull-Quote Highlight */}
        {person.quote && (
          <div className="my-10 p-6 sm:p-8 bg-gradient-to-r from-ussh-navy to-ussh-navy-dark text-white rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ussh-accent/15 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-base sm:text-lg italic font-sans leading-relaxed text-slate-100">
                  “{person.quote}”
                </p>
                <div className="mt-3 text-xs uppercase tracking-wider text-amber-300 font-bold">
                  — GS.TS.NGND Ngô Văn Lệ
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Author Signature */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tác giả bài viết</div>
            <div className="text-base font-bold uppercase text-ussh-navy tracking-wide mt-0.5">
              {person.author || 'THẢO QUYÊN'}
            </div>
          </div>
        </div>

        {/* Subject Bio Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.avatarUrl}
              alt={person.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ussh-accent/10 text-ussh-accent text-[11px] font-bold tracking-wide uppercase mb-1.5">
              <span>Gương sáng Nhân Văn</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ussh-navy font-sans">
              {person.academicTitle} {person.name}
            </h3>
            <p className="text-xs font-semibold text-ussh-accent mt-0.5">
              {person.position}
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {person.bio}
            </p>
          </div>
        </div>

        {/* Tags list (Clickable) */}
        <div className="mt-8 pt-5 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5 mr-1">
              <Tag className="w-3.5 h-3.5 text-ussh-accent" />
              Chủ đề:
            </span>
            {['Ký Nhân văn', 'GS.TS.NGND Ngô Văn Lệ', 'Truyền thống Nhân Văn', 'Gắn kết nội bộ', 'Lan tỏa yêu thương'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50/80 hover:bg-ussh-accent text-ussh-accent hover:text-white border border-red-200/80 hover:border-ussh-accent text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 group"
                title={`Xem các bài viết cùng chủ đề #${tag}`}
              >
                <span>#{tag}</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 italic flex items-center gap-1">
            <span>💡</span>
            <span>Nhấp vào từng chủ đề để xem tất cả bài viết và nội dung liên quan trên cổng thông tin.</span>
          </p>
        </div>

        {/* ── BÀI VIẾT CÙNG CHỦ ĐỀ & LIÊN QUAN ── */}
        <section className="mt-12 pt-8 border-t-2 border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ussh-accent" />
              <h2 className="text-base sm:text-lg font-black text-ussh-navy uppercase tracking-tight font-sans">
                Bài viết cùng chủ đề &amp; Liên quan
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Chuyên mục Inside USSH
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_NEWS_ARTICLES.slice(0, 2).map((art) => (
              <Link
                key={art.id}
                href={`/tin-tuc/${art.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-ussh-accent/50 transition-all cursor-pointer"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-ussh-navy/90 text-white backdrop-blur-xs">
                      {art.categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-ussh-accent transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(art.publishDate)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-ussh-accent font-bold group-hover:translate-x-0.5 transition-transform">
                      Đọc tiếp <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Back Button & Continue Exploring */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#people"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ussh-navy text-white text-sm font-semibold hover:bg-ussh-navy-dark transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#entertainment"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
            >
              <span>Minigame & Chuyện vui</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/#gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
            >
              <span>Khoảnh khắc Nhân văn</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tag Articles Modal */}
        <TagArticlesModal
          isOpen={Boolean(activeTag)}
          tag={activeTag || ''}
          currentSlug="ky-nhan-van/ngo-van-le"
          onClose={() => setActiveTag(null)}
        />
      </div>
    </article>
  );
}
