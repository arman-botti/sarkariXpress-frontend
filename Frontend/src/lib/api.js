// frontend/src/lib/api.js
// All API calls to backend

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchJobs(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/jobs?${query}`, {
    next: { revalidate: 300 }, // Next.js cache — refresh every 5 min
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${BASE}/api/jobs/summary`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function fetchTicker() {
  const res = await fetch(`${BASE}/api/jobs/ticker`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch ticker");
  return res.json();
}
