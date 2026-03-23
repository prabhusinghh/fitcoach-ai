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
  <div className="glass rounded-2xl shadow-lg p-5 border border-white/30 
max-h-[260px] flex flex-col backdrop-blur-md">
    
    {/* HEADER */}
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 flex items-center justify-center bg-black text-white rounded-full text-sm">
        ⚡
      </div>
      <div>
        <h2 className="text-md font-semibold text-gray-900">
          AI Motivation
        </h2>
        <p className="text-xs text-gray-500">
          Smart fitness insights
        </p>
      </div>
    </div>

    {/* BUTTON */}
   <button
  onClick={getMotivation}
  disabled={loading}
 className={`w-full py-2.5 rounded-lg font-medium text-white 
flex items-center justify-center gap-2
transition duration-200 active:scale-95
${
  loading
    ? "bg-gray-400"
    : "bg-gradient-to-r from-black via-gray-800 to-black shadow-md hover:shadow-xl"
}`}
>
  {loading ? (
    <>
      <span className="animate-spin">⏳</span>
      Generating...
    </>
  ) : (
    <>
      ⚡ Get Motivation
    </>
  )}
</button>

    {/* MESSAGE (SCROLLABLE) */}
    {msg && !loading && (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg text-gray-800 text-sm leading-relaxed border max-h-[120px] overflow-y-auto">
  {msg}
</div>
    )}
  </div>
);
}