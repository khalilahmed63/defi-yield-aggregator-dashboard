"use client";

import { SUPPORTED_CHAINS } from "@/constants/chains";

type ChainSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ChainSelector({ value, onChange }: ChainSelectorProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="interactive-control w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
    >
      <option value="all">All chains</option>
      {SUPPORTED_CHAINS.map((chain) => (
        <option key={chain} value={chain}>
          {chain}
        </option>
      ))}
    </select>
  );
}
