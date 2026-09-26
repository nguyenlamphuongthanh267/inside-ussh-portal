'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Gamepad2,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Calendar,
} from 'lucide-react';
import { MOCK_MINIGAME_DOCX } from '@/constants/mockData';

export function MinigamePageView() {
  const game = MOCK_MINIGAME_DOCX;

  return (
    <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 pb-20">
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

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Tổng giải thưởng: {game.totalPrizes}
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ussh-accent/10 dark:bg-amber-500/20 text-ussh-accent dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5" />
            {game.badge} • THỬ THÁCH TRÍ TUỆ
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bản tin Inside USSH</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-tight text-ussh-navy dark:text-white font-sans leading-snug mb-3">
          {game.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-6 font-medium">
          Dành cho: <strong className="text-ussh-navy dark:text-amber-400">{game.targetAudience}</strong>
        </p>

        {/* Poster Image - Shrink-to-fit without gray gutters */}
        <div className="my-6 space-y-2 text-center">
          <div className="inline-block rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={game.imageUrl}
              alt="Poster Minigame Khoanh chữ tìm dấu ấn Nhân Văn"
              className="w-auto max-w-full max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain block mx-auto"
            />
          </div>
          <p className="text-xs italic text-slate-500 dark:text-slate-400 text-center">
            Gợi ý: Có một từ khóa chỉ đọc được khi xoay bản tin 180 độ!
          </p>
        </div>

        {/* Description intro */}
        <div className="my-6 bg-[#F6ECE4]/80 dark:bg-slate-800/80 p-4 sm:p-5 rounded-2xl border-l-4 border-ussh-accent dark:border-amber-400 shadow-xs">
          <p className="text-[15px] sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* 3 Steps to Participate */}
        <div className="my-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-ussh-navy dark:text-white uppercase tracking-tight font-sans flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-ussh-accent dark:text-amber-400" />
            <span>Cách thức tham gia (03 bước đơn giản)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {game.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-ussh-accent/40 dark:hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-ussh-accent text-white flex items-center justify-center font-bold text-sm mb-3 shadow-2xs">
                    0{idx + 1}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Structure */}
        <div className="my-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-ussh-navy dark:text-white uppercase tracking-tight font-sans flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Cơ cấu giải thưởng (Tổng giá trị: {game.totalPrizes})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {game.prizes.map((p, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 dark:from-slate-800 dark:to-slate-800/60 border border-amber-200/80 dark:border-amber-500/30 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold block">
                    {p.rank} ({p.count})
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-ussh-navy dark:text-white mt-0.5">
                    {p.amount}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                    Tiêu chí: {p.note}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Summary */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 space-y-4">
          <h3 className="font-bold text-base uppercase text-ussh-navy dark:text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-ussh-accent dark:text-amber-400" />
            <span>Quy định & Thể lệ trao giải</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {game.rulesSummary.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action Button */}
        <div className="my-10 p-8 rounded-3xl bg-gradient-to-r from-ussh-navy to-ussh-navy-dark dark:from-slate-900 dark:to-slate-800 border dark:border-slate-700 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-sans">
            Sẵn sàng thử thách trí tuệ cùng Inside USSH?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Điền đáp án ngay bây giờ để trở thành người may mắn nhận giải thưởng cao nhất của số phát hành tháng này!
          </p>
          <div className="pt-2">
            <a
              href={game.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-ussh-accent hover:bg-ussh-accent-hover text-white text-sm sm:text-base font-bold transition-all shadow-md hover:scale-[1.02]"
            >
              <span>Gửi đáp án qua Google Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
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
              href="/phut-thu-gian/chuyen-vui"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-ussh-accent dark:hover:text-amber-400 hover:border-ussh-accent/40 dark:hover:border-slate-600 bg-white dark:bg-slate-800 transition-colors"
            >
              <span>Chuyện vui Nhân văn</span>
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
    </div>
  );
}
