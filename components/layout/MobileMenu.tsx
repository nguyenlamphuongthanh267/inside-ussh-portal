'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { X, Search, ChevronRight, ArrowRight } from 'lucide-react';
import { NAV_ITEMS, CURRENT_USER } from '@/constants/navigation';
import { HighContrastToggle } from '@/components/ui/HighContrastToggle';
import { searchAll, SearchResultItem, PopularSuggestion, POPULAR_SUGGESTIONS } from '@/lib/services/searchService';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    return searchQuery.trim() ? searchAll(searchQuery) : [];
  }, [searchQuery]);

  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }
    onClose();
    if (item.routeUrl) {
      window.location.href = item.routeUrl;
      return;
    }
    setTimeout(() => {
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }

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
        }, 300);
      }
    }, 150);
  };

  const handleSelectSuggestion = (sug: PopularSuggestion) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }
    onClose();
    if (sug.routeUrl) {
      window.location.href = sug.routeUrl;
      return;
    }
    setTimeout(() => {
      const targetElement = document.getElementById(sug.targetId);
      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }

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
        }, 300);
      }
    }, 150);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    onClose();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inside_ussh_taskbar_nav', 'true');
    }

    // Small delay to allow the mobile drawer to close before scrolling
    setTimeout(() => {
      if (href === '#home') {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.href = '/';
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.location.hash) {
          history.pushState(null, '', window.location.pathname);
        }
        return;
      }

      if (href.startsWith('/')) {
        window.location.href = href;
        return;
      }

      if (href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
          history.pushState(null, '', href);
        } else {
          window.location.href = `/${href}`;
        }
      }
    }, 120);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Menu điều hướng di động"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-900 border-l border-transparent dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar of drawer */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ussh-logo.png"
                alt="Logo USSH"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-ussh-navy dark:text-white text-sm leading-tight">Inside USSH</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Bản tin nội bộ</span>
            </div>
          </a>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-ussh-navy min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-ussh-cream-100 dark:bg-slate-800/80 border-b border-ussh-border dark:border-slate-700/80 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CURRENT_USER.avatarUrl}
            alt={CURRENT_USER.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">Xin chào,</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-red-100 dark:bg-red-950/60 text-ussh-accent dark:text-rose-300 border border-red-200 dark:border-red-900/50">
                {CURRENT_USER.role}
              </span>
            </div>
            <div className="text-sm font-bold text-ussh-navy dark:text-white truncate">{CURRENT_USER.name}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate">{CURRENT_USER.department}</div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tin tức, sự kiện, nhân vật..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ussh-navy dark:focus:ring-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {!searchQuery.trim() && (
            <div className="mt-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1.5">Gợi ý nhanh (chạm để mở):</div>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {POPULAR_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.keyword}
                    onClick={() => handleSelectSuggestion(sug)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 rounded-lg whitespace-nowrap shrink-0 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-ussh-accent dark:hover:text-amber-400 transition-colors border border-transparent dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800"
                  >
                    {sug.keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Area: Search Results or Navigation list */}
        {searchQuery.trim() ? (
          <div className="p-4 space-y-2 flex-1 overflow-y-auto" aria-label="Kết quả tìm kiếm">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span>{searchResults.length} kết quả tìm được</span>
              <button onClick={() => setSearchQuery('')} className="text-ussh-accent dark:text-amber-400 text-xs font-medium">Xóa</button>
            </div>
            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                Không tìm thấy nội dung phù hợp cho &quot;{searchQuery}&quot;
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSearchResult(item)}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50 dark:hover:bg-slate-800 rounded-xl text-left cursor-pointer transition-colors flex items-start gap-3 border border-transparent dark:border-slate-750"
                >
                  {item.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border inline-block mb-1 ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                    <h5 className="text-xs font-bold text-ussh-navy dark:text-white line-clamp-2 leading-snug">
                      {item.title}
                    </h5>
                    {item.summary && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.summary}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-2" />
                </div>
              ))
            )}
          </div>
        ) : (
          /* Navigation list */
          <nav className="p-4 space-y-1 flex-1" aria-label="Menu di động">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <div key={item.href} className="py-0.5">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-ussh-navy dark:bg-slate-800 text-white font-semibold shadow-xs'
                      : item.isSpecialPill
                      ? 'bg-red-50 dark:bg-red-950/40 text-ussh-accent dark:text-rose-300 font-semibold hover:bg-red-100 dark:hover:bg-red-900/60'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.avatarIcon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.avatarIcon}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                </a>

                {/* Submenu if dropdown */}
                {item.dropdownItems && (
                  <div className="ml-4 mt-1 pl-3 border-l-2 border-slate-100 dark:border-slate-800 space-y-1">
                    {item.dropdownItems.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        onClick={(e) => handleNavClick(e, sub.href)}
                        className="block px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-ussh-navy dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 min-h-[36px]"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        )}

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Chế độ Ngày - Đêm</span>
            <HighContrastToggle />
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
            © 2026 Inside USSH • ĐH KHXH&NV ĐHQG-HCM
          </div>
        </div>
      </div>
    </div>
  );
}
