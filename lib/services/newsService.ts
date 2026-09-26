import { NewsArticle, NewsCategory } from '@/types/news';
import { MOCK_HERO_ARTICLE, MOCK_FEATURED_SLIDER, MOCK_NEWS_ARTICLES } from '@/constants/mockData';

export interface GetNewsOptions {
  category?: NewsCategory;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export const newsService = {
  async getHeroArticle(): Promise<NewsArticle> {
    // Simulates an async Supabase fetch: supabase.from('news').select('*').eq('is_hero', true).single()
    await new Promise((resolve) => setTimeout(resolve, 60));
    return MOCK_HERO_ARTICLE;
  },

  async getFeaturedStories(): Promise<NewsArticle[]> {
    // Simulates: supabase.from('news').select('*').eq('is_featured', true).limit(3)
    await new Promise((resolve) => setTimeout(resolve, 60));
    return MOCK_FEATURED_SLIDER;
  },

  async getNewsList(options: GetNewsOptions = {}): Promise<{ articles: NewsArticle[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    let filtered = [...MOCK_NEWS_ARTICLES];

    if (options.category && options.category !== 'tat-ca') {
      filtered = filtered.filter((article) => article.category === options.category);
    }

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          article.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    if (options.limit) {
      const offset = options.offset || 0;
      filtered = filtered.slice(offset, offset + options.limit);
    }

    return { articles: filtered, total };
  },

  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const all = [MOCK_HERO_ARTICLE, ...MOCK_NEWS_ARTICLES];
    return all.find((a) => a.slug === slug) || null;
  },

  getAllArticleSlugs(): string[] {
    const all = [MOCK_HERO_ARTICLE, ...MOCK_NEWS_ARTICLES];
    return Array.from(new Set(all.map((a) => a.slug).filter(Boolean)));
  },
};
