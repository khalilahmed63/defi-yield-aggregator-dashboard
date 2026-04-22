"use client";

import { ChainSelector } from "@/components/features/pools/ChainSelector";

type PoolFiltersProps = {
  chain: string;
  protocol: string;
  search: string;
  protocols: string[];
  onChainChange: (value: string) => void;
  onProtocolChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export function PoolFilters({
  chain,
  protocol,
  search,
  protocols,
  onChainChange,
  onProtocolChange,
  onSearchChange,
}: PoolFiltersProps) {
  return (
    <section className="interactive-card rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/20 backdrop-blur md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-100">Filters</h2>
        <span className="text-xs uppercase tracking-wide text-zinc-400">Live update</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <ChainSelector value={chain} onChange={onChainChange} />

        <select
          value={protocol}
          onChange={(event) => onProtocolChange(event.target.value)}
          className="interactive-control w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="all">All protocols</option>
          {protocols.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search pair (ETH, USDC...)"
          className="interactive-control w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition hover:border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
    </section>
  );
}
