"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) return;

    setLoading(true);

   await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: "https://fitcoach-ai-bot.vercel.app",
  },
});

    setLoading(false);
    alert("Check your email for login link 📩");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="glass p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/30">
        
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl mb-2">
            💪
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            FitCoach AI
          </h1>
          <p className="text-sm text-gray-500">
            Your personal fitness assistant
          </p>
        </div>

        {/* INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 p-2.5 rounded-lg mb-4 text-gray-900
          focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-white font-medium transition
          ${loading ? "bg-gray-400" : "bg-black hover:opacity-90"}`}
        >
          {loading ? "Sending..." : "Login / Signup"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          We’ll send you a magic login link ✨
        </p>
      </div>
    </div>
  );
}