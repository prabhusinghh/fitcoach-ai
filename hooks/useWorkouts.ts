"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 FETCH WORKOUTS
  const fetchWorkouts = async () => {
    try {
      setLoading(true);

      // 🔥 Try cache first
      const cached = localStorage.getItem("workouts");
      if (cached) {
        setWorkouts(JSON.parse(cached));
      }

      const res = await fetch("/api/workouts");
      const data = await res.json();

      setWorkouts(data);

      // 🔥 Save to cache
      localStorage.setItem("workouts", JSON.stringify(data));

    } catch (err) {
      console.error(err);
      setError("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 ADD WORKOUT (OPTIMISTIC UPDATE)
  const addWorkout = async (workout: Workout) => {
    try {
      // 🔥 Instant UI update
      const tempWorkout = {
        ...workout,
        id: `temp-${Date.now()}`,
      };

      setWorkouts((prev) => [tempWorkout, ...prev]);

      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      const savedWorkout = await res.json();

      // 🔥 Replace temp with real data
      setWorkouts((prev) =>
        prev.map((w) => (w.id === tempWorkout.id ? savedWorkout : w))
      );

    } catch (err) {
      console.error(err);
      setError("Failed to add workout");
    }
  };

  // 🟢 INITIAL LOAD
  useEffect(() => {
    fetchWorkouts();
  }, []);

  return { workouts, addWorkout, loading, error };
}