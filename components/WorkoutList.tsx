"use client";

export default function WorkoutList({ workouts }: any) {
  const safeWorkouts = (workouts || []).filter(
    (w: any) => w && w.date
  ); // ✅ FIX

  return (
    <div className="glass rounded-2xl shadow-md p-6 border border-white/30 backdrop-blur-md">
      
      {/* 🔥 HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Workout History
        </h2>
        <p className="text-sm text-gray-500">
          Track your past activities
        </p>
      </div>

      {/* 🔥 EMPTY STATE */}
      {safeWorkouts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No workouts yet 🚀 <br />
          <span className="text-sm">Start your fitness journey today!</span>
        </div>
      ) : (
        /* 🔥 SCROLLABLE LIST */
        <div className="max-h-[320px] overflow-y-auto pr-2 space-y-2">
          
          {safeWorkouts.map((w: any) => (
            <div
              key={w.id}
              className="flex justify-between items-center bg-white/70 px-4 py-3 rounded-xl 
hover:bg-white transition duration-200"
            >
              {/* 🔥 LEFT: Activity */}
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium">
                  {w.activity_type}
                </span>
                <span className="text-xs text-gray-500">
                  {w.date}
                </span>
              </div>

              {/* 🔥 RIGHT: Duration */}
              <div className="text-gray-700 font-medium">
                {w.duration} mins
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}