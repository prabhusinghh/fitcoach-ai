import { supabase } from "@/lib/supabaseClient";

const GUEST_USER_ID = "guest";

export async function GET() {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", GUEST_USER_ID)
    .order("date", { ascending: false });

  if (error) {
    console.error("Fetch workouts error:", error);
    return Response.json([], { status: 200 });
  }

  return Response.json(data || []);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("workouts")
    .insert([
      {
        activity_type: body.activity_type,
        duration: body.duration,
        date: body.date,
        user_id: GUEST_USER_ID,
      },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error);
    return Response.json({ error: "Insert failed" }, { status: 500 });
  }

  return Response.json(data?.[0] || {});
}