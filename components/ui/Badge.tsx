import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'urgent' | 'new' | 'upcoming' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'sm', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';

  const variants = {
    primary: 'bg-ussh-navy-subtle text-ussh-navy border border-ussh-navy/20',
    secondary: 'bg-ussh-cream-200 text-amber-900 border border-amber-800/15',
    urgent: 'bg-red-50 text-red-700 border border-red-200 font-semibold',
    new: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold',
    upcoming: 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold',
    outline: 'border border-slate-300 text-slate-700 bg-white/70',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3 py-1 gap-2',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
