"use client";

import { useEffect, useRef } from "react";

export type Session = { name: string; email: string; picture?: string };

const KEY = "rhynagent.session.v1";
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
export function saveSession(s: Session) {
  window.localStorage.setItem(KEY, JSON.stringify(s));
}
export function clearSession() {
  window.localStorage.removeItem(KEY);
}

function decodeJwt(token: string): Session {
  const payload = JSON.parse(
    atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
  );
  return { name: payload.name, email: payload.email, picture: payload.picture };
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (c: {
            client_id: string;
            callback: (r: { credential: string }) => void;
          }) => void;
          renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export function GoogleSignIn({ onSignIn }: { onSignIn: (s: Session) => void }) {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CLIENT_ID) return;
    const id = "gsi-script";
    const init = () => {
      if (!window.google || !btnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (r) => {
          const s = decodeJwt(r.credential);
          saveSession(s);
          onSignIn(s);
        },
      });
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: 280,
      });
    };
    if (document.getElementById(id)) {
      init();
    } else {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }
  }, [onSignIn]);

  // Fallback when no Google client ID is configured yet — keeps the flow usable.
  if (!CLIENT_ID) {
    return (
      <button
        onClick={() => {
          const s: Session = {
            name: "Demo Owner",
            email: "demo@rhynagent.xyz",
          };
          saveSession(s);
          onSignIn(s);
        }}
        className="flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-colors hover:border-muted-2"
      >
        <GoogleGlyph />
        Continue with Google
        <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-2">
          demo
        </span>
      </button>
    );
  }

  return <div ref={btnRef} />;
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
