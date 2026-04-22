export type Pool = {
  id: string;
  protocol: string;
  chain: string;
  pair: string;
  apy: number;
  tvl: number;
  token0: string;
  token1: string;
  poolAddress: string;
  url: string;
};

export type SortKey = "apy" | "tvl";
