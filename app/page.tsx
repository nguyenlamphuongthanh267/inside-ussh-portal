import React from 'react';
import { newsService } from '@/lib/services/newsService';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { MomentsGallery } from '@/components/gallery/MomentsGallery';

// Next.js Server Component by default for maximal performance & SEO
export default async function HomePage() {
  // Fetch initial data concurrently through CMS service layer
  const [heroArticle, featuredStories] = await Promise.all([
    newsService.getHeroArticle(),
    newsService.getFeaturedStories(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Main Portal View: News, Ký Nhân văn, Phút thư giãn */}
      <HeroBanner heroArticle={heroArticle} featuredStories={featuredStories} />

      {/* Khoảnh khắc Nhân Văn (10 Event Moments Gallery) */}
      <MomentsGallery />
    </div>
  );
}
