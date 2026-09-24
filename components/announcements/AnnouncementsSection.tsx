'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementItem, AnnouncementPriority, AnnouncementType } from '@/types/announcements';
import { announcementsService } from '@/lib/services/announcementsService';
import { AnnouncementCard } from './AnnouncementCard';
import { BellRing, Calendar, Filter, ListFilter } from 'lucide-react';

export function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [selectedType, setSelectedType] = useState<AnnouncementType | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<AnnouncementPriority | undefined>(undefined);

  useEffect(() => {
    announcementsService
      .getAnnouncements({
        type: selectedType,
        priority: selectedPriority,
      })
      .then(setAnnouncements);
  }, [selectedType, selectedPriority]);

  const typeFilters: { key: AnnouncementType | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'notice', label: 'Thông báo chung' },
    { key: 'academic', label: 'Lịch học thuật' },
    { key: 'meeting', label: 'Hội nghị - Họp' },
    { key: 'training', label: 'Chương trình tập huấn' },
  ];

  return (
    <section
      id="announcements"
      className="py-12 bg-white border-t border-slate-100"
      aria-label="Thông báo nội bộ và lịch công tác"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ussh-accent uppercase tracking-wider mb-2">
              <BellRing className="w-4 h-4" />
              <span>Văn phòng & Điều hành</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ussh-navy tracking-tight">
              Thông Báo Nội Bộ & Lịch Công Tác
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Theo dõi kịp thời các thông báo khẩn, kế hoạch năm học, lịch họp giao ban và chương trình bồi dưỡng chuyên môn.
            </p>
          </div>

          {/* Priority Quick Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Lọc theo mức độ:</span>
            <select
              value={selectedPriority || 'all'}
              onChange={(e) =>
                setSelectedPriority(
                  e.target.value === 'all'
                    ? undefined
                    : (e.target.value as AnnouncementPriority)
                )
              }
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-ussh-navy shadow-xs"
              aria-label="Lọc thông báo theo mức độ ưu tiên"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="urgent">Khẩn (Urgent)</option>
              <option value="new">Mới (New)</option>
              <option value="upcoming">Sắp diễn ra (Upcoming)</option>
            </select>
          </div>
        </div>

        {/* Type Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none"
          role="tablist"
          aria-label="Lọc theo loại thông báo"
        >
          {typeFilters.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={selectedType === tab.key}
              onClick={() => setSelectedType(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy ${
                selectedType === tab.key
                  ? 'bg-ussh-navy text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline / Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </section>
  );
}
