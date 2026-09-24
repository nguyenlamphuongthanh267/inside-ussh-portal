import { MinigameData, HumorStory, PollData } from '@/types/entertainment';
import { MOCK_MINIGAME, MOCK_HUMOR_STORIES, MOCK_WEEKLY_POLL } from '@/constants/mockData';

export const entertainmentService = {
  async getWeeklyMinigame(): Promise<MinigameData> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_MINIGAME;
  },

  async getHumorStories(): Promise<HumorStory[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_HUMOR_STORIES;
  },

  async getWeeklyPoll(): Promise<PollData> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_WEEKLY_POLL;
  },

  async votePoll(pollId: string, optionId: string): Promise<PollData> {
    // Simulates an optimistic update to Supabase
    await new Promise((resolve) => setTimeout(resolve, 100));
    const updatedOptions = MOCK_WEEKLY_POLL.options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    return {
      ...MOCK_WEEKLY_POLL,
      totalVotes: MOCK_WEEKLY_POLL.totalVotes + 1,
      options: updatedOptions,
    };
  },
};
