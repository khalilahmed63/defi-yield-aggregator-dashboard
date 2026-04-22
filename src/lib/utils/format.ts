export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 1_000_000 ? 2 : 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) {
    return "N/A";
  }

  return `${value.toFixed(2)}%`;
}
