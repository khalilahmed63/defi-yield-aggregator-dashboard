import Link from "next/link";

import { EntityBadge } from "@/components/common/EntityBadge";
import { formatCurrency, formatPercent } from "@/lib/utils/format";
import type { Pool } from "@/types/pool.types";

type PoolRowProps = {
  pool: Pool;
};

export function PoolRow({ pool }: PoolRowProps) {
  return (
    <tr className="h-14 border-b border-white/6 text-sm text-zinc-200 transition duration-200 hover:bg-white/[0.03]">
      <td className="px-4 py-3 font-medium">
        <EntityBadge value={pool.protocol} type="protocol" />
      </td>
      <td className="px-4 py-3 font-medium text-zinc-100">{pool.pair}</td>
      <td className="px-4 py-3">
        <EntityBadge value={pool.chain} type="chain" />
      </td>
      <td className="px-4 py-3 text-emerald-400">{formatPercent(pool.apy)}</td>
      <td className="px-4 py-3 text-zinc-300">{formatCurrency(pool.tvl)}</td>
      <td className="px-4 py-3">
        <Link
          href={`/pool/${encodeURIComponent(pool.id)}`}
          className="interactive-control inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-teal-200 transition hover:border-teal-300/40 hover:bg-teal-400/10"
        >
          View pool
        </Link>
      </td>
    </tr>
  );
}
