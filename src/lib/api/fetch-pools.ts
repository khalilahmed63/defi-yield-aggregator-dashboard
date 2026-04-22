import { MVP_PROTOCOLS } from "@/constants/protocols";
import { fetchDefiLlamaPools, type DefiLlamaPool } from "@/lib/api/defi-llama";
import type { Pool } from "@/types/pool.types";

function normalizeProjectName(project: string): string {
  return project.trim().toLowerCase();
}

function isMvpProtocol(project: string): boolean {
  return MVP_PROTOCOLS.includes(project as (typeof MVP_PROTOCOLS)[number]);
}

function splitPair(symbol: string): { token0: string; token1: string } {
  const parts = symbol.split(/[-/:\s]+/).filter(Boolean);
  return {
    token0: parts[0] ?? "",
    token1: parts[1] ?? "",
  };
}

export function normalizePools(rawPools: DefiLlamaPool[]): Pool[] {
  return rawPools.map((pool) => {
    const { token0, token1 } = splitPair(pool.symbol ?? "");

    return {
      id: pool.pool,
      protocol: pool.project,
      chain: pool.chain,
      pair: pool.symbol,
      apy: Number(pool.apy ?? 0),
      tvl: Number(pool.tvlUsd ?? 0),
      token0,
      token1,
      poolAddress: pool.pool,
      url: pool.url ?? "",
    };
  });
}

export async function fetchAndNormalizePools(): Promise<Pool[]> {
  try {
    const rawPools = await fetchDefiLlamaPools();
    const mvpPools = rawPools.filter((pool) => isMvpProtocol(normalizeProjectName(pool.project)));

    return normalizePools(mvpPools);
  } catch (error) {
    console.error("Failed to fetch and normalize pools", error);
    throw new Error("Unable to load pool data");
  }
}
