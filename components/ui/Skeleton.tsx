import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-slate-200/80', className)}
      {...props}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-soft space-y-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-6 w-5/6 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
