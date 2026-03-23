"use client";

export default function Skeleton() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-6">
      
      {/* HEADER */}
      <div className="flex justify-center mb-8">
        <div className="h-8 w-40 shimmer" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 shimmer rounded-2xl" />
        ))}
      </div>

      {/* MOTIVATION */}
      <div className="flex justify-center mb-8">
        <div className="w-full md:w-[500px] h-32 shimmer rounded-2xl" />
      </div>

      {/* FORM + CHAT */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="h-[420px] shimmer rounded-2xl" />
        <div className="h-[420px] shimmer rounded-2xl" />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 shimmer rounded-xl" />
        ))}
      </div>
    </main>
  );
}