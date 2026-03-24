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
import { useEffect } from "react";
import Auth from "@/components/Auth";
import UserBar from "@/components/UserBar";
 import { Analytics } from "@vercel/analytics/react";


export default function Home() {
  
  const user = useUser();
 
   useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);
  // 🔥 MOVE THIS ABOVE CONDITION (IMPORTANT)
  const { workouts, addWorkout, loading, error } = useWorkouts();
  const stats = calculateStats(workouts || []);
   if (user === undefined) {
  return <Skeleton />; // or loading screen
}

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <div className="animate-fadeIn">
          <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 md:px-8 py-6">
            
            {/* 🔥 USER BAR */}
            <UserBar user={user} />

            {error && (
              <p className="text-red-500">{error}</p>
            )}

            {loading ? (
              <Skeleton />
            ) : (
              <>
                {/* 🔥 STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatsCards stats={stats} />
                </div>

                {/* 🔥 AI MOTIVATION */}
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

                {/* 🔥 WORKOUT LIST */}
                <div>
                  <WorkoutList workouts={workouts} />
                </div>
              </>
            )}
          </main>

          <Analytics />
        </div>
      )}
    </>
  );
}