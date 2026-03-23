export function calculateStats(workouts: any[]) {
  if (!workouts || workouts.length === 0) return null;

  // 🔹 Total Minutes
  const totalMinutes = workouts.reduce(
    (sum, w) => sum + w.duration,
    0
  );

  // 🔹 Most Frequent Activity
  const freq: Record<string, number> = {};
  workouts.forEach((w) => {
    freq[w.activity_type] = (freq[w.activity_type] || 0) + 1;
  });

  const mostFrequent = Object.keys(freq).reduce((a, b) =>
    freq[a] > freq[b] ? a : b
  );

  // 🔹 Weekly Count (Mon–Sun)
  const today = new Date();
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay());

  const weeklyCount = workouts.filter((w) => {
    const d = new Date(w.date);
    return d >= firstDay;
  }).length;

  // 🔥 🔥 🔥 CORRECT STREAK LOGIC 🔥 🔥 🔥

  // Step 1: Get unique dates
  const uniqueDates = [
    ...new Set(workouts.map((w) => w.date)),
  ];

  // Step 2: Convert to Date objects & sort descending
  const sortedDates = uniqueDates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let current = new Date();

  for (let date of sortedDates) {
    const diff =
      (current.getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff <= 1) {
      streak++;
      current = date;
    } else {
      break;
    }
  }

  return {
    totalMinutes,
    mostFrequent,
    weeklyCount,
    streak,
  };
}