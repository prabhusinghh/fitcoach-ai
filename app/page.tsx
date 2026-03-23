"use client";

import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import StatsCards from "@/components/StatsCards";
import MotivationButton from "@/components/MotivationButton";
import ChatWidget from "@/components/ChatWidget";
import { useWorkouts } from "@/hooks/useWorkouts";
import { calculateStats } from "@/lib/stats";
import Skeleton from "@/components/Skeleton";
import { useUser } from "@/hooks/useUser";
import Auth from "@/components/Auth";
import UserBar from "@/components/UserBar";

export default function Home() {
   const user = useUser();

  if (!user) {
    return <Auth />;
  }
  const { workouts, addWorkout, loading, error } = useWorkouts();
  const stats = calculateStats(workouts || []);
  
  if (error) {
  return (
   <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 md:px-8 py-6">
    
    {/* 🔥 USER BAR */}
    <UserBar user={user} />
      <p className="text-red-500">{error}</p>
    </main>
  );
}
if (loading) return <Skeleton />;
return (
  <div className="animate-fadeIn">
  <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 md:px-8 py-6">
    
    {/* 🔥 HEADER
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
        💪
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        FitCoach AI
      </h1>
    </div> */}

    {/* 🔥 STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatsCards stats={stats} />
    </div>

    {/* 🔥 AI MOTIVATION (CENTER HERO) */}
    <div className="mb-8 flex justify-center">
  <div className="w-full md:w-[500px]">
    <MotivationButton stats={stats} />
  </div>
</div>

    {/* 🔥 MAIN GRID */}
    <div className="grid md:grid-cols-2 gap-6 items-start mb-8">
      <WorkoutForm onAdd={addWorkout} />
      <ChatWidget stats={stats} />
    </div>

    {/* 🔥 WORKOUT LIST FULL WIDTH */}
    <div>
      <WorkoutList workouts={workouts} />
    </div>

  </main>
  </div>
);
}