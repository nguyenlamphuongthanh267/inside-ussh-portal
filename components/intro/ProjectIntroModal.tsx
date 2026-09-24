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

export function ProjectIntroModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Countdown timer with pause on hover
  useEffect(() => {
    if (!isOpen) return;

    const totalMs = 5000;
    const intervalMs = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      if (isPaused) return;

      elapsed += intervalMs;
      const remainingMs = Math.max(0, totalMs - elapsed);
      setProgress((remainingMs / totalMs) * 100);
      setTimeLeft(Math.ceil(remainingMs / 1000));

      if (remainingMs <= 0) {
        clearInterval(interval);
        setIsOpen(false);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  // Fireworks Animation Engine on HTML5 Canvas
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
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      gravity: number;
      friction: number;
      decay: number;
      shape: 'circle' | 'star' | 'ribbon';
      rotation: number;
      vRot: number;
    }

    const particles: Particle[] = [];
    const colors = [
      '#FF3838', // USSH Crimson
      '#FF9F1A', // Radiant Gold
      '#FFD32A', // Sunny Yellow
      '#2ED573', // Emerald
      '#1E90FF', // Royal Blue
      '#E056FD', // Orchid Purple
      '#FF6B81', // Coral Red
      '#00D2D3', // Vivid Cyan
      '#FFFFFF', // Diamond Sparkle
    ];

    const createFireworkBurst = (x: number, y: number, count = 55) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4.5 + 2.5,
          gravity: 0.09,
          friction: 0.965,
          decay: Math.random() * 0.016 + 0.011,
          shape: Math.random() > 0.35 ? 'circle' : Math.random() > 0.5 ? 'star' : 'ribbon',
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    // Initial festive bursts across the screen
    createFireworkBurst(width * 0.18, height * 0.25, 60);
    createFireworkBurst(width * 0.82, height * 0.25, 60);
    createFireworkBurst(width * 0.35, height * 0.18, 55);
    createFireworkBurst(width * 0.65, height * 0.18, 55);
    createFireworkBurst(width * 0.5, height * 0.12, 70);

    // Continuous bursts
    let lastBurst = Date.now();
    const burstInterval = 500;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastBurst > burstInterval) {
        lastBurst = now;
        const rx = width * (0.12 + Math.random() * 0.76);
        const ry = height * (0.1 + Math.random() * 0.35);
        createFireworkBurst(rx, ry, 45);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

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
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.size, -p.size / 3, p.size * 2.2, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  const handleOpen = () => {
    setTimeLeft(5);
    setProgress(100);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Replay Button for Lecturer / Reviewer */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 dark:bg-slate-900/95 text-ussh-navy dark:text-white text-sm font-extrabold shadow-2xl border-2 border-amber-400 dark:border-amber-500 hover:border-ussh-accent hover:shadow-red-500/20 hover:scale-105 transition-all group backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 cursor-pointer ring-4 ring-amber-100 dark:ring-amber-950/50"
          title="Bấm để xem lại thông tin đề án và nhóm làm bài"
          aria-label="Xem lại thông tin đề án môn học"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 bg-clip-text text-transparent font-black">
            🎓 Thông tin Đề án & Nhóm
          </span>
          <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
        </button>
      )}

      {/* Main Intro Overlay Modal - Large, Balanced & Bright Tone */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/30 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Thông tin giới thiệu môn học và nhóm đề án"
        >
          {/* Fullscreen Fireworks Canvas Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* Glowing ambient light aura */}
          <div className="absolute top-1/6 left-1/4 w-[32rem] h-[32rem] bg-amber-200/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/6 right-1/4 w-[32rem] h-[32rem] bg-red-300/35 rounded-full blur-3xl pointer-events-none animate-pulse delay-500" />

          {/* Modal Card - Upgraded size (max-w-4xl), Generous Padding, High Legibility */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative z-20 w-full max-w-4xl bg-white/98 dark:bg-slate-900/98 rounded-3xl shadow-[0_25px_90px_-10px_rgba(153,0,0,0.38)] border-2 border-amber-300 dark:border-amber-500/50 p-6 sm:p-9 lg:p-10 backdrop-blur-2xl animate-in zoom-in-95 duration-200 overflow-hidden my-auto ring-4 ring-amber-100/60 dark:ring-amber-950/40"
          >
            {/* Top Decorative Banner Shimmer */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-ussh-accent cursor-pointer z-30"
              aria-label="Đóng bảng giới thiệu"
              title="Đóng bảng giới thiệu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Institution Header - Bigger Logo & Prominent Faculty Name */}
            <div className="text-center pb-5 border-b border-amber-200/80 dark:border-slate-800">
              <div className="inline-flex items-center justify-center gap-3.5 mb-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ussh-logo.png"
                  alt="Logo Trường ĐH KHXH&NV"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md shrink-0"
                />
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-ussh-navy dark:text-slate-200 leading-tight">
                    ĐHQG-HCM • TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI VÀ NHÂN VĂN
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-ussh-accent tracking-wide uppercase mt-0.5">
                    KHOA BÁO CHÍ VÀ TRUYỀN THÔNG
                  </div>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-50 via-amber-50 to-red-50 dark:from-red-950/40 dark:via-amber-950/40 dark:to-red-950/40 border border-amber-300 dark:border-amber-700 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 tracking-wider uppercase">
                    Báo cáo thực hành đề án môn học
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                </span>
              </div>
            </div>

            {/* Course & Instructor Details - Large Distinct Feature Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {/* Course Box */}
              <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-4 sm:p-5 border border-amber-200 dark:border-slate-700 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md shrink-0">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 tracking-wider">
                    Môn học
                  </div>
                  <div className="text-base sm:text-xl font-black text-ussh-navy dark:text-white leading-tight mt-0.5">
                    Quan hệ công chúng
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-300">
                    <span>Mã học phần:</span>
                    <code className="bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-amber-300 dark:border-slate-600 font-mono text-xs sm:text-sm font-black shadow-xs text-ussh-accent">
                      2610BCH088.2L0
                    </code>
                  </div>
                </div>
              </div>

              {/* Teacher Box */}
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-4 sm:p-5 border border-red-200 dark:border-slate-700 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-2xl bg-ussh-accent text-white shadow-md shrink-0">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 tracking-wider">
                    Giảng viên hướng dẫn
                  </div>
                  <div className="text-base sm:text-xl font-black text-red-700 dark:text-red-400 leading-tight mt-0.5">
                    Th.S Vũ Thị Như Quỳnh
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-2">
                    Kính gửi cô giáo nghiệm thu đề án
                  </div>
                </div>
              </div>
            </div>

            {/* Project Website Title Banner */}
            <div className="bg-gradient-to-r from-ussh-navy via-[#1e293b] to-ussh-navy text-white rounded-2xl p-4 sm:p-5 text-center my-4 shadow-lg border border-amber-300/40 relative overflow-hidden">
              <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-300 font-black">
                Sản phẩm đề án thực tế
              </div>
              <div className="text-lg sm:text-2xl font-black tracking-tight mt-1">
                Bản Tin Nội Bộ & Cổng Thông Tin &ldquo;Inside USSH&rdquo;
              </div>
            </div>

            {/* Group & Team Members Section - Spacious 2-Column Grid */}
            <div className="mt-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-ussh-accent" />
                  <span className="text-xs sm:text-sm uppercase font-black text-slate-700 dark:text-slate-300 tracking-wide">
                    Tên nhóm:
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 text-xs sm:text-sm font-black border border-red-300 dark:border-red-800 shadow-xs">
                    🐎 Con Ngựa Bá Khí QHCC
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-500">
                  5 thành viên thực hiện
                </span>
              </div>

              {/* Members Grid - Bigger Cards & Bold Typography */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 sm:max-h-none overflow-y-auto pr-1">
                {MEMBERS.map((m, idx) => (
                  <div
                    key={m.mssv}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${
                      m.role
                        ? 'bg-amber-50/90 border-amber-300 dark:bg-amber-950/40 dark:border-amber-800 shadow-sm ring-2 ring-amber-200/50'
                        : 'bg-slate-50/90 border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-ussh-navy text-white text-xs sm:text-sm font-black flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-sm sm:text-base font-black text-slate-800 dark:text-white truncate">
                          {m.name}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono font-bold mt-0.5">
                          MSSV: {m.mssv}
                        </div>
                      </div>
                    </div>

                    {m.role && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-ussh-accent text-white shrink-0 ml-2 shadow-xs">
                        {m.role}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress & Controls Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-full transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center sm:text-left">
                  {isPaused ? (
                    <span className="text-amber-600 dark:text-amber-400 font-bold inline-flex items-center gap-1.5 animate-pulse">
                      <span>⏸</span> Đang tạm dừng đếm ngược để đọc thông tin
                    </span>
                  ) : (
                    <span>
                      Tự động vào website sau{' '}
                      <strong className="text-ussh-accent font-black text-sm sm:text-base">
                        {timeLeft}s
                      </strong>{' '}
                      (rê chuột vào để giữ màn hình)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-ussh-accent to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm sm:text-base font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 group cursor-pointer"
                >
                  <span>Khám phá Website ngay</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
