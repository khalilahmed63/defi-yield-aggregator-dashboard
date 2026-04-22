import Link from "next/link";
import { notFound } from "next/navigation";

import { EntityBadge } from "@/components/common/EntityBadge";
import { PoolTrendChart } from "@/components/features/pools/PoolTrendChart";
import { fetchAndNormalizePools } from "@/lib/api/fetch-pools";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

type PoolDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PoolDetailsPage({ params }: PoolDetailsPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const pools = await fetchAndNormalizePools();
  const pool = pools.find((item) => item.id === decodedId);

  if (!pool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 px-4 py-10 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/"
          className="interactive-control inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-teal-200 transition hover:border-teal-300/40 hover:bg-teal-400/10"
        >
          ← Back to pools
        </Link>

        <section className="interactive-card relative overflow-hidden space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/25 backdrop-blur md:p-7">
          <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <EntityBadge value={pool.protocol} type="protocol" />
              <EntityBadge value={pool.chain} type="chain" />
            </div>
            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{pool.pair}</h1>
          </div>

          <dl className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Chain</dt>
              <dd className="mt-2 text-lg font-medium">{pool.chain}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">APY</dt>
              <dd className="mt-2 text-lg font-semibold text-emerald-400">{formatPercent(pool.apy)}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">TVL</dt>
              <dd className="mt-2 text-lg font-medium">{formatCurrency(pool.tvl)}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Pool Address</dt>
              <dd className="mt-2 text-sm break-all text-zinc-300">{pool.poolAddress}</dd>
            </div>
          </dl>

          <PoolTrendChart
            poolAddress={pool.poolAddress}
            pair={pool.pair}
            apy={pool.apy}
            tvl={pool.tvl}
          />

          {pool.url ? (
            <a
              href={pool.url}
              target="_blank"
              rel="noreferrer noopener"
              className="interactive-control inline-flex rounded-xl bg-teal-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
            >
              Open farm
            </a>
          ) : (
            <p className="text-sm text-zinc-400">No external farm link is available for this pool.</p>
          )}
        </section>
      </div>
    </main>
  );
}
