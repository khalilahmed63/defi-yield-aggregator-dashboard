import { formatCurrency, formatPercent } from "@/lib/utils/format";

type PoolTrendChartProps = {
  poolAddress: string;
  pair: string;
  apy: number;
  tvl: number;
};

type ChartPoint = {
  x: number;
  y: number;
};

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash *= 16777619;
  }
  return hash >>> 0;
}

function randomGenerator(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967295;
  };
}

function buildTrendSeries(base: number, seed: number): number[] {
  const random = randomGenerator(seed);
  const points: number[] = [];
  let current = Math.max(base, 0.01);

  for (let index = 0; index < 24; index += 1) {
    const drift = (random() - 0.5) * 0.18;
    current = Math.max(current * (1 + drift), base * 0.55);
    points.push(current);
  }

  return points;
}

function toPolylinePoints(values: number[], width: number, height: number): ChartPoint[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yRange = max - min || 1;
  const xStep = width / (values.length - 1 || 1);

  return values.map((value, index) => ({
    x: Number((index * xStep).toFixed(2)),
    y: Number((height - ((value - min) / yRange) * height).toFixed(2)),
  }));
}

function toPointsString(points: ChartPoint[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

export function PoolTrendChart({ poolAddress, pair, apy, tvl }: PoolTrendChartProps) {
  const width = 700;
  const height = 180;
  const seed = hashString(poolAddress);

  const apySeries = buildTrendSeries(Math.max(apy, 0.5), seed + 7);
  const tvlSeries = buildTrendSeries(Math.max(tvl, 1000), seed + 23);

  const apyPoints = toPolylinePoints(apySeries, width, height);
  const tvlPoints = toPolylinePoints(tvlSeries, width, height);

  const apyLine = toPointsString(apyPoints);
  const tvlLine = toPointsString(tvlPoints);
  const apyArea = `0,${height} ${apyLine} ${width},${height}`;

  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Pool Trend Snapshot</p>
          <h2 className="text-lg font-semibold text-zinc-100">{pair} performance view</h2>
        </div>
        <div className="text-right text-xs text-zinc-400">
          <p>Current APY: {formatPercent(apy)}</p>
          <p>Current TVL: {formatCurrency(tvl)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-48 w-full">
          <defs>
            <linearGradient id="apyArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(45 212 191)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(45 212 191)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <polyline points={apyArea} fill="url(#apyArea)" />
          <polyline points={apyLine} fill="none" stroke="rgb(45 212 191)" strokeWidth="3" />
          <polyline
            points={tvlLine}
            fill="none"
            stroke="rgb(129 140 248)"
            strokeDasharray="5 4"
            strokeWidth="2.5"
          />
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
          <span>24h ago</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              APY trend
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              TVL trend
            </span>
          </div>
          <span>Now</span>
        </div>
      </div>
    </section>
  );
}
