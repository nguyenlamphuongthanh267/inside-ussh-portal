import { GalleryCategory, GalleryMoment } from '@/types/gallery';
import { MOCK_GALLERY } from '@/constants/mockData';

export const galleryService = {
  async getMoments(category: GalleryCategory = 'all'): Promise<GalleryMoment[]> {
    // Simulates: supabase.from('gallery').select('*')
    await new Promise((resolve) => setTimeout(resolve, 60));
    if (category === 'all') {
      return MOCK_GALLERY;
    }
    return MOCK_GALLERY.filter((item) => item.category === category);
  },
};
