"use client";

export default function StatsCards({ stats }: any) {
  if (!stats) return null;

  const items = [
    { label: "🔥 Streak", value: stats.streak },
    { label: "📅 This Week", value: stats.weeklyCount },
    { label: "🏃 Frequent", value: stats.mostFrequent },
    { label: "⏱ Minutes", value: stats.totalMinutes },
  ];

  return (
    <>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 text-center 
                     hover:shadow-lg hover:-translate-y-1 
                     transition duration-200"
        >
          <p className="text-gray-500 text-sm font-medium">
            {item.label}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {item.value}
          </h2>
        </div>
      ))}
    </>
  );
}