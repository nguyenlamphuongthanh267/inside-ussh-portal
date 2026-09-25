export interface PersonProfile {
  id: string;
  name: string;
  academicTitle: string; // e.g., 'TS.', 'PGS.TS', 'GS.TS.NGND'
  position: string;
  facultyDepartment: string;
  avatarUrl: string;
  quote: string;
  bio?: string;
  researchFocus?: string[];
  email?: string;
  storyTitle?: string;
  sapo?: string;
  storyParagraphs?: string[];
  secondaryImage?: {
    url: string;
    caption?: string;
  };
  author?: string;
  isFeaturedLeader?: boolean;
}
