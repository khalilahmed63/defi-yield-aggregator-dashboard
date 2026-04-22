import { Suspense } from "react";
import { PoolsDashboard } from "@/components/features/pools/PoolsDashboard";
import { PoolsDashboardSkeleton } from "@/components/features/pools/PoolsDashboardSkeleton";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 px-4 py-10 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="interactive-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          <div className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-28 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-teal-300">YieldScout</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              Find The Best DeFi Farms In Seconds
            </h1>
            <p className="max-w-3xl text-sm text-zinc-300 md:text-base">
              A cleaner, faster way to compare APY and TVL across top protocols and chains.
            </p>
          </div>
        </header>

        <Suspense
          fallback={
            <PoolsDashboardSkeleton />
          }
        >
          <PoolsDashboard />
        </Suspense>
      </div>
    </main>
  );
}
