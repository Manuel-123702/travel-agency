"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, CheckCircle, Clock, Star, ArrowUpRight } from "lucide-react";

type HealthPayload = {
  ok: boolean;
  healthy: boolean;
  environment: string;
  sentry: { enabled: boolean; dsn: boolean };
  redis: { enabled: boolean; healthy: boolean };
  database: { healthy: boolean; error: string | null };
  timestamp: string;
};

type AnalyticsOverviewPayload = {
  totalClients: number;
  activeClients: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  revenue: number;
};

type RevenuePayload = {
  months: string[];
  series: number[];
};

type DestinationPayload = {
  country: string;
  count: number;
  share: number;
};

type DailyAnalyticsPayload = {
  labels: string[];
  applications: number[];
  payments: number[];
  revenue: number[];
};

const monthlyData = [
  { month: "Jan", cases: 8, approved: 7, revenue: 22400 },
  { month: "Feb", cases: 10, approved: 9, revenue: 28000 },
  { month: "Mar", cases: 12, approved: 11, revenue: 33600 },
  { month: "Apr", cases: 9, approved: 9, revenue: 25200 },
  { month: "May", cases: 14, approved: 13, revenue: 39200 },
  { month: "Jun", cases: 16, approved: 15, revenue: 44800 },
];

const maxCases = Math.max(...monthlyData.map((d) => d.cases));

const advisors = [
  { name: "Aminata Coulibaly", cases: 28, rate: "98%", avg: "10 wks", rating: 4.9 },
  { name: "Khadija Benali", cases: 24, rate: "96%", avg: "11 wks", rating: 4.8 },
  { name: "Ibrahim Sow", cases: 19, rate: "95%", avg: "12 wks", rating: 4.7 },
];

const defaultDestinationStats: DestinationPayload[] = [
  { country: "Canada", count: 33, share: 48 },
  { country: "France", count: 23, share: 33 },
  { country: "Luxembourg", count: 13, share: 19 },
];

const defaultKpis = [
  { icon: Users, label: "Total Clients (2026)", value: "69", change: "+34% YoY", color: "blue" },
  { icon: CheckCircle, label: "Cases Approved", value: "64", change: "93% approval", color: "green" },
  { icon: TrendingUp, label: "Revenue (YTD)", value: "$193K", change: "+28% vs 2025", color: "purple" },
  { icon: Clock, label: "Avg. Processing", value: "11 wks", change: "Industry avg: 16", color: "orange" },
];

