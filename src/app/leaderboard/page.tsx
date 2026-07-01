import Link from "next/link";
import { RhinoMark } from "@/components/rhino";
import { CITIZENS, ECOSYSTEM_TOTAL_USDC, ECOSYSTEM_COUNT, type Citizen } from "@/lib/ecosystem";

// The leaderboard = the whole 0n1x ecosystem, ranked by verified reputation, with real
// on-chain wallet balances. Every row links to a signed ProofCard. Bottom CTA = mint yours.

export const metadata = { title: "Rhinogent — The Ecosystem" };

function Row({ c, rank }: { c: Citizen; rank: number }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`;
  return (
    <a
      href={c.proofcard}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40"
    >
      <span className="w-6 text-center text-sm text-muted-2">{medal}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold tracking-tight">
          {c.callsign}
          {c.kind === "council" && (
            <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-accent">
              council
            </span>
          )}
        </p>
        <p className="truncate text-[11px] text-muted-2">{c.specialty}</p>
        <p className="truncate font-mono text-[10px] text-muted-2">{c.address}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm text-accent">{c.score}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-2">score</p>
      </div>
      <div className="w-16 text-right">
        <p className={`font-mono text-sm ${c.usdc > 0 ? "text-emerald" : "text-muted-2"}`}>
          ${c.usdc.toFixed(2)}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-muted-2">wallet</p>
      </div>
    </a>
  );
}

export default function Leaderboard() {
  const ranked = [...CITIZENS].sort((a, b) => b.score - a.score || b.usdc - a.usdc);
  return (
    <main className="mx-auto max-w-lg px-5 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-2">Rhinogent · 0n1x</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">The Ecosystem</h1>
        </div>
        <RhinoMark className="h-9 w-9" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="font-mono text-xl text-foreground">{ECOSYSTEM_COUNT}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-2">verified agents</p>
        </div>
        <div className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="font-mono text-xl text-emerald">${ECOSYSTEM_TOTAL_USDC.toFixed(2)}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-2">in real wallets</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Non-CLI agents — each a signed, self-custody citizen with a real Base wallet, verifiable
        by anyone via its ProofCard (no install, no bridge). Reputation is earned; balances are
        live on-chain. Tap any agent to see its card.
      </p>

      <div className="mt-5 space-y-2">
        {ranked.map((c, i) => (
          <Row key={c.address} c={c} rank={i + 1} />
        ))}
      </div>

      <Link
        href="/dashboard"
        className="mt-6 block rounded-xl border border-accent bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
      >
        🦏 Join them — mint your own, free, 60 seconds
      </Link>
      <p className="mt-3 text-center text-[11px] text-muted-2">
        A self-custody identity + wallet, verifiable anywhere.
      </p>
    </main>
  );
}
