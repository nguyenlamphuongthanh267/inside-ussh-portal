'use client';

import React, { useState } from 'react';
import { PollData } from '@/types/entertainment';
import { Vote, CheckCircle2, BarChart2 } from 'lucide-react';
import { entertainmentService } from '@/lib/services/entertainmentService';

export interface WeeklyPollCardProps {
  initialPoll: PollData;
}

export function WeeklyPollCard({ initialPoll }: WeeklyPollCardProps) {
  const [poll, setPoll] = useState<PollData>(initialPoll);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async (optionId: string) => {
    if (hasVoted || isSubmitting) return;
    setSelectedOption(optionId);
    setIsSubmitting(true);

    try {
      const updated = await entertainmentService.votePoll(poll.id, optionId);
      setPoll(updated);
      setHasVoted(true);
    } catch {
      // Fallback optimistic update
      setPoll((prev) => ({
        ...prev,
        totalVotes: prev.totalVotes + 1,
        options: prev.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      }));
      setHasVoted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="weekly-poll"
      className="bg-white rounded-3xl p-5 border border-blue-200/80 hover:border-blue-400 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full blur-xl pointer-events-none" />

      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              C
            </span>
            <span className="text-xs font-bold text-slate-800">Khảo sát nội bộ</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">
            <Vote className="w-3 h-3" />
            Poll of the Week
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-ussh-navy group-hover:text-blue-700 transition-colors leading-snug mb-1">
          {poll.question}
        </h3>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">
          {poll.description}
        </p>

        {/* Poll Options */}
        <div className="space-y-2 mb-4">
          {poll.options.map((opt) => {
            const percentage =
              poll.totalVotes > 0
                ? Math.round((opt.votes / poll.totalVotes) * 100)
                : 0;
            const isSelected = selectedOption === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleVote(opt.id)}
                disabled={hasVoted || isSubmitting}
                className={`relative w-full p-2.5 rounded-xl text-xs text-left border transition-all overflow-hidden ${
                  hasVoted
                    ? isSelected
                      ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-950'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 text-slate-800'
                }`}
              >
                {/* Percentage fill bar after voting */}
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-500 rounded-lg ${
                      isSelected ? 'bg-blue-200/50' : 'bg-slate-200/40'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="line-clamp-1">{opt.text}</span>
                  {hasVoted && (
                    <span className="font-mono font-bold text-slate-700 shrink-0">
                      {percentage}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
          Tổng: <strong>{poll.totalVotes}</strong> lượt bình chọn
        </span>
        <span className="text-slate-400">
          {hasVoted ? 'Đã ghi nhận ý kiến' : 'Chọn để bình chọn'}
        </span>
      </div>
    </div>
  );
}
