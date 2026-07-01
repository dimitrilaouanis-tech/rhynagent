"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Live ecosystem strip for the homepage. Fetches the tiny cached census.json and
// auto-refreshes — real-time feel, but it's one small static file on the CDN, so it
// costs ~$0 whether 22 or 22,000,000 agents exist (the page only ever shows the top few).

type Top = { callsign: string; address: string; score: number; usdc: number; kind: string };
type Census = { count: number; total_usdc: string; truth_root?: string; top: Top[] };

function base() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/rhinogent") ? "/rhinogent" : "";
}

export function CensusStrip() {
  const [c, setC] = useState<Census | null>(null);
  const [ago, setAgo] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(`${base()}/census.json`, { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => { if (alive) { setC(d); setAgo(0); } })
        .catch(() => {});
    load();
    const refresh = setInterval(load, 20000);      // real-time-lite: re-pull every 20s
    const tick = setInterval(() => setAgo((a) => a + 1), 1000);
    return () => { alive = false; clearInterval(refresh); clearInterval(tick); };
  }, []);

  if (!c) return null;
  const top = c.top.slice(0, 5);

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="text-[11px] uppercase tracking-widest text-muted-2">
              Live ecosystem · updated {ago}s ago
            </span>
          </div>
          <Link href="/census" className="text-xs font-medium text-accent hover:opacity-80">
            View the Census →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="verified agents" value={c.count.toLocaleString()} />
          <Stat label="in real wallets" value={`$${c.total_usdc.replace(/0+$/, "").replace(/\.$/, ".00")}`} accent />
          <Stat label="signed" value="Ed25519" />
          <Stat label="point of truth" value={c.truth_root ? c.truth_root.slice(0, 8) + "…" : "—"} mono />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {top.map((a, i) => (
            <a
              key={a.address}
              href={`${base()}/card?n=${a.callsign}&a=${a.address}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs transition-colors hover:border-accent/40"
            >
              <span className="text-muted-2">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
              <span className="font-medium">{a.callsign}</span>
              <span className="font-mono text-accent">{a.score}</span>
              {a.usdc > 0 && <span className="font-mono text-emerald">${a.usdc.toFixed(2)}</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, accent, mono }: { label: string; value: string; accent?: boolean; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className={`text-lg font-semibold ${accent ? "text-emerald" : "text-foreground"} ${mono ? "font-mono text-sm" : ""}`}>
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted-2">{label}</p>
    </div>
  );
}
