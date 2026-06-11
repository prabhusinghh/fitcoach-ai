"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 LOAD WORKOUTS from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("workouts");
      if (saved) {
        setWorkouts(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load workouts:", err);
      setError("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 SAVE to localStorage whenever workouts change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts, loading]);

  // 🟢 ADD WORKOUT
  const addWorkout = (workout: Workout) => {
    try {
      const newWorkout: Workout = {
        ...workout,
        id: `workout-${Date.now()}`,
        created_at: new Date().toISOString(),
      };

      setWorkouts((prev) => [newWorkout, ...prev]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add workout");
    }
  };

  return { workouts, addWorkout, loading, error };
}