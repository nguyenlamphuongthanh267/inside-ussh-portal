export type NewsCategory = 'tat-ca' | 'dao-tao' | 'nghien-cuu' | 'cong-doan' | 'doan-hoi' | 'su-kien';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  contentParagraphs?: string[];
  category: NewsCategory;
  categoryName: string;
  imageUrl: string;
  imageCaption?: string;
  secondaryImage?: {
    url: string;
    caption?: string;
  };
  infoBox?: {
    title: string;
    description?: string;
    items?: string[];
    details?: { label: string; value: string }[];
    contact?: {
      name: string;
      title?: string;
      phone?: string;
      email?: string;
    };
    link?: string;
    linkText?: string;
  };
  publishDate: string;
  readingTime: string;
  author: Author;
  isFeatured?: boolean;
  isTrending?: boolean;
  tags: string[];
}
