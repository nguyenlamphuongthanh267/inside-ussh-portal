'use client';

import React, { useState } from 'react';
import {
  Gamepad2,
  Smile,
  Award,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ChevronRight,
  X,
  Share2,
} from 'lucide-react';
import { MOCK_FUNNY_STORY, MOCK_MINIGAME_DOCX } from '@/constants/mockData';

export function EntertainmentSection() {
  const [isMinigameOpen, setIsMinigameOpen] = useState(false);
  const [isFunnyOpen, setIsFunnyOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [showFullRules, setShowFullRules] = useState(false);
  const [funnyLiked, setFunnyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(256);

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
      id="entertainment"
      className="scroll-mt-20 sm:scroll-mt-24 py-14 bg-[#FBF8F4] border-t border-slate-200/80"
      aria-label="Phút thư giãn Inside USSH"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ussh-accent uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-ussh-accent" />
              <span>Góc thư giãn nội bộ</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-ussh-navy tracking-tight font-sans">
                Phút thư giãn
              </h2>
              <div className="flex items-center gap-1">
                <span className="w-8 h-1 bg-ussh-accent rounded-full" />
                <span className="w-2 h-1 bg-ussh-accent/50 rounded-full" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
              Không gian giải trí nhẹ nhàng, mẩu chuyện dí dỏm đời sống giảng đường và minigame thử thách trí tuệ có thưởng cho cán bộ, giảng viên.
            </p>
          </div>
        </div>

        {/* 2 Main Cards Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Card A: Minigame */}
          <div
            id="minigame"
            onClick={() => setIsMinigameOpen(true)}
            className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
              {/* Badge A */}
              <div className="w-10 h-10 rounded-xl bg-ussh-accent text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                A
              </div>

              {/* Crossword Thumbnail Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/docx/image2.png"
                  alt="Bảng rừng chữ Minigame"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug font-sans">
                  Minigame hàng tuần: Thử thách trí tuệ
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1">
                  Khoanh chữ - Tìm dấu ấn Nhân Văn • 8 từ khóa
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-ussh-accent mt-2 group-hover:underline">
                  <span>Chơi ngay!</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Góc Funny */}
          <div
            id="funny"
            onClick={() => setIsFunnyOpen(true)}
            className="bg-[#F8EFE9] border border-[#E8D8CC] rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-card transition-all cursor-pointer group flex items-center justify-between gap-4 relative"
          >
            <span id="funny-stories" className="scroll-mt-24 absolute top-0 left-0 pointer-events-none" />
            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
              {/* Badge B */}
              <div className="w-10 h-10 rounded-xl bg-ussh-accent text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                B
              </div>

              {/* Coffee/Funny Thumbnail Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/docx/image1.png"
                  alt="Minh họa Góc Funny"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug font-sans">
                  Góc Funny: Những câu chuyện nhỏ trong văn phòng
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1">
                  Sáng Quận 1, chiều Thủ Đức: Khi công chức Nhân Văn hoá phượt thủ
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-ussh-accent mt-2 group-hover:underline">
                  <span>Đọc vui!</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Minigame Details */}
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

      {/* Modal: Funny Story Reader */}
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
