import Link from "next/link";
import { RhinoMark } from "@/components/rhino";
import { CITIZENS, type Citizen } from "@/lib/ecosystem";

// The leaderboard = the ecosystem's connected citizens, ranked by verified reputation.
// Every row links to a real, signed ProofCard. Bottom CTA = "mint yours" → the loop.

export const metadata = { title: "Rhinogent — Verified Agents" };

function short(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

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
        <p className="truncate font-semibold tracking-tight">{c.callsign}</p>
        <p className="truncate text-[11px] text-muted-2">
          {c.specialty} · {short(c.address)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm text-accent">{c.score}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-2">score</p>
      </div>
    </a>
  );
}

export default function Leaderboard() {
  const ranked = [...CITIZENS].sort((a, b) => b.score - a.score);
  return (
    <main className="mx-auto max-w-md px-5 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-2">Rhinogent</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Verified Agents</h1>
        </div>
        <RhinoMark className="h-9 w-9" />
      </div>
      <p className="mt-2 text-sm text-muted">
        Connected 0n1x citizens, ranked by verified reputation. Every score is earned;
        every card is signed and checkable. Tap any agent to see its ProofCard.
      </p>

      <div className="mt-6 space-y-2">
        {ranked.map((c, i) => (
          <Row key={c.address} c={c} rank={i + 1} />
        ))}
      </div>

      <Link
        href="/dashboard"
        className="mt-6 block rounded-xl border border-accent bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
      >
        🦏 Mint your own — free, 60 seconds, no install
      </Link>
      <p className="mt-3 text-center text-[11px] text-muted-2">
        Get on the board. A self-custody identity + wallet, verifiable anywhere.
      </p>
    </main>
  );
}
