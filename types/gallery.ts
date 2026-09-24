export type GalleryCategory = 'all' | 'academic' | 'culture' | 'community' | 'international';

export interface GalleryMoment {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  categoryName: string;
  imageUrl: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  date: string;
  photographer?: string;
  tags?: string[];
}
