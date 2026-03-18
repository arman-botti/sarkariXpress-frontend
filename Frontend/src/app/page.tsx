import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Ticker from "../components/Ticker";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import { fetchJobs, fetchSummary, fetchTicker } from "../lib/api";
import "./globals.css";

// ---- Types
interface Job {
  _id: string;
  title: string;
  link?: string;
  createdAt?: string;
}

interface SummaryItem {
  _id: string;
  count: number;
}

interface TickerItem {
  _id: string;
  title: string;
  link?: string;
  createdAt?: string;
}

interface DashboardData {
  jobs: Job[];
  results: Job[];
  summary: SummaryItem[];
  ticker: TickerItem[];
  errors: string[];
  hasData: boolean;
}

// ---- Constants
const STATS_CONFIG = [
  { icon: "💼", key: "job", label: "Active Jobs", color: "#3b82f6", bg: "#eff6ff" },
  { icon: "📋", key: "result", label: "Results", color: "#10b981", bg: "#f0fdf4" },
  { icon: "🎫", key: "admit_card", label: "Admit Cards", color: "#8b5cf6", bg: "#faf5ff" },
] as const;

const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "SarkariXpress",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fallback.com",
};

// ---- Safe fetch (FIXED)
async function safeFetch<T>(fn: () => Promise<any>, name: string): Promise<T | null> {
  try {
    const res = await fn();

    if (!res) return null;

    if (Array.isArray(res)) return res as T;
    if (res?.data && Array.isArray(res.data)) return res.data as T;
    if (res?.summary && Array.isArray(res.summary)) return res.summary as T;

    return null;
  } catch (err) {
    console.error(`❌ ${name} fetch failed`, err);
    return null;
  }
}

// ---- Fetch Data (FIXED)
async function getData(): Promise<DashboardData> {
  const errors: string[] = [];

  const [jobs, results, summary, ticker] = await Promise.all([
    safeFetch<Job[]>(() => fetchJobs({ category: "job", limit: 10 }), "jobs"),
    safeFetch<Job[]>(() => fetchJobs({ category: "result", limit: 10 }), "results"),
    safeFetch<SummaryItem[]>(() => fetchSummary(), "summary"),
    safeFetch<TickerItem[]>(() => fetchTicker(), "ticker"),
  ]);

  if (!jobs) errors.push("jobs");
  if (!results) errors.push("results");
  if (!summary) errors.push("summary");
  if (!ticker) errors.push("ticker");

  const hasData =
    (jobs?.length ?? 0) > 0 ||
    (results?.length ?? 0) > 0 ||
    (summary?.length ?? 0) > 0 ||
    (ticker?.length ?? 0) > 0;

  return {
    jobs: jobs ?? [],
    results: results ?? [],
    summary: summary ?? [],
    ticker: ticker ?? [],
    errors,
    hasData,
  };
}

// ---- Count helper
function getCount(summary: SummaryItem[], key: string): number {
  return summary.find((s) => s._id === key)?.count ?? 0;
}

// ---- Stats Cards
function StatsCards({ summary, hasData }: { summary: SummaryItem[]; hasData: boolean }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: 12,
      marginBottom: 24,
    }}>
      {STATS_CONFIG.map((stat) => {
        const count = getCount(summary, stat.key);

        return (
          <article key={stat.key} style={{
            background: !hasData ? "#f3f4f6" : stat.bg,
            padding: "16px 20px",
            borderRadius: 12,
            border: `1px solid ${!hasData ? "#e5e7eb" : stat.color + "30"}`,
            opacity: !hasData ? 0.7 : 1,
            minHeight: 80,
          }}>
            <div style={{ fontSize: 24 }}>{stat.icon}</div>
            <div style={{
              fontSize: 28,
              fontWeight: 800,
              color: !hasData ? "#9ca3af" : stat.color,
            }}>
              {!hasData ? "..." : count.toLocaleString()}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {stat.label}
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ---- Error Banner
function ErrorBanner({ errors }: { errors: string[] }) {
  if (!errors.length) return null;

  return (
    <div style={{
      background: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#dc2626",
      padding: "12px 16px",
      borderRadius: 8,
      marginBottom: 16,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }}>
      <span>⚠️ Failed to load: {errors.join(", ")}</span>
      <Link href="/" style={{
        background: "#dc2626",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: 6,
        textDecoration: "none",
      }}>
        Refresh
      </Link>
    </div>
  );
}

// ---- MAIN
export default async function HomePage() {
  const data = await getData();

  return (
    <div style={{ background: "#f4f6fa", minHeight: "100vh" }}>
      {/* ✅ FIX: correct prop */}
      <Ticker data={data.ticker} />

      <header style={{
        background: "#fff",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800 }}>
              {SITE_CONFIG.name.replace("Xpress", "")}
              <span style={{ color: "#1a3faa" }}>Xpress</span>
            </h1>
          </Link>
        </div>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
        gap: 24,
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <main>
          <ErrorBanner errors={data.errors} />
          <StatsCards summary={data.summary} hasData={data.hasData} />

          <Section title="🔥 Latest Jobs" items={data.jobs} category="job" />
          <Section title="📢 Results" items={data.results} category="result" />
        </main>

        <aside style={{ position: "sticky", top: 80 }}>
          <Sidebar summary={data.summary} highlights={data.jobs.slice(0, 5)} />
        </aside>
      </div>
    </div>
  );
}

// ---- Metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "SarkariXpress - Latest Govt Jobs & Results",
  description: "Latest government jobs, results and admit cards",
};

// ---- Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// ---- FINAL FIX (MOST IMPORTANT)
export const dynamic = "force-dynamic";
export const revalidate = 0;
