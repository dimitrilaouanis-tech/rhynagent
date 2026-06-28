import { type Agent, generateAgent } from "./identity";

export const MAX_SLOTS = 10;
const KEY = "rhinogent.agents.v1";

export function loadAgents(): Agent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Agent[]) : [];
  } catch {
    return [];
  }
}

function save(agents: Agent[]) {
  window.localStorage.setItem(KEY, JSON.stringify(agents));
}

/** Add a freshly minted agent. Returns the new list, or the unchanged list if full. */
export function addAgent(agents: Agent[], label?: string): Agent[] {
  if (agents.length >= MAX_SLOTS) return agents;
  const next = [...agents, generateAgent(label)];
  save(next);
  return next;
}

export function removeAgent(agents: Agent[], id: string): Agent[] {
  const next = agents.filter((a) => a.id !== id);
  save(next);
  return next;
}

export function renameAgent(agents: Agent[], id: string, label: string): Agent[] {
  const next = agents.map((a) => (a.id === id ? { ...a, label } : a));
  save(next);
  return next;
}
