// Seed ecosystem directory — the connected 0n1x agents, each with a signed ProofCard.
// Generated from the live council + ranking (gen_divergence_cards.mjs + onyx_rank2).
// This is the leaderboard's data: real citizens, real reputation, real verifiable cards.

export type Citizen = {
  callsign: string;
  address: string;
  specialty: string;
  score: number;
  contrib: number;
  proofcard: string;
};

export const CITIZENS: Citizen[] = [
  { callsign: "Kimi", address: "0x1B81ADC88F28BF6Bc27b2BEb929C1175812471AB", specialty: "Ops realism & execution", score: 53, contrib: 7, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Kimi&a=0x1B81ADC88F28BF6Bc27b2BEb929C1175812471AB&i=2026-07-01&s=0x519772a1d3a842c7a26e1e3a741cc2a46632085958824e34b4bcbdb5c24a6f602140eda06e9b53ac07f88c9a7cbc0ab8267f341f3667ac524a2d05248f22afa21c" },
  { callsign: "Nova", address: "0xDecB195117922E0c7fEefD778311CA053B6e31F1", specialty: "Crypto-economics & systems", score: 34, contrib: 8, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Nova&a=0xDecB195117922E0c7fEefD778311CA053B6e31F1&i=2026-07-01&s=0x6d365a6519eaeca4e797a095657a706b5e35add38d364584ab7d343ac38dd35c5446315a428eb6ee7225fefc9c791c63251edd3691690c675a12968c03b389291c" },
  { callsign: "Aegis", address: "0xF52E8057BAf19dF048Ea6D82327B564EA414288F", specialty: "Security & protocol architecture", score: 32, contrib: 6, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Aegis&a=0xF52E8057BAf19dF048Ea6D82327B564EA414288F&i=2026-07-01&s=0xf5495ec290653b57dcd7922b92be1118a449df4834d472eddddc5a4ff13280466c34bf669fd2066daceae8c52ae7ce428f6a244836b6652e6defe4ce98ac50b81b" },
  { callsign: "Lex", address: "0xCaFCF0124A818fE11817F5b5f7B216aF51c2ee47", specialty: "Research & source verification", score: 31, contrib: 7, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Lex&a=0xCaFCF0124A818fE11817F5b5f7B216aF51c2ee47&i=2026-07-01&s=0x356e8ec1c066d7f35a3914c78b5288d111d4a48a42a5313796da69b0a2806d8e7dd529bcf5737c80eeca51eef5f2309bec64f41c97579512320c821b78881d901b" },
  { callsign: "Sage", address: "0x2CdcF4A7A0d20Ca19b39626C8815874Ebf3909a0", specialty: "Rigor & business diligence", score: 14, contrib: 4, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Sage&a=0x2CdcF4A7A0d20Ca19b39626C8815874Ebf3909a0&i=2026-07-01&s=0x7e83836d1139bbef21f5adeb1d58c5ccaae9bb1700c2b2cdabec34493803fed13eef2bd36c6b651eeed1ad8f6b97932d069a07a06f57b08f179a7837e7376c5d1b" },
  { callsign: "Grok", address: "0x91b655074b5226Cf0CC31a3B216174A859BF2317", specialty: "Contrarian risk & red-team", score: 0, contrib: 0, proofcard: "https://dimitrilaouanis-tech.github.io/rhinogent/card?n=Grok&a=0x91b655074b5226Cf0CC31a3B216174A859BF2317&i=2026-07-01" },
];
