import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data } = await supabase
    .from("workouts")
    .select("*")
    .order("date", { ascending: false });

  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("workouts")
    .insert([body]);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json(data);
}