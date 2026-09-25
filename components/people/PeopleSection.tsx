'use client';

import React, { useRef, useState } from 'react';
import { PersonProfile } from '@/types/people';
import { ProfileCard } from './ProfileCard';
import { ChevronLeft, ChevronRight, BookOpen, Quote, X, Sparkles } from 'lucide-react';
import { MOCK_PEOPLE } from '@/constants/mockData';

export interface PeopleSectionProps {
  people?: PersonProfile[];
}

export function PeopleSection({ people }: PeopleSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMemoirOpen, setIsMemoirOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonProfile | null>(null);

  const displayPeople = people && people.length > 0 ? people : MOCK_PEOPLE;
  const featuredLeader = displayPeople.find((p) => p.id === 'ppl_ngo_van_le') || displayPeople[0];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="people"
      className="scroll-mt-20 sm:scroll-mt-24 py-14 bg-ussh-cream-50 border-t border-ussh-border"
      aria-label="Người Nhân Văn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching mockup: "Người Nhân Văn ===" */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-ussh-navy tracking-tight font-sans">
              Người Nhân Văn
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-8 h-1 bg-ussh-accent rounded-full" />
              <span className="w-2 h-1 bg-ussh-accent/50 rounded-full" />
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-ussh-navy transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy"
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-ussh-navy transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy"
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-2xl font-normal">
          Những câu chuyện truyền cảm hứng, ký ức gian khó và tấm lòng son sắt của các thế hệ thầy cô dưới mái trường Nhân Văn.
        </p>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth"
          role="region"
          aria-label="Danh sách chân dung Thầy Cô Nhân Văn"
        >
          {displayPeople.map((person) => (
            <ProfileCard
              key={person.id}
              person={person}
              isSelected={selectedPerson?.id === person.id}
              onClick={() => {
                if (person.id === 'ppl_ngo_van_le') {
                  setIsMemoirOpen(true);
                } else {
                  setSelectedPerson(person);
                }
              }}
            />
          ))}
        </div>

        {/* Memoir Modal for GS.TS.NGND Ngô Văn Lệ */}
        {isMemoirOpen && featuredLeader && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memoir-modal-title"
            onClick={() => setIsMemoirOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 sticky top-0 z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent">
                  Ký Nhân văn • Chân dung
                </span>
                <button
                  onClick={() => setIsMemoirOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
                <div>
                  <h2
                    id="memoir-modal-title"
                    className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ussh-navy leading-snug font-sans mb-2"
                  >
                    {featuredLeader.storyTitle}
                  </h2>
                  <div className="text-xs text-slate-500 pb-4 border-b border-slate-100">
                    Tác giả: <strong className="text-ussh-navy uppercase">{featuredLeader.author || 'Thảo Quyên'}</strong> • Bản tin Inside USSH
                  </div>
                </div>

                {/* Primary Image */}
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden max-h-[460px] bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredLeader.avatarUrl}
                      alt={featuredLeader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] italic text-slate-500 text-center">
                    GS.TS.NGND Ngô Văn Lệ trong buổi trò chuyện tại nhà riêng. Ảnh: Thảo Quyên
                  </p>
                </div>

                {/* Story Paragraphs (Text 13) */}
                <div className="space-y-4 text-[13px] leading-relaxed text-slate-700 font-normal">
                  {featuredLeader.storyParagraphs ? (
                    featuredLeader.storyParagraphs.map((para, i) => (
                      <React.Fragment key={i}>
                        <p>{para}</p>
                        {i === 3 && featuredLeader.secondaryImage && (
                          <div className="my-6 space-y-2">
                            <div className="rounded-2xl overflow-hidden max-h-[420px] bg-slate-100 border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={featuredLeader.secondaryImage.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {(() => {
                              const cap = featuredLeader.secondaryImage.caption?.replace(/^Chú thích ảnh:\s*/i, '').trim();
                              if (!cap) return null;
                              const match = cap.match(/^(.*?)(?:[\.\s\-–—]*)\s*(\(?Ảnh:\s*[^)]+\)?)$/i);
                              if (match) {
                                return (
                                  <div className="text-[11.5px] text-slate-500 text-center font-normal px-2 space-y-1">
                                    <p className="italic leading-relaxed">{match[1].trim()}</p>
                                    <p className="not-italic font-semibold text-slate-700 text-[11px] tracking-wide inline-flex items-center justify-center gap-1">
                                      <span className="text-slate-400">•</span>
                                      <span>{match[2].trim()}</span>
                                    </p>
                                  </div>
                                );
                              }
                              return <p className="text-[11px] italic text-slate-500 text-center">{cap}</p>;
                            })()}
                          </div>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <p>{featuredLeader.bio}</p>
                  )}
                </div>

                {/* Concluding Quote */}
                <div className="bg-[#F6ECE4] rounded-2xl p-5 border-l-4 border-ussh-accent text-[13px]">
                  <p className="italic font-medium text-slate-800">
                    “{featuredLeader.quote}”
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Faculty Profile Modal */}
        {selectedPerson && selectedPerson.id !== 'ppl_ngo_van_le' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={() => setSelectedPerson(null)}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-ussh-accent">
                  Chân dung Thầy Cô Nhân Văn
                </span>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-ussh-navy hover:bg-slate-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-ussh-cream-100 shadow-soft mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPerson.avatarUrl}
                    alt={selectedPerson.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 id="profile-modal-title" className="text-lg font-bold text-ussh-navy font-sans">
                  {selectedPerson.academicTitle} {selectedPerson.name}
                </h3>
                <p className="text-xs font-semibold text-ussh-accent mt-0.5">
                  {selectedPerson.position}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedPerson.facultyDepartment}
                </p>

                {selectedPerson.quote && (
                  <div className="mt-5 p-4 rounded-2xl bg-[#F6ECE4] border-l-4 border-ussh-accent text-left w-full">
                    <p className="text-xs italic text-slate-800 leading-relaxed">
                      “{selectedPerson.quote}”
                    </p>
                  </div>
                )}

                {selectedPerson.bio && (
                  <p className="text-xs text-slate-600 mt-4 leading-relaxed text-left w-full">
                    {selectedPerson.bio}
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 w-full flex justify-end">
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="px-5 py-2.5 rounded-xl bg-ussh-navy text-white text-xs font-semibold hover:bg-ussh-navy-light transition-colors min-h-[40px]"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
