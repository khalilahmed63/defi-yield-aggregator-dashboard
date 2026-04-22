const DEFI_LLAMA_YIELDS_URL = "https://yields.llama.fi/pools";

export type DefiLlamaPool = {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  apy?: number;
  tvlUsd?: number;
  url?: string;
  underlyingTokens?: string[];
};

type DefiLlamaResponse = {
  data: DefiLlamaPool[];
};

export async function fetchDefiLlamaPools(): Promise<DefiLlamaPool[]> {
  const response = await fetch(DEFI_LLAMA_YIELDS_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`DeFiLlama request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as DefiLlamaResponse;
  return payload.data ?? [];
}
