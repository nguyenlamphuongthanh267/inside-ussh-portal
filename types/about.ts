export interface UniversityStat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  description: string;
  iconName: string;
}

export interface CampusDetail {
  id: string;
  name: string;
  shortName: string;
  address: string;
  imageUrl: string;
  highlights: string[];
  areaM2?: string;
}

export interface AboutUniversityData {
  motto: string;
  slogan: string;
  englishSlogan: string;
  historySummary: string;
  mission: string;
  vision: string;
  educationalPhilosophy: string;
  coreValues: string[];
  stats: UniversityStat[];
  campuses: CampusDetail[];
}
