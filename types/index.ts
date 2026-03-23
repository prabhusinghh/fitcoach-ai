export interface Workout {
  id?: string;
  activity_type: string;
  duration: number;
  date: string;
  created_at?: string;
}

export interface Stats {
  streak: number;
  weeklyCount: number;
  mostFrequent: string;
  totalMinutes: number;
}