"use client";

export default function WorkoutList({ workouts }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-5">
      
      {/* 🔥 HEADING FIX */}
      <h2 className="font-semibold text-lg text-gray-900 mb-4">
        Workout History
      </h2>

      {/* 🔥 EMPTY STATE */}
      {workouts.length === 0 && (
  <div className="text-center text-gray-500 py-6">
    No workouts yet 🚀 Start your journey!
  </div>
)}

      {/* 🔥 LIST */}
      {workouts.map((w: any) => (
       <div
  key={w.id}
  className="flex justify-between items-center border-b border-gray-200 py-3 hover:bg-gray-50 px-2 rounded transition"
>
          {/* Activity */}
          <span className="text-gray-900 font-medium">
            {w.activity_type}
          </span>

          {/* Duration */}
          <span className="text-gray-700">
            {w.duration} mins
          </span>

          {/* Date */}
          <span className="text-gray-500 text-sm">
            {w.date}
          </span>
        </div>
      ))}
    </div>
  );
}