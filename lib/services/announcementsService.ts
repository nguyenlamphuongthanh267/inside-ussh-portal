import { AnnouncementItem, AnnouncementPriority, AnnouncementType } from '@/types/announcements';
import { MOCK_ANNOUNCEMENTS } from '@/constants/mockData';

export interface GetAnnouncementsOptions {
  type?: AnnouncementType | 'all';
  priority?: AnnouncementPriority;
  pinnedOnly?: boolean;
}

export const announcementsService = {
  async getAnnouncements(options: GetAnnouncementsOptions = {}): Promise<AnnouncementItem[]> {
    // Simulates: supabase.from('announcements').select('*').order('publish_date', { ascending: false })
    await new Promise((resolve) => setTimeout(resolve, 60));
    let items = [...MOCK_ANNOUNCEMENTS];

    if (options.type && options.type !== 'all') {
      items = items.filter((item) => item.type === options.type);
    }

    if (options.priority) {
      items = items.filter((item) => item.priority === options.priority);
    }

    if (options.pinnedOnly) {
      items = items.filter((item) => item.isPinned);
    }

    return items;
  },

  async getLatestUrgentAnnouncement(): Promise<AnnouncementItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return MOCK_ANNOUNCEMENTS.find((item) => item.priority === 'urgent') || null;
  },
};
