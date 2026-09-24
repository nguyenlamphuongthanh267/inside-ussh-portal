import { MOCK_HERO_ARTICLE, MOCK_NEWS_ARTICLES, MOCK_PEOPLE, MOCK_GALLERY, MOCK_MINIGAME_DOCX, MOCK_FUNNY_STORY } from '@/constants/mockData';
import { matchesKeyword } from '@/lib/utils/vietnamese';

export type SearchCategoryFilter = 'all' | 'news' | 'people' | 'gallery' | 'about' | 'entertainment';

export interface SearchResultItem {
  id: string;
  type: 'news' | 'people' | 'gallery' | 'about' | 'entertainment';
  categoryLabel: string;
  badgeColor: string;
  title: string;
  summary: string;
  imageUrl?: string;
  dateOrMeta?: string;
  actionType: 'open-article' | 'open-profile' | 'open-memoir' | 'open-gallery' | 'open-minigame' | 'open-funny' | 'scroll';
  targetId: string;
  modalId?: string;
}

export interface PopularSuggestion {
  keyword: string;
  targetId: string;
  actionType: 'open-article' | 'open-profile' | 'open-memoir' | 'open-gallery' | 'open-minigame' | 'open-funny' | 'scroll';
  modalId?: string;
  badgeLabel?: string;
}

export const POPULAR_SUGGESTIONS: PopularSuggestion[] = [
  {
    keyword: 'Kỷ niệm 70 năm',
    targetId: 'news',
    actionType: 'open-article',
    modalId: 'news_70_nam',
    badgeLabel: 'Tin tức',
  },
  {
    keyword: 'Hương xôi Nhân văn',
    targetId: 'news',
    actionType: 'open-article',
    modalId: 'news_huong_xoi',
    badgeLabel: 'Tin tức',
  },
  {
    keyword: 'GS. Ngô Văn Lệ',
    targetId: 'people',
    actionType: 'open-memoir',
    modalId: 'ppl_ngo_van_le',
    badgeLabel: 'Người Nhân Văn',
  },
  {
    keyword: 'Hội thảo quốc tế',
    targetId: 'news',
    actionType: 'open-article',
    modalId: 'news_hoi_thao_van_hoc',
    badgeLabel: 'Hội thảo',
  },
  {
    keyword: 'Minigame tuần',
    targetId: 'entertainment',
    actionType: 'open-minigame',
    badgeLabel: 'Minigame',
  },
  {
    keyword: 'Cơ sở Linh Xuân',
    targetId: 'about',
    actionType: 'scroll',
    badgeLabel: 'Giới thiệu',
  },
  {
    keyword: 'Sáng Quận 1 chiều Thủ Đức',
    targetId: 'entertainment',
    actionType: 'open-funny',
    badgeLabel: 'Góc Funny',
  },
  {
    keyword: 'Triết lý khai phóng',
    targetId: 'about',
    actionType: 'scroll',
    badgeLabel: 'Giới thiệu',
  },
];

export const POPULAR_SEARCH_KEYWORDS = POPULAR_SUGGESTIONS.map((s) => s.keyword);

export const CATEGORY_TARGET_MAP: Record<SearchCategoryFilter, string> = {
  all: 'home',
  news: 'news',
  people: 'people',
  gallery: 'gallery',
  about: 'about',
  entertainment: 'entertainment',
};

export const CATEGORY_FILTERS: { id: SearchCategoryFilter; label: string; targetId: string }[] = [
  { id: 'all', label: 'Tất cả', targetId: 'home' },
  { id: 'news', label: 'Tin tức', targetId: 'news' },
  { id: 'people', label: 'Người Nhân Văn', targetId: 'people' },
  { id: 'gallery', label: 'Khoảnh khắc', targetId: 'gallery' },
  { id: 'about', label: 'Giới thiệu', targetId: 'about' },
  { id: 'entertainment', label: 'Thư giãn', targetId: 'entertainment' },
];

