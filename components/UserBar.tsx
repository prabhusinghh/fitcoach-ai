"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserBar({ user }: any) {
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

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
      <div className="flex items-center justify-between">
        
        {/* LEFT SPACE */}
        <div className="w-10" />

        {/* CENTER TITLE */}
        <div className="flex items-center justify-center gap-3 flex-1">
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
            💪
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            FitCoach AI
          </h1>
        </div>

        {/* RIGHT USER */}
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          {/* Email */}
          <span className="text-sm text-gray-600 hidden md:block">
            {user?.email}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}