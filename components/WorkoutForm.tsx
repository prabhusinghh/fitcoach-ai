"use client";
import { useState } from "react";

export default function WorkoutForm({ onAdd }: any) {
  const [form, setForm] = useState({
    activity_type: "Running",
    duration: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.duration || isNaN(Number(form.duration))) {
      alert("Enter valid duration");
      return;
    }

    onAdd({
      ...form,
      duration: Number(form.duration),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-5 space-y-4">    
      {/* 🔥 FIXED HEADING */}
      <h2 className="font-semibold text-lg text-gray-900">
        Add Workout
      </h2>

      {/* 🔥 SELECT */}
      <select
        className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white"
        onChange={(e) =>
          setForm({ ...form, activity_type: e.target.value })
        }
      >
        <option>Running</option>
        <option>Yoga</option>
        <option>Boxing</option>
        <option>Cycling</option>
      </select>

      {/* 🔥 INPUT */}
      <input
        type="number"
        placeholder="Duration (mins)"
       className="w-full border border-gray-300 p-2 rounded text-gray-900 
focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) =>
          setForm({ ...form, duration: e.target.value })
        }
      />

      {/* 🔥 DATE */}
      <input
        type="date"
        value={form.date}
        className="w-full border border-gray-300 p-2 rounded text-gray-900 
focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      {/* 🔥 BUTTON */}
      <button className="w-full bg-black text-white py-2 rounded hover:opacity-90 active:scale-95 transition">
        Add Workout
      </button>
    </form>
  );
}