"use client";
import { useEffect, useState } from "react";
import { Workout } from "@/types";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkouts(data);
  };

  const addWorkout = async (workout: Workout) => {
    await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
    });
    fetchWorkouts();
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return { workouts, addWorkout };
}