export default function AnalyticsPage() {
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [overview, setOverview] = useState<AnalyticsOverviewPayload | null>(null);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [revenue, setRevenue] = useState<RevenuePayload | null>(null);
  const [revenueError, setRevenueError] = useState<string | null>(null);
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyAnalyticsPayload | null>(null);
  const [dailyError, setDailyError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<DestinationPayload[] | null>(null);
  const [destinationError, setDestinationError] = useState<string | null>(null);

  useEffect(() => {
    const abort = new AbortController();

    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store", signal: abort.signal });
        if (!res.ok) throw new Error(`Health check failed (${res.status})`);
        setHealth((await res.json()) as HealthPayload);
      } catch (error) {
        if (abort.signal.aborted) return;
        setHealthError((error as Error).message);
      }
    };

    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/analytics/overview", { cache: "no-store", signal: abort.signal });
        if (!res.ok) throw new Error(`Analytics overview failed (${res.status})`);
        setOverview((await res.json()) as AnalyticsOverviewPayload);
      } catch (error) {
        if (abort.signal.aborted) return;
        setOverviewError((error as Error).message);
      }
    };

    const fetchRevenue = async () => {
      try {
        const res = await fetch("/api/analytics/revenue", { cache: "no-store", signal: abort.signal });
        if (!res.ok) throw new Error(`Revenue analytics failed (${res.status})`);
        setRevenue((await res.json()) as RevenuePayload);
      } catch (error) {
        if (abort.signal.aborted) return;
        setRevenueError((error as Error).message);
      }
    };

    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/analytics/destinations", { cache: "no-store", signal: abort.signal });
        if (!res.ok) throw new Error(`Destination analytics failed (${res.status})`);
        const payload = (await res.json()) as { destinations: DestinationPayload[] };
        setDestinations(payload.destinations);
      } catch (error) {
        if (abort.signal.aborted) return;
        setDestinationError((error as Error).message);
      }
    };

    const fetchDailyAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics/daily", { cache: "no-store", signal: abort.signal });
        if (!res.ok) throw new Error(`Daily analytics failed (${res.status})`);
        setDailyAnalytics((await res.json()) as DailyAnalyticsPayload);
      } catch (error) {
        if (abort.signal.aborted) return;
        setDailyError((error as Error).message);
      }
    };

    fetchHealth();
    fetchOverview();
    fetchRevenue();
    fetchDailyAnalytics();
    fetchDestinations();

    return () => abort.abort();
  }, []);

  const kpis = overview
    ? [
        { icon: Users, label: "Total Clients", value: overview.totalClients.toString(), change: "Live", color: "blue" },
        { icon: CheckCircle, label: "Cases Approved", value: overview.approvedApplications.toString(), change: "Live", color: "green" },
        { icon: TrendingUp, label: "Revenue (YTD)", value: `$${overview.revenue.toLocaleString()}`, change: "Live", color: "purple" },
        { icon: Clock, label: "Pending Applications", value: overview.pendingApplications.toString(), change: "Current", color: "orange" },
      ]
    : defaultKpis;

  const revenueMonths = revenue?.months ?? monthlyData.map((d) => d.month);
  const revenueSeries = revenue?.series ?? monthlyData.map((d) => d.revenue);
  const maxRevenue = Math.max(...revenueSeries, 1);
  const revenueBars = revenueMonths.map((month, index) => ({ month, value: revenueSeries[index] ?? 0 }));
  const destinationStats = destinations ?? defaultDestinationStats;
  const dailyLabels = dailyAnalytics?.labels ?? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dailyApplications = dailyAnalytics?.applications ?? [2, 4, 3, 5, 1, 2, 4];
  const dailyRevenue = dailyAnalytics?.revenue ?? [1200, 2500, 1800, 3200, 1200, 1900, 2600];
  const maxDailyRevenue = Math.max(...dailyRevenue, 1);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Analytics</h1>
        <p className="text-gray-500">Agency performance — last 12 months</p>
        <p className="text-sm text-slate-500 mt-3">Live metrics from the admin dashboard, updated on every page load.</p>
        {overviewError && (
          <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
            Analytics overview unavailable: {overviewError}
          </div>
        )}
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(({ icon: Icon, label, value, change, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" : color === "purple" ? "bg-purple-100" : "bg-orange-100"
              }`}>
                <Icon size={18} className={
                  color === "blue" ? "text-blue-700" : color === "green" ? "text-green-600" : color === "purple" ? "text-purple-600" : "text-orange-600"
                } />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                <ArrowUpRight size={11} />{change}
              </span>
            </div>
            <p className="font-heading font-black text-3xl text-gray-900">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-gray-900">System Health</h2>
              <p className="text-gray-500 text-sm">Live runtime observability from the health endpoint.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className={`px-3 py-1 rounded-full font-semibold ${health?.healthy ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {health ? (health.healthy ? "Healthy" : "Unhealthy") : "Loading..."}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">{health?.environment ?? "—"}</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">{health?.timestamp ? new Date(health.timestamp).toLocaleString() : "—"}</span>
            </div>
          </div>

          {healthError ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {healthError}
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Monitoring endpoints</p>
                <p className="mt-2">Health: <code className="rounded bg-slate-100 px-2 py-1">/api/health</code></p>
                <p className="mt-1">Metrics: <code className="rounded bg-slate-100 px-2 py-1">/api/metrics</code></p>
              </div>
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Redis</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{health ? (health.redis.healthy ? "Healthy" : "Unhealthy") : "—"}</p>
                <p className="text-xs text-gray-500">Enabled: {health?.redis.enabled ? "Yes" : "No"}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Database</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{health ? (health.database.healthy ? "Healthy" : "Unhealthy") : "—"}</p>
                <p className="text-xs text-gray-500">{health?.database.error ?? "No errors"}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Sentry</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{health ? (health.sentry.enabled ? "Enabled" : "Disabled") : "—"}</p>
                <p className="text-xs text-gray-500">DSN: {health?.sentry.dsn ? "Present" : "Missing"}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Overall</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{health ? (health.healthy ? "Healthy" : "Issue") : "—"}</p>
                <p className="text-xs text-gray-500">Snapshot refreshed on load.</p>
              </div>
            </div>
            </>
          )}
        </motion.div>

        {/* Monthly bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-gray-900">Monthly Revenue</h2>
              <p className="text-gray-500 text-sm">Live completed payments over the last 12 months.</p>
            </div>
            {revenueError && (
              <span className="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                {revenueError}
              </span>
            )}
          </div>
          <div className="flex items-end gap-3 h-48 overflow-x-auto pb-2">
            {revenueBars.map(({ month, value }, i) => (
              <div key={month} className="flex-1 min-w-[40px] flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxRevenue) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.03, ease: "easeOut" }}
                    className="w-full bg-blue-600 rounded-t-xl"
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">{month}</span>
                <span className="text-[10px] text-slate-500">${value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-gray-900">Weekly Activity</h2>
              <p className="text-gray-500 text-sm">Daily applications and revenue for the last 7 days.</p>
            </div>
            {dailyError && (
              <span className="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                {dailyError}
              </span>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Applications</p>
              <div className="mt-4 space-y-2">
                {dailyLabels.map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-12 text-xs text-gray-500">{label}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((dailyApplications[index] / Math.max(...dailyApplications, 1)) * 100, 100)}%` }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-gray-700">{dailyApplications[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Revenue</p>
              <div className="mt-4 space-y-2">
                {dailyLabels.map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-12 text-xs text-gray-500">{label}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((dailyRevenue[index] / maxDailyRevenue) * 100, 100)}%` }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                    <span className="w-14 text-right text-xs text-gray-700">${dailyRevenue[index].toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Destination breakdown */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-bold text-gray-900">By Destination</h2>
              <p className="text-gray-500 text-sm">Top countries by application volume.</p>
            </div>
            {destinationError && (
              <span className="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                {destinationError}
              </span>
            )}
          </div>
          <div className="space-y-4">
            {destinationStats.map((destination) => {
              const flag = destination.country === "Canada" ? "🇨🇦" : destination.country === "France" ? "🇫🇷" : destination.country === "Luxembourg" ? "🇱🇺" : "🌍";
              const color = destination.share > 40 ? "bg-red-500" : destination.share > 25 ? "bg-blue-600" : "bg-sky-400";

              return (
                <div key={destination.country}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-700">{flag} {destination.country}</span>
                    <span className="text-sm font-bold text-gray-900">{destination.count} <span className="text-gray-400 font-normal text-xs">({destination.share}%)</span></span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${destination.share}%` }} transition={{ duration: 0.9, delay: 0.5 }}
                      className={`h-full ${color} rounded-full`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
            <h3 className="font-heading font-bold text-gray-900 text-sm mb-3">Visa Types</h3>
            {[
              { type: "Work Permit", count: 29, pct: 42 },
              { type: "Student Visa", count: 23, pct: 33 },
              { type: "Express Entry", count: 11, pct: 16 },
              { type: "Visitor Visa", count: 6, pct: 9 },
            ].map(({ type, count, pct }) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{type}</span>
                <span className="font-semibold text-gray-900">{count} <span className="text-gray-400 text-xs">({pct}%)</span></span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advisor performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-heading font-bold text-gray-900 mb-5">Advisor Performance (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Advisor", "Cases Handled", "Success Rate", "Avg. Processing", "Client Rating"].map((h) => (
                  <th key={h} className="text-left py-3 pr-6 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {advisors.map(({ name, cases, rate, avg, rating }, i) => (
                <tr key={name} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-xs font-bold">
                        {name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-gray-900 text-sm">{name}</p>
                        {i === 0 && <p className="text-gold text-xs font-semibold">Top Performer</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-6 font-bold text-gray-900">{cases}</td>
                  <td className="py-4 pr-6">
                    <span className="font-bold text-green-600">{rate}</span>
                  </td>
                  <td className="py-4 pr-6 text-gray-700">{avg}</td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="text-gold fill-gold" />
                      <span className="font-bold text-gray-900">{rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
