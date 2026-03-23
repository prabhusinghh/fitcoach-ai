"use client";

import { useState } from "react";

export default function MotivationButton({ stats }: any) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const getMotivation = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/motivation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stats),
      });

      const data = await res.json();

      setMsg(data.message);
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-5">
      {/* Heading */}
      <h2 className="font-semibold text-lg text-gray-900 mb-3">
        AI Motivation
      </h2>

      {/* Button */}
     <button
  onClick={getMotivation}
  disabled={loading}
  className={`px-4 py-2 rounded text-white transition active:scale-95
  ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-black hover:opacity-90"
  }`}
>
  {loading ? "Generating..." : "Get Motivation"}
</button>

      {/* Message */}
      {msg && (
  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
    <p className="text-gray-800 text-sm leading-relaxed">
      {msg}
    </p>
  </div>
)}
    </div>
  );
}