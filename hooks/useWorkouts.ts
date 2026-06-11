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

      // Load from localStorage cache first
      const cached = localStorage.getItem("workouts");
      if (cached) {
        setWorkouts(JSON.parse(cached));
      }

      const res = await fetch("/api/workouts");
      const data = await res.json();

      if (Array.isArray(data)) {
        setWorkouts(data);
        localStorage.setItem("workouts", JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      // Fall back to cached data if API fails
      const cached = localStorage.getItem("workouts");
      if (cached) {
        setWorkouts(JSON.parse(cached));
      }
      setError("Failed to load workouts from server");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 ADD WORKOUT (OPTIMISTIC UPDATE)
  const addWorkout = async (workout: Workout) => {
    try {
      const tempWorkout = {
        ...workout,
        id: `temp-${Date.now()}`,
      };

      // 🔥 Optimistic UI
      setWorkouts((prev) => [tempWorkout, ...prev]);

      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      // 🔥 SAFE JSON PARSE (prevents crash)
      let savedWorkout = null;
      try {
        savedWorkout = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error("Failed to add workout");
      }

      // 🔥 Replace temp with real data
      setWorkouts((prev) =>
        prev.map((w) =>
          w.id === tempWorkout.id && savedWorkout ? savedWorkout : w
        )
      );

      // 🔥 update cache
      const updated = await fetch("/api/workouts");
      const updatedData = await updated.json();
      if (Array.isArray(updatedData)) {
        localStorage.setItem("workouts", JSON.stringify(updatedData));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add workout");

      // 🔥 rollback optimistic update
      setWorkouts((prev) =>
        prev.filter((w) => !String(w.id).startsWith("temp-"))
      );
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return { workouts, addWorkout, loading, error };
}