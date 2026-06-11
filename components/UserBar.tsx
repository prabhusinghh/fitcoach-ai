"use client";

import { useEffect, useState } from "react";

export default function UserBar() {
  const [scrolled, setScrolled] = useState(false);

  // 🔥 detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 mb-6 px-4 py-3 rounded-xl transition
      backdrop-blur-md border border-white/30
      ${scrolled ? "bg-white/70 shadow-md" : "bg-white/40"}`}
    >
      <div className="flex items-center justify-center gap-3">
        {/* LOGO */}
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
          💪
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          FitCoach AI
        </h1>
      </div>
    </div>
  );
}