'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  GraduationCap,
  Sparkles,
  Gamepad2,
  Smile,
  Vote,
  ExternalLink,
  X,
  CheckCheck,
} from 'lucide-react';
import { NAV_ITEMS, CURRENT_USER } from '@/constants/navigation';
import { MobileMenu } from './MobileMenu';
import { HighContrastToggle } from '@/components/ui/HighContrastToggle';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { SearchResultItem, PopularSuggestion } from '@/lib/services/searchService';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isNotifRead, setIsNotifRead] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('inside_ussh_notifs_read');
      if (stored === 'true') setIsNotifRead(true);
    }
  }, []);

  const handleMarkAllRead = () => {
    setIsNotifRead(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('inside_ussh_notifs_read', 'true');
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }
    setSearchOpen(false);
    setSearchQuery('');
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      history.pushState(null, '', `#${sectionId}`);
      setActiveSection(sectionId);
    }
  };

  const handleSelectSuggestion = (sug: PopularSuggestion) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }
    setSearchOpen(false);
    setSearchQuery('');

    if (sug.routeUrl) {
      window.location.href = sug.routeUrl;
      return;
    }

    handleNavigateSection(sug.targetId);

    if (sug.actionType !== 'scroll') {
      const modalType = sug.actionType.replace('open-', '');
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('inside-ussh:open-modal', {
            detail: {
              type: modalType,
              id: sug.modalId,
            },
          })
        );
      }, 350);
    }
  };

  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }
    setSearchOpen(false);
    setSearchQuery('');

    if (item.routeUrl) {
      window.location.href = item.routeUrl;
      return;
    }

    handleNavigateSection(item.targetId);

    if (item.actionType !== 'scroll') {
      const modalType = item.actionType.replace('open-', '');
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('inside-ussh:open-modal', {
            detail: {
              type: modalType,
              id: item.modalId,
            },
          })
        );
      }, 350);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }

    if (href === '#home') {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
        return;
      }
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
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
        setActiveSection(targetId);
      } else {
        e.preventDefault();
        window.location.href = `/${href}`;
      }
    }
  };

  useEffect(() => {
    if (window.location.hash === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If at or near top, always set active to home
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      const sections = ['home', 'about', 'news', 'people', 'gallery', 'entertainment'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setDropdownOpen(false);
        setNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-soft py-2 sm:py-2.5 border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-ussh-cream-100 dark:bg-slate-900 py-2.5 sm:py-3.5 border-b border-ussh-border dark:border-slate-800'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-3">
          {/* Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy rounded-xl p-0.5"
            aria-label="Inside USSH - Về trang chủ"
          >
            {/* USSH Official Logo */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ussh-logo.png"
                alt="Logo Trường ĐH Khoa học Xã hội và Nhân văn - ĐHQG-HCM"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>

            <div className="flex flex-col shrink-0">
              <span className="text-[15px] sm:text-lg font-black tracking-tight text-ussh-navy dark:text-white leading-none group-hover:text-ussh-accent transition-colors whitespace-nowrap">
                Inside USSH
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide mt-0.5 sm:mt-1 whitespace-nowrap">
                Bản tin nội bộ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-0.5 xl:gap-1 2xl:gap-2 text-xs xl:text-[13px] font-semibold px-2" aria-label="Menu chính">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');

              // Dropdown for "Phút thư giãn"
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 transition-colors font-medium cursor-pointer whitespace-nowrap shrink-0 ${
                        dropdownOpen || isActive
                          ? 'text-ussh-accent dark:text-amber-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180 text-ussh-accent' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-hover border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Chuyên mục thư giãn
                        </div>
                        <Link
                          href="/phut-thu-gian/minigame"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-start gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-ussh-cream-100 dark:hover:bg-slate-700 hover:text-ussh-navy transition-colors group rounded-xl"
                        >
                          <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-ussh-accent group-hover:bg-red-100">
                            <Gamepad2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-slate-800 dark:text-slate-100">Minigame hằng tháng</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">Khoanh chữ & đố vui trí tuệ</div>
                          </div>
                        </Link>
                        <Link
                          href="/phut-thu-gian/chuyen-vui"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-start gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-ussh-cream-100 dark:hover:bg-slate-700 hover:text-ussh-navy transition-colors group rounded-xl"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 group-hover:bg-amber-100">
                            <Smile className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-slate-800 dark:text-slate-100">Bài funny văn phòng</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">Tiếng cười sau giờ lên lớp</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Link
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-2 xl:px-2.5 py-1.5 transition-colors font-medium whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-ussh-accent dark:text-amber-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 xl:gap-3 shrink-0">
            {/* Search Input on taskbar with real-time dropdown matching mockup (desktop) */}
            <div className="hidden md:flex items-center relative" ref={searchRef}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!searchOpen) setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onClick={() => setSearchOpen(true)}
                  placeholder="Tìm kiếm..."
                  className="w-24 xl:w-32 pl-8 pr-7 py-1.5 bg-white/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 rounded-full text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ussh-navy dark:focus:ring-slate-400 focus:w-44 transition-all shadow-xs"
                  aria-label="Tìm kiếm trên trang"
                  aria-expanded={searchOpen}
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2 top-1/2 -translate-y-1/2 rounded-full transition-colors"
                    title="Xóa tìm kiếm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Real-time search dropdown panel right under input */}
              <SearchDropdown
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                query={searchQuery}
                setQuery={(q) => {
                  setSearchQuery(q);
                  setSearchOpen(true);
                }}
                onSelectResult={handleSelectSearchResult}
                onNavigateSection={handleNavigateSection}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 text-slate-700 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full md:hidden transition-colors flex items-center justify-center shrink-0"
              aria-label="Tìm kiếm nội dung"
              title="Tìm kiếm"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative shrink-0 flex items-center" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 text-slate-700 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy cursor-pointer flex items-center justify-center shrink-0"
                aria-label={isNotifRead ? 'Thông báo nội bộ' : 'Xem 3 thông báo mới'}
              >
                <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {!isNotifRead && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="fixed inset-x-3 sm:inset-x-auto top-16 sm:top-full sm:right-0 mt-1 sm:mt-2 w-auto sm:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-hover border border-slate-200/90 dark:border-slate-700 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-bold text-ussh-navy dark:text-white">Thông báo nội bộ</span>
                    {isNotifRead ? (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5" /> Đã đọc hết
                      </span>
                    ) : (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-ussh-accent dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-50 dark:divide-slate-700/60 max-h-72 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs transition-colors cursor-pointer">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">Đăng ký khám sức khỏe định kỳ 2026</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Phòng Quản trị - Thiết bị • 2 giờ trước</div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs transition-colors cursor-pointer">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">Hội thao & Văn nghệ Quý 4/2026</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Công đoàn USSH • Hôm qua</div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs transition-colors cursor-pointer">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">Bồi dưỡng kỹ năng AI trong giảng dạy</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Trung tâm Kỹ năng số • 2 ngày trước</div>
                    </div>
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-700 text-center">
                    <a
                      href="#news"
                      onClick={(e) => {
                        setNotifOpen(false);
                        handleNavClick(e, '#news');
                      }}
                      className="text-xs font-semibold text-ussh-navy dark:text-amber-300 hover:underline"
                    >
                      Xem tất cả tin tức →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Day / Night Theme Toggle */}
            <div className="shrink-0 flex items-center">
              <HighContrastToggle />
            </div>

            {/* User Avatar with Profile Greeting (tablet / desktop) */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2.5 xl:pl-3 border-l border-slate-300 dark:border-slate-700 shrink-0">
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CURRENT_USER.avatarUrl}
                  alt={CURRENT_USER.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-rose-200/90 dark:border-slate-700 shadow-sm bg-rose-50/80 shrink-0"
                />
              </div>
              <div className="text-left hidden lg:flex lg:flex-col justify-center max-w-[110px] xl:max-w-[160px]">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-extrabold text-ussh-navy dark:text-white leading-tight truncate min-w-0">
                    {CURRENT_USER.name}
                  </span>
                  <span className="px-1 py-0.5 text-[8px] font-bold rounded bg-red-100 text-ussh-accent border border-red-200 leading-none whitespace-nowrap shrink-0">
                    {CURRENT_USER.role}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 truncate hidden xl:block">
                  {CURRENT_USER.department}
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 text-slate-700 dark:text-slate-300 hover:text-ussh-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full lg:hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy flex items-center justify-center shrink-0"
              aria-label="Mở menu di động"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}
