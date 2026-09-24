'use client';

import React, { useState } from 'react';
import { HumorStory } from '@/types/entertainment';
import { Coffee, Heart, Smile, BookOpen, MessageCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface HumorStoriesCardProps {
  stories: HumorStory[];
}

export function HumorStoriesCard({ stories }: HumorStoriesCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<HumorStory>(stories[0]);
  const [likes, setLikes] = useState<{ [id: string]: number }>(
    stories.reduce((acc, s) => ({ ...acc, [s.id]: s.likesCount }), {})
  );
  const [hasLiked, setHasLiked] = useState<{ [id: string]: boolean }>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) return;
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setHasLiked((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-5 border border-orange-200/80 hover:border-orange-400 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group relative overflow-hidden">
        {/* Background Ambient Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/40 rounded-full blur-xl pointer-events-none" />

        <div>
          {/* Card Tag */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                B
              </span>
              <span className="text-xs font-bold text-slate-800">Tiếng cười văn phòng</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-semibold">
              <Smile className="w-3 h-3 text-orange-600" />
              Góc thư giãn
            </span>
          </div>

          {/* Title matching mockup */}
          <h3 className="font-bold text-base text-ussh-navy group-hover:text-ussh-accent transition-colors leading-snug mb-1">
            Góc Funny: Những câu chuyện nhỏ trong văn phòng
          </h3>
          <p className="text-xs text-slate-600 mb-4 line-clamp-2">
            Những mẩu đối thoại dí dỏm, khoảnh khắc đáng yêu trong giờ giải lao và chuyện hậu trường giảng đường.
          </p>

          {/* Visual: Coffee cup & laughing emoji illustration matching mockup */}
          <div className="bg-[#FFF8F2] rounded-2xl p-4 border border-[#FFE4D0] mb-4 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-200/60 flex items-center justify-center text-orange-600 text-2xl shadow-2xs">
              ☕
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-200/60 flex items-center justify-center text-amber-600 text-2xl shadow-2xs">
              😆
            </div>
          </div>
        </div>

        {/* CTA Button matching mockup: Đọc vui! */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-xs group-hover:shadow"
        >
          <BookOpen className="w-4 h-4" />
          <span>Đọc vui!</span>
        </button>
      </div>

      {/* Reader Modal for Funny Stories */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Góc Funny Nhân Văn"
        description="Tuyển tập những câu chuyện vui, hài hước nơi công sở và giảng đường"
        maxWidth="lg"
      >
        <div className="space-y-4">
          {/* Story selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeStory.id === story.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {story.categoryLabel}
              </button>
            ))}
          </div>

          {/* Active Story Card */}
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-orange-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                {activeStory.categoryLabel}
              </span>
              <span className="text-[11px] text-slate-500">
                Bút danh: <strong>{activeStory.authorAlias}</strong>
              </span>
            </div>

            <h4 className="text-base font-bold text-ussh-navy">
              {activeStory.title}
            </h4>

            <p className="text-sm text-slate-700 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-orange-100">
              {activeStory.content}
            </p>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={(e) => handleLike(activeStory.id, e)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  hasLiked[activeStory.id]
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white text-slate-600 hover:text-red-600 border border-slate-200'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    hasLiked[activeStory.id] ? 'fill-red-600 text-red-600' : ''
                  }`}
                />
                <span>{likes[activeStory.id] || 0} Thả tim</span>
              </button>

              <span className="text-[11px] text-slate-400">{activeStory.date}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
