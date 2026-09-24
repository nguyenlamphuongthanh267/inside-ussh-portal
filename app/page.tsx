import React from 'react';
import { newsService } from '@/lib/services/newsService';
import { aboutService } from '@/lib/services/aboutService';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { AboutSection } from '@/components/about/AboutSection';
import { MomentsGallery } from '@/components/gallery/MomentsGallery';

// Next.js Server Component by default for maximal performance & SEO
export default async function HomePage() {
  // Fetch initial data concurrently through CMS service layer
  const [heroArticle, featuredStories, aboutData] = await Promise.all([
    newsService.getHeroArticle(),
    newsService.getFeaturedStories(),
    aboutService.getAboutData(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Main Portal View matching Mockup (media_1789826790341.png) */}
      <HeroBanner heroArticle={heroArticle} featuredStories={featuredStories} />

      {/* About USSH: Identity, Heritage, Philosophy, Stats & Campuses */}
      <AboutSection data={aboutData} />

      {/* Khoảnh khắc Nhân Văn (10 Event Moments Gallery) */}
      <MomentsGallery />
    </div>
  );
}
