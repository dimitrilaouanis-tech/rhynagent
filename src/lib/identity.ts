import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

export type Agent = {
  id: string; // callsign, e.g. Keen-Beacon-4AEF
  label: string;
  address: `0x${string}`;
  did: string; // did:pkh:eip155:8453:0x…
  privateKey: `0x${string}`; // self-custody — prototype stores locally; never sent to a server
  createdAt: number;
};

// Deterministic callsign from an address — Adjective-Noun-XXXX (matches 0n1x scheme).
const ADJ = [
  "Keen", "Bright", "Iron", "Swift", "Bold", "Quiet", "Sharp", "Stone",
  "Onyx", "Vast", "Lone", "Prime", "True", "Grave", "Wild", "Steel",
];
const NOUN = [
  "Beacon", "Warden", "Monolith", "Horn", "Sentinel", "Rampart", "Cipher",
  "Bastion", "Anchor", "Forge", "Vault", "Ridge", "Pillar", "Crest", "Spire", "Tusk",
];

export function callsignFor(address: string): string {
  const hex = address.replace(/^0x/, "");
  const a = parseInt(hex.slice(0, 2), 16) % ADJ.length;
  const n = parseInt(hex.slice(2, 4), 16) % NOUN.length;
  const tail = hex.slice(-4).toUpperCase();
  return `${ADJ[a]}-${NOUN[n]}-${tail}`;
}

// Mint a fresh self-custody identity + Base wallet, entirely in the browser.
export function generateAgent(label?: string): Agent {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  const address = account.address;
  const id = callsignFor(address);
  return {
    id,
    label: label?.trim() || id,
    address,
    did: `did:pkh:eip155:8453:${address}`,
    privateKey,
    createdAt: Date.now(),
  };
}

export function shortAddr(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
