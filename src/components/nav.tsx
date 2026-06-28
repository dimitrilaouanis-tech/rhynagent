import Link from "next/link";
import { RhinoMark } from "./rhino";

const links = [
  { href: "#features", label: "Features" },
  { href: "#developers", label: "Developers" },
  { href: "#security", label: "Security" },
  { href: "#docs", label: "Docs" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50">
      {/* Stripe-style hairline accent */}
      <div className="h-px w-full hairline opacity-60" />
      <div className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <RhinoMark className="h-8 w-8" />
            <span className="text-[15px] font-semibold tracking-tight">
              Rhinogent
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#docs"
              className="hidden text-sm text-muted transition-colors hover:text-foreground sm:inline"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Get Rhinogent
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
