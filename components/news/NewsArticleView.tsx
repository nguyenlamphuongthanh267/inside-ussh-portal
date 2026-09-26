'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/types/news';
import {
  ArrowLeft,
  Share2,
  Check,
  Calendar,
  Clock,
  BookOpen,
  ChevronRight,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Tag,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface NewsArticleViewProps {
  article: NewsArticle;
}

function renderFormattedCaption(captionText?: string) {
  if (!captionText) return null;
  const clean = captionText.replace(/^Chú thích ảnh:\s*/i, '').trim();
  const regex = /^(.*?)(?:[\.\s\-–—]*)\s*(\(?Ảnh:\s*[^)]+\)?)$/i;
  const match = clean.match(regex);

  if (match) {
    const description = match[1].trim();
    const credit = match[2].trim();
    return (
      <div className="text-xs sm:text-[13px] text-slate-500 text-center font-normal px-2 space-y-1 mt-2.5">
        <p className="italic leading-relaxed">{description}</p>
        <p className="not-italic font-semibold text-slate-700 text-xs tracking-wide inline-flex items-center justify-center gap-1">
          <span className="text-slate-400">•</span>
          <span>{credit}</span>
        </p>
      </div>
    );
  }

  return (
    <p className="text-xs sm:text-[13px] italic text-slate-500 text-center font-normal px-2 leading-relaxed mt-2.5">
      {clean}
    </p>
  );
}

export function NewsArticleView({ article }: NewsArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <article className="min-h-screen bg-[#FDFCF9] pb-20">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
        <div
          className="h-full bg-ussh-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-ussh-border/70 bg-white/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ussh-navy hover:text-ussh-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Về bản tin Inside USSH</span>
          </Link>

          <div className="flex items-center gap-3">
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

      {/* Main Article Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Category Badge & Breadcrumbs */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ussh-accent/10 text-ussh-accent text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            {article.categoryName}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-medium">Bản tin Inside USSH</span>
        </div>

        {/* Article Title */}
        <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-tight text-ussh-navy font-sans leading-snug mb-4">
          {article.title}
        </h1>

        {/* Author & Meta Line */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pb-5 border-b border-slate-200/80 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-normal">Tác giả:</span>
            <strong className="text-ussh-navy font-bold uppercase tracking-wide">
              {article.author.name}
            </strong>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDate(article.publishDate)}</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Primary Image (Full uncropped view with adaptive laptop max-height) */}
        <div className="my-6 space-y-2">
          <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 sm:p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-auto max-w-full max-h-[360px] sm:max-h-[420px] md:max-h-[460px] object-contain block mx-auto rounded-xl"
            />
          </div>
          {renderFormattedCaption(article.imageCaption)}
        </div>

        {/* Sapo Lead Block */}
        <div className="my-6 bg-[#F6ECE4]/80 p-4 sm:p-5 rounded-2xl border-l-4 border-ussh-accent shadow-xs">
          <p className="text-[15px] sm:text-base font-medium text-slate-800 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-5 text-slate-700 text-[15px] sm:text-base leading-relaxed font-normal">
          {article.contentParagraphs?.map((para, i) => (
            <React.Fragment key={i}>
              <p className="text-justify leading-relaxed">{para}</p>

              {/* Secondary Image insertion at paragraph 3 */}
              {i === 3 && article.secondaryImage && (
                <div className="my-8 space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 sm:p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.secondaryImage.url}
                      alt="Hình ảnh bài viết"
                      className="w-auto max-w-full max-h-[360px] sm:max-h-[420px] md:max-h-[460px] object-contain block mx-auto rounded-xl"
                    />
                  </div>
                  {renderFormattedCaption(article.secondaryImage.caption)}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Interactive Info Box (Tiếp nhận hiện vật hoặc Đăng ký hội thảo) */}
        {article.infoBox && (
          <div className="mt-12 p-6 sm:p-8 bg-ussh-cream-100 border-2 border-ussh-accent/30 rounded-3xl space-y-5 shadow-soft">
            <div className="flex items-center gap-2 text-ussh-accent">
              <span className="w-2.5 h-2.5 rounded-full bg-ussh-accent" />
              <h3 className="font-bold text-base sm:text-lg uppercase tracking-wide font-sans text-ussh-navy">
                {article.infoBox.title}
              </h3>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {article.infoBox.description}
            </p>

            {article.infoBox.items && (
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc marker:text-ussh-accent">
                {article.infoBox.items.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {article.infoBox.details && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-ussh-border/60">
                {article.infoBox.details.map((detail, index) => (
                  <div key={index} className="bg-white/80 p-3.5 rounded-xl border border-ussh-border/40">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      {detail.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-ussh-navy">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {article.infoBox.contact && (
              <div className="pt-3 border-t border-ussh-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 bg-white/60 p-4 rounded-xl">
                <div>
                  <span className="font-bold text-ussh-navy block text-sm">
                    {article.infoBox.contact.name}
                  </span>
                  <span className="text-slate-500">
                    {article.infoBox.contact.title}
                  </span>
                </div>
                <div className="flex flex-col sm:items-end gap-1 font-medium text-ussh-navy">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-ussh-accent" />
                    {article.infoBox.contact.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-ussh-accent" />
                    {article.infoBox.contact.email}
                  </span>
                </div>
              </div>
            )}

            {article.infoBox.link && (
              <div className="pt-2">
                <a
                  href={article.infoBox.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-ussh-accent hover:bg-ussh-accent-hover text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
                >
                  <span>{article.infoBox.linkText || 'Mở biểu mẫu đăng ký'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tags list */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 inline-flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Chủ đề:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Signature */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tác giả bài viết</div>
            <div className="text-base font-bold uppercase text-ussh-navy tracking-wide mt-0.5">
              {article.author.name}
            </div>
          </div>
        </div>

        {/* Bottom Back Button & Continue Exploring */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ussh-navy text-white text-sm font-semibold hover:bg-ussh-navy-dark transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/ky-nhan-van/ngo-van-le"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
            >
              <span>Ký Nhân văn</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/phut-thu-gian/minigame"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-ussh-accent hover:border-ussh-accent/40 bg-white transition-colors"
            >
              <span>Minigame</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
