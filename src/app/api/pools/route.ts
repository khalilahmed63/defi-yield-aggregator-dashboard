import { fetchAndNormalizePools } from "@/lib/api/fetch-pools";

export async function GET() {
  try {
    const pools = await fetchAndNormalizePools();
    return Response.json(pools, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return Response.json(
      {
        error: "Failed to fetch pools",
      },
      { status: 500 },
    );
  }
}
