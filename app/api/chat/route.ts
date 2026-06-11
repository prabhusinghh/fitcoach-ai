export async function POST(req: Request) {
  try {
    const { messages, stats, recentWorkouts } = await req.json();

    const recentMessages = messages.slice(-5);

    // 🔥 Build recent workout history for context
    let workoutHistory = "No workouts logged yet.";
    if (recentWorkouts && recentWorkouts.length > 0) {
      workoutHistory = recentWorkouts
        .map(
          (w: any) =>
            `- ${w.activity_type}: ${w.duration} mins on ${w.date}`
        )
        .join("\n");
    }

    const systemPrompt = `
You are a friendly, motivating fitness coach AI.

IMPORTANT RULES:
- ALWAYS use the user's provided stats and workout history
- NEVER guess or assume data
- NEVER invent activities the user hasn't done
- If a value exists, use it directly
- Reference specific workouts when relevant

User Stats:
- Streak: ${stats?.streak || 0} days
- Weekly workouts: ${stats?.weeklyCount || 0}
- Total minutes: ${stats?.totalMinutes || 0}
- Most frequent activity: ${stats?.mostFrequent || "None"}

Recent Workout History:
${workoutHistory}

Behavior:
- Answer based ONLY on given stats and workout history
- Be concise (2–4 lines max)
- Be accurate, motivating, and personal
- Reference their actual activities and progress when answering
`;

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...recentMessages,
          ],
        }),
      }
    );

    const data = await res.json();

    // 🛡 SAFE CHECK
    if (!data.choices || !data.choices[0]) {
      console.error("GROQ BAD RESPONSE:", data);

      return Response.json({
        role: "assistant",
        content: "AI response failed. Try again.",
      });
    }

    return Response.json({
      role: "assistant",
      content: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("GROQ ERROR:", error);

    return Response.json({
      role: "assistant",
      content: "AI is currently unavailable.",
    });
  }
}