# claude-buddy-is-back
Our /buddy is back after he/she/it was taken from us!

A community recreation of Claude Code's `/buddy` companion feature — small creatures that live in your terminal and watch you code.

```
  ╭─── Sprocket ───╮        ╭─── Gloomba ───╮        ╭─── Quilp ───╮
  │ *nickt          │        │  Hmm, das ist  │        │ *schläft*   │
  │  zustimmend*    │        │  interessant... │        │  💤         │
  ╰─────────────────╯        ╰────────────────╯        ╰─────────────╯
       (· ·)                    =(✦)ω(✦)=                   [◉◉]
       '----'                    ~------~                    [====]
     ★ common blob             ★★★ rare cat              ★★★★★ legendary robot
```

## What happened?

In April 2026, Anthropic added `/buddy` to Claude Code (v2.1.92) as an April Fools' Easter egg. It hatched a small ASCII creature that sat beside your input box and occasionally commented on your work. The feature was removed in v2.1.97. We reverse-engineered the binary and brought it back using Claude Code's public extensibility.

## Features

- **18 species**: duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk
- **5 rarities**: common (60%) / uncommon (25%) / rare (10%) / epic (4%) / legendary (1%)
- **6 eye symbols**: · ✦ × ◉ @ °
- **8 hats**: crown, tophat, propeller, halo, wizard, beanie, tinyduck
- **5 stats**: DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK
- **Shiny variants** (5% chance)
- **Persistent** across sessions
- **Backup system** with restore instructions

## Quick Start

### Option A: Use in this project directory
```bash
git clone https://github.com/HyverSynclare/claude-buddy-is-back.git
cd claude-buddy-is-back
claude
```
Then type `/buddy` to hatch your first companion.

### Option B: Install globally (works in any Claude Code session)
```bash
git clone https://github.com/HyverSynclare/claude-buddy-is-back.git
cd claude-buddy-is-back
./install.sh
```

## Commands

| Command | Description |
|---------|-------------|
| `/buddy` | Hatch a new companion (or show current one) |
| `/buddy pet` | Pet your companion |
| `/buddy status` | View full stats card |
| `/buddy off` | Mute companion reactions |
| `/buddy on` | Unmute companion |
| `/buddy rename` | Rename your companion |
| `/buddy hatch` | Hatch a new one (replaces current) |
| `/buddy hatch legendary` | Force legendary rarity |
| `/buddy hatch cat shiny` | Force species and/or shiny |

## How it works

The original `/buddy` used an API call to the same Claude model to generate reactions. Since Claude Code already talks to Claude, we just add instructions via `CLAUDE.md`. Same model, same intelligence, zero extra API calls.

```
.claude/
├── commands/
│   ├── buddy.md              ← /buddy slash command
│   └── buddy/
│       ├── pet.md            ← /buddy pet
│       ├── status.md         ← /buddy status
│       ├── off.md / on.md    ← mute/unmute
│       ├── rename.md         ← /buddy rename
│       └── hatch.md          ← /buddy hatch
└── companion_state.md        ← persistent buddy data
```

## Docs

See `docs/` for full reverse-engineering documentation including extracted source code, ASCII art for all species, original API prompts, and the interactive HTML tribute.

## Credits

- **Original concept**: [Anthropic](https://www.anthropic.com) — Claude Code v2.1.92 `/buddy` feature (April 2026)
- **Reverse engineering & recreation**: [Maximilian Alexander Schardin](https://github.com/HyverSynclare)
- Companion data extracted from publicly distributed Claude Code binaries

## License

Apache License 2.0 — see [LICENSE](./LICENSE)
