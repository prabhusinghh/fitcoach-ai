"use client";

import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import StatsCards from "@/components/StatsCards";
import MotivationButton from "@/components/MotivationButton";
import ChatWidget from "@/components/ChatWidget";
import { useWorkouts } from "@/hooks/useWorkouts";
import { calculateStats } from "@/lib/stats";

export default function Home() {
  const { workouts, addWorkout } = useWorkouts();
  const stats = calculateStats(workouts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
  <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-tight">
  💪 FitCoach AI
</h1>

        <StatsCards stats={stats} />

        <div className="grid md:grid-cols-2 gap-6">
          <WorkoutForm onAdd={addWorkout} />
          <MotivationButton stats={stats} />
        </div>

        <WorkoutList workouts={workouts} />

        <ChatWidget />
      </div>
    </div>
  );
}