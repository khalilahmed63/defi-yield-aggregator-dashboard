"use client";

import { useMemo, useState } from "react";

import type { SortKey, Pool } from "@/types/pool.types";
import { PoolRow } from "@/components/features/pools/PoolRow";

type PoolTableProps = {
  pools: Pool[];
  sortBy: SortKey;
  onSortChange: (value: SortKey) => void;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function PoolTable({
  pools,
  sortBy,
  onSortChange,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  onPageSizeChange,
  onPreviousPage,
  onNextPage,
}: PoolTableProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 56;
  const viewportHeight = 560;
  const overscan = 6;
  const totalRows = pools.length;
  const baseStart = Math.floor(scrollTop / rowHeight);
  const startIndex = Math.max(0, baseStart - overscan);
  const visibleRows = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
  const endIndex = Math.min(totalRows, startIndex + visibleRows);
  const offsetTop = startIndex * rowHeight;
  const offsetBottom = (totalRows - endIndex) * rowHeight;

  const visiblePools = useMemo(
    () => pools.slice(startIndex, endIndex),
    [endIndex, pools, startIndex],
  );

  return (
    <section className="interactive-card overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
        <h2 className="text-sm font-semibold text-zinc-100">Liquidity Pools</h2>
        <div className="flex items-center gap-3">
          <p className="text-sm text-zinc-400">
            Showing {pools.length} of {totalCount}
          </p>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            className="interactive-control rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-zinc-100 outline-none transition hover:border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="apy">Highest APY</option>
            <option value="tvl">Highest TVL</option>
          </select>
        </div>
      </div>

      <div
        className="overflow-auto [scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-width:thin]"
        style={{ maxHeight: `${viewportHeight}px` }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-zinc-900/95 text-left text-xs uppercase tracking-wide text-zinc-400 backdrop-blur">
            <tr>
              <th className="px-4 py-3">Protocol</th>
              <th className="px-4 py-3">Pair</th>
              <th className="px-4 py-3">Chain</th>
              <th className="px-4 py-3">APY</th>
              <th className="px-4 py-3">TVL</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {offsetTop > 0 ? (
              <tr aria-hidden="true">
                <td style={{ height: `${offsetTop}px` }} colSpan={6} />
              </tr>
            ) : null}

            {visiblePools.map((pool) => (
              <PoolRow key={pool.id} pool={pool} />
            ))}

            {offsetBottom > 0 ? (
              <tr aria-hidden="true">
                <td style={{ height: `${offsetBottom}px` }} colSpan={6} />
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm text-zinc-400">
            Rows
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="interactive-control rounded-xl border border-white/10 bg-black/25 px-2.5 py-1.5 text-sm text-zinc-100 outline-none transition hover:border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="interactive-control rounded-xl border border-white/10 bg-black/25 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="min-w-20 text-center text-sm text-zinc-400">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="interactive-control rounded-xl border border-white/10 bg-black/25 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
