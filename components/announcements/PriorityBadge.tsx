import React from 'react';
import { AnnouncementPriority } from '@/types/announcements';
import { AlertCircle, Sparkles, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PriorityBadgeProps {
  priority: AnnouncementPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const configs = {
    urgent: {
      label: 'Khẩn',
      classes: 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300/50',
      icon: AlertCircle,
      dotClass: 'bg-red-600 animate-pulse',
    },
    new: {
      label: 'Mới',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-300/50',
      icon: Sparkles,
      dotClass: 'bg-emerald-600',
    },
    upcoming: {
      label: 'Sắp diễn ra',
      classes: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-300/50',
      icon: Clock,
      dotClass: 'bg-amber-600',
    },
  };

  const config = configs[priority];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors',
        config.classes,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}
