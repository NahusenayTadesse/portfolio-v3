import isReachable from "is-reachable";

export async function GET({ url }) {
  const site = url.searchParams.get("site");
  if (!site) return new Response("Missing site parameter", { status: 400 });

  const isUp = await isReachable(site);
  return new Response(JSON.stringify({ up: isUp }), {
    headers: { "Content-Type": "application/json" }
  });
}