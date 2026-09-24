'use client';

import React, { useState } from 'react';
import { MinigameData } from '@/types/entertainment';
import { Gamepad2, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface MinigameCardProps {
  game: MinigameData;
}

export function MinigameCard({ game }: MinigameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = game.questions[currentQIndex];

  const handleSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((s) => s + 100);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < game.questions.length - 1) {
      setCurrentQIndex((q) => q + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-5 border border-amber-200/80 hover:border-amber-400 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group relative overflow-hidden">
        {/* Background Accent Graphic */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-xl pointer-events-none" />

        <div>
          {/* Card Tag & Points Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg bg-ussh-accent text-white flex items-center justify-center font-bold text-xs">
                A
              </span>
              <span className="text-xs font-bold text-ussh-navy">Thử thách trí tuệ</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              <Award className="w-3 h-3 text-amber-600" />
              +{game.rewardPoints} điểm
            </span>
          </div>

          {/* Title matching mockup */}
          <h3 className="font-bold text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug mb-1">
            Minigame hàng tuần: Thử thách trí tuệ
          </h3>
          <p className="text-xs text-slate-600 mb-4 line-clamp-2">
            {game.subtitle}
          </p>

          {/* Visual: Crossword / Grid illustration from mockup */}
          <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200/60 mb-4 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1 w-fit">
              {['N', 'H', 'Â', 'N', '★', 'V', 'Ă', 'N', '★', '★', 'U', 'S', 'S', 'H', '★'].map(
                (char, idx) => (
                  <div
                    key={idx}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs rounded-md border ${
                      char === '★'
                        ? 'bg-amber-200/50 border-transparent text-amber-600'
                        : 'bg-white border-amber-300 text-ussh-navy shadow-2xs'
                    }`}
                  >
                    {char}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* CTA Button matching mockup: Chơi ngay! */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-ussh-navy text-white text-xs font-bold hover:bg-ussh-navy-light transition-colors shadow-xs group-hover:shadow"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Chơi ngay!</span>
        </button>
      </div>

      {/* Interactive Minigame Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={game.title}
        description={`Kỳ ${game.weekNumber} • Thử tài hiểu biết văn hóa Nhân Văn`}
        maxWidth="md"
      >
        {!isFinished ? (
          <div className="space-y-4">
            {/* Progress & Score */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>
                Câu hỏi {currentQIndex + 1} / {game.questions.length}
              </span>
              <span className="font-bold text-amber-600">Điểm hiện tại: {score}</span>
            </div>

            {/* Question title */}
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>

            {/* Answer Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isChosen = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let stateClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                if (isChosen && !isSubmitted) {
                  stateClass = 'bg-ussh-navy text-white border-ussh-navy';
                } else if (isSubmitted) {
                  if (isCorrect) {
                    stateClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
                  } else if (isChosen && !isCorrect) {
                    stateClass = 'bg-red-50 text-red-800 border-red-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-3 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${stateClass}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {isSubmitted && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {isSubmitted && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Giải thích: </strong> {currentQ.explanation}
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex justify-end">
              {!isSubmitted ? (
                <Button
                  size="sm"
                  disabled={selectedAnswer === null}
                  onClick={handleConfirmAnswer}
                >
                  Xác nhận câu trả lời
                </Button>
              ) : (
                <Button size="sm" onClick={handleNextQuestion}>
                  {currentQIndex < game.questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
              🎉
            </div>
            <h4 className="text-lg font-bold text-ussh-navy">Chúc mừng Quý Thầy/Cô!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Thầy/Cô đã hoàn thành thử thách kỳ này với số điểm:{' '}
              <strong className="text-amber-600 font-bold text-sm">{score} điểm</strong>.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Chơi lại
              </Button>
              <Button size="sm" onClick={() => setIsModalOpen(false)}>
                Hoàn tất
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
