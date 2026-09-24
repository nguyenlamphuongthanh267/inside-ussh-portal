'use client';

import React from 'react';
import { PersonProfile } from '@/types/people';
import { Quote } from 'lucide-react';

export interface ProfileCardProps {
  person: PersonProfile;
  onClick?: () => void;
  isSelected?: boolean;
}

export function ProfileCard({ person, onClick, isSelected }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center text-center p-5 rounded-2xl bg-white border transition-all duration-300 min-w-[220px] max-w-[240px] shrink-0 cursor-pointer ${
        isSelected
          ? 'border-ussh-accent shadow-card ring-2 ring-ussh-accent/20'
          : 'border-slate-200/80 shadow-soft hover:shadow-card hover:border-ussh-accent/40'
      }`}
      aria-label={`${person.academicTitle} ${person.name}`}
    >
      {/* Portrait Photo */}
      <div className="relative mb-3.5">
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-soft group-hover:scale-105 transition-transform duration-300 bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.avatarUrl}
            alt={`${person.academicTitle} ${person.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Name (Roboto uppercase bold) */}
      <h3 className="font-bold text-sm text-ussh-navy line-clamp-1 mb-1 font-sans">
        {person.academicTitle} {person.name}
      </h3>

      {/* Position */}
      <p className="text-[12px] font-medium text-ussh-accent line-clamp-2 leading-tight mb-2">
        {person.position}
      </p>

      {/* Faculty/Department */}
      <p className="text-[11px] text-slate-500 line-clamp-1 mb-3">
        {person.facultyDepartment}
      </p>

      {/* Short Quote Preview */}
      <div className="mt-auto pt-2.5 border-t border-slate-100 w-full flex items-start gap-1 text-[11px] italic text-slate-600 line-clamp-2 text-left">
        <Quote className="w-3 h-3 text-ussh-accent shrink-0 mt-0.5" />
        <span className="line-clamp-2">{person.quote}</span>
      </div>
    </div>
  );
}
