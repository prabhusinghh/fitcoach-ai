export async function POST(req: Request) {
  const stats = await req.json();

  const templates = [
    `You're currently on a ${stats.streak}-day streak 🔥 — that’s not luck, that’s discipline. Most people quit early, but you’re showing consistency. If you keep showing up like this, results are guaranteed. Stay focused and don’t break the chain.`,

    `This week you've completed ${stats.weeklyCount} workouts. That’s strong progress. Imagine where you'll be in a month if you maintain this pace. Small efforts done daily lead to massive transformation over time.`,

    `You've already invested ${stats.totalMinutes} minutes into your fitness. That’s time most people never commit. Every minute is building a stronger, better version of you. Keep stacking those minutes.`,

    `${stats.mostFrequent} seems to be your go-to activity. That’s great — consistency builds mastery. But don’t be afraid to challenge yourself and add variety to push your limits further.`,

    `You’re doing better than you think. Progress isn’t always visible immediately, but every workout is shaping your discipline, mindset, and strength. Stay patient — results are coming.`
  ];

  const random =
    templates[Math.floor(Math.random() * templates.length)];

  return Response.json({
    message: random,
  });
}