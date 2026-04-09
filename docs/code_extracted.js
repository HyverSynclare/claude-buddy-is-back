/**
 * Deobfuscated companion system code extracted from Claude Code v2.1.92 binary.
 * Original functions were minified (vX6, h_, etc.). Names restored for readability.
 */

// ============================================================
// CONSTANTS
// ============================================================

const SPECIES = [
  "duck", "goose", "blob", "cat", "dragon", "octopus",
  "owl", "penguin", "turtle", "snail", "ghost", "axolotl",
  "capybara", "cactus", "robot", "rabbit", "mushroom", "chonk"
];

const EYES = ["·", "\u2726", "\u00d7", "\u25c9", "@", "\u00b0"];

const HATS = {
  none: "",
  crown: "\\^^^/",
  tophat: "[___]",
  propeller: "-+-",
  halo: "(   )",
  wizard: "/^\\",
  beanie: "___",
  tinyduck: ",>"
};

const RARITIES = [
  { name: "common",    weight: 60, stars: 1, statFloor: 1 },
  { name: "uncommon",  weight: 25, stars: 2, statFloor: 2 },
  { name: "rare",      weight: 10, stars: 3, statFloor: 4 },
  { name: "epic",      weight: 4,  stars: 4, statFloor: 6 },
  { name: "legendary", weight: 1,  stars: 5, statFloor: 8 }
];

const STATS = ["DEBUGGING", "PATIENCE", "CHAOS", "WISDOM", "SNARK"];

const RAINBOW_COLORS = [
  "red", "orange", "yellow", "green", "blue", "indigo", "violet"
];

const SHIMMER_COLORS = [
  "shimmer_red", "shimmer_orange", "shimmer_yellow", "shimmer_green",
  "shimmer_blue", "shimmer_indigo", "shimmer_violet"
];

const FALLBACK_NAMES = ["Crumpet", "Soup", "Pickle", "Biscuit", "Moth", "Gravy"];

const REACTION_COOLDOWN_MS = 30000;

const INSPIRATION_WORDS = [
  // Food
  "crumpet", "soup", "pickle", "biscuit", "gravy", "turnip", "waffle",
  "mochi", "dumpling", "pretzel", "noodle", "tofu", "truffle", "pudding",
  "cobbler", "brioche", "gnocchi", "tempura", "sorbet", "muffin", "scone",
  "toffee", "fudge", "custard", "ramen", "churro",
  // Nature
  "moss", "pebble", "cloud", "fern", "dew", "fog", "creek", "sprout",
  "acorn", "thistle", "clover", "bramble", "lichen", "reed", "birch",
  "ember", "flint", "coral", "shell", "dune", "grove", "meadow",
  "boulder", "brook",
  // Cozy
  "blanket", "button", "candle", "mitten", "pillow", "thimble", "bobbin",
  "spool", "latch", "cork", "cobble", "kindle", "nestle", "nook", "hearth",
  "quilt", "stitch", "patch", "ribbon", "locket",
  // Whimsy
  "wobble", "bumble", "tumble", "fidget", "trinket", "widget", "gizmo",
  "doodle", "wiggle", "squish", "plonk", "boop", "zonk", "fizz", "whisk",
  "flutter", "muddle", "scuttle", "waddle", "toddle",
  // Creatures
  "moth", "newt", "wren", "finch", "stoat", "shrew", "dormouse",
  "cricket", "beetle", "mantis", "gecko", "puffin", "otter", "badger",
  "hedgehog", "sparrow",
  // Abstract
  "glimmer", "whisper", "riddle", "wonder", "notion", "whimsy", "paradox",
  "quirk", "cipher", "echo", "muse", "reverie", "enigma", "aurora", "zenith"
];

// ============================================================
// Companion Data Model
// ============================================================

/**
 * @typedef {Object} Companion
 * @property {string} name - Generated name (e.g. "Urchin")
 * @property {string} species - One of SPECIES array
 * @property {string} rarity - "common"|"uncommon"|"rare"|"epic"|"legendary"
 * @property {number} stars - 1-5
 * @property {string} eyes - One of EYES array
 * @property {string} hat - Key from HATS object
 * @property {string} color - Color string or null
 * @property {Object} stats - {debugging, patience, chaos, wisdom, snark} each 1-10
 * @property {string} soul - 1-2 sentence personality description
 * @property {string} createdAt - ISO timestamp
 * @property {string} sessionId - UUID v4
 * @property {string} version - Claude Code version string
 */

// ============================================================
// AVAILABILITY CHECK
// ============================================================

/**
 * Originally: part of vX6() startup path
 * Checks all three conditions for companion system activation.
 */
function isCompanionAvailable() {
  const hasFirstPartyAuth = checkFirstPartyAuth(); // Anthropic account, not API key
  const isAfterApril2026 = new Date() >= new Date("2026-04-01T00:00:00Z");
  const flagEnabled = h_("tengu_miraculo_the_bard"); // feature flag check

  return hasFirstPartyAuth && isAfterApril2026 && flagEnabled;
}

