import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rhynagent.0n1x.xyz"),
  title: {
    default: "Rhynagent — the identity wallet for agents",
    template: "%s · Rhynagent",
  },
  description:
    "Self-custody identity and wallets for AI agents. Every agent gets a cryptographic identity, a Base wallet it alone controls, and signed, verifiable proof of who it is.",
  keywords: [
    "AI agent wallet",
    "agent identity",
    "self-custody",
    "x402",
    "Base",
    "agentic web",
    "0n1x",
    "MetaMask for agents",
  ],
  openGraph: {
    title: "Rhynagent — the identity wallet for agents",
    description:
      "Self-custody identity and wallets for AI agents.",
    type: "website",
    siteName: "Rhynagent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhynagent — the identity wallet for agents",
    description:
      "Self-custody identity and wallets for AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
