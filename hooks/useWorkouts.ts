"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types";
import { supabase } from "@/lib/supabaseClient";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 FETCH WORKOUTS
  const fetchWorkouts = async () => {
    try {
      setLoading(true);

      // 🔥 get session token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const cached = localStorage.getItem("workouts");
      if (cached) {
        setWorkouts(JSON.parse(cached));
      }

      const res = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
      });

      const data = await res.json();

      setWorkouts(data || []);
      localStorage.setItem("workouts", JSON.stringify(data || []));
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      const user = session?.user;

      const tempWorkout = {
        ...workout,
        id: `temp-${Date.now()}`,
        user_id: user?.id,
      };

      // 🔥 Optimistic UI
      setWorkouts((prev) => [tempWorkout, ...prev]);

      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
        body: JSON.stringify({
          ...workout,
          user_id: user?.id,
        }),
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
      const updated = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedData = await updated.json();
      localStorage.setItem("workouts", JSON.stringify(updatedData || []));
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