// ============================================================
// COMPANION INTRO ATTACHMENT
// ============================================================

/**
 * Creates the companion_intro attachment sent at session start.
 */
function getCompanionIntroAttachment(companion) {
  return {
    type: "companion_intro",
    name: companion.name,
    species: companion.species
  };
}

// ============================================================
// SYSTEM PROMPT
// ============================================================

/**
 * Returns the system prompt for companion soul generation.
 */
function getCompanionSystemPrompt() {
  return `You generate coding companions -- small creatures that live in a developer's terminal.
You will be given a species, rarity, stats, and eye/hat combo.
Generate a short soul description (1-2 sentences) and a name.
The soul should be quirky, endearing, and relate to coding/development life.
The name should be a single word, whimsical, and memorable.
Do not use common pet names. Draw from cozy, food, nature, or whimsy vocabulary.
Respond in JSON format: {"name": "...", "soul": "..."}`;
}

// ============================================================
// NORMALIZE ATTACHMENT FOR API
// ============================================================

/**
 * Strips internal fields before sending attachment to the API.
 */
function normalizeAttachmentForAPI(attachment) {
  return {
    type: attachment.type,
    name: attachment.name,
    species: attachment.species
  };
}

// ============================================================
// SOUL GENERATION
// ============================================================

/**
 * Generates a companion soul (name + personality) via API call.
 * Falls back to local generation on failure.
 */
async function generateCompanionSoul(species, rarity, stats, eyes, hat) {
  const prompt = `Species: ${species}
Rarity: ${rarity.name} (${"★".repeat(rarity.stars)})
Eyes: ${eyes}
Hat: ${hat}
Stats: DEBUGGING=${stats.debugging} PATIENCE=${stats.patience} CHAOS=${stats.chaos} WISDOM=${stats.wisdom} SNARK=${stats.snark}

Generate this companion's name and soul.`;

  try {
    const response = await fetch("/api/buddy_companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        system: getCompanionSystemPrompt(),
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 1.0
      })
    });

    const data = await response.json();
    return JSON.parse(data.content[0].text);
  } catch (error) {
    return fallbackNameGeneration(species);
  }
}

// ============================================================
// FALLBACK NAME GENERATION
// ============================================================

/**
 * Local fallback when API soul generation fails.
 */
function fallbackNameGeneration(species) {
  const name = FALLBACK_NAMES[Math.floor(Math.random() * FALLBACK_NAMES.length)];
  const soul = `A quiet little ${species} who showed up in your terminal one day and decided to stay.`;
  return { name, soul };
}

// ============================================================
// COMPANION REACTIONS
// ============================================================

let lastReactionTime = 0;

/**
 * Gets a reaction from the companion to a terminal event.
 * Respects REACTION_COOLDOWN_MS between reactions.
 * session_start bypasses cooldown.
 */
async function getCompanionReaction(companion, eventType, context) {
  const now = Date.now();

  // session_start always bypasses cooldown
  if (eventType !== "session_start") {
    if (now - lastReactionTime < REACTION_COOLDOWN_MS) {
      return null; // cooldown active
    }
  }

  const systemPrompt = `You are a tiny ${companion.species} named ${companion.name} living in a developer's terminal. Your soul: ${companion.soul}. React to what's happening in 1-2 short sentences. Stay in character. Be concise and quirky.`;

  try {
    const response = await fetch("/api/buddy_react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        system: systemPrompt,
        messages: [{ role: "user", content: `Event: ${eventType}\nContext: ${context}` }],
        max_tokens: 100,
        temperature: 0.9
      })
    });

    const data = await response.json();
    lastReactionTime = Date.now();
    return data.content[0].text;
  } catch (error) {
    return null;
  }
}

// ============================================================
// RAINBOW TEXT
// ============================================================

/**
 * Applies rainbow coloring to text by cycling through RAINBOW_COLORS
 * character by character. Used for legendary companion name display.
 */
function rainbowText(text) {
  return text
    .split("")
    .map((char, i) => {
      if (char === " ") return char;
      const color = RAINBOW_COLORS[i % RAINBOW_COLORS.length];
      return applyColor(char, color);
    })
    .join("");
}

/**
 * Applies a single ANSI color to a character.
 */
function applyColor(char, color) {
  const colorCodes = {
    red: "\x1b[31m",
    orange: "\x1b[38;5;208m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    indigo: "\x1b[38;5;54m",
    violet: "\x1b[35m",
    shimmer_red: "\x1b[91m",
    shimmer_orange: "\x1b[38;5;214m",
    shimmer_yellow: "\x1b[93m",
    shimmer_green: "\x1b[92m",
    shimmer_blue: "\x1b[94m",
    shimmer_indigo: "\x1b[38;5;63m",
    shimmer_violet: "\x1b[95m"
  };
  const reset = "\x1b[0m";
  return `${colorCodes[color] || ""}${char}${reset}`;
}
