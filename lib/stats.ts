export function calculateStats(workouts: any[]) {
  if (!workouts || workouts.length === 0){
    return {
      streak: 0,
      weeklyCount: 0,
      totalMinutes: 0,
      mostFrequent: "None",
      lastWorkoutDate: null,
    };
  }

  const dates = workouts.map(w => w.date).sort().reverse();

  // 🔥 Streak logic (unique days)
  const uniqueDates = [...new Set(dates)];
  let streak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);

    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) streak++;
    else break;
  }

  // 📅 Weekly count
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  const weeklyCount = workouts.filter(
    w => new Date(w.date) >= weekAgo
  ).length;

  // ⏱ Total minutes
  const totalMinutes = workouts.reduce(
    (sum, w) => sum + (w.duration || 0),
    0
  );

  // 🏃 Most frequent
  const freq: any = {};
  workouts.forEach(w => {
    freq[w.activity_type] = (freq[w.activity_type] || 0) + 1;
  });

  const mostFrequent = Object.keys(freq).reduce((a, b) =>
    freq[a] > freq[b] ? a : b
  );

  return {
    streak,
    weeklyCount,
    totalMinutes,
    mostFrequent,
    lastWorkoutDate: dates[0],
  };
}