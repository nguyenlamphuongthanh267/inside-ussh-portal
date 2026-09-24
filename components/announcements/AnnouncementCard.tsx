'use client';

import React from 'react';
import { AnnouncementItem } from '@/types/announcements';
import { PriorityBadge } from './PriorityBadge';
import { Calendar, FileText, Download, Building2, Users, Pin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface AnnouncementCardProps {
  announcement: AnnouncementItem;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const typeIcons = {
    notice: '📢',
    academic: '📅',
    meeting: '👥',
    training: '🎓',
  };

  return (
    <article className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-ussh-navy/40 shadow-soft hover:shadow-card transition-all flex flex-col justify-between relative overflow-hidden">
      {announcement.isPinned && (
        <div className="absolute top-0 right-0">
          <div className="bg-ussh-navy text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-xl flex items-center gap-1 shadow-xs">
            <Pin className="w-2.5 h-2.5 fill-white" />
            Ghim
          </div>
        </div>
      )}

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <PriorityBadge priority={announcement.priority} />
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <span>{typeIcons[announcement.type]}</span>
            <span>{announcement.typeName}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug mb-2">
          {announcement.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {announcement.summary}
        </p>

        {/* Department & Target Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{announcement.department}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{announcement.targetAudience}</span>
          </div>
        </div>
      </div>

      {/* Footer: Dates & Attachment */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Đăng: {formatDate(announcement.publishDate)}
          </span>
          {announcement.dueDate && (
            <span className="text-red-600 font-semibold">
              Hạn: {formatDate(announcement.dueDate)}
            </span>
          )}
        </div>

        {announcement.attachmentName && (
          <a
            href={announcement.attachmentUrl || '#'}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-ussh-navy hover:text-white text-slate-700 text-xs font-medium transition-colors"
            title="Tải văn bản đính kèm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải văn bản</span>
          </a>
        )}
      </div>
    </article>
  );
}
