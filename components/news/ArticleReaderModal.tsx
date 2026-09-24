'use client';

import React, { useEffect } from 'react';
import { NewsArticle } from '@/types/news';
import { X, Calendar, Clock, Share2, Check, ExternalLink, Bookmark, Building, Phone, Mail, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface ArticleReaderModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleReaderModal({ article, isOpen, onClose }: ArticleReaderModalProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title & Action Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm" className="font-semibold text-ussh-navy bg-ussh-cream-100">
              {article.categoryName}
            </Badge>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 hidden sm:inline">{formatDate(article.publishDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
              title="Sao chép liên kết bài viết"
              aria-label="Chia sẻ"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
          {/* Article Main Title (Tít Roboto size 16 in hoa in đậm) */}
          <div>
            <h1
              id="modal-article-title"
              className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ussh-navy leading-snug font-sans mb-3"
            >
              {article.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <span className="font-semibold text-slate-700">{article.author.name}</span>
                <span className="text-slate-400">({article.author.department})</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readingTime}
              </span>
            </div>
          </div>

          {/* Primary Top Image with Italic Caption (Bỏ cụm 'Chú thích ảnh:', size 11 in nghiêng) */}
          <div className="space-y-2">
            <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[460px] object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-[11px] italic text-slate-500 text-center font-normal px-2">
                {article.imageCaption.replace(/^Chú thích ảnh:\s*/i, '')}
              </p>
            )}
          </div>

          {/* Summary / Sapo (Roboto text 13) */}
          <p className="text-[13px] font-semibold text-slate-800 leading-relaxed bg-ussh-cream-50 p-4 rounded-xl border-l-4 border-ussh-accent">
            {article.summary}
          </p>

          {/* Full Paragraphs */}
          <div className="space-y-4 text-[13px] leading-relaxed text-slate-700 font-normal">
            {article.contentParagraphs && article.contentParagraphs.length > 0 ? (
              article.contentParagraphs.map((paragraph, idx) => {
                // Secondary Image insertion at mid-point (around paragraph 3)
                const showSecondaryImage = idx === 3 && article.secondaryImage;

                return (
                  <React.Fragment key={idx}>
                    <p className="text-[13px] leading-relaxed text-slate-700 font-normal">
                      {paragraph}
                    </p>

                    {showSecondaryImage && (
                      <div className="my-6 space-y-2">
                        <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.secondaryImage!.url}
                            alt=""
                            className="w-full max-h-[420px] object-cover"
                          />
                        </div>
                        {article.secondaryImage!.caption && (
                          <p className="text-[11px] italic text-slate-500 text-center font-normal px-2">
                            {article.secondaryImage!.caption.replace(/^Chú thích ảnh:\s*/i, '')}
                          </p>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <p className="text-[13px] leading-relaxed text-slate-700 font-normal">
                {article.content || article.summary}
              </p>
            )}
          </div>

          {/* Secondary Image if not inserted inline */}
          {article.secondaryImage && (!article.contentParagraphs || article.contentParagraphs.length <= 3) && (
            <div className="my-6 space-y-2">
              <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.secondaryImage.url}
                  alt=""
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
              {article.secondaryImage.caption && (
                <p className="text-[11px] italic text-slate-500 text-center font-normal px-2">
                  {article.secondaryImage.caption.replace(/^Chú thích ảnh:\s*/i, '')}
                </p>
              )}
            </div>
          )}

          {/* Specialized Info Box (e.g. Tiếp nhận hiện vật, Đăng ký hội thảo) */}
          {article.infoBox && (
            <div className="mt-8 rounded-2xl bg-[#F6ECE4] border border-[#E4D1C4] p-5 sm:p-6 space-y-4 shadow-soft">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-ussh-accent" />
                <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight text-ussh-navy font-sans">
                  {article.infoBox.title}
                </h3>
              </div>

              {article.infoBox.description && (
                <p className="text-[13px] text-slate-700 font-normal leading-relaxed">
                  {article.infoBox.description}
                </p>
              )}

              {article.infoBox.items && article.infoBox.items.length > 0 && (
                <ul className="space-y-2 text-[13px] text-slate-700">
                  {article.infoBox.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-ussh-accent font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {article.infoBox.details && article.infoBox.details.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E4D1C4]/80 text-[13px]">
                  {article.infoBox.details.map((detail, i) => (
                    <div key={i} className="bg-white/80 rounded-xl p-3 border border-[#E4D1C4]">
                      <span className="font-semibold text-ussh-navy block text-xs">{detail.label}:</span>
                      <span className="text-slate-700">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {article.infoBox.contact && (
                <div className="bg-white/90 rounded-xl p-4 border border-[#E4D1C4] text-[13px] space-y-1">
                  <div className="font-bold text-ussh-navy">Liên hệ đầu mối:</div>
                  <div className="font-semibold text-slate-800">{article.infoBox.contact.name} - {article.infoBox.contact.title}</div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    {article.infoBox.contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-ussh-accent" />
                        Điện thoại: <strong>{article.infoBox.contact.phone}</strong>
                      </span>
                    )}
                    {article.infoBox.contact.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-ussh-accent" />
                        Email: <strong>{article.infoBox.contact.email}</strong>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {article.infoBox.link && (
                <div className="pt-2">
                  <a
                    href={article.infoBox.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ussh-accent text-white font-bold text-xs hover:bg-ussh-accent-hover transition-colors shadow-xs"
                  >
                    <span>{article.infoBox.linkText || 'Xem chi tiết & Đăng ký'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Author signature footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Tác giả: <strong className="text-ussh-navy uppercase font-semibold">{article.author.name}</strong>
            </div>
            <div className="text-[11px] text-slate-400">
              Inside USSH • Trường ĐH KHXH&NV, ĐHQG-HCM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
