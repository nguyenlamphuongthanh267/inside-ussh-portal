'use client';

import React from 'react';
import { AboutUniversityData } from '@/types/about';
import {
  Compass,
  Target,
  History,
  GraduationCap,
  Globe,
  Handshake,
  Building2,
  Sparkles,
  MapPin,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export interface AboutSectionProps {
  data: AboutUniversityData;
}

export function AboutSection({ data }: AboutSectionProps) {
  const statIcons: { [key: string]: React.ElementType } = {
    History,
    GraduationCap,
    Globe,
    Handshake,
    Building2,
    Sparkles,
  };

  return (
    <section
      id="about"
      className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-gradient-to-b from-white via-ussh-cream-50 to-white border-t border-slate-200/80"
      aria-label="Giới thiệu Trường Đại học Khoa học Xã hội và Nhân văn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Magazine Eyebrow & Slogan Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ussh-navy-subtle text-ussh-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-ussh-accent" />
            <span>Di sản & Bản sắc Nhân Văn</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-ussh-navy font-sans tracking-normal mb-4 leading-tight">
            &ldquo;{data.slogan}&rdquo;
          </h2>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-ussh-accent mb-4">
            {data.englishSlogan}
          </p>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
            {data.historySummary}
          </p>
        </div>

        {/* Dual Core Pillars: Philosophy & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Triết lý giáo dục */}
          <div className="bg-gradient-to-br from-ussh-navy to-ussh-navy-dark text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 mb-4 border border-white/10 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                Triết lý giáo dục
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans mt-1 mb-3 text-white">
                {data.educationalPhilosophy}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                Kiến tạo một không gian đại học khai phóng, nơi khơi dậy tinh thần dấn thân, sự thấu cảm và rèn luyện sự nhạy bén cho người học trước các vấn đề đương đại, giúp họ sẵn sàng trở thành những cá nhân ưu tú tạo tác động xã hội sâu sắc.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-medium">
              <span>Đại học Văn khoa 1957</span>
              <span>•</span>
              <span>ĐH Tổng hợp TP.HCM</span>
              <span>•</span>
              <span>USSH-VNUHCM</span>
            </div>
          </div>

          {/* Giá trị cốt lõi */}
          <div className="bg-gradient-to-br from-[#B93815] to-[#8C1D04] text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-200 mb-4 border border-white/10 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-200">
                Phương châm hành động
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans mt-1 mb-3 text-white">
                Sáng tạo — Dẫn dắt — Trách nhiệm
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-100 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span><strong>Sáng tạo:</strong> Tiên phong trong đổi mới phương pháp nghiên cứu và tư duy phản biện.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span><strong>Dẫn dắt:</strong> Định hình và lan tỏa các giá trị học thuật khoa học xã hội & nhân văn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span><strong>Trách nhiệm:</strong> Tận tâm với người học, gắn kết bền chặt và phục vụ cộng đồng.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-amber-200 font-medium">
              <span>Giá trị văn hóa Người Nhân Văn</span>
            </div>
          </div>
        </div>

        {/* Elegant Statistics Cards (Facts & Figures) */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-ussh-navy uppercase tracking-wider">
              Những con số biết nói
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-ussh-navy tracking-tight mt-1">
              Quy Mô & Vị Thế Học Thuật
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {data.stats.map((stat) => {
              const IconComponent = statIcons[stat.iconName] || BookOpen;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-ussh-accent/40 transition-all text-center flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-ussh-cream-100 text-ussh-navy flex items-center justify-center mx-auto mb-2 group-hover:bg-red-50 group-hover:text-ussh-accent transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-ussh-navy group-hover:text-ussh-accent transition-colors font-sans">
                      {stat.value}
                      <span className="text-ussh-accent text-lg font-sans ml-0.5">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                      {stat.label}
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-2 leading-tight line-clamp-2">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Spotlights: Saigon & Thu Duc */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold text-ussh-accent uppercase tracking-wider">
                Khuôn viên trường
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ussh-navy tracking-tight mt-0.5">
                Không Gian Học Thuật & Đời Sống
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Hai cơ sở đào tạo hiện đại, đáp ứng toàn diện nghiên cứu và trải nghiệm sinh thái.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.campuses.map((campus) => (
              <div
                key={campus.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all group flex flex-col md:flex-row"
              >
                {/* Campus Image */}
                <div className="md:w-5/12 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={campus.imageUrl}
                    alt={campus.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-ussh-navy/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {campus.shortName}
                  </div>
                </div>

                {/* Campus Details */}
                <div className="md:w-7/12 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug mb-1.5">
                      {campus.name}
                    </h4>

                    <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-ussh-accent shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{campus.address}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-700 mb-4">
                      {campus.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-ussh-accent shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Trường ĐH KHXH&NV</span>
                    <a
                      href="#gallery"
                      className="text-ussh-accent font-semibold hover:underline"
                    >
                      Xem ảnh khuôn viên →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
