import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  // 🔥 ADD THIS (get user)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user?.id) // ✅ ADD THIS
    .order("date", { ascending: false });

  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  // 🔥 ADD THIS (get user)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("workouts")
    .insert([
      {
        ...body,
        user_id: user?.id, // ✅ ADD THIS
      },
    ]);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json(data?.[0]);
}