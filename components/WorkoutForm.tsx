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
  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 space-y-5 border border-gray-100"
>
  {/* 🔥 HEADER */}
  <div>
    <h2 className="text-xl font-semibold text-gray-900">
      Add Workout
    </h2>
    <p className="text-sm text-gray-500">
      Track your daily fitness activity
    </p>
  </div>

  {/* 🔥 ACTIVITY TYPE */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Activity Type
    </label>
    <select
      className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 bg-white 
      focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
      onChange={(e) =>
        setForm({ ...form, activity_type: e.target.value })
      }
    >
      <option>Running</option>
      <option>Yoga</option>
      <option>Boxing</option>
      <option>Cycling</option>
    </select>
  </div>

  {/* 🔥 DURATION */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Duration (minutes)
    </label>
    <input
      type="number"
      placeholder="e.g. 30"
      className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
      onChange={(e) =>
        setForm({ ...form, duration: e.target.value })
      }
    />
  </div>

  {/* 🔥 DATE */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Date
    </label>
    <input
      type="date"
      value={form.date}
      className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 
      focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
      onChange={(e) =>
        setForm({ ...form, date: e.target.value })
      }
    />
  </div>

  {/* 🔥 BUTTON */}
  <button
    className="w-full bg-black text-white py-2.5 rounded-lg font-medium 
    hover:opacity-90 active:scale-95 transition duration-200 shadow-sm"
  >
    Add Workout
  </button>
</form>
  );
}