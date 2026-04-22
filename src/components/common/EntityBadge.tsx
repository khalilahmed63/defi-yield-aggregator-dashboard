type EntityBadgeProps = {
  value: string;
  type: "protocol" | "chain";
};

const PROTOCOL_STYLES: Record<string, string> = {
  "uniswap-v3": "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-100",
  "sushiswap-v3": "border-cyan-300/40 bg-cyan-400/15 text-cyan-100",
};

const CHAIN_STYLES: Record<string, string> = {
  ethereum: "border-indigo-300/40 bg-indigo-400/15 text-indigo-100",
  polygon: "border-violet-300/40 bg-violet-400/15 text-violet-100",
  base: "border-blue-300/40 bg-blue-400/15 text-blue-100",
};

export function EntityBadge({ value, type }: EntityBadgeProps) {
  const key = value.toLowerCase();
  const styles =
    type === "protocol"
      ? (PROTOCOL_STYLES[key] ?? "border-zinc-600 bg-zinc-800 text-zinc-200")
      : (CHAIN_STYLES[key] ?? "border-zinc-600 bg-zinc-800 text-zinc-200");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.06em] uppercase ${styles}`}
    >
      {value}
    </span>
  );
}
