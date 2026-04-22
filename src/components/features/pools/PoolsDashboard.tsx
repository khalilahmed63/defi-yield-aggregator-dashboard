"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PoolFilters } from "@/components/features/pools/PoolFilters";
import { PoolsDashboardSkeleton } from "@/components/features/pools/PoolsDashboardSkeleton";
import { PoolTable } from "@/components/features/pools/PoolTable";
import type { Pool, SortKey } from "@/types/pool.types";

export function PoolsDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const sortParam = searchParams.get("sort");
  const sortBy: SortKey = sortParam === "tvl" ? "tvl" : "apy";
  const chain = searchParams.get("chain") ?? "all";
  const protocol = searchParams.get("protocol") ?? "all";
  const search = searchParams.get("search") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const pageSizeParam = Number(searchParams.get("pageSize") ?? "50");
  const pageSize = [25, 50, 100].includes(pageSizeParam) ? pageSizeParam : 50;

  function updateQuery(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  useEffect(() => {
    async function loadPools() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/pools");
        if (!response.ok) {
          throw new Error("Failed to load pools");
        }

        const data = (await response.json()) as Pool[];
        setPools(data);
      } catch {
        setError("Unable to load pool data right now.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPools();
  }, []);

  const protocols = useMemo(
    () => [...new Set(pools.map((pool) => pool.protocol))].sort((a, b) => a.localeCompare(b)),
    [pools],
  );

  const filteredAndSortedPools = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return pools
      .filter((pool) => (chain === "all" ? true : pool.chain === chain))
      .filter((pool) => (protocol === "all" ? true : pool.protocol === protocol))
      .filter((pool) => {
        if (!searchQuery) {
          return true;
        }

        return (
          pool.pair.toLowerCase().includes(searchQuery) ||
          pool.token0.toLowerCase().includes(searchQuery) ||
          pool.token1.toLowerCase().includes(searchQuery)
        );
      })
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [chain, pools, protocol, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedPools.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedPools = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedPools.slice(start, start + pageSize);
  }, [currentPage, filteredAndSortedPools, pageSize]);

  if (isLoading) {
    return <PoolsDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900/60 bg-red-950/20 p-6 text-red-200 backdrop-blur">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PoolFilters
        chain={chain}
        protocol={protocol}
        search={search}
        protocols={protocols}
        onChainChange={(value) => {
          updateQuery({
            chain: value === "all" ? null : value,
            page: null,
          });
        }}
        onProtocolChange={(value) => {
          updateQuery({
            protocol: value === "all" ? null : value,
            page: null,
          });
        }}
        onSearchChange={(value) => {
          updateQuery({
            search: value.trim() ? value : null,
            page: null,
          });
        }}
      />

      {filteredAndSortedPools.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-zinc-300 backdrop-blur">
          No pools match your filters.
        </div>
      ) : (
        <PoolTable
          pools={pagedPools}
          totalCount={filteredAndSortedPools.length}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageSizeChange={(value) => {
            updateQuery({
              pageSize: value === 50 ? null : String(value),
              page: null,
            });
          }}
          onPreviousPage={() =>
            updateQuery({
              page: currentPage - 1 <= 1 ? null : String(currentPage - 1),
            })
          }
          onNextPage={() =>
            updateQuery({
              page: String(Math.min(totalPages, currentPage + 1)),
            })
          }
          sortBy={sortBy}
          onSortChange={(value) => {
            updateQuery({
              sort: value === "apy" ? null : value,
              page: null,
            });
          }}
        />
      )}
    </div>
  );
}
