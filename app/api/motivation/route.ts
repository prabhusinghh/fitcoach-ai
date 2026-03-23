export async function POST(req: Request) {
  const stats = await req.json();

  const { streak, weeklyCount, totalMinutes, mostFrequent } = stats;

  let message = "";

  // 🔥 Smart personalized logic

  if (streak >= 5) {
    message = `🔥 Amazing! You're on a ${streak}-day streak. Keep pushing and consider adding a recovery day to avoid burnout.`;
  } else if (streak >= 3) {
    message = `💪 Great job! A ${streak}-day streak is building momentum. Stay consistent!`;
  } else {
    message = `🚀 Let's build your streak! Start with small daily workouts.`;
  }

  if (weeklyCount >= 5) {
    message += ` You're highly active this week (${weeklyCount} sessions). Keep it balanced.`;
  } else {
    message += ` Try reaching 5 workouts this week—you’re at ${weeklyCount}.`;
  }

  message += ` Total minutes: ${totalMinutes}.`;

  if (mostFrequent) {
    message += ` You enjoy ${mostFrequent}—consider diversifying for better fitness.`;
  }

  return Response.json({ message });
}