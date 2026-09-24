import { PersonProfile } from '@/types/people';
import { MOCK_PEOPLE } from '@/constants/mockData';

export const peopleService = {
  async getFeaturedPeople(): Promise<PersonProfile[]> {
    // Simulates: supabase.from('people').select('*').order('name')
    await new Promise((resolve) => setTimeout(resolve, 60));
    return MOCK_PEOPLE;
  },

  async getPersonById(id: string): Promise<PersonProfile | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return MOCK_PEOPLE.find((p) => p.id === id) || null;
  },
};
