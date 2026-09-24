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

const COUNTDOWN_TOTAL = 8000;

export function ProjectIntroModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(8);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      if (remainingMs <= 0) { clearInterval(interval); setIsOpen(false); }
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
    const handleResize = () => { if (!canvas) return; width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);

    interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number; gravity: number; friction: number; decay: number; shape: 'circle' | 'star' | 'ribbon'; rotation: number; vRot: number; }
    const particles: Particle[] = [];
    const colors = ['#FF3838','#FF9F1A','#FFD32A','#2ED573','#1E90FF','#E056FD','#FF6B81','#00D2D3','#FFFFFF'];

    const createBurst = (x: number, y: number, count = 40) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 4 + 2, gravity: 0.09, friction: 0.965, decay: Math.random() * 0.016 + 0.011, shape: Math.random() > 0.35 ? 'circle' : Math.random() > 0.5 ? 'star' : 'ribbon', rotation: Math.random() * Math.PI * 2, vRot: (Math.random() - 0.5) * 0.2 });
      }
    };

    createBurst(width * 0.15, height * 0.25, 50);
    createBurst(width * 0.85, height * 0.25, 50);
    createBurst(width * 0.5, height * 0.1, 60);
    let lastBurst = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();
      if (now - lastBurst > 600) { lastBurst = now; createBurst(width * (0.1 + Math.random() * 0.8), height * (0.05 + Math.random() * 0.3), 35); }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction; p.vy *= p.friction; p.vy += p.gravity;
        p.x += p.vx; p.y += p.vy; p.alpha -= p.decay; p.rotation += p.vRot;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        if (p.shape === 'star') { ctx.beginPath(); for (let s = 0; s < 5; s++) { ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size); ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 2)); } ctx.closePath(); ctx.fill(); }
        else if (p.shape === 'ribbon') { ctx.fillRect(-p.size, -p.size / 3, p.size * 2.2, p.size); }
        else { ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };
    animationFrameRef.current = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', handleResize); if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isOpen]);

  const handleOpen = () => { setTimeLeft(8); setProgress(100); elapsedRef.current = 0; setIsOpen(true); };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Replay button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-5 left-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 text-ussh-navy text-xs font-extrabold shadow-2xl border-2 border-amber-400 hover:scale-105 transition-all backdrop-blur-md cursor-pointer ring-2 ring-amber-100"
        >
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" /></span>
          <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent font-black">🎓 Thông tin Đề án</span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </button>
      )}

      {/* Main Intro Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog" aria-modal="true"
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />

          {/* Modal card — Mobile: bottom sheet | Desktop: compact centered card */}
          <div
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
            onTouchStart={() => isMobile && setIsPaused(true)}
            onTouchEnd={() => isMobile && setIsPaused(false)}
            className="relative z-20 w-full sm:w-[520px] sm:mx-4
              bg-white
              rounded-t-2xl sm:rounded-2xl
              shadow-[0_-6px_30px_-4px_rgba(153,0,0,0.2)] sm:shadow-[0_16px_50px_-8px_rgba(153,0,0,0.28)]
              border-t-2 sm:border-2 border-amber-300
              overflow-hidden
              animate-in slide-in-from-bottom sm:zoom-in-95 duration-300
              flex flex-col
              max-h-[92dvh] sm:max-h-none
            "
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 z-10" />

            {/* Mobile drag handle */}
            <div className="flex justify-center pt-2.5 pb-0.5 sm:hidden">
              <div className="w-8 h-1 rounded-full bg-slate-300" />
            </div>

            {/* ── CONTENT (mobile: scrollable | desktop: fixed, all visible) ── */}
            <div className="overflow-y-auto sm:overflow-visible flex-1 sm:flex-none px-4 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-0">

              {/* Close */}
              <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-30 cursor-pointer">
                <X className="w-4 h-4" />
              </button>

              {/* ── Institution header ── */}
              <div className="flex items-center justify-center gap-2.5 pb-2.5 border-b border-amber-200/80 mb-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ussh-logo.png" alt="Logo USSH" className="w-9 h-9 object-contain shrink-0" />
                <div>
                  <div className="text-[9.5px] font-black uppercase tracking-wide text-ussh-navy leading-tight">
                    ĐHQG-HCM · Trường ĐH Khoa học Xã hội và Nhân văn
                  </div>
                  <div className="text-[10.5px] font-extrabold text-ussh-accent tracking-wide uppercase">
                    Khoa Báo Chí &amp; Truyền Thông
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    <span className="text-[9px] font-black text-amber-800 uppercase tracking-wider">Báo cáo thực hành đề án môn học</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  </div>
                </div>
              </div>

              {/* ── Course & Instructor ── */}
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8.5px] uppercase font-extrabold text-slate-500 tracking-wider">Môn học</div>
                    <div className="text-xs font-black text-ussh-navy leading-tight">Quan hệ công chúng</div>
                    <div className="mt-1 flex items-center gap-1 text-[8.5px] text-amber-900 font-semibold">
                      Mã HP: <code className="bg-white px-1 py-0.5 rounded border border-amber-300 font-mono font-black text-ussh-accent">2610BCH088.2L0</code>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-2.5 border border-red-200 flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-ussh-accent text-white shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8.5px] uppercase font-extrabold text-slate-500 tracking-wider">Giảng viên</div>
                    <div className="text-xs font-black text-red-700 leading-tight">Th.S Vũ Thị Như Quỳnh</div>
                    <div className="text-[8.5px] text-slate-500 font-medium mt-1">Kính gửi cô giáo nghiệm thu</div>
                  </div>
                </div>
              </div>

              {/* ── Project title ── */}
              <div className="bg-gradient-to-r from-ussh-navy via-slate-800 to-ussh-navy text-white rounded-xl px-4 py-2.5 text-center mb-2.5">
                <div className="text-[8px] uppercase tracking-widest text-amber-300 font-black">Sản phẩm đề án thực tế</div>
                <div className="text-sm font-black tracking-tight leading-snug mt-0.5">
                  Bản Tin Nội Bộ &amp; Cổng Thông Tin &ldquo;Inside USSH&rdquo;
                </div>
              </div>

              {/* ── Team members ── */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-ussh-accent" />
                    <span className="text-[9px] uppercase font-black text-slate-600 tracking-wide">Tên nhóm:</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-black border border-red-200">🐎 Con Ngựa Bá Khí QHCC</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold">5 thành viên</span>
                </div>

                {/* 2-column grid — always 2 cols, compact rows */}
                <div className="grid grid-cols-2 gap-1.5">
                  {MEMBERS.map((m, idx) => (
                    <div
                      key={m.mssv}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${
                        m.role ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-ussh-navy text-white text-[10px] font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                        <div className="truncate">
                          <div className="text-[10.5px] font-black text-slate-800 truncate">{m.name}</div>
                          <div className="text-[9px] text-slate-400 font-mono">MSSV: {m.mssv}</div>
                        </div>
                      </div>
                      {m.role && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-ussh-accent text-white shrink-0 ml-1">{m.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-4 sm:px-5 py-2.5 border-t border-slate-100 bg-white shrink-0">
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-full transition-all duration-75 ease-linear rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-[9.5px] text-slate-500">
                  {isPaused
                    ? <span className="text-amber-500 font-bold">⏸ Đang tạm dừng</span>
                    : <span>Vào website sau <strong className="text-ussh-accent font-black text-[11px]">{timeLeft}s</strong> · {isMobile ? 'chạm giữ để đọc' : 'rê chuột để dừng'}</span>
                  }
                </div>
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-ussh-accent to-red-700 hover:from-red-700 hover:to-red-800 text-white text-[11px] font-black shadow hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                >
                  Khám phá ngay <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
