export interface MinigameQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MinigameData {
  id: string;
  title: string;
  subtitle: string;
  rewardPoints: number;
  weekNumber: number;
  questions: MinigameQuestion[];
}

export interface HumorStory {
  id: string;
  title: string;
  content: string;
  category: 'office' | 'teaching' | 'coffee';
  categoryLabel: string;
  likesCount: number;
  authorAlias: string;
  date: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  description: string;
  totalVotes: number;
  options: PollOption[];
  endDate: string;
}
