"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 🔥 get current session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // 🔥 listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}