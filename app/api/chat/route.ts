export async function POST(req: Request) {
  try {
    const { messages, stats, tone } = await req.json();
    const lastMessage =
      messages[messages.length - 1]?.content.toLowerCase();

    // 🟢 🔥 HARD RULES (ADD HERE)
    // if (lastMessage.includes("frequent")) {
    //   return Response.json({
    //     role: "assistant",
    //     content: `Your most frequent activity is ${stats?.mostFrequent || "not available"} 🚴`,
    //   });
    // }

    // if (lastMessage.includes("streak")) {
    //   return Response.json({
    //     role: "assistant",
    //     content: `Your current streak is ${stats?.streak || 0} days 🔥`,
    //   });
    // }

    const recentMessages = messages.slice(-5);

   const systemPrompt = `
You are a fitness coach AI.

IMPORTANT RULES:
- ALWAYS use the user's provided stats
- NEVER guess or assume data
- NEVER invent activities
- If a value exists, use it directly

User stats:
- Streak: ${stats?.streak || 0} days
- Weekly workouts: ${stats?.weeklyCount || 0}
- Total minutes: ${stats?.totalMinutes || 0}
- Most frequent activity: ${stats?.mostFrequent || "unknown"}

Behavior:
- Answer based ONLY on given stats
- Be concise (2–4 lines max)
- Be accurate and confident

Example:
If user asks "what is my frequent exercise"
→ Answer using "Most frequent activity"
`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
    });

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