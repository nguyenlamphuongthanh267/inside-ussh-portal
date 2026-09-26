'use client';

import React from 'react';
import { FOOTER_LINKS } from '@/constants/navigation';
import {
  MapPin,
  Mail,
  Globe,
  ExternalLink,
  ArrowUp,
  ShieldCheck,
  Send,
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === '#home') {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
        return;
      }
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
        history.pushState(null, '', href);
      } else {
        e.preventDefault();
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer
      className="bg-ussh-navy-deep text-white border-t border-white/10 relative z-20"
      role="contentinfo"
      aria-label="Chân trang Inside USSH"
    >
      {/* Top Banner inside Footer matching mockup credentials */}
      <div className="border-b border-white/10 py-8 bg-ussh-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & University Full Name */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            {/* USSH Official Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 bg-white/10 rounded-2xl p-2 border border-white/10 backdrop-blur-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ussh-logo.png"
                alt="Logo Trường ĐH Khoa học Xã hội và Nhân văn - ĐHQG-HCM"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                Đại học Quốc gia Thành phố Hồ Chí Minh
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-normal font-sans uppercase">
                Trường Đại học Khoa học Xã hội và Nhân văn
              </h2>
              <p className="text-xs text-slate-300">
                Inside USSH – Kênh thông tin & truyền thông nội bộ chính thức
              </p>
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Cuộn lên đầu trang"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Col 1: Campuses & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Trụ sở & Cơ sở đào tạo
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-300 font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Cơ sở Sài Gòn:</strong>
                  10-12 Đinh Tiên Hoàng, P. Sài Gòn, TP.HCM
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Cơ sở Linh Xuân:</strong>
                  Khu đô thị ĐHQG-HCM, P. Linh Xuân, TP.HCM
                </div>
              </li>
            </ul>
          </div>

          {/* Col 2: Inside USSH Contribution & Contact (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
                INSIDE USSH
              </h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Mọi tin bài, góp ý, tư liệu kỷ niệm 70 năm và ý kiến đóng góp cho bản tin nội bộ xin vui lòng gửi về:
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[11px] text-slate-400 block">Hộp thư ban biên tập:</span>
                  <a
                    href="mailto:insideussh@gmail.com"
                    className="font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    insideussh@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-400 block">Website chính thức:</span>
                  <a
                    href="https://hcmussh.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>hcmussh.edu.vn</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Sitemap & Portals (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Sơ đồ chuyên mục & Cổng liên kết
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              {FOOTER_LINKS.sitemap.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-amber-300 transition-colors py-1 hover:translate-x-0.5 inline-block transform"
                >
                  • {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
                Hệ thống trực thuộc ĐHQG-HCM:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <a
                    href="https://vnuhcm.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Đại học Quốc gia TP. Hồ Chí Minh</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://vnulib.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Thư viện Trung tâm ĐHQG-HCM</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Accessibility Notice */}
      <div className="border-t border-white/10 py-5 bg-black/40 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM. Bản quyền thuộc về Inside USSH.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Tuân thủ chuẩn WCAG AA
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Hotline: (028) 3829 3828
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
