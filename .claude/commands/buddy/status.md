You are running `/buddy status`. Read `.claude/companion_state.md`.

If no companion exists, say: "No buddy yet! Run `/buddy` to hatch one."

If a companion exists, display a full status card:

```
  ╭──────────────────────────────╮
  │  {hat_ascii}                 │
  │  {ascii_art}                 │
  │                              │
  │  {name}                      │
  │  {rarity_stars} {rarity} {species}  │
  │  {shiny ? "✨ SHINY" : ""}  │
  │                              │
  │  "{personality}"             │
  │                              │
  │  DEBUGGING  ▓▓▓░░░           │
  │  PATIENCE   ▓▓▓▓░░           │
  │  CHAOS      ▓▓░░░░           │
  │  WISDOM     ▓▓▓▓▓░           │
  │  SNARK      ▓░░░░░           │
  │                              │
  │  Hatched: {date}             │
  │  Muted: {yes/no}             │
  ╰──────────────────────────────╯
```

Use the actual values from companion_state.md. Use the species ASCII art from CLAUDE.md.

$ARGUMENTS
