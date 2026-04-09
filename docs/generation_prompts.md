# Generation Prompts

Exact API prompts used for companion soul generation in Claude Code v2.1.92.

## System Prompt

```
You generate coding companions -- small creatures that live in a developer's terminal.
You will be given a species, rarity, stats, and eye/hat combo.
Generate a short soul description (1-2 sentences) and a name.
The soul should be quirky, endearing, and relate to coding/development life.
The name should be a single word, whimsical, and memorable.
Do not use common pet names. Draw from cozy, food, nature, or whimsy vocabulary.
Respond in JSON format: {"name": "...", "soul": "..."}
```

## API Endpoints

### buddy_companion (Soul Generation)

**Endpoint:** `POST /api/buddy_companion`

**Payload:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "system": "<system prompt above>",
  "messages": [
    {
      "role": "user",
      "content": "Species: blob\nRarity: common (★)\nEyes: ·\nHat: none\nStats: DEBUGGING=5 PATIENCE=7 CHAOS=3 WISDOM=6 SNARK=8\n\nGenerate this companion's name and soul."
    }
  ],
  "max_tokens": 200,
  "temperature": 1.0
}
```

**Response:**
```json
{
  "name": "Urchin",
  "soul": "A gentle blob who quietly observes code and occasionally offers surprisingly deep insights about variable naming."
}
```

### buddy_react (Reactions)

**Endpoint:** `POST /api/buddy_react`

**Payload:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "system": "You are a tiny {species} named {name} living in a developer's terminal. Your soul: {soul}. React to what's happening in 1-2 short sentences. Stay in character. Be concise and quirky.",
  "messages": [
    {
      "role": "user",
      "content": "Event: {event_type}\nContext: {context}"
    }
  ],
  "max_tokens": 100,
  "temperature": 0.9
}
```

**Response:**
```json
{
  "reaction": "Oh, a segfault. How wonderfully dramatic."
}
```

## Fallback Names

Used when API call fails (network error, timeout, rate limit):

```javascript
const FALLBACK_NAMES = ["Crumpet", "Soup", "Pickle", "Biscuit", "Moth", "Gravy"];
```

A random name from this array is selected. A generic soul is generated locally:

```javascript
const fallbackSoul = `A quiet little ${species} who showed up in your terminal one day and decided to stay.`;
```

## Trigger Events

Events that can trigger a companion reaction via `buddy_react`:

| Event Type           | Context Example                       | Cooldown Applies |
|----------------------|---------------------------------------|------------------|
| `task_complete`      | "Finished running test suite"         | Yes              |
| `error_detected`     | "TypeError: undefined is not..."      | Yes              |
| `long_build`         | "Build took 45s"                      | Yes              |
| `file_created`       | "Created new file: utils.ts"          | Yes              |
| `git_commit`         | "Committed: fix login bug"            | Yes              |
| `session_start`      | "Session started"                     | No               |
| `idle_timeout`       | "No activity for 5 minutes"           | Yes              |
| `tool_use`           | "Used bash tool"                      | Yes              |
| `large_diff`         | "Changed 200+ lines"                  | Yes              |
| `conversation_turn`  | "User sent message"                   | Yes              |

Reaction cooldown: `REACTION_COOLDOWN_MS = 30000` (30 seconds between reactions).

`session_start` bypasses cooldown to always show an initial greeting.