export function searchAll(query: string, category: SearchCategoryFilter = 'all'): SearchResultItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results: SearchResultItem[] = [];

  // 1. News Articles
  if (category === 'all' || category === 'news') {
    const allArticles = [MOCK_HERO_ARTICLE, ...MOCK_NEWS_ARTICLES];
    for (const art of allArticles) {
      const matchInTitle = matchesKeyword(art.title, trimmed);
      const matchInSummary = matchesKeyword(art.summary, trimmed);
      const matchInTags = art.tags?.some((t) => matchesKeyword(t, trimmed));
      const matchInAuthor = art.author?.name ? matchesKeyword(art.author.name, trimmed) : false;
      const matchInContent = art.contentParagraphs?.some((p) => matchesKeyword(p, trimmed));

      if (matchInTitle || matchInSummary || matchInTags || matchInAuthor || matchInContent) {
        results.push({
          id: `news_${art.id}`,
          type: 'news',
          categoryLabel: art.categoryName || 'Tin tức',
          badgeColor: 'bg-red-50 text-ussh-accent border-red-200',
          title: art.title,
          summary: art.summary,
          imageUrl: art.imageUrl,
          dateOrMeta: `${art.publishDate || '19/09/2026'} • ${art.readingTime || '3 phút đọc'}`,
          actionType: 'open-article',
          targetId: 'news',
          modalId: art.id,
        });
      }
    }
  }

  // 2. People (Người Nhân Văn)
  if (category === 'all' || category === 'people') {
    for (const p of MOCK_PEOPLE) {
      const matchInName = matchesKeyword(p.name, trimmed);
      const matchInTitle = p.academicTitle ? matchesKeyword(p.academicTitle, trimmed) : false;
      const matchInPos = p.position ? matchesKeyword(p.position, trimmed) : false;
      const matchInDept = p.facultyDepartment ? matchesKeyword(p.facultyDepartment, trimmed) : false;
      const matchInBio = p.bio ? matchesKeyword(p.bio, trimmed) : false;
      const matchInStory = p.storyParagraphs?.some((sp) => matchesKeyword(sp, trimmed));

      if (matchInName || matchInTitle || matchInPos || matchInDept || matchInBio || matchInStory) {
        results.push({
          id: `people_${p.id}`,
          type: 'people',
          categoryLabel: 'Người Nhân Văn',
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
          title: `${p.academicTitle ? p.academicTitle + ' ' : ''}${p.name} - ${p.position}`,
          summary: p.quote || p.bio || `${p.position} tại ${p.facultyDepartment}`,
          imageUrl: p.avatarUrl,
          dateOrMeta: p.facultyDepartment,
          actionType: p.storyParagraphs ? 'open-memoir' : 'open-profile',
          targetId: 'people',
          modalId: p.id,
        });
      }
    }
  }

  // 3. Gallery Moments (Khoảnh khắc)
  if (category === 'all' || category === 'gallery') {
    for (const g of MOCK_GALLERY) {
      const matchInTitle = matchesKeyword(g.title, trimmed);
      const matchInCaption = matchesKeyword(g.caption, trimmed);
      const matchInCatName = g.categoryName ? matchesKeyword(g.categoryName, trimmed) : false;

      if (matchInTitle || matchInCaption || matchInCatName) {
        results.push({
          id: `gallery_${g.id}`,
          type: 'gallery',
          categoryLabel: g.categoryName || 'Khoảnh khắc',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          title: g.title,
          summary: g.caption,
          imageUrl: g.imageUrl,
          dateOrMeta: `${g.date || '19/09/2026'} • Ảnh: ${g.photographer || 'Inside USSH'}`,
          actionType: 'open-gallery',
          targetId: 'gallery',
          modalId: g.id,
        });
      }
    }
  }

  // 4. About Section (Giới thiệu USSH)
  if (category === 'all' || category === 'about') {
    const aboutEntries = [
      {
        id: 'about_heritage',
        title: 'Di sản & Bản sắc 70 năm ĐH KHXH&NV',
        summary: 'Kế thừa truyền thống gần 70 năm hình thành và phát triển từ Đại học Văn khoa Sài Gòn (thành lập năm 1957) và Đại học Tổng hợp TP.HCM, là cái nôi đào tạo, nghiên cứu khoa học xã hội và nhân văn lớn nhất khu vực phía Nam.',
        meta: 'Lịch sử & Di sản truyền thống',
      },
      {
        id: 'about_philosophy',
        title: 'Triết lý giáo dục: Toàn diện - Khai phóng - Đa văn hóa',
        summary: 'Kiến tạo một không gian đại học khai phóng, nơi khơi dậy tinh thần dấn thân, sự thấu cảm và rèn luyện sự nhạy bén cho người học trước các vấn đề đương đại.',
        meta: 'Triết lý cốt lõi',
      },
      {
        id: 'about_action',
        title: 'Phương châm hành động: Sáng tạo — Dẫn dắt — Trách nhiệm',
        summary: 'Tiên phong trong đổi mới phương pháp nghiên cứu, định hình và lan tỏa các giá trị học thuật khoa học xã hội & nhân văn, tận tâm với người học và phục vụ cộng đồng.',
        meta: 'Hành động & Giá trị',
      },
      {
        id: 'about_campuses',
        title: 'Cơ sở đào tạo USSH: Quận 1 & TP. Thủ Đức',
        summary: 'Cơ sở Sài Gòn: 10 - 12 Đinh Tiên Hoàng, Quận 1; Cơ sở Linh Xuân: Khu Đô thị ĐHQG-HCM, TP. Thủ Đức.',
        meta: 'Trụ sở & Cơ sở đào tạo',
      },
    ];

    for (const ab of aboutEntries) {
      if (matchesKeyword(ab.title, trimmed) || matchesKeyword(ab.summary, trimmed) || matchesKeyword(ab.meta, trimmed)) {
        results.push({
          id: ab.id,
          type: 'about',
          categoryLabel: 'Giới thiệu USSH',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          title: ab.title,
          summary: ab.summary,
          imageUrl: '/images/ussh-logo.png',
          dateOrMeta: ab.meta,
          actionType: 'scroll',
          targetId: 'about',
        });
      }
    }
  }

  // 5. Entertainment (Phút thư giãn)
  if (category === 'all' || category === 'entertainment') {
    // Minigame
    if (
      matchesKeyword(MOCK_MINIGAME_DOCX.title, trimmed) ||
      matchesKeyword(MOCK_MINIGAME_DOCX.subtitle, trimmed) ||
      matchesKeyword(MOCK_MINIGAME_DOCX.description, trimmed) ||
      matchesKeyword('minigame khoanh chu', trimmed) ||
      matchesKeyword('giai thuong', trimmed)
    ) {
      results.push({
        id: 'ent_minigame',
        type: 'entertainment',
        categoryLabel: 'Minigame hàng tuần',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        title: MOCK_MINIGAME_DOCX.title,
        summary: MOCK_MINIGAME_DOCX.subtitle,
        imageUrl: MOCK_MINIGAME_DOCX.imageUrl,
        dateOrMeta: 'Giải Nhất 1.000.000 đồng • Dành cho CB-GV',
        actionType: 'open-minigame',
        targetId: 'entertainment',
      });
    }

    // Funny story
    if (
      matchesKeyword(MOCK_FUNNY_STORY.title, trimmed) ||
      MOCK_FUNNY_STORY.paragraphs.some((p) => matchesKeyword(p, trimmed)) ||
      matchesKeyword('funny van phong', trimmed) ||
      matchesKeyword('phuot thu', trimmed)
    ) {
      results.push({
        id: 'ent_funny',
        type: 'entertainment',
        categoryLabel: 'Funny văn phòng',
        badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
        title: MOCK_FUNNY_STORY.title,
        summary: MOCK_FUNNY_STORY.paragraphs[0],
        imageUrl: MOCK_FUNNY_STORY.imageUrl,
        dateOrMeta: 'Tiếng cười sau giờ lên lớp • Góc nhìn hài hước',
        actionType: 'open-funny',
        targetId: 'entertainment',
      });
    }
  }

  return results;
}
