import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return Response.json([], { status: 200 }); // ✅ FIX

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) return Response.json([], { status: 200 }); // ✅ FIX

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    return Response.json([], { status: 200 });
  }

  return Response.json(data || []);
}

export async function POST(req: Request) {
  const body = await req.json();

  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 }); // ✅ FIX
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 }); // ✅ FIX
  }

  const { data, error } = await supabase
    .from("workouts")
    .insert([
      {
        ...body,
        user_id: user.id, // ✅ ensure always present
      },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error); // 🔥 DEBUG
    return Response.json({ error: "Insert failed" }, { status: 500 });
  }

  return Response.json(data?.[0] || {});
}