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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-4 text-center">
      {items.map((item, i) => (
       <div
  key={i}
  className="bg-white rounded-2xl shadow-md p-4 text-center 
             hover:scale-105 transition duration-200"
>
<p className="text-sm text-gray-600 font-medium">
  {item.label}
</p>
<p className="text-2xl font-bold text-gray-900">
  {item.value}
</p>
        </div>
      ))}
    </div>
  );
}