'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';

interface Member {
  name: string;
  mssv: string;
  role?: string;
}

const MEMBERS: Member[] = [
  { name: 'Nguyễn Thị My', mssv: '2456030049' },
  { name: 'Trần Thảo Quyên', mssv: '2456030083' },
  { name: 'Nguyễn Thị Như Quỳnh', mssv: '2456030085' },
  { name: 'Nguyễn Lâm Phương Thanh', mssv: '2456030088', role: 'Quản trị viên' },
  { name: 'Nguyễn Phương Thảo', mssv: '2456030091' },
];

const COUNTDOWN_TOTAL = 8000; // 8 seconds — đủ thời gian cô giáo đọc

export function ProjectIntroModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(8);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Countdown timer — reset khi isOpen thay đổi
  useEffect(() => {
    if (!isOpen) return;
    elapsedRef.current = 0;

    const intervalMs = 50;
    const interval = setInterval(() => {
      if (isPaused) return;
      elapsedRef.current += intervalMs;
      const remainingMs = Math.max(0, COUNTDOWN_TOTAL - elapsedRef.current);
      setProgress((remainingMs / COUNTDOWN_TOTAL) * 100);
      setTimeLeft(Math.ceil(remainingMs / 1000));
      if (remainingMs <= 0) {
        clearInterval(interval);
        setIsOpen(false);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  // Fireworks Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      alpha: number; color: string;
      size: number; gravity: number;
      friction: number; decay: number;
      shape: 'circle' | 'star' | 'ribbon';
      rotation: number; vRot: number;
    }

    const particles: Particle[] = [];
    const colors = [
      '#FF3838', '#FF9F1A', '#FFD32A', '#2ED573',
      '#1E90FF', '#E056FD', '#FF6B81', '#00D2D3', '#FFFFFF',
    ];

    const createBurst = (x: number, y: number, count = 45) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          gravity: 0.09,
          friction: 0.965,
          decay: Math.random() * 0.016 + 0.011,
          shape: Math.random() > 0.35 ? 'circle' : Math.random() > 0.5 ? 'star' : 'ribbon',
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    // Initial bursts
    createBurst(width * 0.15, height * 0.25, 55);
    createBurst(width * 0.85, height * 0.25, 55);
    createBurst(width * 0.5, height * 0.12, 65);
    createBurst(width * 0.3, height * 0.18, 45);
    createBurst(width * 0.7, height * 0.18, 45);

    let lastBurst = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();
      if (now - lastBurst > 500) {
        lastBurst = now;
        createBurst(width * (0.1 + Math.random() * 0.8), height * (0.05 + Math.random() * 0.35), 40);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction; p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx; p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === 'star') {
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size);
            ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 2));
          }
          ctx.closePath(); ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.size, -p.size / 3, p.size * 2.2, p.size);
        } else {
          ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setTimeLeft(8);
    setProgress(100);
    elapsedRef.current = 0;
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Floating Replay Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 text-ussh-navy text-xs sm:text-sm font-extrabold shadow-2xl border-2 border-amber-400 hover:scale-105 transition-all backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 cursor-pointer ring-4 ring-amber-100"
          title="Xem lại thông tin đề án"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 bg-clip-text text-transparent font-black">
            🎓 Thông tin Đề án
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </button>
      )}

      {/* Main Intro Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Thông tin giới thiệu môn học và nhóm đề án"
        >
          {/* Fireworks canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* Ambient glow — desktop only */}
          <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-300/25 rounded-full blur-3xl pointer-events-none animate-pulse delay-500" />

          {/* Modal Card
              Mobile: bottom sheet style (rounded-t-3xl, full width, max-height 92dvh + scroll)
              Desktop: centered card (max-w-2xl, rounded-3xl)
          */}
          <div
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
            onTouchStart={() => isMobile && setIsPaused(true)}
            onTouchEnd={() => isMobile && setIsPaused(false)}
            className="relative z-20 w-full sm:max-w-2xl sm:mx-4
              bg-white
              rounded-t-3xl sm:rounded-3xl
              shadow-[0_-8px_40px_-4px_rgba(153,0,0,0.25)] sm:shadow-[0_25px_80px_-10px_rgba(153,0,0,0.35)]
              border-t-2 sm:border-2 border-amber-300
              overflow-hidden
              animate-in slide-in-from-bottom sm:zoom-in-95 duration-300
              flex flex-col
              max-h-[92dvh] sm:max-h-[90vh]
            "
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 z-10" />

            {/* Mobile drag handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>

            {/* Scrollable content area */}
            <div className="overflow-y-auto flex-1 px-5 pt-3 pb-2 sm:px-8 sm:pt-8 sm:pb-4">

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-30 cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Institution Header */}
              <div className="text-center pb-4 border-b border-amber-200/80">
                <div className="inline-flex items-center justify-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ussh-logo.png"
                    alt="Logo USSH"
                    className="w-11 h-11 sm:w-14 sm:h-14 object-contain drop-shadow-sm shrink-0"
                  />
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-ussh-navy leading-snug">
                      ĐHQG-HCM · Trường ĐH Khoa học Xã hội và Nhân văn
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-ussh-accent tracking-wide uppercase mt-0.5">
                      Khoa Báo Chí & Truyền Thông
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-50 via-amber-50 to-red-50 border border-amber-300 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span className="text-[10px] sm:text-xs font-black text-amber-900 tracking-wider uppercase">
                    Báo cáo thực hành đề án môn học
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                </span>
              </div>

              {/* Course & Instructor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {/* Course */}
                <div className="bg-amber-50/80 rounded-2xl p-3.5 sm:p-4 border border-amber-200 flex items-start gap-3 shadow-sm">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-sm shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Môn học</div>
                    <div className="text-sm sm:text-base font-black text-ussh-navy leading-tight mt-0.5">
                      Quan hệ công chúng
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-amber-900">
                      <span>Mã HP:</span>
                      <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono font-black text-ussh-accent text-[10px] sm:text-xs">
                        2610BCH088.2L0
                      </code>
                    </div>
                  </div>
                </div>

                {/* Teacher */}
                <div className="bg-red-50/80 rounded-2xl p-3.5 sm:p-4 border border-red-200 flex items-start gap-3 shadow-sm">
                  <div className="p-2.5 rounded-xl bg-ussh-accent text-white shadow-sm shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Giảng viên</div>
                    <div className="text-sm sm:text-base font-black text-red-700 leading-tight mt-0.5">
                      Th.S Vũ Thị Như Quỳnh
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-600 font-medium mt-1">
                      Kính gửi cô giáo nghiệm thu đề án
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Title */}
              <div className="bg-gradient-to-r from-ussh-navy via-slate-800 to-ussh-navy text-white rounded-2xl p-3.5 sm:p-4 text-center mb-4 shadow-lg border border-amber-300/30">
                <div className="text-[9px] sm:text-xs uppercase tracking-widest text-amber-300 font-black">
                  Sản phẩm đề án thực tế
                </div>
                <div className="text-sm sm:text-xl font-black tracking-tight mt-1 leading-snug">
                  Bản Tin Nội Bộ &amp; Cổng Thông Tin &ldquo;Inside USSH&rdquo;
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-ussh-accent shrink-0" />
                    <span className="text-[10px] sm:text-xs uppercase font-black text-slate-700 tracking-wide">Tên nhóm:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] sm:text-xs font-black border border-red-300">
                      🐎 Con Ngựa Bá Khí QHCC
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">5 thành viên</span>
                </div>

                {/* Members Grid — 1 col mobile, 2 col sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MEMBERS.map((m, idx) => (
                    <div
                      key={m.mssv}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        m.role
                          ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200/50'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-ussh-navy text-white text-xs font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-black text-slate-800 truncate">{m.name}</div>
                          <div className="text-[10px] sm:text-xs text-slate-500 font-mono font-bold">MSSV: {m.mssv}</div>
                        </div>
                      </div>
                      {m.role && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black bg-ussh-accent text-white shrink-0 ml-2">
                          {m.role}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — fixed at bottom of modal */}
            <div className="px-5 sm:px-8 py-3 sm:py-4 border-t border-slate-200 bg-white shrink-0">
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-full transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* Status text */}
                <div className="text-[10px] sm:text-xs text-slate-600 min-w-0">
                  {isPaused ? (
                    <span className="text-amber-600 font-bold inline-flex items-center gap-1 animate-pulse">
                      <span>⏸</span>
                      <span className="hidden sm:inline">Đang tạm dừng</span>
                      <span className="sm:hidden">Giữ...</span>
                    </span>
                  ) : (
                    <span>
                      Vào website sau{' '}
                      <strong className="text-ussh-accent font-black text-xs sm:text-sm">{timeLeft}s</strong>
                      <span className="hidden sm:inline"> · {isMobile ? 'chạm giữ để đọc' : 'rê chuột để dừng'}</span>
                    </span>
                  )}
                </div>

                {/* CTA button */}
                <button
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-ussh-accent to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg hover:scale-105 transition-all focus:outline-none cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
