import { Skeleton } from "@/components/common/Skeleton";

export function PoolsDashboardSkeleton() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
