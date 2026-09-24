'use client';

import React from 'react';
import { Megaphone } from 'lucide-react';

export function TopAnnouncementBar() {
  return (
    <div
      className="bg-ussh-navy-deep text-white text-xs border-b border-white/10 relative z-40"
      role="region"
      aria-label="Thông báo khẩn cấp đầu trang"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
        {/* Brand Announcement / Ticker */}
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ussh-accent text-white font-semibold text-[11px] uppercase tracking-wider shrink-0 animate-pulse">
            <Megaphone className="w-3 h-3" />
            Tin mới
          </span>

          <div className="overflow-hidden whitespace-nowrap w-full relative">
            <div className="inline-block animate-ticker hover:[animation-play-state:paused] font-medium text-slate-200">
              <span className="mr-8">
                CHÀO MỪNG ĐẾN VỚI INSIDE USSH - BẢN TIN NỘI BỘ DÀNH RIÊNG CHO GIẢNG VIÊN, CÁN BỘ VIÊN CHỨC & NGƯỜI LAO ĐỘNG
              </span>
              <span className="mr-8 text-amber-300">★</span>
              <span className="mr-8">
                Thông báo: Đăng ký khám sức khỏe định kỳ năm 2026 trước ngày 25/09 tại Phòng Quản trị - Thiết bị
              </span>
              <span className="mr-8 text-amber-300">★</span>
              <span className="mr-8">
                Hạn chót nộp hồ sơ đề tài NCKH Cấp Cơ sở đợt 2: 17h00 ngày 30/09/2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
