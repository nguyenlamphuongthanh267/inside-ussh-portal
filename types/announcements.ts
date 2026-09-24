export type AnnouncementPriority = 'urgent' | 'new' | 'upcoming';

export type AnnouncementType = 'notice' | 'academic' | 'meeting' | 'training';

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  type: AnnouncementType;
  typeName: string;
  priority: AnnouncementPriority;
  publishDate: string;
  dueDate?: string;
  department: string;
  attachmentUrl?: string;
  attachmentName?: string;
  targetAudience: string;
  isPinned?: boolean;
}
